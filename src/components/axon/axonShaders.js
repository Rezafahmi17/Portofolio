/**
 * Shaders for AXON GPU Particle Cloud & 2D Fluid Simulation
 */

export const passThroughVS = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * GPGPU Particle Simulation Shader
 * Simulates particle positions with curl noise, SDF surface pull, spring back, and fluid flow advection.
 */
export const simFS = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uCurrentPos;
  uniform sampler2D uOriginPos;
  uniform float uTime;
  uniform float uHZ; // dt * 60.0
  uniform sampler2D uFluidVelocity;
  uniform sampler2D uFluidDensity;
  uniform mat4 uProj;        // camera projection * inverse camera world
  uniform mat4 uModel;       // group world matrix
  uniform mat3 uCamWorldRot; // camera world rotation matrix

  // Simplex-style pseudo noise
  vec3 snoise3(vec3 x) {
    float s  = sin(x.x) * cos(x.y) * sin(x.z);
    float s1 = sin(x.y * 1.5 + 1.2) * cos(x.z * 1.2 + 0.5) * sin(x.x * 1.3);
    float s2 = sin(x.z * 1.1 + 2.1) * cos(x.x * 1.4 + 1.1) * sin(x.y * 1.2);
    return vec3(s, s1, s2);
  }

  // Analytic curl noise (Bridson-style)
  vec3 curlNoise(vec3 p) {
    float e = 0.01;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);

    vec3 px0 = snoise3(p - dx);
    vec3 px1 = snoise3(p + dx);
    vec3 py0 = snoise3(p - dy);
    vec3 py1 = snoise3(p + dy);
    vec3 pz0 = snoise3(p - dz);
    vec3 pz1 = snoise3(p + dz);

    float x = (py1.z - py0.z) - (pz1.y - pz0.y);
    float y = (pz1.x - pz0.x) - (px1.z - px0.z);
    float z = (px1.y - px0.y) - (py1.x - py0.x);

    return normalize(vec3(x, y, z) / (2.0 * e));
  }

  // Smooth, organic sculpted form defined as signed distance function
  float sdfShape(vec3 p) {
    // 1. Mirror depth axis
    p.z = sqrt(p.z * p.z + 0.0215) - sqrt(0.012);

    // 2. Rotate by unit quaternion (0.5, 0.5, 0.5, 0.5)
    vec4 q = vec4(0.5, 0.5, 0.5, 0.5);
    p = p + 2.0 * cross(q.xyz, cross(q.xyz, p) + q.w * p);

    // 3. Outside radius 0.8 return length(p) - 0.7
    if (length(p) > 0.8) {
      return length(p) - 0.7;
    }

    // Sculpted hollow ring / bent torus with lobes and opening
    float rMajor = 0.38;
    float rMinor = 0.13 + 0.035 * sin(p.x * 6.0 + p.y * 4.0);
    float angle = atan(p.z, p.x);
    float opening = smoothstep(-1.2, 1.2, sin(angle + 1.0));
    rMinor *= mix(0.75, 1.25, opening);

    float dRing = length(vec2(length(p.xz) - rMajor, p.y)) - rMinor;
    dRing += 0.02 * sin(p.x * 10.0 + p.y * 8.0 + p.z * 6.0);
    return dRing;
  }

  // Central differences for SDF normal
  vec3 sdfNormal(vec3 p) {
    float e = 0.001;
    return normalize(vec3(
      sdfShape(p + vec3(e, 0.0, 0.0)) - sdfShape(p - vec3(e, 0.0, 0.0)),
      sdfShape(p + vec3(0.0, e, 0.0)) - sdfShape(p - vec3(0.0, e, 0.0)),
      sdfShape(p + vec3(0.0, 0.0, e)) - sdfShape(p - vec3(0.0, 0.0, e))
    ));
  }

  void main() {
    vec3 pos = texture2D(uCurrentPos, vUv).xyz;
    vec3 origin = texture2D(uOriginPos, vUv).xyz;

    if (length(pos) > 0.7) {
      pos /= 2.0;
    }

    // 1. Curl noise drift
    pos += curlNoise(pos * 0.1 + uTime * 0.05) * 1.0 * 0.0002 * uHZ;

    // 2. SDF surface guidance
    vec3 gradient = sdfNormal(pos);
    float sdf = sdfShape(pos);

    // Swirl along surface
    pos += cross(normalize(pos + 1e-5), normalize(gradient + 1e-5)) * 0.0005;

    // Pull onto surface
    pos += -gradient * sdf * 0.5;

    // 3. Spring back to origin
    pos += (origin - pos) * 0.0002 * uHZ;

    // 4. Cursor / Fluid interaction
    vec4 clip = uProj * (uModel * vec4(pos, 1.0));
    vec2 screenUV = (clip.xy / clip.w) * 0.5 + 0.5;

    if (screenUV.x >= 0.0 && screenUV.x <= 1.0 && screenUV.y >= 0.0 && screenUV.y <= 1.0) {
      vec2 vel = texture2D(uFluidVelocity, screenUV).xy;
      float density = texture2D(uFluidDensity, screenUV).r;
      vec3 flow = uCamWorldRot * vec3(vel, 0.0);
      pos += flow * 0.0001 * uHZ * 0.4 * density;
    }

    gl_FragColor = vec4(pos, 1.0);
  }
