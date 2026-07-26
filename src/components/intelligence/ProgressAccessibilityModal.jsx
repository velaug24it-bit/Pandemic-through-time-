/**
 * ProgressAccessibilityModal.jsx
 * Progress Tracker & Accessibility Settings for Phase 9 (Modules 9 & 12).
 * Features:
 *  - Completion matrix across all 8 phases
 *  - Theme mode toggle (Dark / Light)
 *  - Font scale controls (100%, 120%, 140%)
 *  - High contrast mode toggle
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASE_PROGRESS = [
  { phase: 'Phase 1', name: 'Space Command Center', done: true, icon: '🚀' },
  { phase: 'Phase 2', name: 'Interactive Digital Earth', done: true, icon: '🌍' },
  { phase: 'Phase 3', name: 'Historical Pandemic Museum', done: true, icon: '🏛️' },
  { phase: 'Phase 4', name: 'Human Body Journey', done: true, icon: '🔬' },
  { phase: 'Phase 5', name: 'AI Biomedical Research Lab', done: true, icon: '🧬' },
  { phase: 'Phase 6', name: 'Global Pandemic Response Center', done: true, icon: '🚨' },
  { phase: 'Phase 7', name: 'BioShield 2050 Smart City', done: true, icon: '🛡️' },
  { phase: 'Phase 8', name: 'Crisis Challenge Platform', done: true, icon: '🏆' },
];

export default function ProgressAccessibilityModal({ visible, onClose }) {
  const [themeMode, setThemeMode] = useState('dark');
  const [fontScale, setFontScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

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
            width: '100%', maxWidth: '780px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(0,255,157,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(0,255,157,0.3)',
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00ff9d', letterSpacing: '0.2em' }}>
            MODULE 9 & 12 · PROGRESS & ACCESSIBILITY
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 1rem' }}>
            LEARNING PROGRESS TRACKER & UI SETTINGS
          </div>

          {/* Progress Tracker (Module 9) */}
          <div style={{ background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00ff9d', letterSpacing: '0.15em' }}>
                LEARNING JOURNEY PROGRESS: 100% COMPLETED
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 900, color: '#00ff9d' }}>
                8 / 8 PHASES CLEARED
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {PHASE_PROGRESS.map(p => (
                <div key={p.phase} style={{ background: 'rgba(0,255,157,0.08)', border: '1px solid #00ff9d', borderRadius: 8, padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.3rem' }}>{p.icon}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#00ff9d', fontWeight: 700, marginTop: 2 }}>{p.phase}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', fontWeight: 800, color: '#fff', marginTop: 2 }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Settings (Module 12) */}
          <div style={{ background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.2)', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: '0.8rem' }}>
              ♿ ACCESSIBILITY & UI PREFERENCES
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
              {/* Theme Mode */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>THEME MODE</div>
                <button
                  onClick={() => setThemeMode(m => m === 'dark' ? 'light' : 'dark')}
                  style={{
                    width: '100%', padding: '0.4rem', borderRadius: 6,
                    background: 'rgba(0,200,255,0.15)', border: '1px solid #00c8ff',
                    color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.52rem', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {themeMode === 'dark' ? '🌙 DARK MODE' : '☀️ LIGHT MODE'}
                </button>
              </div>

              {/* Font Scale */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>FONT SCALING</div>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  {[100, 120, 140].map(scale => (
                    <button
                      key={scale}
                      onClick={() => setFontScale(scale)}
                      style={{
                        flex: 1, padding: '0.4rem', borderRadius: 6,
                        background: fontScale === scale ? 'rgba(0,255,157,0.25)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${fontScale === scale ? '#00ff9d' : 'rgba(255,255,255,0.1)'}`,
                        color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', cursor: 'pointer',
                      }}
                    >
                      {scale}%
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>HIGH CONTRAST</div>
                <button
                  onClick={() => setHighContrast(c => !c)}
                  style={{
                    width: '100%', padding: '0.4rem', borderRadius: 6,
                    background: highContrast ? 'rgba(255,183,0,0.25)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${highContrast ? '#ffb700' : 'rgba(255,255,255,0.1)'}`,
                    color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.52rem', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {highContrast ? '⚡ CONTRAST ON' : '○ NORMAL'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
