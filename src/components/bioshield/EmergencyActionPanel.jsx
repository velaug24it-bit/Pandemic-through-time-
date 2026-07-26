/**
 * EmergencyActionPanel.jsx
 * Emergency Response & Prevention Action Panel for Phase 7 (Module 6).
 * Enacts 6 BioShield Emergency Actions updating city state.
 */
import { motion } from 'framer-motion';
import { BIOSHIELD_ACTIONS } from '../../utils/constants';

export default function EmergencyActionPanel({ activeActions = [], onToggleAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 320 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 70, right: 16, width: 310, zIndex: 600,
        background: 'rgba(2,10,25,0.94)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,255,157,0.35)', borderRadius: 14, padding: '0.85rem',
        boxShadow: '0 0 30px rgba(0,255,157,0.2)',
        maxHeight: 'calc(100vh - 180px)', overflowY: 'auto', color: '#fff',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00ff9d', letterSpacing: '0.2em' }}>
        BIOSECURITY COMMAND
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.6rem' }}>
        EMERGENCY ACTIONS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {BIOSHIELD_ACTIONS.map((a) => {
          const active = activeActions.includes(a.id);
          return (
            <button
              key={a.id}
              onClick={() => onToggleAction(a.id)}
              style={{
                textAlign: 'left', padding: '0.5rem 0.65rem',
                background: active ? 'rgba(0,255,157,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? '#00ff9d' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', fontWeight: 700, color: active ? '#fff' : 'rgba(255,255,255,0.85)' }}>
                  {a.icon} {a.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: active ? '#00ff9d' : 'rgba(255,255,255,0.35)', fontWeight: 700 }}>
                  {active ? '● ACTIVE' : 'OFF'}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: active ? '#99ffcc' : 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                {a.impact}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
