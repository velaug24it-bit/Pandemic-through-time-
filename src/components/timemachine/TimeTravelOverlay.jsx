/**
 * TimeTravelOverlay.jsx
 * AAA Fullscreen Time Travel Warp Sequence:
 *  - Speed-line canvas warp tunnel effect
 *  - Live animated year counter counting down to target pandemic era (e.g., 2026 → 1347 AD)
 *  - Rotating clock gear symbols & space-time energy distortion rings
 *  - Procedural time warp audio trigger
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TimeTravelOverlay({ targetPandemic, onWarpComplete }) {
  const canvasRef   = useRef(null);
  const rafRef      = useRef(null);
  const [year, setYear] = useState(2026);
  const targetYear  = targetPandemic?.year || 1347;

  /* ── Warp Canvas Animation ── */
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

    // Speed lines
    const lines = Array.from({ length: 250 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 800 + 50,
      speed: Math.random() * 25 + 15,
      len: Math.random() * 120 + 40,
      color: Math.random() > 0.3 ? '#00c8ff' : '#7b2ff7',
    }));

    function draw() {
      ctx.fillStyle = 'rgba(1, 4, 9, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      lines.forEach((l) => {
        l.dist += l.speed;
        if (l.dist > Math.max(cx, cy) * 1.5) {
          l.dist = Math.random() * 40;
        }

        const x1 = cx + Math.cos(l.angle) * l.dist;
        const y1 = cy + Math.sin(l.angle) * l.dist;
        const x2 = cx + Math.cos(l.angle) * (l.dist + l.len);
        const y2 = cy + Math.sin(l.angle) * (l.dist + l.len);

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, l.color);
        grad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = grad;
        ctx.lineWidth   = Math.min(4, (l.dist / 200));
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Central energy pulse
      const pulseR = (Math.sin(time * 0.1) * 0.5 + 0.5) * 80 + 40;
      const pulseGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR);
      pulseGrd.addColorStop(0,   'rgba(0, 200, 255, 0.8)');
      pulseGrd.addColorStop(0.4, 'rgba(123, 47, 247, 0.4)');
      pulseGrd.addColorStop(1,   'transparent');
      ctx.fillStyle = pulseGrd;
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

  /* ── Animated Year Counter ── */
  useEffect(() => {
    let start = 2026;
    const duration = 2800; // ms
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentYear = Math.round(start + (targetYear - start) * eased);
      setYear(currentYear);

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          onWarpComplete?.();
        }, 500);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [targetYear, onWarpComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="timewarp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#010409',
          overflow: 'hidden',
        }}
      >
        {/* Speed-line canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/* Space-time gear rings */}
        <div style={{ position: 'relative', width: 260, height: 260, zIndex: 2 }}>
          {/* Ring 1 */}
          <motion.div
            animate={{ rotate: 720 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: '2px dashed #00c8ff',
              boxShadow: '0 0 30px #00c8ff',
            }}
          />
          {/* Ring 2 */}
          <motion.div
            animate={{ rotate: -720 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: 20,
              borderRadius: '50%',
              border: '2px dashed #7b2ff7',
              boxShadow: '0 0 30px #7b2ff7',
            }}
          />
          {/* Center target display */}
          <div style={{
            position: 'absolute', inset: 40,
            borderRadius: '50%',
            background: 'rgba(2,10,25,0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,200,255,0.5)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#00ff9d', letterSpacing: '0.2em' }}>
              TIME WARP
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900,
              color: '#ffffff', textShadow: '0 0 20px #00c8ff', margin: '4px 0',
            }}>
              {year}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.6)' }}>
              {targetYear < 1500 ? 'HISTORICAL ERA' : 'MODERN ERA'}
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div style={{ position: 'relative', zIndex: 2, marginTop: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#00c8ff', letterSpacing: '0.25em', marginBottom: 6 }}>
            DESTINATION: {targetPandemic?.name?.toUpperCase() || 'HISTORICAL ERA'}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em' }}>
            ENTERING HISTORICAL PANDEMIC MUSEUM...
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
