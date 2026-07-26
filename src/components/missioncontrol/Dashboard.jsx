/**
 * Dashboard.jsx
 * Futuristic Mission Control dashboard with:
 *  - Glassmorphism panels
 *  - Animated chart bars
 *  - Holographic status indicators
 *  - Real-time number animation
 *  - Framer Motion micro-animations
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DASHBOARD_DATA } from '../../utils/constants';

/** Animated number counter */
function AnimatedValue({ target }) {
  const [current, setCurrent] = useState(0);
  const displayTarget = parseFloat(target) || 0;

  useEffect(() => {
    let start   = 0;
    const range = displayTarget;
    const step  = range / 60;
    const id    = setInterval(() => {
      start += step;
      if (start >= range) { setCurrent(displayTarget); clearInterval(id); }
      else setCurrent(parseFloat(start.toFixed(1)));
    }, 16);
    return () => clearInterval(id);
  }, [displayTarget]);

  const raw  = String(target);
  const suffix = raw.replace(/[\d.]/g, '');
  return <>{current}{suffix}</>;
}

/** Sparkline-style animated bar chart */
function SparkBars({ count = 12, color = '#00c8ff' }) {
  const [heights, setHeights] = useState(() => Array.from({ length: count }, () => Math.random() * 60 + 20));

  useEffect(() => {
    const id = setInterval(() => {
      setHeights((prev) =>
        prev.map((h) => Math.max(10, Math.min(80, h + (Math.random() - 0.5) * 20)))
      );
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 40 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: h * 0.4 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ flex: 1, background: color, borderRadius: 2, opacity: 0.7 + 0.3 * (i / count) }}
        />
      ))}
    </div>
  );
}

/** Ring progress indicator */
function RingProgress({ value, color = '#00c8ff', size = 48 }) {
  const pct     = parseFloat(value) || 0;
  const radius  = 18;
  const circ    = 2 * Math.PI * radius;
  const offset  = circ - (pct / 100) * circ;

  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(0,200,255,0.12)" strokeWidth="3" />
      <motion.circle
        cx="22" cy="22" r={radius}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      <text x="22" y="26" textAnchor="middle"
        style={{ fontSize: '7px', fontFamily: 'var(--font-mono)', fill: color }}>
        {Math.round(pct)}%
      </text>
    </svg>
  );
}

/** Single status card */
function StatusCard({ data, delay = 0 }) {
  const statusColors = { nominal: '#00ff9d', warning: '#ffb700', critical: '#ff3860' };
  const color = statusColors[data.status] || '#00c8ff';
  const isPercent = data.value.includes('%');
  const numericVal = parseFloat(data.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      style={{
        background: 'rgba(0,10,25,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0,200,255,0.15)',
        borderRadius: 10,
        padding: '0.9rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Status indicator line at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: color,
        boxShadow: `0 0 8px ${color}`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(0,200,255,0.6)', letterSpacing: '0.08em' }}>
          {data.label.toUpperCase()}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div className="ping-slow" style={{
            width: 6, height: 6, borderRadius: '50%',
            background: color, position: 'relative',
          }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color, textTransform: 'uppercase' }}>
            {data.status}
          </span>
        </div>
      </div>

      {/* Value row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color }}>
          <AnimatedValue target={data.value} />
        </div>
        {isPercent && numericVal <= 100 ? (
          <RingProgress value={numericVal} color={color} />
        ) : (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(0,200,255,0.4)', textAlign: 'right' }}>
            {data.unit}
          </div>
        )}
      </div>

      {/* Spark bars */}
      <div style={{ marginTop: '0.5rem' }}>
        <SparkBars color={color} />
      </div>
    </motion.div>
  );
}

export default function Dashboard({ visible = true }) {
  if (!visible) return null;

  const entries = Object.values(DASHBOARD_DATA);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '0.75rem',
        width: '100%',
      }}
    >
      {entries.map((data, i) => (
        <StatusCard key={data.label} data={data} delay={i * 0.1} />
      ))}
    </motion.div>
  );
}
