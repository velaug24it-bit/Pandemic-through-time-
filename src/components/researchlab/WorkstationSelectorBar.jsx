/**
 * WorkstationSelectorBar.jsx
 * Floating bottom workstation navigation dock for Phase 5.
 * Allows instant switching between all 7 research stations:
 *  - Pathogen Analysis, Genome Sequencing, Digital Microscope, AI Diagnostics, Drug Discovery, Vaccine Pipeline, Global Dashboard
 *  - Flexbox Centering Wrapper: Guarantees 100% true horizontal centering in the middle bottom of the screen.
 */
import { motion } from 'framer-motion';
import { LAB_WORKSTATIONS } from '../../utils/constants';

export default function WorkstationSelectorBar({ activeStationId, onSelectStation }) {
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
          maxWidth: '960px',
          boxSizing: 'border-box',
          background: 'rgba(2,10,25,0.94)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0,200,255,0.3)',
          borderRadius: 14,
          padding: '0.45rem 0.75rem',
          boxShadow: '0 4px 32px rgba(0,0,0,0.85), 0 0 20px rgba(0,200,255,0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00c8ff', letterSpacing: '0.18em', fontWeight: 700 }}>
            ◈ RESEARCH WORKSTATION DOCK (7 LABORATORY STATIONS)
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
            SELECT WORKSTATION TO OPERATE
          </div>
        </div>

        {/* 7 Workstations Grid guaranteeing 100% visibility & centering */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gap: '0.35rem',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {LAB_WORKSTATIONS.map((station) => {
            const active = activeStationId === station.id;
            return (
              <button
                key={station.id}
                onClick={() => onSelectStation?.(station.id)}
                id={`station-node-${station.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  background: active ? `${station.color}35` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? station.color : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 7,
                  padding: '0.35rem 0.4rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: active ? `0 0 14px ${station.color}66` : 'none',
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>{station.icon}</span>
                <div style={{ textAlign: 'left', minWidth: 0, overflow: 'hidden' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.46rem', fontWeight: 700,
                    color: active ? '#fff' : 'rgba(255,255,255,0.7)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {station.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.38rem',
                    color: active ? station.color : 'rgba(255,255,255,0.35)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {station.desc}
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
