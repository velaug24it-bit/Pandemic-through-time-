/**
 * BioShieldHUD.jsx
 * Top Navigation Header for Phase 7 – BioShield 2050.
 * Controls:
 *  - City Health Index Ticker
 *  - Day / Night Lighting Mode Toggle ☀️/🌙
 *  - Modal Launchers: Smart Hospital Explorer, Public Education, Global Cooperation, Final Hall of Knowledge
 */
import { motion } from 'framer-motion';

export default function BioShieldHUD({
  healthIndex = 98.5,
  isNight = false,
  onToggleNight,
  onOpenHospital,
  onOpenEducation,
  onOpenGlobal,
  onOpenFinalHall,
  onReturnToMissionControl,
}) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.2rem',
        height: 54,
        background: 'rgba(2,10,25,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,255,157,0.3)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      }}
    >
      {/* Left - Title & City Health Index */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🛡️</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 900, color: '#00ff9d', letterSpacing: '0.2em' }}>
              BIOSHIELD 2050
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>
              FUTURE PANDEMIC PREVENTION CENTER
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.3)', borderRadius: 6, padding: '0.2rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)' }}>CITY HEALTH INDEX:</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 800, color: '#00ff9d' }}>{healthIndex}% NOMINAL</span>
        </div>
      </div>

      {/* Center - Action Modules */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          onClick={onOpenHospital}
          style={{
            background: 'rgba(255,56,96,0.15)', border: '1px solid #ff3860',
            borderRadius: 6, padding: '0.35rem 0.7rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          🏥 SMART HOSPITAL
        </button>

        <button
          onClick={onOpenEducation}
          style={{
            background: 'rgba(123,47,247,0.15)', border: '1px solid #7b2ff7',
            borderRadius: 6, padding: '0.35rem 0.7rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          🎓 PUBLIC EDUCATION
        </button>

        <button
          onClick={onOpenGlobal}
          style={{
            background: 'rgba(0,200,255,0.15)', border: '1px solid #00c8ff',
            borderRadius: 6, padding: '0.35rem 0.7rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          🌐 GLOBAL COOPERATION
        </button>

        <button
          onClick={onOpenFinalHall}
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,157,0.3), rgba(0,200,255,0.3))',
            border: '1px solid #00ff9d', borderRadius: 6, padding: '0.35rem 0.8rem',
            color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.55rem', fontWeight: 800,
            cursor: 'pointer', boxShadow: '0 0 12px rgba(0,255,157,0.3)',
          }}
        >
          📜 CERTIFICATE & HALL OF KNOWLEDGE
        </button>
      </div>

      {/* Right - Day/Night Toggle & Return */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button
          onClick={onToggleNight}
          title="Toggle Day / Night Lighting"
          style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 6, padding: '0.35rem 0.6rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', cursor: 'pointer',
          }}
        >
          {isNight ? '🌙 NIGHT' : '☀️ DAY'}
        </button>

        <button
          onClick={onReturnToMissionControl}
          style={{
            background: 'rgba(0,200,255,0.12)', border: '1px solid rgba(0,200,255,0.3)',
            borderRadius: 6, padding: '0.35rem 0.8rem', color: '#00c8ff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          ◀ MISSION CONTROL
        </button>
      </div>
    </motion.div>
  );
}
