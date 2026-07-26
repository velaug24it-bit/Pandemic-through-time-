/**
 * AnalyticsDashboardModal.jsx
 * Health Analytics & Data Visualization Center for Phase 9 (Modules 6 & 10).
 * Displays comparative metrics: R0 Reproduction, Mortality %, Vaccine Coverage %, Healthcare Readiness Index.
 */
import { motion, AnimatePresence } from 'framer-motion';

const COMPARISON_DATA = [
  { name: 'Black Death (1347)',      r0: 3.5, mortality: '60%',  vaccine: '0%',   readiness: '12%' },
  { name: '1918 Spanish Flu',       r0: 2.2, mortality: '2.5%', vaccine: '0%',   readiness: '35%' },
  { name: 'COVID-19 (2019)',         r0: 3.2, mortality: '1.2%', vaccine: '72%',  readiness: '78%' },
  { name: 'BioShield 2050 (Future)', r0: 0.8, mortality: '0.01%',vaccine: '98%', readiness: '99%' },
];

export default function AnalyticsDashboardModal({ visible, onClose }) {
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
            width: '100%', maxWidth: '820px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(0,229,255,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(0,229,255,0.3)',
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00e5ff', letterSpacing: '0.2em' }}>
            MODULE 6 & 10 · ANALYTICS & DATA VISUALIZATION
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 1rem' }}>
            GLOBAL PANDEMIC COMPARATIVE DASHBOARD
          </div>

          {/* Comparison Table */}
          <div style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: 10, padding: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '0.5rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00e5ff' }}>
              <div>ERA / PANDEMIC</div>
              <div>REPRODUCTION (R0)</div>
              <div>MORTALITY %</div>
              <div>VACCINE %</div>
              <div>READINESS</div>
            </div>

            {COMPARISON_DATA.map(d => (
              <div
                key={d.name}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '0.5rem',
                  padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.52rem', alignItems: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>{d.name}</div>
                <div style={{ color: '#00c8ff', fontWeight: 700 }}>{d.r0}</div>
                <div style={{ color: '#ff3860', fontWeight: 700 }}>{d.mortality}</div>
                <div style={{ color: '#00ff9d', fontWeight: 700 }}>{d.vaccine}</div>
                <div style={{ color: '#7b2ff7', fontWeight: 700 }}>{d.readiness}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
