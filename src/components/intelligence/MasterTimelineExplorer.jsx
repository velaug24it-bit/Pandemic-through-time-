/**
 * MasterTimelineExplorer.jsx
 * Unified Global Health Chronological Timeline for Phase 9 (Module 4).
 * Displays full history: Black Death -> Smallpox -> Cholera -> Spanish Flu -> SARS -> H1N1 -> Ebola -> COVID-19 -> BioShield 2050
 * Enables direct warp triggers to any exhibit or phase.
 */
import { motion, AnimatePresence } from 'framer-motion';

const CHRONOLOGY = [
  { era: '1347', name: 'The Black Death', agent: 'Yersinia pestis', toll: '75M – 200M', stage: 9, icon: '🏛️' },
  { era: '1520', name: 'Smallpox Outbreak', agent: 'Variola virus', toll: '56M', stage: 9, icon: '🦠' },
  { era: '1817', name: 'Cholera Pandemic', agent: 'Vibrio cholerae', toll: '1M+', stage: 9, icon: '💧' },
  { era: '1918', name: '1918 Spanish Flu', agent: 'H1N1 Influenza', toll: '50M', stage: 9, icon: '🫁' },
  { era: '2002', name: 'SARS Outbreak', agent: 'SARS-CoV', toll: '774', stage: 9, icon: '🔍' },
  { era: '2009', name: 'Swine Flu Pandemic', agent: 'H1N1/09 Virus', toll: '284,000', stage: 9, icon: '🐷' },
  { era: '2014', name: 'Ebola Epidemic', agent: 'Ebola virus', toll: '11,310', stage: 9, icon: '🩸' },
  { era: '2019', name: 'COVID-19 Pandemic', agent: 'SARS-CoV-2', toll: '6.9M+', stage: 9, icon: '💉' },
  { era: '2050', name: 'BioShield 2050', agent: 'Preventative Tech', toll: '0 (Target)', stage: 15, icon: '🛡️' },
];

export default function MasterTimelineExplorer({ visible, onNavigateToStage, onClose }) {
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
            MODULE 4 · CHRONOLOGICAL MATRIX
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 1rem' }}>
            UNIFIED GLOBAL HEALTH TIMELINE
          </div>

          {/* Timeline Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {CHRONOLOGY.map(item => (
              <div
                key={item.era + item.name}
                style={{
                  background: 'rgba(255,183,0,0.04)', border: '1px solid rgba(255,183,0,0.2)',
                  borderRadius: 10, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ffb700', fontWeight: 700 }}>
                      ERA: {item.era} AD
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>
                      {item.name} ({item.agent})
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                      ESTIMATED CASUALTIES: {item.toll}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigateToStage?.(item.stage);
                    onClose();
                  }}
                  style={{
                    background: 'rgba(255,183,0,0.2)', border: '1px solid #ffb700', borderRadius: 6,
                    padding: '0.35rem 0.75rem', color: '#fff', fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  WARP TO EXHIBIT ▶
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
