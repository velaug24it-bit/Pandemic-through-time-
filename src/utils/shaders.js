/**
 * shaders.js
 * GLSL shader strings for Earth atmosphere, holographic effects, and glow.
 */

/** Earth atmosphere rim glow shader */
export const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const atmosphereFragmentShader = `
  uniform vec3 uAtmosphereColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(-vPosition)));
    rim = pow(rim, 3.5);
    vec3 color = uAtmosphereColor * rim * uIntensity;
    gl_FragColor = vec4(color, rim * 0.8);
  }
`;

/** Holographic scan-line sphere shader */
export const holoVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv       = uv;
    vNormal   = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const holoFragmentShader = `
  uniform float uTime;
  uniform vec3  uColor;
  uniform float uOpacity;
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vPosition;

  void main() {
    // Scan line effect
    float scanLine = step(0.98, fract(vUv.y * 40.0 + uTime * 0.5));

    // Rim glow
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(-vPosition)));
    rim = pow(rim, 2.0);

    // Grid
    float gridX = step(0.97, fract(vUv.x * 20.0));
    float gridY = step(0.97, fract(vUv.y * 20.0));
    float grid  = max(gridX, gridY) * 0.3;

    float alpha = (rim * 0.6 + grid + scanLine * 0.4) * uOpacity;
    vec3 col    = uColor + vec3(scanLine * 0.3);

    gl_FragColor = vec4(col, alpha);
  }
`;

/** AI Orb pulse shader */
export const orbVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vPosition = position;

    // Displacement pulse
    float wave = sin(position.x * 8.0 + uTime * 2.0)
               * cos(position.y * 8.0 + uTime * 1.5)
               * 0.06;
    vec3 displaced = position + normal * wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

export const orbFragmentShader = `
  uniform float uTime;
  uniform vec3  uColor;
  varying vec3  vNormal;
  varying vec3  vPosition;

  void main() {
    float rim  = 1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
    rim        = pow(rim, 1.5);
    float pulse = 0.7 + 0.3 * sin(uTime * 3.0);
    vec3  col   = uColor * pulse;
    float alpha = rim * 0.85 + 0.15;
    gl_FragColor = vec4(col, alpha);
  }
`;

/** Star-field point shader */
export const starVertexShader = `
  attribute float aSize;
  attribute float aBrightness;
  varying float vBrightness;

  void main() {
    vBrightness = aBrightness;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position  = projectionMatrix * mvPosition;
  }
`;

export const starFragmentShader = `
  varying float vBrightness;

  void main() {
    float dist  = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, dist) * vBrightness;
    gl_FragColor = vec4(vec3(0.85, 0.93, 1.0), alpha);
  }
`;
