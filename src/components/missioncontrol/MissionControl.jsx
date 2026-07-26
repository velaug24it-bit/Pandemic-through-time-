/**
 * MissionControl.jsx
 * The main Mission Control HTML overlay:
 *  - Full glassmorphism layout
 *  - Left sidebar: system log feed
 *  - Center: holographic earth viewport header + Dashboard
 *  - Right panel: portal navigation (Mission Control active, others locked)
 *  - Bottom: comm network bar
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import { PORTALS } from '../../utils/constants';

/** Animated system log */
const LOG_MESSAGES = [
  '> Orbital uplink established',
  '> Satellite array synchronized',
  '> AI Core initialized',
  '> Global health feed streaming',
  '> Pathogen database: ACTIVE',
  '> Historical timeline: LOADING',
  '> Bioshield protocols: STANDBY',
  '> Comm relay: 99.9% uptime',
  '> Earth rotation: 23.5° tilt',
  '> Solar wind: nominal',
  '> Crew biometrics: nominal',
  '> Research drones: deployed',
];

function SystemLog() {
  const [logs, setLogs] = useState([LOG_MESSAGES[0]]);
  const bottomRef = useRef(null);

  useEffect(() => {
    let i = 1;
    const id = setInterval(() => {
      if (i < LOG_MESSAGES.length) {
        setLogs((prev) => [...prev, LOG_MESSAGES[i++]]);
      } else {
        i = 0;
      }
    }, 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      {logs.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            color: i === logs.length - 1 ? '#00ff9d' : 'rgba(0,200,255,0.5)',
            letterSpacing: '0.05em',
            lineHeight: 1.6,
          }}
        >
          {msg}
        </motion.div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

/** Portal button */
function PortalButton({ portal, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={portal.active ? onClick : undefined}
      whileHover={portal.active ? { scale: 1.02 } : {}}
      whileTap={portal.active ? { scale: 0.98 } : {}}
      id={`portal-${portal.id}`}
      style={{
        width: '100%',
        background: portal.active
          ? (hovered ? 'rgba(0,100,200,0.35)' : 'rgba(0,80,160,0.2)')
          : 'rgba(0,0,0,0.2)',
        border: portal.active
          ? `1px solid rgba(0,200,255,${hovered ? 0.6 : 0.3})`
          : '1px solid rgba(255,255,255,0.06)',
        borderRadius: 8,
        padding: '0.6rem 0.8rem',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: portal.active ? 'pointer' : 'not-allowed',
        transition: 'all 0.25s ease',
        boxShadow: portal.active && hovered ? '0 0 20px rgba(0,150,255,0.25)' : 'none',
      }}
    >
      {/* Status dot */}
      <div style={{
        width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
        background: portal.active ? '#00ff9d' : 'rgba(255,255,255,0.15)',
        boxShadow: portal.active ? '0 0 6px #00ff9d' : 'none',
      }} />

      {/* Label */}
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          color: portal.active ? '#00c8ff' : 'rgba(255,255,255,0.25)',
        }}>
          {portal.label.toUpperCase()}
        </div>
        {!portal.active && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>
            OFFLINE · FUTURE PHASE
          </div>
        )}
      </div>

      {/* Arrow or lock */}
      <span style={{ fontSize: '0.65rem', color: portal.active ? '#00c8ff' : 'rgba(255,255,255,0.12)' }}>
        {portal.active ? '▶' : '🔒'}
      </span>
    </motion.button>
  );
}

export default function MissionControl({ visible = true, onNavigate }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toUTCString());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="mc"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'grid',
          gridTemplateColumns: '220px 1fr 200px',
          gridTemplateRows: 'auto 1fr auto',
          gap: '0.75rem',
          padding: '3.5rem 1rem 1rem',
          pointerEvents: 'none',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* ── Top header bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            gridColumn: '1 / -1',
            background: 'rgba(0,8,20,0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,200,255,0.15)',
            borderRadius: 10,
            padding: '0.6rem 1.2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'all',
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.25em', color: '#00c8ff' }}>
            ◈ SPACE COMMAND CENTER · MISSION CONTROL
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(0,200,255,0.5)' }}>
            {time}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {['NOMINAL', 'SYNC', 'ACTIVE'].map((s) => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                padding: '0.15rem 0.5rem', borderRadius: 3,
                background: 'rgba(0,255,157,0.12)', border: '1px solid rgba(0,255,157,0.3)',
                color: '#00ff9d', letterSpacing: '0.1em',
              }}>{s}</span>
            ))}
          </div>
        </motion.div>

        {/* ── Left panel: System log ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'rgba(0,8,20,0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,200,255,0.12)',
            borderRadius: 10,
            padding: '0.8rem',
            pointerEvents: 'all',
            overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(0,200,255,0.45)', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>
            ◈ SYSTEM LOG
          </div>
          <SystemLog />
        </motion.div>

        {/* ── Center: Dashboard panels ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            overflow: 'auto',
            pointerEvents: 'all',
          }}
        >
          {/* Section label */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'rgba(0,200,255,0.4)',
            letterSpacing: '0.2em',
            paddingLeft: '0.2rem',
          }}>
            ◈ GLOBAL STATUS PANELS
          </div>
          <Dashboard visible />
        </motion.div>

        {/* ── Right panel: Portal navigation ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'rgba(0,8,20,0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,200,255,0.12)',
            borderRadius: 10,
            padding: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            pointerEvents: 'all',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(0,200,255,0.45)', letterSpacing: '0.2em', marginBottom: '0.3rem' }}>
            ◈ MODULE PORTALS
          </div>
          {PORTALS.map((p) => (
            <PortalButton
              key={p.id}
              portal={p}
              onClick={() => onNavigate?.(p.id)}
            />
          ))}
        </motion.div>

        {/* ── Bottom comm bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            gridColumn: '1 / -1',
            background: 'rgba(0,8,20,0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,200,255,0.12)',
            borderRadius: 10,
            padding: '0.5rem 1rem',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            pointerEvents: 'all',
          }}
        >
          {[
            { label: 'COMM UPLINK',    value: '99.9%',    color: '#00ff9d' },
            { label: 'POWER',          value: '94.1%',    color: '#00c8ff' },
            { label: 'AI CORE',        value: 'ONLINE',   color: '#00ff9d' },
            { label: 'THREAT LEVEL',   value: 'MODERATE', color: '#ffb700' },
            { label: 'SATELLITES',     value: '247/247',  color: '#00c8ff' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.1em' }}>
                {item.label}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: item.color, fontWeight: 700 }}>
                {item.value}
              </span>
            </div>
          ))}

          {/* Comm wave animation */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            {Array.from({ length: 24 }, (_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05 }}
                style={{ width: 3, background: '#00c8ff', borderRadius: 2, opacity: 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
