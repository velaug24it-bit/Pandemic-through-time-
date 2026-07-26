/**
 * SmallpoxModel.jsx
 * Variola virus — Large brick-shaped virus with corrugated surface ridges.
 * Features:
 *  - Rounded box core with surface ridge bumps
 *  - Bronze & gold palette
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SmallpoxModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  // Ridge bumps on brick surface
  const ridges = useMemo(() => {
    const arr = [];
    for (let x = -0.5; x <= 0.5; x += 0.25) {
      for (let y = -0.3; y <= 0.3; y += 0.3) {
        arr.push([x, y, 0.41]);
        arr.push([x, y, -0.41]);
      }
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.25;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Outer Brick Envelope */}
      <group position={[0, isExploded ? 0.7 : 0, 0]}>
        <mesh>
          <boxGeometry args={[1.3, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#b8860b"
            roughness={0.3}
            metalness={0.7}
            emissive="#443000"
            emissiveIntensity={0.4}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>
        {/* Surface Ridge Bumps */}
        {!isCross && ridges.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Inner Dumbbell-shaped Core (Linear dsDNA) */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.7 : 0, 0]}>
          <mesh>
            <boxGeometry args={[0.9, 0.5, 0.5]} />
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ff9900"
              emissiveIntensity={1.0}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      )}

      <pointLight color="#ffd700" intensity={1.6} distance={5} />
    </group>
  );
}
