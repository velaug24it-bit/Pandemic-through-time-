/**
 * PathogenComparisonModal.jsx
 * Side-by-side comparison modal allowing the user to select any two pathogens
 * and compare their biological traits:
 *  - Pathogen Name & Type
 *  - Family & Genome
 *  - Size & Geometry
 *  - Host / Vector
 *  - Target Organs
 *  - Incubation Period
 *  - Mortality Rate
 *  - Vaccine & Treatments
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HISTORICAL_PANDEMICS } from '../../data/historicalPandemics';

export default function PathogenComparisonModal({ visible, currentPathogen, onClose }) {
  const [p1, setP1] = useState(currentPathogen || HISTORICAL_PANDEMICS[0]);
  const [p2, setP2] = useState(HISTORICAL_PANDEMICS[3] || HISTORICAL_PANDEMICS[1]);

  if (!visible) return null;

  const METRICS = [
    { label: 'PATHOGEN NAME', k: 'pathogen' },
    { label: 'ERA / YEAR',    k: 'era' },
    { label: 'CLASSIFICATION',k: 'type' },
    { label: 'FAMILY',        k: 'family' },
    { label: 'GENOME',        k: 'genome' },
    { label: 'PARTICLE SIZE', k: 'size' },
    { label: 'HOST / VECTOR', k: 'host' },
    { label: 'TARGET ORGANS', k: 'organs' },
    { label: 'INCUBATION',    k: 'incubation' },
    { label: 'MORTALITY RATE',k: 'mortality' },
    { label: 'VACCINE STATUS',k: 'vaccine' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 900,
          width: 'clamp(340px, 90vw, 750px)',
          maxHeight: '85vh',
          background: 'rgba(2,10,25,0.96)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0,200,255,0.3)',
          borderRadius: 16,
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 0 50px rgba(0,200,255,0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', letterSpacing: '0.2em' }}>
              ◈ BIOMEDICAL COMPARISON MATRIX
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              SIDE-BY-SIDE PATHOGEN ANALYSIS
            </div>
          </div>
          <button
            onClick={onClose}
            id="btn-close-comparison"
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 4, color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
              padding: '0.3rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            }}
          >✕</button>
        </div>

        {/* Dropdown selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          {/* Selector 1 */}
          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(0,200,255,0.6)', letterSpacing: '0.1em' }}>
              PATHOGEN 1:
            </label>
            <select
              value={p1.id}
              onChange={(e) => setP1(HISTORICAL_PANDEMICS.find(p => p.id === e.target.value))}
              style={{
                width: '100%', marginTop: 4, padding: '0.4rem',
                background: 'rgba(0,10,25,0.8)', border: `1px solid ${p1.color || '#00c8ff'}`,
                borderRadius: 6, color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.75rem',
              }}
            >
              {HISTORICAL_PANDEMICS.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.pathogen})</option>
              ))}
            </select>
          </div>

          {/* Selector 2 */}
          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(123,47,247,0.6)', letterSpacing: '0.1em' }}>
              PATHOGEN 2:
            </label>
            <select
              value={p2.id}
              onChange={(e) => setP2(HISTORICAL_PANDEMICS.find(p => p.id === e.target.value))}
              style={{
                width: '100%', marginTop: 4, padding: '0.4rem',
                background: 'rgba(0,10,25,0.8)', border: `1px solid ${p2.color || '#7b2ff7'}`,
                borderRadius: 6, color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.75rem',
              }}
            >
              {HISTORICAL_PANDEMICS.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.pathogen})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div style={{ flex: 1, overflowY: 'auto', border: '1px solid rgba(0,200,255,0.1)', borderRadius: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,200,255,0.08)', borderBottom: '1px solid rgba(0,200,255,0.15)' }}>
                <th style={{ padding: '0.5rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.6)', width: '30%' }}>TRAIT</th>
                <th style={{ padding: '0.5rem 0.8rem', fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: p1.color || '#00c8ff', width: '35%' }}>{p1.name}</th>
                <th style={{ padding: '0.5rem 0.8rem', fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: p2.color || '#7b2ff7', width: '35%' }}>{p2.name}</th>
              </tr>
            </thead>
            <tbody>
              {METRICS.map((m, idx) => (
                <tr key={m.k} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'rgba(0,200,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.45rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(0,200,255,0.5)' }}>{m.label}</td>
                  <td style={{ padding: '0.45rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#ffffff' }}>{p1[m.k] || '—'}</td>
                  <td style={{ padding: '0.45rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#ffffff' }}>{p2[m.k] || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