`;

/**
 * Particle Point Rendering Shaders
 */
export const particleVS = /* glsl */ `
  attribute vec4 random;
  uniform sampler2D uPositionTex;
  uniform float uTime;
  uniform float uDPR;

  varying vec4 vRandom;
  varying float vScale;

  void main() {
    vRandom = random;
    vec3 pos = texture2D(uPositionTex, position.xy).xyz;

    // Subtle expansion variation
    pos *= mix(1.0, 1.5, pow(random.y, 150.0));

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;
    float distToCamera = length(mvPosition.xyz);

    float scale = smoothstep(3.0, 15.0, distToCamera) * mix(0.5, 1.0, random.z);
    vScale = scale;

    gl_PointSize = 0.04 * uDPR * 2.0 * scale * (1000.0 / max(distToCamera, 0.001));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const particleFS = /* glsl */ `
  precision highp float;
  uniform sampler2D uMatcap;
  uniform float uTime;

  varying vec4 vRandom;
  varying float vScale;

  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend + base * base * (1.0 - 2.0 * blend),
      sqrt(max(base, vec3(0.0001))) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend),
      step(0.5, blend)
    );
  }

  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }

  void main() {
    vec2 pc = gl_PointCoord - 0.5;
    if (length(pc) > 0.5) discard;
    if (vScale < 0.1) discard;

    // Base color: mix(0.0, 0.2, random.x) grey, mixed to lavender (0.6, 0.45, 1.0) by pow(random.z, 100)
    vec3 grey = mix(vec3(0.02), vec3(0.25), vRandom.x);
    vec3 lavender = vec3(0.66, 0.53, 1.0);
    vec3 color = mix(grey, lavender, pow(vRandom.z, 100.0));

    // Sparkle
    float sparkle = 0.5 + (0.4 + sin(uTime * 4.0 + vRandom.y * 20.0)) * pow(vRandom.z, 10.0) * 2.5;
    color *= sparkle;

    // Sample matcap with rotated sprite UV
    float angle = sin(uTime + vRandom.z * 20.0) * 0.5 + 1.0;
    float s = sin(angle);
    float c = cos(angle);
    mat2 rot = mat2(c, -s, s, c);
    vec2 matcapUv = rot * pc + 0.5;
    vec3 matcapSample = texture2D(uMatcap, matcapUv).rgb;

    // Blend modes
    vec3 b1 = blendSoftLight(color, matcapSample);
    color = mix(color, b1, 0.8);
    vec3 b2 = blendOverlay(color, matcapSample);
    color = mix(color, b2, 0.2);

    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * 2D GPU Fluid Simulation Shaders
 */
export const fluidSplatFS = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uTarget;
  uniform float uAspect;
  uniform vec2 uPoint;
  uniform vec3 uColor;
  uniform float uRadius;

  void main() {
    vec2 p = vUv - uPoint;
    p.x *= uAspect;
    vec3 splat = exp(-dot(p, p) / max(uRadius, 0.00001)) * uColor;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

export const fluidAdvectionFS = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 uTexelSize;
  uniform float uDt;
  uniform float uDissipation;

  void main() {
    vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
    gl_FragColor = uDissipation * texture2D(uSource, coord);
  }
`;

export const fluidDivergenceFS = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;

  void main() {
    float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
    float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
    float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
    float div = 0.5 * ((R - L) + (T - B));
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

export const fluidPressureFS = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 uTexelSize;
  uniform float uDissipation;

  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).r;
    float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).r;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).r;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).r;
    float div = texture2D(uDivergence, vUv).r;

    float p = (L + R + B + T - div) * 0.25 * uDissipation;
    gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
  }
`;

export const fluidGradientSubtractFS = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;

  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).r;
    float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).r;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).r;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).r;

    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity -= vec2(R - L, T - B) * 0.5;
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;
