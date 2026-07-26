/**
 * SwineFluModel.jsx
 * Influenza A (H1N1/09 Swine Flu) — Spherical virus with vibrant pink & cyan palette.
 * Features:
 *  - Pink membrane + cyan surface spikes
 *  - Animated pulse effect on membrane
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SwineFluModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();
  const sphereRef = useRef();

  const spikes = useMemo(() => {
    const arr = [];
    const count = 70;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 0.72;
      arr.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        rot: [0, theta, phi],
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
    }
    if (sphereRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.03;
      sphereRef.current.scale.set(s, s, s);
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      <group position={[0, isExploded ? 0.7 : 0, 0]}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial
            color="#e91e63"
            roughness={0.25}
            metalness={0.5}
            emissive="#ad1457"
            emissiveIntensity={0.6}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>

        {!isCross && spikes.map((s, i) => (
          <mesh key={i} position={s.pos} rotation={s.rot}>
            <cylinderGeometry args={[0.03, 0.015, 0.22, 6]} />
            <meshStandardMaterial color="#00bcd4" emissive="#00e5ff" emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>

      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.7 : 0, 0]}>
          {[...Array(6)].map((_, i) => (
            <mesh key={i} position={[(i - 2.5) * 0.15, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.65, 8]} />
              <meshStandardMaterial color="#00bcd4" emissive="#00e5ff" emissiveIntensity={1} />
            </mesh>
          ))}
        </group>
      )}

      <pointLight color="#e91e63" intensity={1.8} distance={5} />
    </group>
  );
}
