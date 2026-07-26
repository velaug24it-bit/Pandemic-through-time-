/**
 * ImmuneSystem3D.jsx
 * 3D Immune System Defense Environment:
 *  - Large ameboid Macrophage engulfing viral particles (Phagocytosis)
 *  - Helper T-Cells (CD4+) & Cytotoxic T-Cells (CD8+)
 *  - Plasma B-Cells releasing Y-shaped 3D Antibodies
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Covid19Model from '../pathogens/Covid19Model';

export default function ImmuneSystem3D() {
  const macrophageRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (macrophageRef.current) {
      macrophageRef.current.rotation.y = t * 0.2;
      const s = 1 + Math.sin(t * 2) * 0.04;
      macrophageRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Macrophage Ameboid Cell */}
      <group ref={macrophageRef} position={[-1.2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.3, 32, 32]} />
          <meshStandardMaterial
            color="#00c8ff"
            roughness={0.4}
            metalness={0.3}
            emissive="#0044aa"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
        <Html center position={[0, 1.6, 0]} distanceFactor={7}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00c8ff',
            background: 'rgba(0,10,25,0.85)', padding: '0.2rem 0.5rem', borderRadius: 4,
            border: '1px solid #00c8ff', whiteSpace: 'nowrap',
          }}>
            🛡️ MACROPHAGE (PHAGOCYTOSIS)
          </div>
        </Html>
      </group>

      {/* Engulfed Pathogen inside Macrophage */}
      <group position={[-1.0, 0, 0]} scale={0.4}>
        <Covid19Model />
      </group>

      {/* Plasma B-Cell Releasing Y-Antibodies */}
      <group position={[1.5, 0.5, 0]}>
        <mesh>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial color="#7b2ff7" emissive="#5100c8" emissiveIntensity={0.8} />
        </mesh>

        {/* Floating Y-Antibodies emitted from B-Cell */}
        {[
          [-0.8, -0.4, 0], [-0.5, 0.4, 0.3], [-1.0, 0.2, -0.2],
        ].map((pos, i) => (
          <group key={i} position={pos}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
              <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
            </mesh>
            <mesh position={[0.06, 0.1, 0]} rotation={[0, 0, -0.6]}>
              <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
              <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
            </mesh>
            <mesh position={[-0.06, 0.1, 0]} rotation={[0, 0, 0.6]}>
              <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
              <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
            </mesh>
          </group>
        ))}

        <Html center position={[0, 1.0, 0]} distanceFactor={7}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#7b2ff7',
            background: 'rgba(10,0,25,0.85)', padding: '0.2rem 0.5rem', borderRadius: 4,
            border: '1px solid #7b2ff7', whiteSpace: 'nowrap',
          }}>
            ⚔️ B-CELL (ANTIBODY FACTORY)
          </div>
        </Html>
      </group>
    </group>
  );
}
