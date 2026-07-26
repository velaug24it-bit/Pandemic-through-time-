/**
 * PathogenModel.jsx
 * Procedural 3D virus/pathogen model with:
 *  - Icosahedral core
 *  - Animated spike proteins (surface protrusions)
 *  - Membrane glow shader
 *  - Rotation animation
 *  - Click to expand info panel
 */
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const PATHOGEN_INFO = [
  {
    id: 'covid19',
    name: 'SARS-CoV-2',
    year: 2019,
    color: '#ff4466',
    emissive: '#660011',
    deaths: '6.9M+',
    origin: 'Wuhan, China',
    type: 'Coronavirus',
  },
  {
    id: 'influenza',
    name: 'H1N1 Influenza',
    year: 1918,
    color: '#ffaa00',
    emissive: '#663300',
    deaths: '50–100M',
    origin: 'Unknown',
    type: 'Influenzavirus A',
  },
  {
    id: 'ebola',
    name: 'Ebola Virus',
    year: 1976,
    color: '#aa22ff',
    emissive: '#330066',
    deaths: '15,000+',
    origin: 'Congo',
    type: 'Filovirus',
  },
];

/** Single spike protein */
function Spike({ position, direction, length, color }) {
  return (
    <group position={position}>
      <mesh lookAt={[
        position[0] + direction[0],
        position[1] + direction[1],
        position[2] + direction[2],
      ]}>
        <cylinderGeometry args={[0.015, 0.04, length, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} />
      </mesh>
      {/* Spike tip bulb */}
      <mesh position={[
        direction[0] * length * 0.5,
        direction[1] * length * 0.5,
        direction[2] * length * 0.5,
      ]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

/** Generate spike positions on an icosahedron */
function generateSpikes(count, radius) {
  const positions = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y   = 1 - (i / (count - 1)) * 2;
    const r   = Math.sqrt(1 - y * y);
    const θ   = phi * i;
    const x   = Math.cos(θ) * r;
    const z   = Math.sin(θ) * r;
    positions.push({
      pos: [x * radius, y * radius, z * radius],
      dir: [x, y, z],
    });
  }
  return positions;
}

function VirusCore({ info, onClick, selected }) {
  const coreRef = useRef();
  const spikes  = useMemo(() => generateSpikes(42, 0.32), []);

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = clock.getElapsedTime() * 0.4;
      coreRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <group ref={coreRef} onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color={info.emissive}
          emissive={info.color}
          emissiveIntensity={selected ? 0.8 : 0.35}
          roughness={0.5}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner glow */}
      <mesh scale={[0.7, 0.7, 0.7]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color={info.color} transparent opacity={0.15} />
      </mesh>

      {/* Spike proteins */}
      {spikes.map((s, i) => (
        <Spike key={i} position={s.pos} direction={s.dir} length={0.18} color={info.color} />
      ))}

      {/* Glow point */}
      <pointLight color={info.color} intensity={selected ? 1.5 : 0.5} distance={2} />
    </group>
  );
}

export default function PathogenModel({ position = [0, 1.5, -3] }) {
  const [current,  setCurrent]  = useState(0);
  const [selected, setSelected] = useState(false);
  const groupRef = useRef();

  const info = PATHOGEN_INFO[current];

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.6) * 0.08;
    }
  });

  const handleClick = () => setSelected((s) => !s);

  return (
    <group ref={groupRef} position={position}>
      <VirusCore info={info} onClick={handleClick} selected={selected} />

      {/* Particle halo */}
      <Sparkles
        count={30}
        scale={[1.4, 1.4, 1.4]}
        size={0.3}
        speed={0.2}
        opacity={0.35}
        color={info.color}
      />

      {/* Info panel */}
      <Html center distanceFactor={5} position={[0, 0.7, 0]} style={{ pointerEvents: selected ? 'all' : 'none' }}>
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1,   y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{
                width: 200,
                background: 'rgba(10,0,20,0.92)',
                backdropFilter: 'blur(14px)',
                border: `1px solid ${info.color}44`,
                borderRadius: 10,
                padding: '0.9rem',
                boxShadow: `0 0 30px ${info.color}33`,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: info.color,
                marginBottom: '0.5rem',
              }}>
                ◈ PATHOGEN PROFILE
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>
                {info.name}
              </div>
              {[
                ['TYPE',   info.type],
                ['YEAR',   info.year],
                ['ORIGIN', info.origin],
                ['DEATHS', info.deaths],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#e0e8ff' }}>{v}</span>
                </div>
              ))}

              {/* Cycle through pathogens */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.7rem', justifyContent: 'center' }}>
                {PATHOGEN_INFO.map((p, i) => (
                  <button key={p.id} onClick={() => setCurrent(i)} style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: i === current ? p.color : 'rgba(255,255,255,0.15)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    boxShadow: i === current ? `0 0 6px ${p.color}` : 'none',
                  }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
              color: info.color, letterSpacing: '0.1em', textAlign: 'center',
            }}
          >
            ◈ CLICK · {info.name}
          </motion.div>
        )}
      </Html>
    </group>
  );
}
