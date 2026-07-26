/**
 * MissionBriefing.jsx
 * AAA Game-style Cinematic Mission Briefing interface:
 *  - Title & Subtitle typography animations
 *  - Mission Brief text card with holographic glass frame
 *  - Interactive mission stats (Telemetry, Uplink, Satellites)
 *  - "INITIALIZE LAUNCH ▶" CTA button with whoosh transition
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  dur: Math.random() * 6 + 4,
  delay: Math.random() * 4,
}));

export default function MissionBriefing({ onStartMission }) {
  const containerRef = useRef(null);
  const cardRef      = useRef(null);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1,    y: 0, duration: 1.2, ease: 'power3.out' }
    )
    .call(() => setShowCTA(true), null, '+=0.2');

    return () => tl.kill();
  }, []);

  const handleLaunch = () => {
    gsap.to(cardRef.current, {
      opacity: 0, scale: 0.95, y: -20, duration: 0.5, ease: 'power2.in',
    });
    setTimeout(() => {
      onStartMission?.();
    }, 550);
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        key="briefing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="scanlines"
        style={{
          position: 'fixed', inset: 0, zIndex: 500,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse 80% 65% at 50% 50%, rgba(0,50,100,0.5) 0%, #010409 75%)',
        }}
      >
        {/* Floating dust particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: 'rgba(0,200,255,0.6)',
              }}
              animate={{ y: [0, -100], opacity: [0, 0.7, 0] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Outer Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(1,4,9,0.92) 100%)',
          zIndex: 1, pointerEvents: 'none',
        }} />

        {/* Main Mission Briefing Holographic Card */}
        <div
          ref={cardRef}
          style={{
            position: 'relative', zIndex: 2,
            width: 'clamp(320px, 85vw, 680px)',
            background: 'rgba(2,10,25,0.88)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,200,255,0.3)',
            borderRadius: 16,
            padding: '2.2rem 2.5rem',
            boxShadow: '0 0 50px rgba(0,180,255,0.2), inset 0 0 30px rgba(0,100,200,0.1)',
            textAlign: 'center',
          }}
        >
          {/* Top header label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(0,200,255,0.08)',
            border: '1px solid rgba(0,200,255,0.25)',
            borderRadius: 20, padding: '0.3rem 0.9rem',
            marginBottom: '1.2rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff9d', boxShadow: '0 0 8px #00ff9d' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#00c8ff', letterSpacing: '0.25em' }}>
              GLOBAL PANDEMIC MONITORING INITIATIVE
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              fontWeight: 900,
              background: 'linear-gradient(180deg, #ffffff 0%, #00c8ff 60%, rgba(0,200,255,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.15em',
              lineHeight: 1.1,
              marginBottom: '0.4rem',
            }}
          >
            PANDEMIC THROUGH TIME
          </h1>

          <p
            className="font-mono"
            style={{
              fontSize: '0.8rem',
              color: 'rgba(0,200,255,0.6)',
              letterSpacing: '0.35em',
              marginBottom: '1.8rem',
            }}
          >
            HUMANITY VS. PANDEMICS
          </p>

          {/* Briefing text body */}
          <div style={{
            background: 'rgba(0,200,255,0.04)',
            border: '1px solid rgba(0,200,255,0.12)',
            borderRadius: 10,
            padding: '1.2rem 1.4rem',
            textAlign: 'left',
            marginBottom: '1.8rem',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              ◈ MISSION DIRECTIVE #001
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: '#d0e5ff',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Welcome Commander. You are embarking on a global mission across centuries of human resilience. From historical outbreak origins to present-day biosurveillance and future BioShield defense systems, your objective is to launch into space, dock at the Orbital Command Station, and operate humanity's central pandemic monitoring network.
            </p>
          </div>

          {/* Mission stats telemetry bar */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem',
            marginBottom: '2.2rem',
          }}>
            {[
              { label: 'SATELLITES', val: '247 ONLINE', col: '#00ff9d' },
              { label: 'TELEMETRY', val: '100% SYNC',  col: '#00c8ff' },
              { label: 'AI CORE',    val: 'STANDBY',   col: '#ffb700' },
            ].map(({ label, val, col }) => (
              <div key={label} style={{
                background: 'rgba(0,200,255,0.06)',
                border: '1px solid rgba(0,200,255,0.15)',
                borderRadius: 8, padding: '0.5rem 0.6rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.12em' }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, color: col, marginTop: 2 }}>
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* Start CTA Button */}
          <AnimatePresence>
            {showCTA && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onClick={handleLaunch}
                id="btn-start-mission"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,180,255,0.35), rgba(0,255,157,0.25))',
                  border: '1.5px solid #00c8ff',
                  borderRadius: 8,
                  padding: '0.9rem 2.8rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.3em',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(0,200,255,0.4)',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 45px rgba(0,200,255,0.65)',
                  borderColor: '#00ff9d',
                }}
                whileTap={{ scale: 0.96 }}
              >
                🚀 INITIALIZE LAUNCH ▶
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
