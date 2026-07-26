/**
 * SpaceEnvironment.jsx
 * Full 3D space background: procedural star field (custom shader),
 * Milky Way cloud, Nebula sprites, Moon, and sun directional light.
 */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { starVertexShader, starFragmentShader } from '../../utils/shaders';

/** Custom procedural star-field using ShaderMaterial for twinkle */
function CustomStars({ count = 4000 }) {
  const meshRef = useRef();

  const { positions, sizes, brightness } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz  = new Float32Array(count);
    const br  = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute on a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 280 + Math.random() * 100;
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);
      sz[i]      = Math.random() * 2.5 + 0.5;
      br[i]      = Math.random() * 0.7 + 0.3;
    }
    return { positions: pos, sizes: sz, brightness: br };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',    new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize',       new THREE.BufferAttribute(sizes,     1));
    geo.setAttribute('aBrightness', new THREE.BufferAttribute(brightness,1));
    return geo;
  }, [positions, sizes, brightness]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   starVertexShader,
    fragmentShader: starFragmentShader,
    transparent:    true,
    depthWrite:     false,
    blending:       THREE.AdditiveBlending,
  }), []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Very slow drift
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.005;
    }
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

/** Moon sphere */
function Moon() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.03;
    ref.current.position.set(
      Math.cos(t) * 50,
      Math.sin(t * 0.3) * 8,
      Math.sin(t) * 50,
    );
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.2, 32, 32]} />
      <meshStandardMaterial
        color="#b0b8c8"
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  );
}

/** Orbiting satellites (small boxes with blinking lights) */
function Satellite({ radius, speed, offset }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.5) * 4,
      Math.sin(t) * radius,
    );
    ref.current.rotation.y = t;
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.15, 0.05, 0.3]} />
        <meshStandardMaterial color="#8899bb" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Solar panels */}
      <mesh position={[0.25, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.15]} />
        <meshStandardMaterial color="#1144aa" metalness={0.5} roughness={0.3} emissive="#001155" />
      </mesh>
      <mesh position={[-0.25, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.15]} />
        <meshStandardMaterial color="#1144aa" metalness={0.5} roughness={0.3} emissive="#001155" />
      </mesh>
    </group>
  );
}

export default function SpaceEnvironment({ visible = true }) {
  if (!visible) return null;

  return (
    <group>
      {/* Ambient starfield from drei */}
      <Stars radius={200} depth={80} count={3000} factor={5} saturation={0.2} fade speed={0.5} />

      {/* Custom shader star field */}
      <CustomStars count={3500} />

      {/* Milky Way particle cloud */}
      <Sparkles
        count={500}
        scale={[350, 80, 350]}
        size={1.2}
        speed={0.05}
        opacity={0.25}
        color="#aaccff"
      />

      {/* Nebula glow blob (additive sphere) */}
      <mesh position={[-60, 20, -120]}>
        <sphereGeometry args={[40, 8, 8]} />
        <meshBasicMaterial
          color="#1a0040"
          transparent opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[80, -10, -100]}>
        <sphereGeometry args={[30, 8, 8]} />
        <meshBasicMaterial
          color="#002040"
          transparent opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Moon */}
      <Moon />

      {/* Satellites */}
      <Satellite radius={12} speed={0.08} offset={0} />
      <Satellite radius={16} speed={0.06} offset={Math.PI * 0.66} />
      <Satellite radius={10} speed={0.12} offset={Math.PI * 1.3} />

      {/* Sun directional light */}
      <directionalLight
        color="#fff8e7"
        intensity={2.5}
        position={[60, 20, 40]}
        castShadow={false}
      />

      {/* Sun glow point */}
      <pointLight color="#ff9933" intensity={1.5} distance={200} position={[60, 20, 40]} />

      {/* Sun sphere (very far) */}
      <mesh position={[200, 60, -300]}>
        <sphereGeometry args={[10, 16, 16]} />
        <meshBasicMaterial color="#fff5cc" />
      </mesh>

      {/* Ambient fill */}
      <ambientLight color="#0a1a2a" intensity={0.4} />
    </group>
  );
}
