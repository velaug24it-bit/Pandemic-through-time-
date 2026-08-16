/**
 * NationHistoryModal.jsx
 * Deep-Dive Historical & Pandemic Intelligence Modal for selected nations.
 * Opens when user clicks "EXPLORE PANDEMICS & NATION HISTORY".
 * Displays:
 *  - Historical Outbreaks & Epidemics affecting the nation
 *  - Scientific discoveries, vaccines & public health milestones
 *  - Direct Warp actions to Museum, AI Lab, Body Journey, and BioShield
 */
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRY_POLYGONS } from '../../data/countryPolygons';

export default function NationHistoryModal({ country, visible, onClose, onWarpToStage }) {
  if (!visible || !country) return null;

  const polygonData = COUNTRY_POLYGONS[country.id] || country;
  const history = polygonData.history || {
    title: `Pandemic & Medical History of ${country.name}`,
    summary: `${country.name} has maintained comprehensive epidemiological surveillance, vaccine logistics, and healthcare networks throughout major global health events.`,
    pandemics: [
      {
        name: 'COVID-19 Pandemic (2020–2023)',
        year: '2020',
        agent: 'SARS-CoV-2',
        impact: 'Deployed national quarantine measures, molecular diagnostics, and extensive vaccination drives.',
        severity: 'Contained'
      },
      {
        name: '1918 Influenza Pandemic',
        year: '1918',
        agent: 'H1N1 Influenza',
        impact: 'Modernized regional medical institutions and hospital bed infrastructure.',
        severity: 'Historic'
      }
    ]
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 950,
        background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            width: '100%', maxWidth: '820px',
            background: 'rgba(4, 13, 33, 0.96)',
            border: '1px solid #c084fc',
            borderRadius: 16,
            padding: '1.6rem',
            boxShadow: '0 0 50px rgba(192, 132, 252, 0.35)',
            color: '#ffffff',
            position: 'relative',
            maxHeight: '88vh',
            overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%', width: 32, height: 32,
              color: '#ffffff', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{country.emoji}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#c084fc', letterSpacing: '0.2em' }}>
                NATIONAL PANDEMIC INTELLIGENCE DOSSIER
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: '#f3e8ff' }}>
                {country.name} · PANDEMIC & HEALTH HISTORY
              </div>
            </div>
          </div>

          {/* Overview Summary */}
          <div style={{
            background: 'rgba(192, 132, 252, 0.08)',
            border: '1px solid rgba(192, 132, 252, 0.25)',
            borderRadius: 10, padding: '0.9rem 1.1rem',
            fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5,
            marginBottom: '1.2rem',
          }}>
            {history.summary}
          </div>

          {/* Chronological Epidemic Timeline Cards */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#38bdf8', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>
            HISTORICAL PANDEMIC TIMELINE & OUTBREAK RECORDS:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.4rem' }}>
            {history.pandemics.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(2, 10, 25, 0.7)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: 10, padding: '0.9rem 1.1rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1, paddingRight: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.45rem',
                      background: '#c084fc25', border: '1px solid #c084fc',
                      color: '#c084fc', padding: '0.15rem 0.45rem', borderRadius: 4, fontWeight: 800,
                    }}>
                      ERA: {p.year}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                      {p.name}
                    </span>
                  </div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#fbbf24', marginTop: 4 }}>
                    PATHOGEN: {p.agent}
                  </div>

                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: 4, lineHeight: 1.4 }}>
                    {p.impact}
                  </div>
                </div>

                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
                  padding: '0.2rem 0.5rem', borderRadius: 6,
                  background: 'rgba(0, 255, 157, 0.15)', border: '1px solid #00ff9d',
                  color: '#00ff9d', fontWeight: 700, whiteSpace: 'nowrap',
                }}>
                  {p.severity}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Warp Actions to Simulator & Museum */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#c084fc', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>
            DEEP DIVE SIMULATION WARP DESTINATIONS:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            <button
              onClick={() => {
                onWarpToStage?.(9); // Museum
                onClose();
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(123,47,247,0.3), rgba(192,132,252,0.2))',
                border: '1px solid #c084fc', borderRadius: 8, padding: '0.6rem',
                color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '0.65rem',
                fontWeight: 800, cursor: 'pointer', textAlign: 'center',
              }}
            >
              🏛️ HISTORICAL MUSEUM ▶
            </button>

            <button
              onClick={() => {
                onWarpToStage?.(12); // AI Lab
                onClose();
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(0,200,255,0.3), rgba(0,255,157,0.2))',
                border: '1px solid #00c8ff', borderRadius: 8, padding: '0.6rem',
                color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '0.65rem',
                fontWeight: 800, cursor: 'pointer', textAlign: 'center',
              }}
            >
              🧬 AI RESEARCH LAB ▶
            </button>

            <button
              onClick={() => {
                onWarpToStage?.(13); // Outbreak Simulator
                onClose();
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,56,96,0.3), rgba(255,183,0,0.2))',
                border: '1px solid #ff3860', borderRadius: 8, padding: '0.6rem',
                color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '0.65rem',
                fontWeight: 800, cursor: 'pointer', textAlign: 'center',
              }}
            >
              🚨 OUTBREAK SIMULATOR ▶
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
