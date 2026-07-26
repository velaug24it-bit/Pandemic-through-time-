/**
 * AICommandAdvisor.jsx
 * AI Command Advisor ARIA component for Phase 6.
 * Features:
 *  - Real-time epidemiological trend forecasts
 *  - Hospital shortage warnings
 *  - Action recommendations & policy rationale
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AICommandAdvisor({ state }) {
  const [minimized, setMinimized] = useState(false);

  const getAdvice = () => {
    if (!state) return 'Analyzing pandemic telemetry...';
    if (state.icuOccupancy > 75) {
      return 'WARNING: ICU capacity strain exceeds 75%. Enact "Deploy ICU Emergency Beds" and "Implement National Quarantine" immediately to flatten the curve.';
    }
    if (state.currentR0 > 2.0) {
      return 'CRITICAL SPREAD: Reproduction rate R(t) is above 2.0. Enact "Close International Borders" and "Mass Testing" to halt transmission.';
    }
    if (state.vaccineCoverage > 50) {
      return 'OPTIMAL PROGRESS: Global vaccination coverage has exceeded 50%. R(t) is dropping rapidly. Continue fast-track distribution.';
    }
    return 'NOMINAL SURVEILLANCE: Monitor regional outbreak epicenters and maintain WHO emergency assistance dispatch.';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 320 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', bottom: 90, right: 16, width: 310, zIndex: 600,
        background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,255,157,0.3)', borderRadius: 14, padding: '0.8rem 1rem',
        boxShadow: '0 0 30px rgba(0,255,157,0.2)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '1.0rem', color: '#00ff9d' }}>🤖</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800, color: '#00ff9d', letterSpacing: '0.15em' }}>
              AI ADVISOR · ARIA
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.4)' }}>
              EPIDEMIOLOGICAL FORECASTER
            </div>
          </div>
        </div>
        <button
          onClick={() => setMinimized(m => !m)}
          style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 4, color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
            padding: '0.15rem 0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          }}
        >
          {minimized ? '+' : '–'}
        </button>
      </div>

      <AnimatePresence>
        {!minimized && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ marginTop: '0.6rem' }}>
            <div style={{
              background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.15)',
              borderRadius: 8, padding: '0.65rem',
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#e0f0ff', lineHeight: 1.5,
            }}>
              "{getAdvice()}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
