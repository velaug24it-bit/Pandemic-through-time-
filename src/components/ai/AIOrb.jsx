/**
 * AIOrb.jsx
 * Floating AI assistant orb with:
 *  - Custom pulse shader (animated displacement)
 *  - Rotating holo rings
 *  - Particle halo
 *  - Bobbing animation
 *  - Speech panel overlay (Framer Motion)
 *  - Interactive Click To Activate button & click target
 */
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { orbVertexShader, orbFragmentShader } from '../../utils/shaders';

/** Rotating holo ring */
function HoloRing({ radius, tiltX, tiltZ, speed, color = '#00c8ff' }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.012, 8, 64]} />
      <meshStandardMaterial emissive={color} emissiveIntensity={1.8} color="#002233" transparent opacity={0.7} />
    </mesh>
  );
}

const MESSAGES = [
  "Welcome to the Historical Pandemic Museum & Research Hub.",
  "I am ARIA — your AI Research & Intelligence Assistant.",
  "Our mission: Monitor and understand humanity's greatest pandemics through time.",
  "Explore the 3D biological pathogen exhibits, 3D genomic sequencers, and timeline eras.",
  "Click 'JOURNEY INSIDE HUMAN BODY' or use the top navigation buttons to advance to future modules.",
];

export default function AIOrb({ position = [2.5, 0, -1.5] }) {
  const orbRef     = useRef();
  const [active,   setActive]   = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uColor: { value: new THREE.Color(0.0, 0.6, 1.0) },
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orbRef.current) {
      // Float bob
      orbRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.12;
    }
    uniforms.uTime.value = t;
  });

  const handleClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setActive((a) => !a);
    if (!active) setMsgIndex(0);
  };

  const nextMessage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setMsgIndex((i) => (i + 1) % MESSAGES.length);
  };

  return (
    <group ref={orbRef} position={position}>
      {/* Invisible expanded 3D click target sphere */}
      <mesh onClick={handleClick} cursor="pointer">
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Orb shader sphere */}
      <mesh onClick={handleClick} castShadow cursor="pointer">
        <icosahedronGeometry args={[0.28, 4]} />
        <shaderMaterial
          vertexShader={orbVertexShader}
          fragmentShader={orbFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core inner sphere */}
      <mesh onClick={handleClick} cursor="pointer">
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#003366" transparent opacity={0.8} />
      </mesh>

      {/* Point light */}
      <pointLight color="#00aaff" intensity={1.2} distance={4} />

      {/* Rotating holo rings */}
      <HoloRing radius={0.42} tiltX={0.3}  tiltZ={0}   speed={1.2} color="#00c8ff" />
      <HoloRing radius={0.38} tiltX={-0.5} tiltZ={0.4} speed={-0.9} color="#7b2ff7" />
      <HoloRing radius={0.48} tiltX={0.8}  tiltZ={0.2} speed={0.6}  color="#00ff9d" />

      {/* Particle halo */}
      <Sparkles count={60} scale={[1.5, 1.5, 1.5]} size={0.5} speed={0.3} opacity={0.5} color="#00aaff" />

      {/* Speech panel (HTML overlay) */}
      <Html
        center
        distanceFactor={6}
        position={[0, 0.7, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 240,
                background: 'rgba(0,10,25,0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0,200,255,0.4)',
                borderRadius: 10,
                padding: '1rem',
                textAlign: 'center',
                boxShadow: '0 0 30px rgba(0,150,255,0.3)',
                pointerEvents: 'all',
              }}
            >
              {/* ARIA label */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                color: '#00c8ff',
                marginBottom: '0.6rem',
              }}>
                ◈ A·R·I·A · AI ASSISTANT ◈
              </div>

              {/* Message */}
              <motion.p
                key={msgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  color: '#c8e8ff',
                  lineHeight: 1.6,
                  marginBottom: '0.8rem',
                }}
              >
                {MESSAGES[msgIndex]}
              </motion.p>

              {/* Controls */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button
                  onClick={nextMessage}
                  style={{
                    background: 'rgba(0,100,200,0.3)',
                    border: '1px solid rgba(0,200,255,0.4)',
                    borderRadius: 4,
                    padding: '0.3rem 0.7rem',
                    color: '#00c8ff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    cursor: 'pointer',
                    letterSpacing: '0.1em',
                  }}
                  id="btn-aria-next"
                >
                  NEXT ▶
                </button>
                <button
                  onClick={handleClick}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    padding: '0.3rem 0.7rem',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    cursor: 'pointer',
                    letterSpacing: '0.1em',
                  }}
                  id="btn-aria-close"
                >
                  ✕
                </button>
              </div>

              {/* Pagination dots */}
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: '0.6rem' }}>
                {MESSAGES.map((_, i) => (
                  <div key={i} style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: i === msgIndex ? '#00c8ff' : 'rgba(0,200,255,0.25)',
                    transition: 'background 0.3s',
                  }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover hint button when inactive */}
        {!active && (
          <button
            onClick={handleClick}
            style={{
              background: 'rgba(0,10,25,0.85)',
              border: '1px solid rgba(0,200,255,0.4)',
              borderRadius: 6,
              padding: '0.35rem 0.7rem',
              color: '#00c8ff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.15em',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(0,200,255,0.3)',
              pointerEvents: 'all',
              whiteSpace: 'nowrap',
            }}
          >
            ✦ CLICK TO ACTIVATE ✦
          </button>
        )}
      </Html>
    </group>
  );
}
