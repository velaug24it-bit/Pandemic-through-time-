/**
 * AIDiagnosticCenter.jsx
 * Workstation 4: AI Diagnostic Center
 * Features:
 *  - Upload blood/cell/pathogen sample
 *  - AI Automated Disease Pathology Detection
 *  - Severity Estimator & Confidence Rating (e.g. 99.4%)
 *  - AI Recommended Medical Treatment & Interventions
 */
import { useState } from 'react';
import { motion } from 'framer-motion';

const DIAGNOSTIC_CASES = [
  { id: 'covid', name: 'Sample #8921 (Nasopharyngeal Swab)', disease: 'COVID-19 (SARS-CoV-2)', severity: 'Moderate-High', confidence: '99.4%', treatment: 'Paxlovid, Monoclonal Antibodies, Oxygen Support', color: '#ff3860' },
  { id: 'plague', name: 'Sample #4412 (Bubo Lymph Aspirate)', disease: 'Bubonic Plague (Y. pestis)', severity: 'Critical', confidence: '99.8%', treatment: 'IV Streptomycin, Doxycycline, Isolation', color: '#ffb700' },
  { id: 'ebola', name: 'Sample #1092 (Serum Sample)', disease: 'Ebola Hemorrhagic Fever', severity: 'Severe', confidence: '98.9%', treatment: 'Inmazeb mAb, Fluid Replacement', color: '#76ff03' },
];

export default function AIDiagnosticCenter() {
  const [activeCase, setActiveCase] = useState(DIAGNOSTIC_CASES[0]);
  const [analyzing,  setAnalyzing]  = useState(false);
  const [result,     setResult]     = useState(true);

  const runAnalysis = (c) => {
    setActiveCase(c);
    setAnalyzing(true);
    setResult(false);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 1200);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Control Drawer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: 'clamp(320px, 90vw, 550px)', zIndex: 600,
          background: 'rgba(2,10,25,0.94)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,183,0,0.4)', borderRadius: 16, padding: '1.4rem',
          boxShadow: '0 0 40px rgba(255,183,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🤖</span>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ffb700', letterSpacing: '0.2em' }}>
              WORKSTATION 04
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
              AI DIAGNOSTIC CENTER
            </div>
          </div>
        </div>

        {/* Case Selectors */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>SELECT PATIENT SAMPLE:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
          {DIAGNOSTIC_CASES.map(c => (
            <button
              key={c.id}
              onClick={() => runAnalysis(c)}
              style={{
                textAlign: 'left', padding: '0.5rem 0.8rem',
                background: activeCase.id === c.id ? 'rgba(255,183,0,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeCase.id === c.id ? '#ffb700' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 8, cursor: 'pointer',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, color: '#fff' }}>{c.name}</div>
            </button>
          ))}
        </div>

        {/* Diagnostic Results Card */}
        {analyzing ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.0rem', color: '#ffb700', letterSpacing: '0.15em' }}>RUNNING AI NEURAL PATHOLOGY SCAN...</div>
          </div>
        ) : result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,183,0,0.06)', border: '1px solid rgba(255,183,0,0.3)', borderRadius: 10, padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.5)' }}>DETECTED PATHOGEN</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00ff9d', fontWeight: 700 }}>CONFIDENCE: {activeCase.confidence}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, color: activeCase.color, marginBottom: 8 }}>
              {activeCase.disease}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: '0.4rem 0.6rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: 'rgba(255,255,255,0.4)' }}>SEVERITY INDEX</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>{activeCase.severity}</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: '0.4rem 0.6rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: 'rgba(255,255,255,0.4)' }}>AI STATUS</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ff9d', fontWeight: 700 }}>VERIFIED</div>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ffb700', marginBottom: 2 }}>RECOMMENDED TREATMENT PROTOCOL:</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#fff' }}>{activeCase.treatment}</div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
