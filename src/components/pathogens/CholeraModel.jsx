/**
 * CholeraModel.jsx
 * Vibrio cholerae — Comma-shaped rod bacterium with long whip-like flagellum tail.
 * Features:
 *  - Curved rod geometry (torus segment)
 *  - Undulating flagellum tail animation
 *  - Cyan/blue-green palette
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CholeraModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef    = useRef();
  const flagellumRef = useRef();

  // Flagellum tail curve points
  const tailPoints = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const z = -0.7 - (i * 0.1);
      return new THREE.Vector3(0, 0, z);
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    }
    // Undulating flagellum tail movement
    if (flagellumRef.current) {
      const pos = flagellumRef.current.geometry.attributes.position.array;
      for (let i = 0; i < 16; i++) {
        const wave = Math.sin(t * 8 - i * 0.4) * (i * 0.025);
        pos[i * 3] = wave;
      }
      flagellumRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Comma-Shaped Rod Body */}
      <group position={[0, isExploded ? 0.6 : 0, 0]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.5, 0.22, 16, 24, Math.PI * 0.7]} />
          <meshStandardMaterial
            color="#00897b"
            roughness={0.3}
            metalness={0.6}
            emissive="#00e5ff"
            emissiveIntensity={0.5}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>
      </group>

      {/* Flagellum Whip Tail */}
      {!isCross && (
        <line ref={flagellumRef} position={[0, 0, 0]}>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(tailPoints)} />
          <lineBasicMaterial color="#00e5ff" linewidth={3} />
        </line>
      )}

      {/* Inner Cytoplasm (Visible in Cross-Section & Exploded) */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.6 : 0, 0]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.5, 0.12, 12, 18, Math.PI * 0.7]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} />
          </mesh>
        </group>
      )}

      <pointLight color="#00e5ff" intensity={1.8} distance={5} />
    </group>
  );
}
