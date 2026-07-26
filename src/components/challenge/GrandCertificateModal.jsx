/**
 * GrandCertificateModal.jsx
 * Final Printable & Downloadable Digital Certificate Modal for Phase 8 (Module 10).
 * Title: "Global Pandemic Preparedness Specialist"
 * Features:
 *  - Interactive User Name editor saved to localStorage
 *  - Completion Date & Score summary
 *  - PDF Download & Print triggers
 */
import { motion, AnimatePresence } from 'framer-motion';

export default function GrandCertificateModal({
  visible,
  userName = 'Commander Director',
  onUpdateUserName,
  overallScore = 980,
  onClose,
}) {
  if (!visible) return null;

  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

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
            width: '100%', maxWidth: '720px',
            background: 'rgba(2,12,28,0.98)', border: '2px solid #ff3860',
            borderRadius: 20, padding: '1.8rem', boxShadow: '0 0 60px rgba(255,56,96,0.4)',
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#ff3860', letterSpacing: '0.25em' }}>
            WORLD HEALTH ORGANIZATION · INTERNATIONAL BIOSECURITY ACADEMY
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '4px 0 12px' }}>
            MASTER DIPLOMA OF PANDEMIC PREPAREDNESS
          </div>

          {/* Certificate Body Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,56,96,0.12), rgba(123,47,247,0.12))',
            border: '1px solid #ff3860', borderRadius: 16, padding: '1.4rem',
            marginBottom: '1.2rem', boxShadow: '0 0 30px rgba(255,56,96,0.2)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 4 }}>🎖️</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)' }}>THIS DIPLOMA OFFICIALLY CERTIFIES THAT</div>
            
            {/* Editable Name Field */}
            <div style={{ margin: '8px 0' }}>
              <input
                type="text"
                value={userName}
                onChange={(e) => onUpdateUserName?.(e.target.value)}
                style={{
                  textAlign: 'center', background: 'rgba(0,0,0,0.4)',
                  border: '1px solid #ff3860', borderRadius: 8, padding: '0.4rem 1rem',
                  color: '#00ff9d', fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                  fontWeight: 900, letterSpacing: '0.08em', width: '100%', maxWidth: '420px',
                }}
              />
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(255,255,255,0.7)' }}>HAS SUCCESSFULLY COMPLETED ALL 8 PHASES AND IS CONFERRED THE TITLE OF</div>
            
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 900, color: '#00ff9d', margin: '8px 0', letterSpacing: '0.12em' }}>
              GLOBAL PANDEMIC PREPAREDNESS SPECIALIST
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00c8ff' }}>
              <span>DATE CONFERRED: {todayStr}</span>
              <span>FINAL SCORE: {overallScore} / 1000 PTS</span>
              <span>VERIFICATION: WHO-2050-SPECIALIST</span>
            </div>
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
              🖨️ PRINT DIPLOMA
            </button>

            <button
              onClick={() => window.print()}
              style={{
                background: 'linear-gradient(135deg, rgba(255,56,96,0.4), rgba(123,47,247,0.4))',
                border: '1px solid #ff3860', borderRadius: 8, padding: '0.6rem 1.4rem',
                color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer',
              }}
            >
              📄 DOWNLOAD PDF DIPLOMA
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
