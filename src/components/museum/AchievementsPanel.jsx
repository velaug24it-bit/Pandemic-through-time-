/**
 * AchievementsPanel.jsx
 * Floating modal panel tracking historical museum exploration achievements:
 *  - Time Traveler (explored 1 pandemic)
 *  - Historian (explored 5 pandemics)
 *  - Master Epidemiologist (explored all 12 pandemics)
 *  - Pandemic Knowledge Score
 */
import { motion, AnimatePresence } from 'framer-motion';

const ACHIEVEMENTS_LIST = [
  { id: 'time-traveler', name: 'TIME TRAVELER', desc: 'Completed first historical time warp', req: 1, icon: '⚡' },
  { id: 'historian',     name: 'HISTORIAN',     desc: 'Explored 5 historical pandemic galleries', req: 5, icon: '📜' },
  { id: 'epidemiologist',name: 'MASTER EPIDEMIOLOGIST', desc: 'Explored all 12 historical pandemic galleries', req: 12, icon: '🏆' },
];

export default function AchievementsPanel({ visible, exploredCount = 1, onClose }) {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 800,
          width: 340,
          background: 'rgba(2,10,25,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(123,47,247,0.4)',
          borderRadius: 16,
          padding: '1.2rem',
          boxShadow: '0 0 40px rgba(123,47,247,0.3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🏆</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 800, color: '#7b2ff7', letterSpacing: '0.15em' }}>
                MISSION ACHIEVEMENTS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)' }}>
                EXPLORATION PROGRESS
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            id="btn-close-achievements"
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 4, color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
              padding: '0.2rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            }}
          >✕</button>
        </div>

        {/* Progress Overview */}
        <div style={{
          background: 'rgba(123,47,247,0.08)',
          border: '1px solid rgba(123,47,247,0.2)',
          borderRadius: 8, padding: '0.8rem', textAlign: 'center',
          marginBottom: '1rem',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
            GALLERIES UNLOCKED
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: '#00ff9d', margin: '2px 0' }}>
            {exploredCount} / 12
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(exploredCount/12)*100}%`, background: '#00ff9d', borderRadius: 2 }} />
          </div>
        </div>

        {/* Achievement Items */}
        {ACHIEVEMENTS_LIST.map(ach => {
          const unlocked = exploredCount >= ach.req;
          return (
            <div key={ach.id} style={{
              display: 'flex', alignItems: 'center', gap: '0.7rem',
              background: unlocked ? 'rgba(0,255,157,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${unlocked ? 'rgba(0,255,157,0.25)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 8, padding: '0.5rem 0.7rem', marginBottom: '0.5rem',
            }}>
              <span style={{ fontSize: '1.2rem', opacity: unlocked ? 1 : 0.3 }}>{ach.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', fontWeight: 700, color: unlocked ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                  {ach.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                  {ach.desc}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: unlocked ? '#00ff9d' : 'rgba(255,255,255,0.2)' }}>
                {unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
              </span>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
