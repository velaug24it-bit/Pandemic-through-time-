/**
 * VaccineExplainer3D.jsx
 * 3D Interactive Vaccine Mechanism Explainer:
 *  - Lipid Nanoparticle (LNP) mRNA delivery vehicle
 *  - Translation of spike protein antigen without live virus
 *  - B-Cell memory formation & lifelong antibody protection
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export default function VaccineExplainer3D() {
  const lnpRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lnpRef.current) {
      lnpRef.current.rotation.y = t * 0.4;
      lnpRef.current.position.y = Math.sin(t * 1.2) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Lipid Nanoparticle (LNP) Sphere */}
      <group ref={lnpRef} position={[-1.2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial
            color="#00ff9d"
            roughness={0.2}
            metalness={0.4}
            emissive="#00aa66"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Inner mRNA strand inside LNP */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.45, 0.05, 12, 32]} />
          <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.2} />
        </mesh>
        <Html center position={[0, 1.2, 0]} distanceFactor={7}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00ff9d',
            background: 'rgba(0,25,10,0.85)', padding: '0.2rem 0.5rem', borderRadius: 4,
            border: '1px solid #00ff9d', whiteSpace: 'nowrap',
          }}>
            💉 mRNA LIPID NANOPARTICLE (LNP)
          </div>
        </Html>
      </group>

      {/* Host Cell Ribosome translating spike protein */}
      <group position={[1.2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.8, 24, 24]} />
          <meshStandardMaterial color="#00c8ff" transparent opacity={0.4} />
        </mesh>
        {/* Isolated harmless Spike Antigens produced by cell */}
        {[
          [0, 0.6, 0], [0.5, -0.4, 0], [-0.5, -0.4, 0],
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <cylinderGeometry args={[0.03, 0.02, 0.3, 6]} />
            <meshStandardMaterial color="#ff9800" emissive="#ff6f00" emissiveIntensity={1} />
          </mesh>
        ))}
        <Html center position={[0, 1.1, 0]} distanceFactor={7}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00c8ff',
            background: 'rgba(0,10,25,0.85)', padding: '0.2rem 0.5rem', borderRadius: 4,
            border: '1px solid #00c8ff', whiteSpace: 'nowrap',
          }}>
            ⚙️ RIBOSOME TRANSLATING HARMLESS SPIKE ANTIGEN
          </div>
        </Html>
      </group>
    </group>
  );
}
