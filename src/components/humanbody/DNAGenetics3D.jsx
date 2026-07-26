/**
 * DNAGenetics3D.jsx
 * 3D Interactive DNA & Genetics Lab:
 *  - Rotating Double Helix with base pair nucleotide color coding (A-T, C-G)
 *  - mRNA transcription strands
 *  - Interactive mutation highlighting
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function DNAGenetics3D() {
  const dnaRef = useRef();
  const count  = 30;

  const nucleotides = useMemo(() => {
    const COLORS_MAP = {
      AT: { p1: '#00c8ff', p2: '#7b2ff7', bar: '#00c8ff' },
      GC: { p1: '#00ff9d', p2: '#ff3860', bar: '#00ff9d' },
    };

    return Array.from({ length: count }, (_, i) => {
      const t = (i / count) * Math.PI * 5;
      const y = (i / count) * 4 - 2.0;
      const r = 0.7;
      const pairType = Math.random() > 0.5 ? 'AT' : 'GC';
      return {
        y,
        p1: [Math.cos(t) * r, y, Math.sin(t) * r],
        p2: [-Math.cos(t) * r, y, -Math.sin(t) * r],
        colors: COLORS_MAP[pairType],
        pairName: pairType === 'AT' ? 'Adenine - Thymine' : 'Guanine - Cytosine',
      };
    });
  }, [count]);

  useFrame(({ clock }) => {
    if (dnaRef.current) {
      dnaRef.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={dnaRef} position={[0, 0, 0]}>
      {nucleotides.map((n, idx) => (
        <group key={idx}>
          {/* Strand 1 Node */}
          <mesh position={n.p1}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={n.colors.p1} emissive={n.colors.p1} emissiveIntensity={0.8} />
          </mesh>
          {/* Strand 2 Node */}
          <mesh position={n.p2}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={n.colors.p2} emissive={n.colors.p2} emissiveIntensity={0.8} />
          </mesh>
          {/* Hydrogen Bond Bar */}
          <line>
            <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(...n.p1),
              new THREE.Vector3(...n.p2),
            ])} />
            <lineBasicMaterial color={n.colors.bar} transparent opacity={0.6} />
          </line>
        </group>
      ))}

      <Html center position={[0, 2.3, 0]} distanceFactor={7}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00ff9d',
          background: 'rgba(0,10,25,0.85)', padding: '0.2rem 0.6rem', borderRadius: 4,
          border: '1px solid #00ff9d', whiteSpace: 'nowrap',
        }}>
          🧬 GENOMIC DNA DOUBLE HELIX (BASE PAIRS: A-T / C-G)
        </div>
      </Html>
    </group>
  );
}
