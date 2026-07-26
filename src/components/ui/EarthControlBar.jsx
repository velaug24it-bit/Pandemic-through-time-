/**
 * EarthControlBar.jsx
 * Floating bottom-center control dock for Earth View.
 * Controls: auto-rotate toggle, zoom in/out, reset, bioshield, heatmap, routes
 * Flexbox Centering Wrapper: Guarantees true horizontal centering at the bottom.
 */
import { motion } from 'framer-motion';

function ControlBtn({ icon, label, active, onClick, id, color = '#00c8ff' }) {
  return (
    <motion.button
      onClick={onClick}
      id={id}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      title={label}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        background: active ? `rgba(0,100,200,0.35)` : 'rgba(0,8,22,0.7)',
        border: `1px solid ${active ? color : 'rgba(0,200,255,0.2)'}`,
        borderRadius: 10,
        padding: '0.55rem 0.7rem',
        cursor: 'pointer', color: active ? color : 'rgba(0,200,255,0.55)',
        boxShadow: active ? `0 0 14px ${color}44` : 'none',
        transition: 'all 0.2s',
        minWidth: 50,
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </motion.button>
  );
}

export default function EarthControlBar({
  autoRotate, onToggleRotate,
  showShield, onToggleShield,
  showRoutes, onToggleRoutes,
  showOrbits, onToggleOrbits,
  onZoomIn, onZoomOut, onReset,
  onBack,
}) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 24, left: 0, right: 0,
      zIndex: 600,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 1rem',
      pointerEvents: 'none',
    }}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        style={{
          pointerEvents: 'all',
          display: 'flex', gap: '0.5rem', alignItems: 'center',
          background: 'rgba(2,8,22,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,200,255,0.18)',
          borderRadius: 16,
          padding: '0.6rem 1rem',
          boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,200,255,0.1)',
        }}
      >
        {/* Back to Mission Control */}
        <ControlBtn icon="◀" label="BACK"     onClick={onBack}           id="btn-earth-back"    active={false} color="#ff6600" />

        <div style={{ width: 1, height: 28, background: 'rgba(0,200,255,0.15)', margin: '0 0.2rem' }} />

        <ControlBtn icon={autoRotate ? '⏸' : '▶'} label="ROTATE"   onClick={onToggleRotate}   id="btn-earth-rotate"  active={autoRotate} />
        <ControlBtn icon="🛡️"                     label="SHIELD"   onClick={onToggleShield}   id="btn-earth-shield"  active={showShield} color="#00ff9d" />
        <ControlBtn icon="✈️"                     label="ROUTES"   onClick={onToggleRoutes}   id="btn-earth-routes"  active={showRoutes} color="#ffb700" />
        <ControlBtn icon="🛰️"                     label="ORBITS"   onClick={onToggleOrbits}   id="btn-earth-orbits"  active={showOrbits} color="#7b2ff7" />

        <div style={{ width: 1, height: 28, background: 'rgba(0,200,255,0.15)', margin: '0 0.2rem' }} />

        <ControlBtn icon="🎯" label="RESET"    onClick={onReset}          id="btn-earth-reset"   active={false} />
      </motion.div>
    </div>
  );
}
