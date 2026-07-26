/**
 * BlackDeathModel.jsx
 * Yersinia pestis — Rod-shaped bacterium (cylinder with rounded caps).
 * Features:
 *  - Capsule membrane material with surface pili proteins
 *  - Dark gold & brown palette
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BlackDeathModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  // Surface pili proteins scattered on the rod surface
  const pili = useMemo(() => {
    return Array.from({ length: 40 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const y     = (Math.random() - 0.5) * 1.8;
      const r     = 0.45;
      return {
        pos: [Math.cos(theta) * r, y, Math.sin(theta) * r],
        rot: [0, -theta, (Math.random() - 0.5) * 0.4],
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Outer Bacterial Capsule Rod */}
      <group position={[0, isExploded ? 0.6 : 0, 0]}>
        <mesh>
          <capsuleGeometry args={[0.45, 1.4, 16, 32]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.4}
            metalness={0.6}
            emissive="#553a00"
            emissiveIntensity={0.3}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.4 : 1}
          />
        </mesh>
      </group>

      {/* Inner Cytoplasm & DNA Nucleoid (Visible in Cross-Section & Exploded) */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.6 : 0, 0]}>
          <mesh>
            <capsuleGeometry args={[0.32, 1.1, 12, 24]} />
            <meshStandardMaterial
              color="#ff9900"
              emissive="#ff6600"
              emissiveIntensity={0.8}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      )}

      {/* Surface Pili Proteins */}
      {!isCross && pili.map((p, i) => (
        <mesh key={i} position={p.pos} rotation={p.rot}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
          <meshStandardMaterial color="#8b6b23" />
        </mesh>
      ))}

      <pointLight color="#d4af37" intensity={1.5} distance={5} />
    </group>
  );
}
