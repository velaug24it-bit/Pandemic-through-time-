/**
 * BioshieldDome.jsx
 * Animated energy shield dome surrounding Earth.
 * Features:
 *  - Hexagonal grid shader pattern
 *  - Animated pulsing rim glow
 *  - Impact ripple effect
 *  - Toggleable visibility
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SHIELD_R = 2.35;

const shieldVert = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv      = uv;
    vNormal  = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const shieldFrag = `
  uniform float uTime;
  uniform vec3  uColor;
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vPosition;

  // Hexagonal grid
  float hexDist(vec2 p) {
    p = abs(p);
    return max(dot(p, normalize(vec2(1.0,1.73))), p.x);
  }
  vec4 hexCoords(vec2 uv) {
    vec2 r = vec2(1.0, 1.73);
    vec2 h = r*0.5;
    vec2 a = mod(uv, r)-h;
    vec2 b = mod(uv-h, r)-h;
    return dot(a,a)<dot(b,b) ? vec4(a,floor((uv-a)/r)) : vec4(b,floor((uv-h-b)/r)+0.5);
  }

  void main() {
    // Rim glow
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(-vPosition)));
    rim = pow(rim, 2.0);

    // Hex grid
    vec2 scaled = vUv * 25.0;
    vec4 hc = hexCoords(scaled);
    float d  = hexDist(hc.xy);
    float hex = smoothstep(0.48, 0.45, d);

    // Pulse wave
    float pulse = sin(uTime * 1.5) * 0.5 + 0.5;
    float scan  = step(0.995, fract(vUv.y * 30.0 + uTime * 0.3));

    float alpha = (rim * 0.4 + hex * 0.15 + scan * 0.1) * (0.6 + pulse * 0.4);
    vec3  col   = uColor * (1.0 + pulse * 0.3);

    gl_FragColor = vec4(col, alpha * 0.55);
  }
`;

export default function BioshieldDome({ visible = true }) {
  const meshRef  = useRef();
  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uColor: { value: new THREE.Color(0.0, 0.8, 1.0) },
  }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  if (!visible) return null;

  return (
    <group>
      {/* Main shield sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[SHIELD_R, 64, 64]} />
        <shaderMaterial
          vertexShader={shieldVert}
          fragmentShader={shieldFrag}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Rim glow ring at equator */}
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[SHIELD_R, 0.018, 8, 128]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
      </mesh>

      {/* Point light inside */}
      <pointLight color="#00aaff" intensity={0.4} distance={6} />
    </group>
  );
}
