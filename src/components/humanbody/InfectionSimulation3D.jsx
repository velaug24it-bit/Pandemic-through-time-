/**
 * InfectionSimulation3D.jsx
 * 3D Interactive 6-Stage Cellular Infection Simulation:
 *  - Stage 0: Receptor Attachment (Virus spike binds to host ACE2)
 *  - Stage 1: Membrane Fusion & Entry (Endocytosis)
 *  - Stage 2: Viral Genome Uncoating & Replication
 *  - Stage 3: Viral Assembly & Budding
 *  - Stage 4: Cell Damage & Pathogen Release
 *  - Stage 5: Antibody Neutralization & Vaccine Protection
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Covid19Model from '../pathogens/Covid19Model';

export default function InfectionSimulation3D({ currentStep = 0 }) {
  const virusRef = useRef();
  const rnaRef   = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (virusRef.current) {
      // Step-specific camera & position offsets
      if (currentStep === 0) {
        // Attachment: virus approaches cell receptor
        virusRef.current.position.set(0, 1.35 + Math.sin(t * 2) * 0.05, 0);
      } else if (currentStep === 1) {
        // Entry: virus touches membrane
        virusRef.current.position.set(0, 0.95, 0);
      } else if (currentStep === 2) {
        // Uncoating: virus enters cytoplasm
        virusRef.current.position.set(0, 0.3, 0);
      } else if (currentStep === 3) {
        // Assembly: virus inside cell
        virusRef.current.position.set(0.4, -0.2, 0);
      } else if (currentStep === 4) {
        // Release: multiple viruses bursting out
        virusRef.current.position.set(1.5, 1.2, 0);
      } else if (currentStep === 5) {
        // Vaccine Defense: virus blocked outside cell
        virusRef.current.position.set(0, 1.8, 0);
      }
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Host Cell Surface Segment */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.8, 32]} />
        <meshStandardMaterial
          color="#00e5ff"
          transparent
          opacity={0.4}
          roughness={0.2}
          emissive="#004488"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Surface ACE2 Receptor */}
      <group position={[0, 0.0, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.05, 0.4, 12]} />
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
        </mesh>
        <Html center position={[0.6, 0.2, 0]} distanceFactor={6}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#00ff9d',
            background: 'rgba(0,10,25,0.85)', padding: '0.15rem 0.4rem', borderRadius: 4,
            border: '1px solid rgba(0,255,157,0.3)', whiteSpace: 'nowrap',
          }}>
            ACE2 RECEPTOR
          </div>
        </Html>
      </group>

      {/* Pathogen Model (SARS-CoV-2) */}
      <group ref={virusRef} scale={0.7}>
        <Covid19Model viewMode={currentStep === 2 ? 'crossSection' : 'normal'} />
      </group>

      {/* Stage 5: Y-Shaped 3D Neutralizing Antibodies (Vaccine Defense) */}
      {currentStep === 5 && (
        <group position={[0, 1.8, 0]}>
          {[
            [0.6, 0.3, 0], [-0.6, 0.3, 0], [0, 0.7, 0.4],
          ].map((pos, i) => (
            <group key={i} position={pos}>
              {/* Y-shaped antibody geometry */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1} />
              </mesh>
              <mesh position={[0.08, 0.12, 0]} rotation={[0, 0, -0.6]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1} />
              </mesh>
              <mesh position={[-0.08, 0.12, 0]} rotation={[0, 0, 0.6]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1} />
              </mesh>
            </group>
          ))}
          <Html center position={[0, 0.9, 0]} distanceFactor={6}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00c8ff',
              background: 'rgba(0,10,25,0.85)', padding: '0.2rem 0.5rem', borderRadius: 4,
              border: '1px solid #00c8ff', whiteSpace: 'nowrap',
            }}>
              🛡️ Y-ANTIBODIES NEUTRALIZING SPIKES
            </div>
          </Html>
        </group>
      )}

      {/* Replicated RNA Strands inside cell during Step 2 & 3 */}
      {(currentStep === 2 || currentStep === 3) && (
        <group ref={rnaRef} position={[0, -0.2, 0]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.4, 0.04, 12, 32]} />
            <meshStandardMaterial color="#ff9800" emissive="#ff6f00" emissiveIntensity={1} />
          </mesh>
          <Html center position={[0, -0.6, 0]} distanceFactor={6}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#ff9800',
              background: 'rgba(25,10,0,0.85)', padding: '0.15rem 0.4rem', borderRadius: 4,
              border: '1px solid #ff9800', whiteSpace: 'nowrap',
            }}>
              VIRAL +ssRNA REPLICATION
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
