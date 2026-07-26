/**
 * ZikaModel.jsx
 * Zika virus — Icosahedral virus (geometric 20-faced faceted shell).
 * Features:
 *  - Faceted icosahedron geometry with yellow/orange gradient
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ZikaModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.35;
      groupRef.current.rotation.x = t * 0.2;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Outer Icosahedral Shell */}
      <group position={[0, isExploded ? 0.7 : 0, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial
            color="#fbc02d"
            roughness={0.25}
            metalness={0.6}
            emissive="#ff8f00"
            emissiveIntensity={0.6}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
            flatShading
          />
        </mesh>
      </group>

      {/* Inner Spherical Core */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.7 : 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial
              color="#ff6f00"
              emissive="#ff6f00"
              emissiveIntensity={1}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      )}

      <pointLight color="#fbc02d" intensity={1.7} distance={5} />
    </group>
  );
}
