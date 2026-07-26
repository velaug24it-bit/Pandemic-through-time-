/**
 * EarthHUD.jsx
 * Top header HUD for Earth View mode.
 * Shows: mode title, live clock, coordinates, zoom level, selected country.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(0,200,255,0.7)' }}>
      {time.toUTCString().replace('GMT', 'UTC')}
    </span>
  );
}

export default function EarthHUD({ selectedCountry, cameraInfo }) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.2rem',
        height: 46,
        background: 'rgba(1,4,9,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,200,255,0.15)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Left – mode title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#00c8ff', fontSize: '0.8rem' }}>🌍</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, color: '#00c8ff', letterSpacing: '0.2em' }}>
            INTERACTIVE DIGITAL EARTH
          </span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
          color: 'rgba(0,200,255,0.4)', letterSpacing: '0.12em',
          borderLeft: '1px solid rgba(0,200,255,0.15)',
          paddingLeft: '1rem',
        }}>
          PANDEMIC MONITORING SYSTEM v2.0
        </div>
      </div>

      {/* Center – selected country or instructions */}
      <div style={{ textAlign: 'center' }}>
        {selectedCountry ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.9rem' }}>{selectedCountry.emoji}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#fff', fontWeight: 600 }}>
              {selectedCountry.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,200,0,0.6)', letterSpacing: '0.1em' }}>
              · SELECTED
            </span>
          </div>
        ) : (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.3)', letterSpacing: '0.12em' }}>
            CLICK A MARKER TO SELECT · DRAG TO ROTATE · SCROLL TO ZOOM
          </div>
        )}
      </div>

      {/* Right – clock & live badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <LiveClock />
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em',
          color: 'rgba(0,255,157,0.7)',
          background: 'rgba(0,255,157,0.08)',
          border: '1px solid rgba(0,255,157,0.2)',
          borderRadius: 4, padding: '0.15rem 0.5rem',
        }}>
          ● LIVE
        </div>
      </div>
    </motion.div>
  );
}
