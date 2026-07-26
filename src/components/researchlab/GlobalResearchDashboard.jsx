/**
 * GlobalResearchDashboard.jsx
 * Workstation 7: Global WHO Research & Outbreak Monitoring Dashboard
 * Features:
 *  - Real-time global research funding metrics ($14.2B)
 *  - Global WHO clinical trial tracker (342 Active Trials)
 *  - Genome database counter (14.8M Genomes Sequenced)
 *  - AI Outbreak Early Warning Predictions
 */
import { motion } from 'framer-motion';

export default function GlobalResearchDashboard() {
  const METRICS = [
    { label: 'GENOMES SEQUENCED', value: '14,892,104', unit: 'ENTRIES', color: '#00ff9d' },
    { label: 'ACTIVE CLINICAL TRIALS', value: '342', unit: 'GLOBAL', color: '#00c8ff' },
    { label: 'VACCINES APPROVED', value: '18', unit: 'FORMULATIONS', color: '#ffb700' },
    { label: 'GLOBAL FUNDING', value: '$14.2B', unit: 'USD', color: '#7b2ff7' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: 'clamp(340px, 90vw, 650px)', zIndex: 600,
          background: 'rgba(2,10,25,0.95)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,145,0,0.4)', borderRadius: 16, padding: '1.4rem',
          boxShadow: '0 0 40px rgba(255,145,0,0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.4rem' }}>📊</span>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ff9100', letterSpacing: '0.2em' }}>
              WORKSTATION 07
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
              GLOBAL WHO RESEARCH DASHBOARD
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
          {METRICS.map(m => (
            <div key={m.label} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.8rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{m.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: m.color, margin: '2px 0' }}>{m.value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.3)' }}>{m.unit}</div>
            </div>
          ))}
        </div>

        {/* AI Early Warning Telemetry */}
        <div style={{ background: 'rgba(255,145,0,0.06)', border: '1px solid rgba(255,145,0,0.3)', borderRadius: 10, padding: '0.8rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ff9100', letterSpacing: '0.15em' }}>AI EARLY WARNING SURVEILLANCE</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#fff', marginTop: 4 }}>
            Global pathogen mutation threat level remains <b>LOW / NOMINAL</b>. All WHO international surveillance hubs reporting real-time data sync.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
