/**
 * InteractiveTimelineSlider.jsx
 * Floating holographic timeline bar spanning 541 AD to Present.
 * Features:
 *  - Scrollable/clickable timeline nodes for all 12 pandemics
 *  - Color-coded risk markers
 *  - Active node glowing highlight
 *  - Flexbox Centering Wrapper: Guarantees true horizontal centering at the bottom.
 */
import { motion } from 'framer-motion';
import { HISTORICAL_PANDEMICS } from '../../data/historicalPandemics';

export default function InteractiveTimelineSlider({ currentPandemic, onSelectPandemic }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 14, left: 0, right: 0,
      zIndex: 600,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 1rem',
      pointerEvents: 'none',
    }}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        style={{
          pointerEvents: 'all',
          width: '100%',
          maxWidth: '920px',
          boxSizing: 'border-box',
          background: 'rgba(2,10,25,0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,200,255,0.25)',
          borderRadius: 16,
          padding: '0.6rem 1.2rem',
          boxShadow: '0 4px 32px rgba(0,0,0,0.7), 0 0 20px rgba(0,200,255,0.15)',
        }}
      >
        {/* Header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', letterSpacing: '0.2em' }}>
            ◈ HISTORICAL CHRONOLOGY (541 AD – PRESENT)
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
            SELECT AN ERA TO TIME-WARP
          </div>
        </div>

        {/* Horizontal node list */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          overflowX: 'auto', paddingBottom: '0.3rem',
          scrollbarWidth: 'thin', scrollbarColor: '#00c8ff rgba(0,20,40,0.5)',
        }}>
          {HISTORICAL_PANDEMICS.map((p) => {
            const active = currentPandemic?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPandemic?.(p)}
                id={`timeline-node-${p.id}`}
                style={{
                  flexShrink: 0,
                  background: active ? 'rgba(0,200,255,0.25)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? '#00c8ff' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  padding: '0.4rem 0.7rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 0 14px rgba(0,200,255,0.4)' : 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, color: active ? '#00c8ff' : 'rgba(255,255,255,0.7)' }}>
                  {p.year}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: active ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                  {p.name.length > 14 ? p.name.slice(0, 14) + '...' : p.name}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
