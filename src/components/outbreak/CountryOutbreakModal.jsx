/**
 * CountryOutbreakModal.jsx
 * Detailed Country / Regional Operations Dashboard for Module 9.
 * Opens when clicking any country on the 3D globe or country list:
 *  - Flag, Population, Healthcare Score, Risk Level (Green/Yellow/Orange/Red)
 *  - Outbreak Stage, Doctors, Nurses, ICU Beds, Ventilators, Vaccines, Restrictions & AI Recommendations
 */
import { motion, AnimatePresence } from 'framer-motion';

export default function CountryOutbreakModal({ country, visible, onClose }) {
  if (!visible || !country) return null;

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
            width: '100%', maxWidth: '580px',
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

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{country.flag || '🌐'}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', letterSpacing: '0.2em' }}>
                WHO COUNTRY OUTBREAK PROFILE
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>
                {country.name}
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)' }}>POPULATION</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#00c8ff', marginTop: 2 }}>
                {country.population ? (country.population / 1000000).toFixed(1) + 'M' : '142M'}
              </div>
            </div>

            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)' }}>RISK LEVEL</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#ff3860', marginTop: 2 }}>
                🔴 HIGH STAGE 4
              </div>
            </div>

            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)' }}>HEALTHCARE SCORE</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#00ff9d', marginTop: 2 }}>
                78 / 100
              </div>
            </div>
          </div>

          {/* Medical Resource Inventory */}
          <div style={{ background: 'rgba(0,200,255,0.03)', border: '1px solid rgba(0,200,255,0.12)', borderRadius: 10, padding: '0.8rem', marginBottom: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              MEDICAL RESOURCE INVENTORY
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.55rem' }}>
              <div>👨‍⚕️ Doctors: <span style={{ color: '#fff' }}>24,500</span></div>
              <div>👩‍⚕️ Nurses: <span style={{ color: '#fff' }}>58,000</span></div>
              <div>🏥 Hospital Beds: <span style={{ color: '#fff' }}>120,000</span></div>
              <div>🫁 ICU Beds: <span style={{ color: '#00ff9d' }}>12,400</span></div>
              <div>💨 Ventilators: <span style={{ color: '#00c8ff' }}>8,200</span></div>
              <div>💉 Vaccination Coverage: <span style={{ color: '#7b2ff7' }}>42.5%</span></div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div style={{ background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.3)', borderRadius: 10, padding: '0.8rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00ff9d', letterSpacing: '0.15em' }}>
              🤖 AI ADVISOR RECOMMENDATION
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#fff', marginTop: 4 }}>
              "Deploy additional ICU beds and initiate targeted PCR testing in metropolitan transit hubs to prevent stage escalation."
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
