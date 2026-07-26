/**
 * Covid19Model.jsx
 * SARS-CoV-2 — Detailed coronavirus sphere with distinctive red membrane & orange club-shaped spikes.
 * Features:
 *  - Red lipid membrane + orange S-protein spikes
 *  - Inner viral RNA single strand coil (visible in Cross-Section & Exploded views)
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Covid19Model({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  // Spike positions distributed around sphere
  const spikes = useMemo(() => {
    const arr = [];
    const count = 75;
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
      groupRef.current.rotation.y = t * 0.35;
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Outer Red Membrane */}
      <group position={[0, isExploded ? 0.75 : 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial
            color="#d32f2f"
            roughness={0.3}
            metalness={0.4}
            emissive="#7b0000"
            emissiveIntensity={0.5}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>

        {/* Orange Spike Proteins */}
        {!isCross && spikes.map((s, i) => (
          <group key={i} position={s.pos} rotation={s.rot}>
            {/* Spike stalk */}
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.02, 0.015, 0.24, 6]} />
              <meshStandardMaterial color="#ff9800" emissive="#ff6f00" emissiveIntensity={0.6} />
            </mesh>
            {/* Spike club head */}
            <mesh position={[0, 0.26, 0]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial color="#ffab00" emissive="#ffab00" emissiveIntensity={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Inner +ssRNA Spiral Coil */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.75 : 0, 0]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.4, 0.06, 12, 48]} />
            <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} wireframe={wireframe} />
          </mesh>
        </group>
      )}

      <pointLight color="#ff3d00" intensity={2} distance={5} />
    </group>
  );
}
