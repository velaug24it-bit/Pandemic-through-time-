/**
 * HolographicMap.jsx
 * Floating holographic globe using custom GLSL shader:
 *  - Blue grid + scan-line effect
 *  - Animated rim glow
 *  - Interactive rotate on drag (OrbitControls sub-group)
 *  - Country highlight dots
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { holoVertexShader, holoFragmentShader } from '../../utils/shaders';

/** Hotspot marker (pulsing dot on the globe) */
function HotSpot({ position, color = '#ff3860' }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + 0.4 * Math.abs(Math.sin(clock.getElapsedTime() * 2));
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.025, 6, 6]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

const HOTSPOTS = [
  { pos: [0.0,  0.95,  0.3],  col: '#ff3860' }, // North Europe
  { pos: [0.6,  0.2,   0.77], col: '#ff3860' }, // East Asia
  { pos: [-0.7, -0.3,  0.65], col: '#ffb700' }, // South America
  { pos: [0.1, -0.1,   0.99], col: '#00c8ff' }, // Africa
  { pos: [-0.5, 0.7,   0.51], col: '#00ff9d' }, // North America
];

export default function HolographicMap({ position = [-2.5, 0.2, -1.5] }) {
  const ref      = useRef();
  const radius   = 0.75;

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uColor:   { value: new THREE.Color(0.0, 0.6, 1.0) },
    uOpacity: { value: 0.75 },
  }), []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.25;
    }
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group position={position}>
      {/* Holographic sphere */}
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 48, 48]} />
        <shaderMaterial
          vertexShader={holoVertexShader}
          fragmentShader={holoFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={ref} scale={[1.002, 1.002, 1.002]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial
          color="#004488"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Hotspots */}
      {HOTSPOTS.map((h, i) => {
        const v = new THREE.Vector3(...h.pos).normalize().multiplyScalar(radius + 0.02);
        return <HotSpot key={i} position={[v.x, v.y, v.z]} color={h.col} />;
      })}

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.02, 0.006, 8, 64]} />
        <meshBasicMaterial color="#00aaff" transparent opacity={0.35} />
      </mesh>

      {/* Tropic rings */}
      {[-0.3, 0.3].map((y, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, y * radius, 0]}>
          <torusGeometry args={[Math.sqrt(1 - y*y) * radius * 1.01, 0.003, 6, 48]} />
          <meshBasicMaterial color="#006699" transparent opacity={0.2} />
        </mesh>
      ))}

      {/* Central glow */}
      <pointLight color="#00aaff" intensity={0.8} distance={3} />

      {/* Particle halo */}
      <Sparkles count={40} scale={[2.5, 2.5, 2.5]} size={0.35} speed={0.15} opacity={0.3} color="#00aaff" />
    </group>
  );
}
