/**
 * CellularWorld.jsx
 * 3D Human Host Cell World:
 *  - Translucent cell membrane sphere with lipid bilayer texture
 *  - Glowing inner nucleus & DNA chromatin
 *  - Mitochondria energy organelles
 *  - Surface ACE2 receptors for viral attachment
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function CellularWorld() {
  const cellGroupRef = useRef();
  const nucleusRef   = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cellGroupRef.current) {
      cellGroupRef.current.rotation.y = t * 0.15;
    }
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group ref={cellGroupRef} position={[0, 0, 0]}>
      {/* Outer Translucent Cell Membrane */}
      <mesh>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshStandardMaterial
          color="#00e5ff"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.35}
          emissive="#004488"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Outer Membrane Lipid Bilayer Grid Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.22, 0.03, 12, 64]} />
        <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.2} />
      </mesh>

      {/* Surface ACE2 Receptors */}
      {[
        [1.8, 1.0, 0.8], [-1.9, 0.8, -0.6], [0.5, 2.0, 0.5],
        [-0.8, -1.9, 0.7], [1.5, -1.4, -0.5], [0, 0, 2.2],
      ].map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.04, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}

      {/* Inner Glowing Cell Nucleus */}
      <group ref={nucleusRef} position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial
            color="#7b2ff7"
            roughness={0.3}
            metalness={0.5}
            emissive="#5100c8"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Chromatin strands */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[0.5, 0.06, 12, 32]} />
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Mitochondria Organelles */}
      {[
        [-1.2, 0.6, 0.8], [1.1, -0.8, -0.7], [-0.8, -1.1, -0.6],
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, i, i * 0.5]}>
          <capsuleGeometry args={[0.15, 0.5, 12, 12]} />
          <meshStandardMaterial color="#ff9100" emissive="#ff6f00" emissiveIntensity={0.8} />
        </mesh>
      ))}

      {/* 3D Label */}
      <Html center position={[0, 2.7, 0]} distanceFactor={8}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
          color: '#00c8ff', letterSpacing: '0.15em',
          background: 'rgba(0,10,25,0.85)', border: '1px solid rgba(0,200,255,0.3)',
          borderRadius: 4, padding: '0.25rem 0.6rem', whiteSpace: 'nowrap',
        }}>
          HUMAN EPITHELIAL HOST CELL (100 µm)
        </div>
      </Html>
    </group>
  );
}
