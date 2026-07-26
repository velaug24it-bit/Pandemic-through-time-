/**
 * DigitalMicroscopeStation.jsx
 * Workstation 3: 3D Digital Microscope Station 2D Overlay
 * Features:
 *  - 3D Digital Microscope Lens & Optics controls
 *  - Magnification slider (100x – 1,000,000x)
 *  - Sample Stage Switcher (Virus, Bacteria, Healthy Host Cell, Infected Cell, Blood Sample)
 */
import { useState } from 'react';
import { motion } from 'framer-motion';

const SAMPLES = [
  { id: 'virus',    name: 'Coronavirus (SARS-CoV-2)', mag: '500,000x', type: 'Viral Particle' },
  { id: 'bacteria', name: 'Plague (Yersinia pestis)',   mag: '50,000x',  type: 'Bacterial Rod' },
  { id: 'cell',     name: 'Epithelial Host Cell',      mag: '2,000x',   type: 'Human Host Cell' },
  { id: 'blood',    name: 'Bloodstream Sample',        mag: '1,000x',   type: 'Circulatory Tissue' },
];

export default function DigitalMicroscopeStation() {
  const [sampleId, setSampleId] = useState('virus');
  const [zoomLevel, setZoomLevel] = useState(1.2);

  const sample = SAMPLES.find(s => s.id === sampleId) || SAMPLES[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: 'fixed', top: 70, left: 16, width: 310, zIndex: 600,
        background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(123,47,247,0.3)', borderRadius: 14, padding: '1rem',
        boxShadow: '0 0 30px rgba(123,47,247,0.2)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#7b2ff7', letterSpacing: '0.2em' }}>
        WORKSTATION 03
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
        DIGITAL MICROSCOPE
      </div>

      {/* Sample Switcher */}
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>SELECT MICROSCOPIC SAMPLE:</label>
      <select
        value={sampleId}
        onChange={(e) => setSampleId(e.target.value)}
        style={{
          width: '100%', marginTop: 4, padding: '0.4rem',
          background: 'rgba(0,10,25,0.8)', border: '1px solid #7b2ff7',
          borderRadius: 6, color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.75rem',
          marginBottom: '0.8rem',
        }}
      >
        {SAMPLES.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {/* Magnification Slider */}
      <div style={{ marginBottom: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#7b2ff7', marginBottom: 4 }}>
          <span>MAGNIFICATION</span>
          <span style={{ color: '#fff' }}>{sample.mag}</span>
        </div>
        <input
          type="range" min="0.5" max="2.5" step="0.1"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: '#7b2ff7' }}
        />
      </div>

      {/* Sample Telemetry Card */}
      <div style={{ background: 'rgba(123,47,247,0.06)', border: '1px solid rgba(123,47,247,0.2)', borderRadius: 8, padding: '0.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)' }}>SAMPLE CLASSIFICATION</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginTop: 2 }}>{sample.name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#7b2ff7', marginTop: 2 }}>TYPE: {sample.type}</div>
      </div>
    </motion.div>
  );
}
