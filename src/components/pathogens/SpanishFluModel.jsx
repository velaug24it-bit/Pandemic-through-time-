/**
 * SpanishFluModel.jsx
 * Influenza A (H1N1) — Spherical virus with Hemagglutinin (HA) & Neuraminidase (NA) spikes.
 * Features:
 *  - Spherical viral envelope with blue/purple glow
 *  - Distinct HA (tri-lobed) and NA (mushroom) surface spikes
 *  - Normal / Cross-Section / Exploded View support
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpanishFluModel({ viewMode = 'normal', wireframe = false }) {
  const groupRef = useRef();

  // Generate HA & NA spikes distributed around sphere
  const spikes = useMemo(() => {
    const arr = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 0.75;
      const type  = Math.random() > 0.3 ? 'HA' : 'NA'; // HA is 70%, NA is 30%
      arr.push({
        type,
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
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  const isCross    = viewMode === 'crossSection';
  const isExploded = viewMode === 'exploded';

  return (
    <group ref={groupRef}>
      {/* Outer Envelope Membrane */}
      <group position={[0, isExploded ? 0.7 : 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial
            color="#4b0082"
            roughness={0.2}
            metalness={0.5}
            emissive="#8a2be2"
            emissiveIntensity={0.6}
            wireframe={wireframe}
            transparent={isCross}
            opacity={isCross ? 0.35 : 1}
          />
        </mesh>

        {/* Spikes */}
        {!isCross && spikes.map((s, i) => (
          <group key={i} position={s.pos} rotation={s.rot}>
            {s.type === 'HA' ? (
              // HA Spike (Tri-lobed rod)
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.04, 0.02, 0.3, 6]} />
                <meshStandardMaterial color="#8a2be2" emissive="#4169e1" emissiveIntensity={0.8} />
              </mesh>
            ) : (
              // NA Spike (Mushroom head)
              <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[0.07, 0.22, 0.07]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.9} />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* Inner RNP Ribonucleoprotein Segments (Visible in Cross-Section & Exploded) */}
      {(isCross || isExploded) && (
        <group position={[0, isExploded ? -0.7 : 0, 0]}>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[(i - 3.5) * 0.12, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
              <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
            </mesh>
          ))}
        </group>
      )}

      <pointLight color="#8a2be2" intensity={1.8} distance={5} />
    </group>
  );
}
