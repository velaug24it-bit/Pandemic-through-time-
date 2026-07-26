/**
 * LoadingScreen.jsx
 * AAA Game-style Premium animated loading screen with:
 *  - Animated star canvas + ambient particle dust
 *  - Rotating holographic project logo rings
 *  - Real-time typing system initialization logs
 *  - Smooth progress bar & percent indicator
 *  - Fade-out transition into Mission Brief
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Generates random star positions once */
function generateStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.5 + 0.3,
    o: Math.random() * 0.6 + 0.3,
    speed: Math.random() * 0.0003 + 0.0001,
  }));
}

const STARS = generateStars(350);

const SYSTEM_LOGS = [
  'Initializing AI Core...',
  'Connecting Satellite Network...',
  'Loading Earth Systems...',
  'Calibrating Orbital Sensors...',
  'Preparing Mission Control...',
  'Loading Pandemic Database...',
  'Synchronizing Global Telemetry...',
  'Space Command Center Online.',
];

export default function LoadingScreen({ onComplete }) {
  const canvasRef   = useRef(null);
  const rafRef      = useRef(null);
  const [progress,   setProgress]   = useState(0);
  const [visible,    setVisible]    = useState(true);
  const [statusText, setStatusText] = useState('Initializing AI Core...');

  /* ── Animated star canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time  = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#010409';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      STARS.forEach((s) => {
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.speed * 1000 + s.x * 100);
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${s.o * twinkle})`;
        ctx.fill();
      });

      time++;
      rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── Simulated loading progress & status log typing ── */
  useEffect(() => {
    let current = 0;
    const total = 3200; // ms
    const step  = 40;   // tick interval ms

    const interval = setInterval(() => {
      current += step;
      const pct = Math.min(100, Math.round((current / total) * 100));
      setProgress(pct);

      const idx = Math.floor((pct / 100) * SYSTEM_LOGS.length);
      setStatusText(SYSTEM_LOGS[Math.min(idx, SYSTEM_LOGS.length - 1)]);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 800);
        }, 300);
      }
    }, step);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="scanlines"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#010409',
          }}
        >
          {/* Star canvas */}
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          />

          {/* Radial nebula glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,120,200,0.15) 0%, transparent 75%)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem' }}>

            {/* Animated logo rings */}
            <div style={{ position: 'relative', width: 130, height: 130, margin: '0 auto 2.5rem' }}>
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(0,200,255,0.4)',
                  borderTopColor: '#00c8ff',
                  boxShadow: '0 0 20px rgba(0,200,255,0.3)',
                }}
              />
              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: 16,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(123,47,247,0.5)',
                  borderRightColor: '#7b2ff7',
                }}
              />
              {/* Inner pulse */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: 32,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,200,255,0.9) 0%, rgba(0,100,200,0.4) 60%, transparent 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '1.9rem' }}>🌍</span>
              </motion.div>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="holo-text-blue font-display"
              style={{ fontSize: 'clamp(1.4rem, 4.5vw, 2.2rem)', letterSpacing: '0.22em', marginBottom: '0.4rem' }}
            >
              PANDEMIC THROUGH TIME
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-mono"
              style={{ color: 'rgba(0,200,255,0.6)', fontSize: '0.75rem', letterSpacing: '0.35em', marginBottom: '3rem' }}
            >
              HUMANITY VS. PANDEMICS
            </motion.p>

            {/* Progress bar container */}
            <div style={{ width: 'clamp(280px, 50vw, 440px)', margin: '0 auto' }}>
              <div style={{
                height: 3,
                background: 'rgba(0,200,255,0.12)',
                borderRadius: 3,
                overflow: 'hidden',
                marginBottom: '1rem',
                border: '1px solid rgba(0,200,255,0.15)',
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #0077aa, #00c8ff, #7b2ff7, #00ff9d)',
                    borderRadius: 3,
                    width: `${progress}%`,
                  }}
                  className="progress-glow"
                  transition={{ duration: 0.05 }}
                />
              </div>

              {/* Status log & percent */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  className="font-mono"
                  style={{ color: '#00ff9d', fontSize: '0.65rem', letterSpacing: '0.1em' }}
                >
                  ▶ {statusText}
                </span>
                <span
                  className="font-mono"
                  style={{ color: '#00c8ff', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  {progress}%
                </span>
              </div>
            </div>

            {/* Corner HUD decorations */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
              <motion.div
                key={pos}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.4 }}
                style={{
                  position: 'absolute',
                  width: 24, height: 24,
                  ...(pos.includes('top') ? { top: -40 } : { bottom: -40 }),
                  ...(pos.includes('left') ? { left: -10 } : { right: -10 }),
                  borderTop:    pos.includes('top') ? '2px solid rgba(0,200,255,0.6)' : 'none',
                  borderBottom: pos.includes('bottom') ? '2px solid rgba(0,200,255,0.6)' : 'none',
                  borderLeft:   pos.includes('left') ? '2px solid rgba(0,200,255,0.6)' : 'none',
                  borderRight:  pos.includes('right') ? '2px solid rgba(0,200,255,0.6)' : 'none',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
