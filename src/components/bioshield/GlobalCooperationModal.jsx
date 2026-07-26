/**
 * GlobalCooperationModal.jsx
 * Global Connection & International Biosecurity Alliance Modal for Phase 7 (Module 10).
 * Displays international research partnerships, vaccine sharing networks, and emergency aid.
 */
import { motion, AnimatePresence } from 'framer-motion';

const PARTNERSHIPS = [
  { id: 'alliance', title: 'Global mRNA Research Alliance', partner: 'WHO / CERN / MIT', status: 'Active (24/7 Data Link)', icon: '🧬' },
  { id: 'vaccines', title: 'COVAX International Vaccine Sharing', partner: '180 Nations', status: '2.5B Doses Distributed', icon: '💉' },
  { id: 'aid',      title: 'Emergency Medical Rapid Deployment', partner: 'Doctors Without Borders', status: 'Standby Fleet Ready', icon: '🩺' },
  { id: 'data',     title: 'Open-Access Genomic Database',     partner: 'NCBI / GISAID', status: 'Real-Time Strain Sync', icon: '🌐' },
];

export default function GlobalCooperationModal({ visible, onClose }) {
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
            width: '100%', maxWidth: '620px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(0,200,255,0.4)',
            borderRadius: 16, padding: '1.4rem', boxShadow: '0 0 40px rgba(0,200,255,0.3)',
            color: '#fff', position: 'relative',
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

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', letterSpacing: '0.2em' }}>
            BIOSHIELD 2050 · GLOBAL COOPERATION NETWORK
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
            INTERNATIONAL BIOSECURITY ALLIANCES
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {PARTNERSHIPS.map(p => (
              <div
                key={p.id}
                style={{
                  background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.15)',
                  borderRadius: 10, padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: '#fff' }}>
                      {p.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)' }}>
                      PARTNERS: {p.partner}
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00ff9d', fontWeight: 700 }}>
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
