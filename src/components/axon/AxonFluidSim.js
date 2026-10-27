import * as THREE from 'three';
import {
  passThroughVS,
  fluidSplatFS,
  fluidAdvectionFS,
  fluidDivergenceFS,
  fluidPressureFS,
  fluidGradientSubtractFS,
} from './axonShaders';

/**
 * Double render target buffer for ping-pong GPU passes
 */
class DoubleRenderTarget {
  constructor(width, height, options) {
    this.read = new THREE.WebGLRenderTarget(width, height, options);
    this.write = new THREE.WebGLRenderTarget(width, height, options);
  }

  swap() {
    const temp = this.read;
    this.read = this.write;
    this.write = temp;
  }

  dispose() {
    this.read.dispose();
    this.write.dispose();
  }
}

export default class AxonFluidSim {
  constructor(renderer, width = 256, height = 256) {
    this.renderer = renderer;
    this.simWidth = width;
    this.simHeight = height;
    this.dyeWidth = 512;
    this.dyeHeight = 512;

    // Determine supported float type
    const isWebGL2 = renderer.capabilities.isWebGL2;
    const type = isWebGL2 ? THREE.HalfFloatType : THREE.FloatType;

    const rtOptions = {
      type,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };

    // Double buffers
    this.velocity = new DoubleRenderTarget(this.simWidth, this.simHeight, rtOptions);
    this.density = new DoubleRenderTarget(this.dyeWidth, this.dyeHeight, rtOptions);
    this.pressure = new DoubleRenderTarget(this.simWidth, this.simHeight, rtOptions);
    this.divergence = new THREE.WebGLRenderTarget(this.simWidth, this.simHeight, rtOptions);

    // Quad geometry & orthographic camera for fullscreen FBO passes
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.scene.add(this.quad);

    // Materials
    this.splatMaterial = new THREE.ShaderMaterial({
      vertexShader: passThroughVS,
      fragmentShader: fluidSplatFS,
      uniforms: {
        uTarget: { value: null },
        uAspect: { value: 1.0 },
        uPoint: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Vector3() },
        uRadius: { value: 0.005 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.advectionMaterial = new THREE.ShaderMaterial({
      vertexShader: passThroughVS,
      fragmentShader: fluidAdvectionFS,
      uniforms: {
        uVelocity: { value: null },
        uSource: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simWidth, 1 / this.simHeight) },
        uDt: { value: 1 / 60 },
        uDissipation: { value: 0.98 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.divergenceMaterial = new THREE.ShaderMaterial({
      vertexShader: passThroughVS,
      fragmentShader: fluidDivergenceFS,
      uniforms: {
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simWidth, 1 / this.simHeight) },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.pressureMaterial = new THREE.ShaderMaterial({
      vertexShader: passThroughVS,
      fragmentShader: fluidPressureFS,
      uniforms: {
        uPressure: { value: null },
        uDivergence: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simWidth, 1 / this.simHeight) },
        uDissipation: { value: 0.95 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.gradSubtractMaterial = new THREE.ShaderMaterial({
      vertexShader: passThroughVS,
      fragmentShader: fluidGradientSubtractFS,
      uniforms: {
        uPressure: { value: null },
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simWidth, 1 / this.simHeight) },
      },
      depthTest: false,
      depthWrite: false,
    });

    // Splat tracking
    this.lastSplatTime = 0;
    this.splats = [];
  }

  addSplat(x, y, dx, dy, aspect, isMobile = false) {
    const len = Math.hypot(dx, dy);
    if (len < 0.01) return;

    // Radius mapping
    const radiusNorm = Math.min(Math.max(len / 5.0, 0), 1) * 60.0 * (isMobile ? 0.8 : 0.6);
    const radiusUV = (radiusNorm / 200.0) * 0.003;

    // Force multiplier
    const forceMult = Math.min(Math.max(len / 15.0, 0), 1) * 10.0;

    this.splats.push({
      x,
      y,
      dx: dx * forceMult * 0.05,
      dy: -dy * forceMult * 0.05,
      radius: radiusUV,
      aspect,
    });
  }

  applySplat(target, point, color, radius, aspect) {
    this.splatMaterial.uniforms.uTarget.value = target.read.texture;
    this.splatMaterial.uniforms.uPoint.value.set(point.x, point.y);
    this.splatMaterial.uniforms.uColor.value.copy(color);
    this.splatMaterial.uniforms.uRadius.value = radius;
    this.splatMaterial.uniforms.uAspect.value = aspect;

    this.quad.material = this.splatMaterial;
    this.renderer.setRenderTarget(target.write);
    this.renderer.render(this.scene, this.camera);
    target.swap();
  }

  step(dt = 1 / 60) {
    // 1. Process splats
    if (this.splats.length > 0) {
      for (const s of this.splats) {
        // Splat into velocity
        const velColor = new THREE.Vector3(s.dx, s.dy, 1.0);
        this.applySplat(this.velocity, { x: s.x, y: s.y }, velColor, s.radius, s.aspect);

        // Splat into density (white)
        const densityColor = new THREE.Vector3(1.0, 1.0, 1.0);
        this.applySplat(this.density, { x: s.x, y: s.y }, densityColor, s.radius * 1.5, s.aspect);
      }
      this.splats = [];
    }

    // 2. Advect velocity
    this.advectionMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.advectionMaterial.uniforms.uSource.value = this.velocity.read.texture;
    this.advectionMaterial.uniforms.uDissipation.value = 0.98;
    this.advectionMaterial.uniforms.uDt.value = dt;
    this.quad.material = this.advectionMaterial;
    this.renderer.setRenderTarget(this.velocity.write);
    this.renderer.render(this.scene, this.camera);
    this.velocity.swap();

    // 3. Advect density
    this.advectionMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.advectionMaterial.uniforms.uSource.value = this.density.read.texture;
    this.advectionMaterial.uniforms.uDissipation.value = 0.97;
    this.advectionMaterial.uniforms.uDt.value = dt;
    this.quad.material = this.advectionMaterial;
    this.renderer.setRenderTarget(this.density.write);
    this.renderer.render(this.scene, this.camera);
    this.density.swap();

    // 4. Compute divergence
    this.divergenceMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.quad.material = this.divergenceMaterial;
    this.renderer.setRenderTarget(this.divergence);
    this.renderer.render(this.scene, this.camera);

    // 5. Jacobi pressure iterations (5 iterations)
    this.pressureMaterial.uniforms.uDivergence.value = this.divergence.texture;
    this.pressureMaterial.uniforms.uDissipation.value = 0.95;
    this.quad.material = this.pressureMaterial;

    for (let i = 0; i < 5; i++) {
      this.pressureMaterial.uniforms.uPressure.value = this.pressure.read.texture;
      this.renderer.setRenderTarget(this.pressure.write);
      this.renderer.render(this.scene, this.camera);
      this.pressure.swap();
    }

    // 6. Gradient subtract from velocity
    this.gradSubtractMaterial.uniforms.uPressure.value = this.pressure.read.texture;
    this.gradSubtractMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.quad.material = this.gradSubtractMaterial;
    this.renderer.setRenderTarget(this.velocity.write);
    this.renderer.render(this.scene, this.camera);
    this.velocity.swap();

    // Reset render target
    this.renderer.setRenderTarget(null);
  }

  getVelocityTexture() {
    return this.velocity.read.texture;
  }

  getDensityTexture() {
    return this.density.read.texture;
  }

  dispose() {
    this.velocity.dispose();
    this.density.dispose();
    this.pressure.dispose();
    this.divergence.dispose();
    this.splatMaterial.dispose();
    this.advectionMaterial.dispose();
    this.divergenceMaterial.dispose();
    this.pressureMaterial.dispose();
    this.gradSubtractMaterial.dispose();
    this.quad.geometry.dispose();
  }
}
