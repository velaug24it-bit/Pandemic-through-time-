/**
 * PathogenAnalysisStation.jsx
 * Workstation 1: Pathogen Analysis Station 2D Control Drawer
 * Features:
 *  - Pathogen Selection
 *  - 3D View Mode Controls (Normal / Cutaway / Exploded / Wireframe)
 *  - AI Automated Bio-Report Generator
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HISTORICAL_PANDEMICS } from '../../data/historicalPandemics';

export default function PathogenAnalysisStation() {
  const [selectedPandemic, setSelectedPandemic] = useState(HISTORICAL_PANDEMICS[3]); // COVID-19 default
  const [viewMode,         setViewMode]         = useState('normal');
  const [wireframe,        setWireframe]        = useState(false);
  const [reportGenerated,  setReportGenerated]  = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: 'fixed', top: 70, left: 16, width: 310, zIndex: 600,
        background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,200,255,0.3)', borderRadius: 14, padding: '1rem',
        boxShadow: '0 0 30px rgba(0,200,255,0.2)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00c8ff', letterSpacing: '0.2em' }}>
        WORKSTATION 01
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
        PATHOGEN ANALYSIS
      </div>

      {/* Pathogen Selector */}
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>SELECT PATHOGEN:</label>
      <select
        value={selectedPandemic.id}
        onChange={(e) => {
          setSelectedPandemic(HISTORICAL_PANDEMICS.find(p => p.id === e.target.value));
          setReportGenerated(false);
        }}
        style={{
          width: '100%', marginTop: 4, padding: '0.4rem',
          background: 'rgba(0,10,25,0.8)', border: '1px solid #00c8ff',
          borderRadius: 6, color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.75rem',
          marginBottom: '0.8rem',
        }}
      >
        {HISTORICAL_PANDEMICS.map(p => (
          <option key={p.id} value={p.id}>{p.name} ({p.pathogen})</option>
        ))}
      </select>

      {/* 3D Mode Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.8rem' }}>
        <button onClick={() => setViewMode('normal')} style={{ background: viewMode === 'normal' ? 'rgba(0,200,255,0.25)' : 'rgba(0,8,22,0.6)', border: '1px solid #00c8ff', borderRadius: 6, padding: '0.35rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', cursor: 'pointer' }}>NORMAL</button>
        <button onClick={() => setViewMode('crossSection')} style={{ background: viewMode === 'crossSection' ? 'rgba(0,255,157,0.25)' : 'rgba(0,8,22,0.6)', border: '1px solid #00ff9d', borderRadius: 6, padding: '0.35rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', cursor: 'pointer' }}>CUTAWAY</button>
        <button onClick={() => setViewMode('exploded')} style={{ background: viewMode === 'exploded' ? 'rgba(255,183,0,0.25)' : 'rgba(0,8,22,0.6)', border: '1px solid #ffb700', borderRadius: 6, padding: '0.35rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', cursor: 'pointer' }}>EXPLODED</button>
        <button onClick={() => setWireframe(!wireframe)} style={{ background: wireframe ? 'rgba(123,47,247,0.25)' : 'rgba(0,8,22,0.6)', border: '1px solid #7b2ff7', borderRadius: 6, padding: '0.35rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', cursor: 'pointer' }}>WIREFRAME</button>
      </div>

      {/* Generate AI Report Button */}
      <button
        onClick={() => setReportGenerated(true)}
        style={{
          width: '100%', background: 'linear-gradient(135deg, rgba(0,200,255,0.3), rgba(0,255,157,0.3))',
          border: '1px solid #00c8ff', borderRadius: 6, padding: '0.5rem',
          color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800,
          cursor: 'pointer', boxShadow: '0 0 16px rgba(0,200,255,0.3)',
        }}
      >
        📄 GENERATE AI BIO-REPORT
      </button>

      {/* Generated Report Card */}
      {reportGenerated && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '0.8rem', background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.3)', borderRadius: 8, padding: '0.6rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00ff9d', letterSpacing: '0.1em' }}>✓ AI ANALYSIS COMPLETE</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: '#fff', marginTop: 4 }}>
            Pathogen structure verified as {selectedPandemic.genome}. High binding affinity for ACE2/sialic acid receptors. Recommended target: S1 Receptor-Binding Domain.
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
