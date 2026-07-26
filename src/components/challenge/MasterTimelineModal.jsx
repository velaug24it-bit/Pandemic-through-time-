/**
 * MasterTimelineModal.jsx
 * Complete 8-Phase Learning Journey Timeline Navigator for Phase 8 (Module 11).
 * Displays all 8 completed phases and allows instant warp navigation to any phase.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_PHASES_TIMELINE } from '../../utils/constants';

export default function MasterTimelineModal({ visible, onNavigateToPhase, onClose }) {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 940,
        background: 'rgba(0,4,12,0.85)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '750px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(255,183,0,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(255,183,0,0.3)',
            color: '#fff', position: 'relative', maxHeight: '88vh', overflowY: 'auto',
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

          {/* Header */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#ffb700', letterSpacing: '0.2em' }}>
            HUMANITY VS PANDEMICS · COMPLETE LEARNING JOURNEY
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 1rem' }}>
            MASTER 8-PHASE TIMELINE NAVIGATOR
          </div>

          {/* Timeline List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {ALL_PHASES_TIMELINE.map((p, idx) => (
              <div
                key={p.stage}
                onClick={() => {
                  onNavigateToPhase?.(p.stage);
                  onClose();
                }}
                style={{
                  background: 'rgba(255,183,0,0.04)', border: '1px solid rgba(255,183,0,0.2)',
                  borderRadius: 10, padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>
                      {p.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                      {p.desc}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700,
                  background: 'rgba(255,183,0,0.2)', border: '1px solid #ffb700', borderRadius: 6,
                  padding: '0.3rem 0.7rem', color: '#fff',
                }}>
                  WARP TO PHASE ▶
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
