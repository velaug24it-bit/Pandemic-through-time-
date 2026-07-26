/**
 * LabHUD.jsx
 * Top header HUD overlay for Phase 5 – AI Research Laboratory & Vaccine Center.
 * Enhanced with Phase 6 "🚨 GLOBAL OUTBREAK SIMULATOR ▶" CTA button.
 */
import { motion } from 'framer-motion';
import { LAB_WORKSTATIONS } from '../../utils/constants';

export default function LabHUD({
  activeStationId = 'analysis',
  onStartOutbreakSim,
  onReturnToMissionControl,
}) {
  const currentStation = LAB_WORKSTATIONS.find(w => w.id === activeStationId) || LAB_WORKSTATIONS[0];

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.2rem',
        height: 52,
        background: 'rgba(1,4,12,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,200,255,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      {/* Left – Lab Title & Station */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#00c8ff', fontSize: '1.1rem' }}>🔬</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800, color: '#00c8ff', letterSpacing: '0.2em' }}>
              AI BIOMEDICAL RESEARCH LABORATORY
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.12em' }}>
              VACCINE DEVELOPMENT CENTER
            </div>
          </div>
        </div>

        {/* Active Station Badge */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          color: currentStation.color || '#00ff9d',
          background: `${currentStation.color || '#00ff9d'}15`,
          border: `1px solid ${currentStation.color || '#00ff9d'}44`,
          borderRadius: 4, padding: '0.2rem 0.6rem',
          letterSpacing: '0.1em',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
        }}>
          <span>{currentStation.icon}</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>{currentStation.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Right – Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {/* Phase 6 CTA Button */}
        <button
          onClick={onStartOutbreakSim}
          id="btn-hud-start-outbreak-sim"
          style={{
            background: 'linear-gradient(135deg, rgba(255,56,96,0.3), rgba(255,183,0,0.3))',
            border: '1px solid #ff3860',
            borderRadius: 6,
            padding: '0.35rem 0.8rem',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            boxShadow: '0 0 12px rgba(255,56,96,0.3)',
            transition: 'all 0.2s',
          }}
        >
          <span>🚨 GLOBAL OUTBREAK SIMULATOR</span>
        </button>

        {/* Return Button */}
        <button
          onClick={onReturnToMissionControl}
          id="btn-lab-return"
          style={{
            background: 'rgba(255,102,0,0.15)',
            border: '1px solid rgba(255,102,0,0.4)',
            borderRadius: 6,
            padding: '0.35rem 0.9rem',
            color: '#ff6600',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            transition: 'all 0.2s',
          }}
        >
          <span>◀ RETURN TO MISSION CONTROL</span>
        </button>
      </div>
    </motion.div>
  );
}
