/**
 * TuberculosisModel.jsx
 * Mycobacterium tuberculosis — Slender rod bacterium with waxy clumped cell wall nodules.
 * Features:
 *  - Long rod geometry + waxy surface nodules
 *  - Yellow-orange palette (#fff176, #f57f17)
 *  - Cluster arrangement
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TuberculosisModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  // Waxy cell wall nodules on rod
  const nodules = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      y: (Math.random() - 0.5) * 1.8,
      theta: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.08 + 0.04,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.25;
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.1;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Primary Rod */}
      <group position={[0, isExploded ? 0.6 : 0, 0]}>
        <mesh>
          <capsuleGeometry args={[0.3, 1.8, 16, 32]} />
          <meshStandardMaterial
            color="#fff176"
            roughness={0.6}
            metalness={0.3}
            emissive="#f57f17"
            emissiveIntensity={0.5}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>
        {/* Waxy Nodules */}
        {!isCross && nodules.map((n, i) => (
          <mesh key={i} position={[Math.cos(n.theta) * 0.3, n.y, Math.sin(n.theta) * 0.3]} scale={n.scale}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#f57f17" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Cluster Secondary Rod */}
      {!isCross && !isExploded && (
        <group position={[0.45, 0.2, 0.2]} rotation={[0, 0, 0.4]}>
          <mesh>
            <capsuleGeometry args={[0.22, 1.4, 12, 24]} />
            <meshStandardMaterial color="#f57f17" emissive="#ff8f00" emissiveIntensity={0.4} />
          </mesh>
        </group>
      )}

      {/* Inner Nucleoid Core */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.6 : 0, 0]}>
          <mesh>
            <capsuleGeometry args={[0.18, 1.4, 12, 24]} />
            <meshStandardMaterial color="#ff8f00" emissive="#ff8f00" emissiveIntensity={1} />
          </mesh>
        </group>
      )}

      <pointLight color="#fff176" intensity={1.7} distance={5} />
    </group>
  );
}
