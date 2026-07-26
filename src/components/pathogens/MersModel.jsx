/**
 * MersModel.jsx
 * MERS-CoV — Coronavirus with dark charcoal gray membrane & golden tri-lobed spikes.
 * Features:
 *  - Dark charcoal membrane + golden spike clusters
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MersModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  const spikes = useMemo(() => {
    const arr = [];
    const count = 60;
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
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.3;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      <group position={[0, isExploded ? 0.7 : 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial
            color="#37474f"
            roughness={0.5}
            metalness={0.7}
            emissive="#1c2a38"
            emissiveIntensity={0.5}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>

        {!isCross && spikes.map((s, i) => (
          <group key={i} position={s.pos} rotation={s.rot}>
            <mesh position={[0, 0.14, 0]}>
              <boxGeometry args={[0.04, 0.22, 0.04]} />
              <meshStandardMaterial color="#ffb700" emissive="#ff8f00" emissiveIntensity={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.7 : 0, 0]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.38, 0.05, 12, 36]} />
            <meshStandardMaterial color="#ffb700" emissive="#ffb700" emissiveIntensity={1} wireframe={wireframe} />
          </mesh>
        </group>
      )}

      <pointLight color="#ffb700" intensity={1.7} distance={5} />
    </group>
  );
}
