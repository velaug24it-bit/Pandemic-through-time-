/**
 * ShrinkTransitionOverlay.jsx
 * Cinematic Miniaturization Shrink Transition:
 *  - Canvas particle distortion & molecular zoom
 *  - Live animated scale counter (1.8m → 100 µm → 100 nm)
 *  - Pulsing energy distortion ring
 *  - Auto advances to Stage 11 (HUMAN_BODY_JOURNEY)
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShrinkTransitionOverlay({ onShrinkComplete }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const [scaleText, setScaleText] = useState('1.8 m');

  /* ── Canvas Particle Distortion ── */
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

    const particles = Array.from({ length: 300 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
      color: Math.random() > 0.4 ? '#ff1744' : '#00c8ff',
    }));

    function draw() {
      ctx.fillStyle = 'rgba(10, 0, 5, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particles.forEach((p) => {
        // Move towards center to create shrinking vortex effect
        const dx = cx - p.x;
        const dy = cy - p.y;
        p.x += dx * 0.04 + p.speedX;
        p.y += dy * 0.04 + p.speedY;

        if (Math.hypot(dx, dy) < 20) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central bio-pulse ring
      const pulseR = (Math.sin(time * 0.15) * 0.5 + 0.5) * 120 + 40;
      const grad   = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR);
      grad.addColorStop(0,   'rgba(255, 23, 68, 0.8)');
      grad.addColorStop(0.5, 'rgba(123, 47, 247, 0.5)');
      grad.addColorStop(1,   'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.fill();

      time++;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── Scale Readout Sequence ── */
  useEffect(() => {
    const SCALES = [
      { t: 0,    val: '1.8 m (HUMAN)' },
      { t: 600,  val: '10 cm (ORGAN)' },
      { t: 1200, val: '1 mm (TISSUE)' },
      { t: 1800, val: '100 µm (CELLULAR)' },
      { t: 2400, val: '1 µm (BACTERIAL)' },
      { t: 2900, val: '100 nm (VIRAL)' },
    ];

    const timeouts = SCALES.map(s =>
      setTimeout(() => setScaleText(s.val), s.t)
    );

    const endTimer = setTimeout(() => {
      onShrinkComplete?.();
    }, 3200);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(endTimer);
    };
  }, [onShrinkComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="shrink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#0a0005',
          overflow: 'hidden',
        }}
      >
        {/* Canvas background */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/* Bio Energy Ring */}
        <div style={{ position: 'relative', width: 260, height: 260, zIndex: 2 }}>
          <motion.div
            animate={{ rotate: 720, scale: [1, 0.4, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: '2px dashed #ff1744',
              boxShadow: '0 0 40px #ff1744',
            }}
          />
          <motion.div
            animate={{ rotate: -720, scale: [0.5, 1.1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 20,
              borderRadius: '50%',
              border: '2px dashed #00c8ff',
              boxShadow: '0 0 30px #00c8ff',
            }}
          />

          {/* Central Display */}
          <div style={{
            position: 'absolute', inset: 40,
            borderRadius: '50%',
            background: 'rgba(15,0,8,0.92)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,23,68,0.5)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#ff1744', letterSpacing: '0.2em' }}>
              MINIATURIZING
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900,
              color: '#ffffff', textShadow: '0 0 20px #ff1744', margin: '4px 0', textAlign: 'center',
            }}>
              {scaleText}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(0,200,255,0.7)' }}>
              MICROCOSMIC WARP
            </div>
          </div>
        </div>

        {/* Bottom Title */}
        <div style={{ position: 'relative', zIndex: 2, marginTop: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ff1744', letterSpacing: '0.25em', marginBottom: 6 }}>
            ENTERING THE HUMAN BODY
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em' }}>
            MICRO-SCALE BIOLOGICAL VOYAGE INITIALIZED...
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
