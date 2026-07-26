/**
 * JustinianPlagueModel.jsx
 * Plague of Justinian — Historical ancient variant of Yersinia pestis.
 * Features:
 *  - Ancient dark crimson & purple palette (#880e4f, #4a148c)
 *  - Floating ancient glyph ring orbital effect
 *  - Weathered bacterial capsule geometry
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function JustinianPlagueModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();
  const ringRef  = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Outer Bacterial Capsule */}
      <group position={[0, isExploded ? 0.6 : 0, 0]}>
        <mesh>
          <capsuleGeometry args={[0.48, 1.4, 16, 32]} />
          <meshStandardMaterial
            color="#880e4f"
            roughness={0.5}
            metalness={0.7}
            emissive="#4a148c"
            emissiveIntensity={0.6}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>
      </group>

      {/* Ancient Holographic Ring Overlay */}
      {!isCross && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 8, 48]} />
          <meshStandardMaterial color="#ba68c8" emissive="#ba68c8" emissiveIntensity={1.5} />
        </mesh>
      )}

      {/* Inner Cytoplasm (Visible in Cross-Section & Exploded) */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.6 : 0, 0]}>
          <mesh>
            <capsuleGeometry args={[0.32, 1.1, 12, 24]} />
            <meshStandardMaterial color="#ab47bc" emissive="#ab47bc" emissiveIntensity={1} />
          </mesh>
        </group>
      )}

      <pointLight color="#ba68c8" intensity={1.8} distance={5} />
    </group>
  );
}
