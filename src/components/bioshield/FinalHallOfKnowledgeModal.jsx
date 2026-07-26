/**
 * FinalHallOfKnowledgeModal.jsx
 * Final Hall of Knowledge & Digital Certificate for Phase 7 (Module 13).
 * Awarded upon completing the entire journey:
 *  - Timeline recap of Humanity vs Pandemics
 *  - Preparedness principles & global cooperation message
 *  - Printable Digital Certificate: "Global Pandemic Preparedness Champion"
 */
import { motion, AnimatePresence } from 'framer-motion';

export default function FinalHallOfKnowledgeModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 995,
        background: 'rgba(0,4,12,0.94)', backdropFilter: 'blur(24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '680px',
            background: 'rgba(2,12,28,0.98)', border: '2px solid #00ff9d',
            borderRadius: 20, padding: '1.8rem', boxShadow: '0 0 60px rgba(0,255,157,0.4)',
            color: '#fff', textAlign: 'center', position: 'relative',
            maxHeight: '90vh', overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff',
              cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '1rem',
            }}
          >
            ✕
          </button>

          {/* Certificate Header */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#00ff9d', letterSpacing: '0.25em' }}>
            WORLD HEALTH ORGANIZATION · GLOBAL BIOSECURITY DIPLOMA
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '4px 0 12px' }}>
            OFFICIAL CERTIFICATE OF PREPAREDNESS
          </div>

          {/* Golden Certificate Badge */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,255,157,0.12), rgba(0,200,255,0.12))',
            border: '1px solid #00ff9d', borderRadius: 16, padding: '1.2rem',
            marginBottom: '1.2rem', boxShadow: '0 0 30px rgba(0,255,157,0.2)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 4 }}>📜</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)' }}>THIS DIPLOMA CERTIFIES THAT THE BEARER IS AWARDED THE TITLE OF</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: '#00ff9d', margin: '6px 0', letterSpacing: '0.1em' }}>
              GLOBAL PANDEMIC PREPAREDNESS CHAMPION
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00c8ff' }}>
              GRANTED FOR MASTERING PANDEMIC HISTORY, CELLULAR BIOLOGY, GENOMIC RESEARCH & BIOSECURITY
            </div>
          </div>

          {/* Core Principles Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.4rem', textAlign: 'left' }}>
            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', fontWeight: 700 }}>🔬 SCIENCE FIRST</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                Rapid genomic sequencing and mRNA vaccines save millions of lives.
              </div>
            </div>

            <div style={{ background: 'rgba(0,255,157,0.05)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00ff9d', fontWeight: 700 }}>🌐 GLOBAL UNITY</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                No nation is safe until every nation is protected through vaccine sharing.
              </div>
            </div>

            <div style={{ background: 'rgba(123,47,247,0.05)', border: '1px solid rgba(123,47,247,0.15)', borderRadius: 8, padding: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#7b2ff7', fontWeight: 700 }}>🛡️ EARLY SURVEILLANCE</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                AI bio-monitors & digital twins detect outbreaks before they spread.
              </div>
            </div>
          </div>

          {/* Final Inspiring Message */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#fff', fontStyle: 'italic', marginBottom: '1.4rem', lineHeight: 1.5 }}>
            "Through scientific discovery, public education, and global cooperation, humanity builds a healthier and safer world for future generations."
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem' }}>
            <button
              onClick={() => window.print()}
              style={{
                background: 'rgba(0,255,157,0.2)', border: '1px solid #00ff9d',
                borderRadius: 8, padding: '0.6rem 1.4rem', color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🖨️ PRINT CERTIFICATE
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, rgba(0,200,255,0.4), rgba(0,255,157,0.4))',
                border: '1px solid #00c8ff', borderRadius: 8, padding: '0.6rem 1.4rem',
                color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer',
              }}
            >
              RETURN TO METROPOLIS ▶
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
