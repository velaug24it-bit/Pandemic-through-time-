/**
 * MissionSelectionModal.jsx
 * Mission Selection Wall for Phase 8 (Modules 1 & 2).
 * Displays 7 Educational Challenge Scenarios with difficulty ratings and completion badges.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { CHALLENGE_SCENARIOS } from '../../utils/constants';

export default function MissionSelectionModal({ visible, completedMissions = [], onSelectScenario, onClose }) {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 900,
        background: 'rgba(0,4,12,0.85)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '780px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(123,47,247,0.4)',
            borderRadius: 16, padding: '1.4rem', boxShadow: '0 0 40px rgba(123,47,247,0.3)',
            color: '#fff', position: 'relative', maxHeight: '85vh', overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: '50%', width: 28, height: 28, color: '#fff',
              cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
            }}
          >
            ✕
          </button>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#7b2ff7', letterSpacing: '0.2em' }}>
            GLOBAL HEALTH COMMANDER HUB
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem' }}>
            INTERACTIVE MISSION SELECTION WALL
          </div>

          {/* Mission Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
            {CHALLENGE_SCENARIOS.map((s) => {
              const isCompleted = completedMissions.includes(s.id);
              const isGrand = s.id === 'grand';

              return (
                <div
                  key={s.id}
                  onClick={() => onSelectScenario(s)}
                  style={{
                    background: isGrand ? 'rgba(255,56,96,0.08)' : 'rgba(123,47,247,0.05)',
                    border: `1px solid ${isGrand ? '#ff3860' : isCompleted ? '#00ff9d' : 'rgba(123,47,247,0.25)'}`,
                    borderRadius: 12, padding: '1rem', cursor: 'pointer',
                    gridColumn: isGrand ? 'span 2' : 'span 1',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>
                      {s.icon} {s.name}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.42rem', padding: '0.15rem 0.5rem', borderRadius: 4,
                      background: s.diff === 'Grand Master' ? 'rgba(255,56,96,0.3)' : s.diff === 'Hard' ? 'rgba(255,145,0,0.3)' : 'rgba(0,255,157,0.2)',
                      color: s.diff === 'Grand Master' ? '#ff3860' : s.diff === 'Hard' ? '#ff9100' : '#00ff9d', fontWeight: 700,
                    }}>
                      {s.diff.toUpperCase()} {isCompleted ? '✓ CLEARED' : ''}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, marginTop: 4 }}>
                    {s.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
