/**
 * MuseumHUD.jsx
 * Top header HUD overlay for the Historical Pandemic Museum.
 * Features:
 *  - Gallery title & Era tag
 *  - Selected pandemic indicator
 *  - Achievements button with badge counter
 *  - "🔬 HUMAN BODY JOURNEY" CTA button
 *  - "◀ RETURN TO MISSION CONTROL" button
 */
import { motion } from 'framer-motion';

export default function MuseumHUD({
  currentPandemic,
  exploredCount = 1,
  onOpenAchievements,
  onStartHumanBodyJourney,
  onReturnToMissionControl,
}) {
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
        height: 50,
        background: 'rgba(1,4,12,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,200,255,0.18)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      {/* Left – Museum Title & Era */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#00c8ff', fontSize: '1.0rem' }}>🏛️</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800, color: '#00c8ff', letterSpacing: '0.2em' }}>
              HISTORICAL PANDEMIC MUSEUM
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.12em' }}>
              INTERACTIVE CHRONO-GALLERY
            </div>
          </div>
        </div>

        {/* Selected pandemic era badge */}
        {currentPandemic && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
            color: '#00ff9d',
            background: 'rgba(0,255,157,0.08)',
            border: '1px solid rgba(0,255,157,0.25)',
            borderRadius: 4, padding: '0.2rem 0.6rem',
            letterSpacing: '0.1em',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <span>⏳ ERA:</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>{currentPandemic.era}</span>
          </div>
        )}
      </div>

      {/* Center – Current Pandemic Name */}
      {currentPandemic && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.15em' }}>
            ACTIVE EXHIBIT ROOM
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.1em' }}>
            {currentPandemic.name}
          </div>
        </div>
      )}

      {/* Right – Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {/* Human Body Journey CTA Button */}
        <button
          onClick={onStartHumanBodyJourney}
          id="btn-hud-human-body-journey"
          style={{
            background: 'linear-gradient(135deg, rgba(255,23,68,0.3), rgba(123,47,247,0.3))',
            border: '1px solid #ff1744',
            borderRadius: 6,
            padding: '0.35rem 0.8rem',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            boxShadow: '0 0 12px rgba(255,23,68,0.3)',
            transition: 'all 0.2s',
          }}
        >
          <span>🔬 HUMAN BODY JOURNEY</span>
        </button>

        {/* Achievements Button */}
        <button
          onClick={onOpenAchievements}
          id="btn-museum-achievements"
          style={{
            background: 'rgba(123,47,247,0.15)',
            border: '1px solid rgba(123,47,247,0.4)',
            borderRadius: 6,
            padding: '0.35rem 0.8rem',
            color: '#7b2ff7',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            transition: 'all 0.2s',
          }}
        >
          <span>🏆 ACHIEVEMENTS</span>
          <span style={{
            background: '#7b2ff7', color: '#fff',
            borderRadius: '50%', padding: '0.05rem 0.35rem',
            fontSize: '0.45rem', fontWeight: 700,
          }}>
            {exploredCount}/12
          </span>
        </button>

        {/* Return Button */}
        <button
          onClick={onReturnToMissionControl}
          id="btn-museum-return"
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
