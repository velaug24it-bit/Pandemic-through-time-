/**
 * OutbreakSummaryModal.jsx
 * Director's Final Mission Performance Scorecard & Debrief for Module 12.
 * Calculates:
 *  - Global Response Score (0-100)
 *  - Award Rank: Bronze, Silver, Gold, or Platinum Global Pandemic Response Director
 *  - Lives Protected, Healthcare Performance, Vaccination Success, Economic Stability, AI Efficiency
 *  - Navigation triggers: Advance to BioShield 2050 or Return to Mission Control
 */
import { motion, AnimatePresence } from 'framer-motion';

export default function OutbreakSummaryModal({ visible, state = {}, onClose, onAdvanceToBioShield, onReturnToMissionControl }) {
  if (!visible) return null;

  const deaths = state.deceased || 0;
  const recovered = state.recovered || 0;
  const icu = state.icuOccupancy || 0;
  const vaccine = state.vaccineCoverage || 0;
  const policies = state.activePolicies?.length || 0;

  // Score calculation
  let score = 85;
  if (deaths > 100000) score -= 15;
  if (icu > 80) score -= 10;
  if (vaccine > 50) score += 10;
  if (policies > 3) score += 5;
  score = Math.max(20, Math.min(100, score));

  let award = 'BRONZE DIRECTOR';
  let badgeColor = '#ff9100';
  if (score >= 90) { award = 'PLATINUM DIRECTOR'; badgeColor = '#00e5ff'; }
  else if (score >= 80) { award = 'GOLD DIRECTOR'; badgeColor = '#ffb700'; }
  else if (score >= 65) { award = 'SILVER DIRECTOR'; badgeColor = '#c0c0c0'; }

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 990,
        background: 'rgba(0,4,12,0.92)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '660px',
            background: 'rgba(2,10,25,0.96)', border: `1px solid ${badgeColor}`,
            borderRadius: 16, padding: '1.6rem', boxShadow: `0 0 50px ${badgeColor}44`,
            color: '#fff', textAlign: 'center', position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: badgeColor, letterSpacing: '0.25em' }}>
            WHO GLOBAL EMERGENCY DEBRIEF
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, margin: '4px 0 12px' }}>
            FINAL OUTBREAK RESPONSE REPORT
          </div>

          {/* Award Badge */}
          <div style={{
            display: 'inline-block', padding: '0.5rem 1.4rem', borderRadius: 20,
            background: `${badgeColor}20`, border: `1px solid ${badgeColor}`,
            fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 900,
            color: badgeColor, letterSpacing: '0.15em', marginBottom: '1.2rem',
            boxShadow: `0 0 20px ${badgeColor}44`,
          }}>
            🏆 {award} ({score}/100)
          </div>

          {/* Performance Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.2rem' }}>
            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>LIVES PROTECTED</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#00ff9d', marginTop: 2 }}>
                {((recovered + 7900000000) / 1000000000).toFixed(2)}B
              </div>
            </div>

            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>ICU STABILITY</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: icu > 80 ? '#ff3860' : '#00c8ff', marginTop: 2 }}>
                {(100 - icu).toFixed(0)}%
              </div>
            </div>

            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>VACCINATION SUCCESS</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#7b2ff7', marginTop: 2 }}>
                {vaccine}%
              </div>
            </div>
          </div>

          {/* Lessons Learned */}
          <div style={{ background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 10, padding: '0.8rem', textAlign: 'left', marginBottom: '1.2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00ff9d', letterSpacing: '0.15em', marginBottom: 4 }}>
              📚 LESSONS LEARNED & EPIDEMIOLOGICAL RECAP
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
              Early travel restrictions coupled with accelerated mRNA vaccine production successfully flattened the peak epidemic curve, keeping ICU bed occupancy manageable during key transmission surges.
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem' }}>
            <button
              onClick={() => {
                onClose?.();
                onAdvanceToBioShield?.();
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,157,0.4), rgba(0,200,255,0.4))',
                border: '1px solid #00ff9d', borderRadius: 8,
                padding: '0.65rem 1.4rem', color: '#fff',
                fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800,
                cursor: 'pointer', letterSpacing: '0.12em', boxShadow: '0 0 16px rgba(0,255,157,0.3)',
              }}
            >
              🛡️ ADVANCE TO BIOSHIELD 2050 ▶
            </button>

            <button
              onClick={() => {
                onClose?.();
                onReturnToMissionControl?.();
              }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8,
                padding: '0.65rem 1.2rem', color: 'rgba(255,255,255,0.8)',
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ◀ RETURN TO MISSION CONTROL
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
