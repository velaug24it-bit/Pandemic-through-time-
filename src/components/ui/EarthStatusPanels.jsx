/**
 * EarthStatusPanels.jsx
 * 7 holographic floating status panels around the Earth View.
 * Positioned on the left side in a scrollable column.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PANEL_DATA = [
  {
    id: 'earth',
    icon: '🌍',
    title: 'EARTH STATUS',
    color: '#00c8ff',
    metrics: [
      { label: 'Biosphere',    value: '98.7%',  status: 'nominal'  },
      { label: 'Oceans',       value: '97.2%',  status: 'nominal'  },
      { label: 'Atmosphere',   value: '99.1%',  status: 'nominal'  },
      { label: 'Land Mass',    value: '100%',   status: 'nominal'  },
    ],
  },
  {
    id: 'health',
    icon: '🏥',
    title: 'GLOBAL HEALTH',
    color: '#ff6600',
    metrics: [
      { label: 'Health Index',    value: '74.2',  status: 'warning'  },
      { label: 'Active Outbreaks',value: '12',    status: 'critical' },
      { label: 'Vaccinated Pop.', value: '61.8%', status: 'warning'  },
      { label: 'Threat Level',    value: 'MOD',   status: 'warning'  },
    ],
  },
  {
    id: 'sats',
    icon: '🛰️',
    title: 'SATELLITE NET',
    color: '#7b2ff7',
    metrics: [
      { label: 'Satellites',   value: '8/8',   status: 'nominal'  },
      { label: 'Coverage',     value: '94.3%', status: 'nominal'  },
      { label: 'Latency',      value: '12ms',  status: 'nominal'  },
      { label: 'Data Rate',    value: '2.4Gbps',status:'nominal'  },
    ],
  },
  {
    id: 'monitor',
    icon: '👁️',
    title: 'ACTIVE MONITOR',
    color: '#00ff9d',
    metrics: [
      { label: 'Countries',     value: '50',    status: 'nominal'  },
      { label: 'Scan Rate',     value: '60Hz',  status: 'nominal'  },
      { label: 'Alerts Today',  value: '23',    status: 'warning'  },
      { label: 'Flagged Zones', value: '4',     status: 'critical' },
    ],
  },
  {
    id: 'comms',
    icon: '📡',
    title: 'COMMUNICATIONS',
    color: '#ffb700',
    metrics: [
      { label: 'Uplink',        value: '99.9%', status: 'nominal'  },
      { label: 'WHO Feed',      value: 'LIVE',  status: 'nominal'  },
      { label: 'CDC Feed',      value: 'LIVE',  status: 'nominal'  },
      { label: 'Data Centers',  value: '6/6',   status: 'nominal'  },
    ],
  },
  {
    id: 'research',
    icon: '🧬',
    title: 'RESEARCH',
    color: '#ff3860',
    metrics: [
      { label: 'Progress',      value: '62%',   status: 'nominal'  },
      { label: 'Pathogens',     value: '14',    status: 'warning'  },
      { label: 'Vaccines',      value: '6',     status: 'nominal'  },
      { label: 'AI Models',     value: '3',     status: 'nominal'  },
    ],
  },
  {
    id: 'missions',
    icon: '🚀',
    title: 'FUTURE MISSIONS',
    color: '#00e5ff',
    metrics: [
      { label: 'Phase 3',       value: 'QUEUED',status: 'nominal'  },
      { label: 'Phase 4',       value: 'QUEUED',status: 'nominal'  },
      { label: 'Phase 5',       value: 'QUEUED',status: 'nominal'  },
      { label: 'VR Mode',       value: 'QUEUED',status: 'nominal'  },
    ],
  },
];

const STATUS_COLORS = { nominal: '#00ff9d', warning: '#ffb700', critical: '#ff3860' };

function AnimatedBar({ value, color }) {
  const pct = parseFloat(value) || 50;
  return (
    <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
      <div style={{
        height: '100%', borderRadius: 2,
        width: `${Math.min(pct, 100)}%`,
        background: color,
        transition: 'width 1s ease',
      }} />
    </div>
  );
}

function StatusPanel({ data, delay }) {
  const [expanded, setExpanded] = useState(false);
  const [tick, setTick] = useState(0);

  // Live-update shimmer
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      onClick={() => setExpanded(e => !e)}
      style={{
        background: 'rgba(2,8,22,0.88)',
        backdropFilter: 'blur(14px)',
        border: `1px solid ${data.color}28`,
        borderLeft: `2px solid ${data.color}`,
        borderRadius: '0 10px 10px 0',
        marginBottom: 6,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        boxShadow: `0 2px 12px ${data.color}15`,
      }}
      whileHover={{ x: 4 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.7rem' }}>
        <span style={{ fontSize: '0.75rem' }}>{data.icon}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.5rem', color: data.color, letterSpacing: '0.15em', flex: 1 }}>
          {data.title}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.25)' }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* Expanded metrics */}
      {expanded && (
        <motion.div
          initial={{ height: 0 }} animate={{ height: 'auto' }}
          style={{ padding: '0 0.7rem 0.5rem', borderTop: `1px solid ${data.color}15` }}
        >
          {data.metrics.map(m => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.35rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.35)', width: 80, flexShrink: 0 }}>
                {m.label}
              </div>
              <AnimatedBar value={m.value} color={STATUS_COLORS[m.status]} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: STATUS_COLORS[m.status], width: 44, textAlign: 'right', flexShrink: 0 }}>
                {m.value}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function EarthStatusPanels() {
  return (
    <div style={{
      position: 'fixed',
      top: 150, left: 12,
      zIndex: 500,
      width: 220,
      padding: '0.2rem 0',
      maxHeight: 'calc(100vh - 220px)',
      overflowY: 'auto',
      scrollbarWidth: 'none',
    }}>
      {PANEL_DATA.map((d, i) => (
        <StatusPanel key={d.id} data={d} delay={i * 0.07} />
      ))}
    </div>
  );
}
