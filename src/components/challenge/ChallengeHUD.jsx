/**
 * ChallengeHUD.jsx
 * Top Navigation Header for Phase 8 – Global Collaboration & Challenge Platform.
 * Controls:
 *  - Global Health Commander Rank Display
 *  - Launchers: Mission Selection Wall, Personal Dashboard & Leaderboard, Master Timeline Navigator (All 8 Phases), Grand Diploma
 */
import { motion } from 'framer-motion';

export default function ChallengeHUD({
  userName = 'Commander Director',
  completedCount = 0,
  onOpenMissions,
  onOpenDashboard,
  onOpenTimeline,
  onOpenCertificate,
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
        background: 'rgba(2,10,25,0.94)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(123,47,247,0.4)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      }}
    >
      {/* Left - Title & Rank */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🏆</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 900, color: '#7b2ff7', letterSpacing: '0.2em' }}>
              CRISIS CHALLENGE PLATFORM
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>
              GLOBAL HEALTH COMMANDER HUB
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(123,47,247,0.12)', border: '1px solid rgba(123,47,247,0.3)', borderRadius: 6, padding: '0.2rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)' }}>COMMANDER:</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 800, color: '#00ff9d' }}>{userName}</span>
        </div>
      </div>

      {/* Center - Action Launchers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          onClick={onOpenMissions}
          style={{
            background: 'rgba(123,47,247,0.2)', border: '1px solid #7b2ff7',
            borderRadius: 6, padding: '0.35rem 0.7rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          🎯 MISSION WALL
        </button>

        <button
          onClick={onOpenDashboard}
          style={{
            background: 'rgba(0,200,255,0.15)', border: '1px solid #00c8ff',
            borderRadius: 6, padding: '0.35rem 0.7rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          📊 DASHBOARD ({completedCount}/7)
        </button>

        <button
          onClick={onOpenTimeline}
          style={{
            background: 'rgba(255,183,0,0.15)', border: '1px solid #ffb700',
            borderRadius: 6, padding: '0.35rem 0.7rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          🧭 MASTER TIMELINE (8 PHASES)
        </button>

        <button
          onClick={onOpenCertificate}
          style={{
            background: 'linear-gradient(135deg, rgba(255,56,96,0.3), rgba(123,47,247,0.3))',
            border: '1px solid #ff3860', borderRadius: 6, padding: '0.35rem 0.8rem',
            color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.55rem', fontWeight: 800,
            cursor: 'pointer', boxShadow: '0 0 12px rgba(255,56,96,0.3)',
          }}
        >
          📜 FINAL CERTIFICATE
        </button>
      </div>

      {/* Right - Return Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
