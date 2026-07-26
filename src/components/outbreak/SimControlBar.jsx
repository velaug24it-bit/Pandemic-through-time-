/**
 * SimControlBar.jsx
 * Live Simulation Time Controller for Phase 6.
 * Features:
 *  - Live Day Counter (Day 1 -> Day 365+)
 *  - Play / Pause state toggle
 *  - Speed multipliers (1x, 2x, 5x)
 *  - Reset simulation button
 */
import { motion } from 'framer-motion';

export default function SimControlBar({
  day = 1,
  isRunning = true,
  speed = 1,
  onTogglePlay,
  onSetSpeed,
  onReset,
}) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 60, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 600,
        display: 'flex', alignItems: 'center', gap: '0.8rem',
        background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,56,96,0.3)', borderRadius: 12,
        padding: '0.4rem 1.2rem',
        boxShadow: '0 0 24px rgba(255,56,96,0.2)',
      }}
    >
      {/* Day Ticker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.9rem' }}>⏱️</span>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.4)' }}>SIMULATION TIME</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#ff3860' }}>
            DAY {day}
          </div>
        </div>
      </div>

      <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />

      {/* Play/Pause */}
      <button
        onClick={onTogglePlay}
        style={{
          background: isRunning ? 'rgba(255,56,96,0.2)' : 'rgba(0,255,157,0.2)',
          border: `1px solid ${isRunning ? '#ff3860' : '#00ff9d'}`,
          borderRadius: 6, padding: '0.35rem 0.75rem',
          color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {isRunning ? '⏸ PAUSE' : '▶ RUN'}
      </button>

      {/* Speed Multipliers */}
      <div style={{ display: 'flex', gap: '0.3rem' }}>
        {[1, 2, 5].map((spd) => (
          <button
            key={spd}
            onClick={() => onSetSpeed(spd)}
            style={{
              background: speed === spd ? 'rgba(0,200,255,0.25)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${speed === spd ? '#00c8ff' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 4, padding: '0.25rem 0.5rem',
              color: speed === spd ? '#fff' : 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem', cursor: 'pointer',
            }}
          >
            {spd}x
          </button>
        ))}
      </div>

      <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />

      {/* Reset */}
      <button
        onClick={onReset}
        style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 6, padding: '0.35rem 0.6rem',
          color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
          cursor: 'pointer',
        }}
      >
        ↺ RESET
      </button>
    </motion.div>
  );
}
