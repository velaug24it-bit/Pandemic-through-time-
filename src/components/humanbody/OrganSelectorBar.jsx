/**
 * OrganSelectorBar.jsx
 * Floating organ system switcher bar spanning 8 major body environments:
 *  - Bloodstream, Lungs, Heart, Brain, Liver, Kidneys, Lymphatic, Immune Core
 *  - Flex Centering Wrapper: Guarantees 100% true horizontal centering in the middle bottom of the page.
 */
import { motion } from 'framer-motion';
import { ORGAN_SYSTEMS } from '../../utils/constants';

export default function OrganSelectorBar({ activeOrganId, onSelectOrgan }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 12, left: 0, right: 0,
      zIndex: 600,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 1rem',
      pointerEvents: 'none',
    }}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        style={{
          pointerEvents: 'all',
          width: '100%',
          maxWidth: '920px',
          boxSizing: 'border-box',
          background: 'rgba(10,0,8,0.95)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,23,68,0.35)',
          borderRadius: 14,
          padding: '0.45rem 0.75rem',
          boxShadow: '0 4px 32px rgba(0,0,0,0.85), 0 0 20px rgba(255,23,68,0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ff1744', letterSpacing: '0.18em', fontWeight: 700 }}>
            ◈ ORGAN SYSTEM NAVIGATOR (8 MICROSCOPIC WORLDS)
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
            CLICK TO TRAVEL
          </div>
        </div>

        {/* 4 Columns x 2 Rows Grid guaranteeing 100% visibility & centering */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '0.35rem',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {ORGAN_SYSTEMS.map((organ) => {
            const active = activeOrganId === organ.id;
            return (
              <button
                key={organ.id}
                onClick={() => onSelectOrgan?.(organ.id)}
                id={`organ-node-${organ.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  background: active ? `${organ.color}35` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? organ.color : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 7,
                  padding: '0.3rem 0.4rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: active ? `0 0 14px ${organ.color}66` : 'none',
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>{organ.icon}</span>
                <div style={{ textAlign: 'left', minWidth: 0, overflow: 'hidden' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.46rem', fontWeight: 700,
                    color: active ? '#fff' : 'rgba(255,255,255,0.7)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {organ.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.38rem',
                    color: active ? organ.color : 'rgba(255,255,255,0.35)',
                    whiteSpace: 'nowrap',
                  }}>
                    {organ.scale}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
