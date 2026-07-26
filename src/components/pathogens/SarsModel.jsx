/**
 * SarsModel.jsx
 * SARS-CoV-1 — Coronavirus with dark orange membrane & shorter spike density.
 * Features:
 *  - Dark orange membrane + shorter spikes
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SarsModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  const spikes = useMemo(() => {
    const arr = [];
    const count = 50; // Shorter spike density
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
            color="#ff6f00"
            roughness={0.4}
            metalness={0.5}
            emissive="#bf360c"
            emissiveIntensity={0.5}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>

        {!isCross && spikes.map((s, i) => (
          <mesh key={i} position={s.pos} rotation={s.rot}>
            <cylinderGeometry args={[0.025, 0.015, 0.18, 6]} />
            <meshStandardMaterial color="#ffab00" emissive="#ff6f00" emissiveIntensity={0.7} />
          </mesh>
        ))}
      </group>

      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.7 : 0, 0]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.38, 0.05, 12, 36]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} wireframe={wireframe} />
          </mesh>
        </group>
      )}

      <pointLight color="#ff6f00" intensity={1.6} distance={5} />
    </group>
  );
}
