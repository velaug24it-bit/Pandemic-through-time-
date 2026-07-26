/**
 * CountryInfoPanel.jsx
 * Slide-in glassmorphism panel showing country details.
 * Tabs: Historical Pandemics | Present Healthcare | Future Tech (all Coming Soon)
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RISK_COLORS } from '../../data/countries';

const TABS = ['Historical', 'Present', 'Future'];

export default function CountryInfoPanel({ country, onClose }) {
  const [tab, setTab] = useState(0);

  if (!country) return null;
  const color = RISK_COLORS[country.risk] || '#00c8ff';

  return (
    <AnimatePresence>
      <motion.div
        key={country.id}
        initial={{ x: 320, opacity: 0 }}
        animate={{ x: 0,   opacity: 1 }}
        exit={{ x: 320,    opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: '50%', right: 16,
          transform: 'translateY(-50%)',
          width: 300,
          zIndex: 600,
          background: 'rgba(2,8,22,0.92)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${color}33`,
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: `0 0 40px ${color}22, 0 8px 32px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Top color stripe */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, transparent)` }} />

        {/* Header */}
        <div style={{ padding: '1rem 1rem 0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.2em', marginBottom: 4 }}>
                ◈ COUNTRY PROFILE
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                {country.emoji} {country.name}
              </div>
            </div>
            <button
              onClick={onClose}
              id="btn-close-country-panel"
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 4, color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
                padding: '0.2rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              }}
            >✕</button>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.8rem' }}>
            {[
              { label: 'REGION',     val: country.region },
              { label: 'POPULATION', val: country.pop    },
              { label: 'RISK LEVEL', val: country.risk.toUpperCase(), col: color },
              { label: 'LAT / LON',  val: `${country.lat.toFixed(1)}° / ${country.lon.toFixed(1)}°` },
            ].map(({ label, val, col }) => (
              <div key={label} style={{
                background: 'rgba(0,200,255,0.05)',
                border: '1px solid rgba(0,200,255,0.1)',
                borderRadius: 6,
                padding: '0.4rem 0.6rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(0,200,255,0.45)', letterSpacing: '0.12em' }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 600, color: col || '#e0f0ff', marginTop: 2 }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderTop: '1px solid rgba(0,200,255,0.1)', borderBottom: '1px solid rgba(0,200,255,0.1)', margin: '0.6rem 0 0' }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              id={`btn-country-tab-${i}`}
              style={{
                flex: 1, padding: '0.5rem 0',
                background: tab === i ? 'rgba(0,200,255,0.12)' : 'transparent',
                border: 'none',
                borderBottom: tab === i ? `2px solid ${color}` : '2px solid transparent',
                color: tab === i ? color : 'rgba(255,255,255,0.35)',
                fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                letterSpacing: '0.08em', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '1rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* All tabs Coming Soon */}
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {['📜', '🏥', '🔬'][tab]}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'rgba(0,200,255,0.6)', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>
                  {['HISTORICAL PANDEMICS', 'PRESENT HEALTHCARE', 'FUTURE TECHNOLOGIES'][tab]}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.25)',
                  background: 'rgba(0,200,255,0.05)',
                  border: '1px solid rgba(0,200,255,0.1)',
                  borderRadius: 6, padding: '0.5rem 1rem', display: 'inline-block',
                  letterSpacing: '0.15em',
                }}>
                  COMING IN NEXT PHASE
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', marginTop: '0.6rem', lineHeight: 1.6 }}>
                  {['Data from the Historical Pandemic Museum module will populate this view.',
                    'Live WHO & CDC healthcare indices will be integrated in Phase 3.',
                    'AI-powered future health forecasting coming in Phase 5.'][tab]}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom actions */}
        <div style={{
          padding: '0.7rem 1rem',
          borderTop: '1px solid rgba(0,200,255,0.08)',
          display: 'flex', gap: '0.5rem',
        }}>
          <button style={{
            flex: 1, padding: '0.4rem 0',
            background: 'rgba(0,100,200,0.2)',
            border: `1px solid ${color}44`,
            borderRadius: 6, color, cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em',
          }}
            id="btn-country-monitor"
          >
            ◈ MONITOR
          </button>
          <button style={{
            flex: 1, padding: '0.4rem 0',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6, color: 'rgba(255,255,255,0.3)', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em',
          }}
            id="btn-country-alert"
          >
            ⚠ ALERT
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
