/**
 * CinematicIntro.jsx
 * Full-screen cinematic title reveal with staggered GSAP text animation,
 * particle dust overlay, and an "Enter Mission" CTA.
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur: Math.random() * 6 + 4,
  delay: Math.random() * 5,
}));

export default function CinematicIntro({ onComplete }) {
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef  = useRef(null);
  const [showCTA, setShowCTA] = useState(false);
  const [visible,  setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 60, letterSpacing: '0.6em' },
      { opacity: 1, y: 0,  letterSpacing: '0.2em', duration: 1.6, ease: 'power4.out' }
    )
    .fromTo(dividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0,  duration: 1.2, ease: 'power3.out' },
      '-=0.3'
    )
    .call(() => setShowCTA(true), null, '+=0.5');

    return () => tl.kill();
  }, []);

  const handleEnter = () => {
    gsap.to([titleRef.current, subtitleRef.current, dividerRef.current], {
      opacity: 0, y: -30, duration: 0.6, stagger: 0.05, ease: 'power2.in',
    });
    setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="scanlines"
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,40,80,0.6) 0%, #010409 70%)',
          }}
        >
          {/* Particle dust */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
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
                  background: 'rgba(0,200,255,0.7)',
                }}
                animate={{ y: [0, -120], opacity: [0, 0.8, 0] }}
                transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>

          {/* Vignette edges */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(1,4,9,0.9) 100%)',
            zIndex: 1, pointerEvents: 'none',
          }} />

          {/* Main content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem' }}>

            {/* Top label */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 0.5, letterSpacing: '0.4em' }}
              transition={{ delay: 0.3, duration: 1.5 }}
              className="font-mono"
              style={{ color: '#00c8ff', fontSize: '0.65rem', marginBottom: '1.5rem' }}
            >
              ◈ GLOBAL PANDEMIC MONITORING INITIATIVE ◈
            </motion.div>

            {/* Main title */}
            <h1
              ref={titleRef}
              className="font-display"
              style={{
                opacity: 0,
                fontSize: 'clamp(2rem, 8vw, 5.5rem)',
                fontWeight: 900,
                background: 'linear-gradient(180deg, #ffffff 0%, #00c8ff 50%, rgba(0,200,255,0.4) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.05,
                marginBottom: '1.2rem',
              }}
            >
              PANDEMIC<br />THROUGH TIME
            </h1>

            {/* Divider line */}
            <div
              ref={dividerRef}
              style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, #00c8ff, #7b2ff7, transparent)',
                margin: '0 auto 1.2rem',
                width: 'clamp(200px, 40vw, 400px)',
                transformOrigin: 'center',
                opacity: 0,
              }}
            />

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-display"
              style={{
                opacity: 0,
                fontSize: 'clamp(0.7rem, 2.5vw, 1.1rem)',
                letterSpacing: '0.4em',
                color: 'rgba(0,200,255,0.7)',
                marginBottom: '3.5rem',
              }}
            >
              HUMANITY VS. PANDEMICS
            </p>

            {/* Enter CTA */}
            <AnimatePresence>
              {showCTA && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  onClick={handleEnter}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(0,200,255,0.5)',
                    borderRadius: 4,
                    padding: '0.8rem 2.5rem',
                    color: '#00c8ff',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.3em',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{
                    boxShadow: '0 0 30px rgba(0,200,255,0.4), inset 0 0 20px rgba(0,200,255,0.1)',
                    borderColor: 'rgba(0,200,255,0.9)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  id="btn-enter-mission"
                >
                  ENTER MISSION
                </motion.button>
              )}
            </AnimatePresence>

            {/* Year label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 2 }}
              className="font-mono"
              style={{ marginTop: '2rem', color: '#00c8ff', fontSize: '0.6rem', letterSpacing: '0.2em' }}
            >
              MISSION YEAR 2024 – SPACE COMMAND CENTER ONLINE
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
