/**
 * GlobalMetricsHeader.jsx
 * Top telemetry & primary action bar for Phase 6 – WHO Emergency Command Center.
 * Clean, uncluttered layout with responsive metrics & navigation controls.
 */
import { motion } from 'framer-motion';

export default function GlobalMetricsHeader({ state, onStartBioShield, onStartChallenge, onExit }) {
  if (!state) return null;

  const METRICS = [
    { label: 'ACTIVE INFECTED', val: state.infected.toLocaleString(), col: '#ff3860' },
    { label: 'RECOVERED',        val: state.recovered.toLocaleString(), col: '#00ff9d' },
    { label: 'FATALITIES',       val: state.deceased.toLocaleString(),  col: '#ffb700' },
    { label: 'REPRODUCTION R(t)',val: state.currentR0,                   col: state.currentR0 > 1.0 ? '#ff3860' : '#00ff9d' },
    { label: 'ICU STRAIN',       val: `${state.icuOccupancy}%`,         col: state.icuOccupancy > 80 ? '#ff3860' : '#00c8ff' },
    { label: 'VACCINES',         val: `${state.vaccineCoverage}%`,      col: '#00e5ff' },
  ];

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 52, zIndex: 600,
        background: 'rgba(1,4,12,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,56,96,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '180px' }}>
        <span style={{ fontSize: '1.1rem', color: '#ff3860' }}>🚨</span>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', fontWeight: 800, color: '#ff3860', letterSpacing: '0.15em' }}>
            WHO RESPONSE CENTER
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.4)' }}>
            EMERGENCY CONSOLE
          </div>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {METRICS.map(m => (
          <div key={m.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.38rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{m.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 800, color: m.col }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Top Right Navigation Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: '240px', justifyContent: 'flex-end' }}>
        <button
          onClick={onStartBioShield}
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,157,0.25), rgba(0,200,255,0.25))',
            border: '1px solid #00ff9d', borderRadius: 6, padding: '0.35rem 0.65rem',
            color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.55rem', fontWeight: 800,
            cursor: 'pointer', letterSpacing: '0.08em', boxShadow: '0 0 12px rgba(0,255,157,0.3)',
          }}
        >
          🛡️ BIOSHIELD ▶
        </button>

        <button
          onClick={onStartChallenge}
          style={{
            background: 'linear-gradient(135deg, rgba(123,47,247,0.25), rgba(255,56,96,0.25))',
            border: '1px solid #7b2ff7', borderRadius: 6, padding: '0.35rem 0.65rem',
            color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.55rem', fontWeight: 800,
            cursor: 'pointer', letterSpacing: '0.08em', boxShadow: '0 0 12px rgba(123,47,247,0.3)',
          }}
        >
          🏆 CHALLENGES ▶
        </button>

        <button
          onClick={onExit}
          style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: 'rgba(255,255,255,0.8)',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ◀ EXIT
        </button>
      </div>
    </motion.div>
  );
}
