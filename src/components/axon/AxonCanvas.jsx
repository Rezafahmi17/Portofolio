import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import AxonFluidSim from './AxonFluidSim';
import { passThroughVS, simFS, particleVS, particleFS } from './axonShaders';

/**
 * Generate 64x64 soft grey spherical matcap texture as required by AXON brief
 */
function createMatcapTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Soft spherical shading
  const grad = ctx.createRadialGradient(26, 22, 2, 32, 32, 31);
  grad.addColorStop(0.0, '#ffffff');
  grad.addColorStop(0.3, '#d8d8de');
  grad.addColorStop(0.65, '#6a6a72');
  grad.addColorStop(0.9, '#28282c');
  grad.addColorStop(1.0, '#101014');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(32, 32, 31, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

export default function AxonCanvas({ tiltX = 0, tiltY = 0 }) {
  const canvasRef = useRef(null);
  const tiltRef = useRef({ x: tiltX, y: tiltY });

  useEffect(() => {
    tiltRef.current = { x: tiltX, y: tiltY };
  }, [tiltX, tiltY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width <= 768;

    // 1. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 1.0);

    // 2. Camera Setup (FOV 30, base position (-1.17, 0, 6) looking at origin)
    const baseCamPos = new THREE.Vector3(-1.17, 0, 6);
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    camera.position.copy(baseCamPos);
    camera.lookAt(0, 0, 0);

    // 3. Main Scene & Particle Group
    const scene = new THREE.Scene();
    const particleGroup = new THREE.Group();
    particleGroup.position.set(0.343, 0.16, -1);
    particleGroup.rotation.set(
      (-28.4 * Math.PI) / 180,
      (390 * Math.PI) / 180,
      (4.92 * Math.PI) / 180
    );
    particleGroup.scale.set(5, 5, 6);
    scene.add(particleGroup);

    // 4. Fluid Simulation
    const fluidSim = new AxonFluidSim(renderer, 256, 256);

    // 5. GPGPU Simulation Texture Targets
    const simRes = isMobile ? 128 : 512;
    const totalPoints = simRes * simRes;

    const isWebGL2 = renderer.capabilities.isWebGL2;
    const floatType = isWebGL2 ? THREE.HalfFloatType : THREE.FloatType;

    const rtOptions = {
      type: floatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };

    let rtSimRead = new THREE.WebGLRenderTarget(simRes, simRes, rtOptions);
    let rtSimWrite = new THREE.WebGLRenderTarget(simRes, simRes, rtOptions);

    // Generate initial random positions uniform in [-1, 1]^3
    const initialPosArray = new Float32Array(totalPoints * 4);
    for (let i = 0; i < totalPoints; i++) {
      const idx = i * 4;
      initialPosArray[idx + 0] = (Math.random() * 2 - 1) * 0.8;
      initialPosArray[idx + 1] = (Math.random() * 2 - 1) * 0.8;
      initialPosArray[idx + 2] = (Math.random() * 2 - 1) * 0.8;
      initialPosArray[idx + 3] = 1.0;
    }

    const initialPosTex = new THREE.DataTexture(
      initialPosArray,
      simRes,
      simRes,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    initialPosTex.needsUpdate = true;

    // GPGPU Sim Quad & Scene
    const simScene = new THREE.Scene();
    const simCamera = new THREE.Camera();
    const simQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));

    const simMaterial = new THREE.ShaderMaterial({
      vertexShader: passThroughVS,
      fragmentShader: simFS,
      uniforms: {
        uCurrentPos: { value: initialPosTex },
        uOriginPos: { value: initialPosTex },
        uTime: { value: 0 },
        uHZ: { value: 1.0 },
        uFluidVelocity: { value: null },
        uFluidDensity: { value: null },
        uProj: { value: new THREE.Matrix4() },
        uModel: { value: new THREE.Matrix4() },
        uCamWorldRot: { value: new THREE.Matrix3() },
      },
      depthTest: false,
      depthWrite: false,
    });
    simQuad.material = simMaterial;
    simScene.add(simQuad);

    // Seed initial positions into rtSimRead
    renderer.setRenderTarget(rtSimRead);
    renderer.render(simScene, simCamera);
    renderer.setRenderTarget(null);

    // 6. Point Cloud Geometry & Material
    const pointGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(totalPoints * 3);
    const randoms = new Float32Array(totalPoints * 4);

    for (let i = 0; i < totalPoints; i++) {
      const x = (i % simRes) / simRes;
      const y = Math.floor(i / simRes) / simRes;
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;

      randoms[i * 4 + 0] = Math.random();
      randoms[i * 4 + 1] = Math.random();
      randoms[i * 4 + 2] = Math.random();
      randoms[i * 4 + 3] = Math.random();
    }

    pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointGeo.setAttribute('random', new THREE.BufferAttribute(randoms, 4));
    pointGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100);

    const matcapTex = createMatcapTexture();

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVS,
      fragmentShader: particleFS,
      uniforms: {
        uPositionTex: { value: rtSimRead.texture },
        uMatcap: { value: matcapTex },
        uTime: { value: 0 },
        uDPR: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(pointGeo, particleMaterial);
    pointCloud.frustumCulled = false;
    particleGroup.add(pointCloud);

    // 7. Cursor & Mouse Tracking
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      prevX: width * 0.5,
      prevY: height * 0.5,
      lastMoveTime: performance.now(),
    };

    const handlePointerMove = (clientX, clientY) => {
      const now = performance.now();
      const dtMs = now - mouse.lastMoveTime;
      mouse.lastMoveTime = now;

      const dx = clientX - mouse.prevX;
      const dy = clientY - mouse.prevY;
      mouse.prevX = clientX;
      mouse.prevY = clientY;
      mouse.x = clientX;
      mouse.y = clientY;

      // Only splat if within interactive interval
      if (dtMs < 50 || Math.hypot(dx, dy) > 0.01) {
        const uvX = clientX / width;
        const uvY = 1.0 - clientY / height;
        const aspect = width / height;
        fluidSim.addSplat(uvX, uvY, dx, dy, aspect, isMobile);
      }
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.prevX = e.touches[0].clientX;
        mouse.prevY = e.touches[0].clientY;
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    // 8. Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      particleMaterial.uniforms.uDPR.value = Math.min(window.devicePixelRatio || 1, 2);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let lastTime = performance.now();
    let animId;

    // Helper matrices
    const invCamWorld = new THREE.Matrix4();
    const projCamInv = new THREE.Matrix4();
    const camWorldRot = new THREE.Matrix3();

    const animate = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      const hz = dt * 60.0;
      const timeSec = currentTime * 0.001;

      // Step fluid simulation
      fluidSim.step(dt);

      // Gaze camera: lerp towards target with mouse & gyroscope tilt
      const mouseNormX = (mouse.x / width) * 2 - 1;
      const mouseNormY = (mouse.y / height) * 2 - 1;

      // Incorporate gyro tilt seamlessly
      const gyroX = tiltRef.current.x || 0;
      const gyroY = tiltRef.current.y || 0;

      const targetCamX = baseCamPos.x + (mouseNormX * -1.0) + (gyroX * -0.6);
      const targetCamY = baseCamPos.y + (mouseNormY * 2.0) + (gyroY * 1.0);
      const targetCamZ = baseCamPos.z;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.lookAt(0, 0, 0);

      // Compute simulation matrices
      camera.updateMatrixWorld();
      particleGroup.updateMatrixWorld();

      invCamWorld.copy(camera.matrixWorldInverse);
      projCamInv.multiplyMatrices(camera.projectionMatrix, invCamWorld);
      camWorldRot.setFromMatrix4(camera.matrixWorld);

      // Update simulation uniforms
      simMaterial.uniforms.uCurrentPos.value = rtSimRead.texture;
      simMaterial.uniforms.uTime.value = timeSec;
      simMaterial.uniforms.uHZ.value = hz;
      simMaterial.uniforms.uFluidVelocity.value = fluidSim.getVelocityTexture();
      simMaterial.uniforms.uFluidDensity.value = fluidSim.getDensityTexture();
      simMaterial.uniforms.uProj.value.copy(projCamInv);
      simMaterial.uniforms.uModel.value.copy(particleGroup.matrixWorld);
      simMaterial.uniforms.uCamWorldRot.value.copy(camWorldRot);

      // Step simulation ping-pong
      renderer.setRenderTarget(rtSimWrite);
      renderer.render(simScene, simCamera);

      // Swap read/write
      const tempRT = rtSimRead;
      rtSimRead = rtSimWrite;
      rtSimWrite = tempRT;

      // Render points
      particleMaterial.uniforms.uPositionTex.value = rtSimRead.texture;
      particleMaterial.uniforms.uTime.value = timeSec;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('resize', handleResize);

      fluidSim.dispose();
      rtSimRead.dispose();
      rtSimWrite.dispose();
      initialPosTex.dispose();
      matcapTex.dispose();
      pointGeo.dispose();
      simQuad.geometry.dispose();
      simMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      id="bg"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
