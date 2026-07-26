/**
 * VaccinePipelineCenter.jsx
 * Workstation 6: 9-Stage Vaccine Creation & Manufacturing Pipeline
 * Stages:
 *  1. Pathogen Identification
 *  2. Genome Sequencing
 *  3. Antigen Selection
 *  4. Vaccine Platform Design (mRNA / Inactivated / Vector)
 *  5. In Silico Immune Simulation
 *  6. Preclinical Animal Testing
 *  7. Clinical Trials (Phase I – III)
 *  8. Bioreactor Mass Production
 *  9. Cold-Chain Distribution & Drone Delivery
 */
import { useState } from 'react';
import { motion } from 'framer-motion';

const STAGES = [
  { id: 1, title: '1. PATHOGEN ID',     desc: 'Isolate & identify target pathogen' },
  { id: 2, title: '2. GENOME ANALYSIS', desc: 'Map S-protein nucleotide sequence' },
  { id: 3, title: '3. ANTIGEN SELECTION',desc: 'Choose immunogenic target peptide' },
  { id: 4, title: '4. PLATFORM DESIGN', desc: 'Select mRNA-LNP delivery vehicle' },
  { id: 5, title: '5. IMMUNE SIMULATION',desc: 'In silico antibody response verification' },
  { id: 6, title: '6. PRECLINICAL LAB', desc: 'Safety testing in biological models' },
  { id: 7, title: '7. CLINICAL TRIALS', desc: 'Phase I, II, III human efficacy trials' },
  { id: 8, title: '8. BIOREACTOR MFG',  desc: 'Mass scale bioreactor production' },
  { id: 9, title: '9. COLD-CHAIN DRONES',desc: 'Autonomous distribution to global hubs' },
];

export default function VaccinePipelineCenter() {
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Control Drawer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: 'clamp(340px, 90vw, 650px)', zIndex: 600,
          background: 'rgba(2,10,25,0.95)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0,229,255,0.4)', borderRadius: 16, padding: '1.4rem',
          boxShadow: '0 0 40px rgba(0,229,255,0.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00e5ff', letterSpacing: '0.2em' }}>
              WORKSTATION 06
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
              VACCINE DEVELOPMENT PIPELINE
            </div>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 900,
            color: '#00ff9d', background: 'rgba(0,255,157,0.1)', border: '1px solid #00ff9d',
            borderRadius: 8, padding: '0.3rem 0.8rem',
          }}>
            STAGE {currentStage} / 9
          </div>
        </div>

        {/* Horizontal Pipeline Node Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.2rem' }}>
          {STAGES.map((s) => {
            const active = currentStage === s.id;
            const passed = currentStage > s.id;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStage(s.id)}
                style={{
                  textAlign: 'left', padding: '0.5rem',
                  background: active ? 'rgba(0,229,255,0.2)' : passed ? 'rgba(0,255,157,0.06)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${active ? '#00e5ff' : passed ? 'rgba(0,255,157,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 8, cursor: 'pointer',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, color: active ? '#fff' : passed ? '#00ff9d' : 'rgba(255,255,255,0.4)' }}>
                  {s.title}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  {s.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Active Stage Detail */}
        <div style={{ background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.3)', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00e5ff', letterSpacing: '0.15em' }}>ACTIVE PIPELINE STEP</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.0rem', fontWeight: 800, color: '#fff', margin: '2px 0' }}>
            {STAGES[currentStage - 1].title}: {STAGES[currentStage - 1].desc}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#cceeff', lineHeight: 1.5, marginTop: 4 }}>
            {currentStage === 4 ? 'mRNA platform selected. Nanoparticle encapsulation provides thermal stability at -20°C.' : currentStage === 8 ? 'Bioreactor active. Producing 50,000 doses per hour with automated quality control.' : 'Process operating at maximum efficiency with AI real-time optimization.'}
          </div>
        </div>

        {/* Pipeline Navigation Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button
            onClick={() => setCurrentStage(Math.max(1, currentStage - 1))}
            disabled={currentStage === 1}
            style={{ flex: 1, padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', cursor: 'pointer' }}
          >
            ◀ PREVIOUS STAGE
          </button>
          <button
            onClick={() => setCurrentStage(Math.min(9, currentStage + 1))}
            disabled={currentStage === 9}
            style={{ flex: 1, padding: '0.5rem', background: 'rgba(0,229,255,0.3)', border: '1px solid #00e5ff', borderRadius: 6, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, cursor: 'pointer' }}
          >
            ADVANCE PIPELINE ▶
          </button>
        </div>
      </motion.div>
    </div>
  );
}
