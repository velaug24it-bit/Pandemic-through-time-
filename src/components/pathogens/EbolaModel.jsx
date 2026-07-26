/**
 * EbolaModel.jsx
 * Ebola virus — Long filamentous worm / twisted rope-like filovirus structure.
 * Features:
 *  - Flexible organic wriggling motion
 *  - Dark green & lime glow palette
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EbolaModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  // Curve for filamentous worm body
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.2, -0.6, 0),
      new THREE.Vector3(-0.6, 0.6, 0.4),
      new THREE.Vector3(0, -0.4, -0.3),
      new THREE.Vector3(0.6, 0.7, 0.2),
      new THREE.Vector3(1.2, -0.5, 0),
    ]);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.1;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Outer Filamentous Tube */}
      <group position={[0, isExploded ? 0.6 : 0, 0]}>
        <mesh>
          <tubeGeometry args={[curve, 64, 0.16, 12, false]} />
          <meshStandardMaterial
            color="#1b5e20"
            roughness={0.2}
            metalness={0.6}
            emissive="#76ff03"
            emissiveIntensity={0.6}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>
      </group>

      {/* Inner Core Strand (Visible in Cross-Section & Exploded) */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.6 : 0, 0]}>
          <mesh>
            <tubeGeometry args={[curve, 48, 0.08, 8, false]} />
            <meshStandardMaterial
              color="#ccff00"
              emissive="#ccff00"
              emissiveIntensity={1}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      )}

      <pointLight color="#76ff03" intensity={2} distance={6} />
    </group>
  );
}
