/**
 * MissionRunnerModal.jsx
 * 7-Step Interactive Mission Runner for Phase 8 (Modules 3, 4, 5 & 9).
 * Flow: Briefing -> Situation Analysis -> Research -> Decision Making -> Resource Allocation -> Outcome -> Debrief
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = ['Briefing', 'Situation', 'Research', 'Decision', 'Resources', 'Evaluation', 'Debrief'];

export default function MissionRunnerModal({ scenario, visible, onCompleteMission, onClose }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState('testing');
  const [allocatedBeds, setAllocatedBeds] = useState(50);

  if (!visible || !scenario) return null;

  const currentStep = STEPS[currentStepIdx];

  const handleNextStep = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      onCompleteMission?.(scenario.id);
    }
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 920,
        background: 'rgba(0,4,12,0.88)', backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '720px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(123,47,247,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(123,47,247,0.3)',
            color: '#fff', position: 'relative',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: '50%', width: 28, height: 28, color: '#fff',
              cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#7b2ff7', letterSpacing: '0.2em' }}>
            CRISIS MISSION RUNNER · STEP {currentStepIdx + 1} OF 7
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.8rem' }}>
            {scenario.icon} {scenario.name}
          </div>

          {/* Progress Bar */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '1.2rem' }}>
            {STEPS.map((stepName, i) => (
              <div
                key={stepName}
                style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i <= currentStepIdx ? '#7b2ff7' : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>

          {/* Step 1: Briefing */}
          {currentStep === 'Briefing' && (
            <div style={{ background: 'rgba(123,47,247,0.05)', border: '1px solid rgba(123,47,247,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#7b2ff7', letterSpacing: '0.15em', marginBottom: 4 }}>
                SITUATION BRIEFING
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#fff', lineHeight: 1.5 }}>
                {scenario.desc} Your objective is to minimize casualties, maintain hospital ICU capacity, and coordinate emergency public health directives.
              </div>
            </div>
          )}

          {/* Step 2: Situation Analysis */}
          {currentStep === 'Situation' && (
            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: 6 }}>
                EPIDEMIOLOGICAL SITUATION ANALYSIS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.55rem' }}>
                <div>ACTIVE INFECTIONS: <span style={{ color: '#ff3860' }}>14,200</span></div>
                <div>ICU OCCUPANCY: <span style={{ color: '#ffb700' }}>78%</span></div>
                <div>R0 REPRODUCTION: <span style={{ color: '#00c8ff' }}>3.2</span></div>
              </div>
            </div>
          )}

          {/* Step 3: Research */}
          {currentStep === 'Research' && (
            <div style={{ background: 'rgba(0,255,157,0.05)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00ff9d', letterSpacing: '0.15em', marginBottom: 4 }}>
                GENOMIC RESEARCH & DIAGNOSTICS
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#fff' }}>
                3D Protein slicing indicates a novel surface spike mutation. High-throughput automated PCR testing reveals 98.4% diagnostic accuracy.
              </div>
            </div>
          )}

          {/* Step 4: Decision Challenges */}
          {currentStep === 'Decision' && (
            <div style={{ background: 'rgba(123,47,247,0.05)', border: '1px solid rgba(123,47,247,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#7b2ff7', letterSpacing: '0.15em', marginBottom: 6 }}>
                PRIMARY STRATEGIC DECISION
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { id: 'surveillance', text: 'Increase Bio-Surveillance & Airport Thermal Screening' },
                  { id: 'schools', text: 'Close Schools & High-Density Venues' },
                  { id: 'testing', text: 'Expand Mass PCR Testing & Automated Contact Tracing' },
                  { id: 'awareness', text: 'Launch National Public Health Education Campaigns' },
                  { id: 'travel', text: 'Restrict Inter-Regional Travel & Transit Hubs' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedDecision(opt.id)}
                    style={{
                      textAlign: 'left', padding: '0.5rem',
                      background: selectedDecision === opt.id ? 'rgba(123,47,247,0.25)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${selectedDecision === opt.id ? '#7b2ff7' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 6, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.52rem', cursor: 'pointer',
                    }}
                  >
                    {selectedDecision === opt.id ? '● ' : '○ '} {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Resource Management */}
          {currentStep === 'Resources' && (
            <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: 6 }}>
                RESOURCE & HOSPITAL ALLOCATION
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                ALLOCATE EMERGENCY ICU BEDS: {allocatedBeds}% CAPACITY
              </div>
              <input
                type="range" min="10" max="100" step="5"
                value={allocatedBeds}
                onChange={(e) => setAllocatedBeds(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#00c8ff' }}
              />
            </div>
          )}

          {/* Step 6: Evaluation */}
          {currentStep === 'Evaluation' && (
            <div style={{ background: 'rgba(0,255,157,0.05)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00ff9d', letterSpacing: '0.15em', marginBottom: 4 }}>
                OUTCOME EVALUATION
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: '#00ff9d', margin: '6px 0' }}>
                PASSED · SURVIVAL RATE 96.8%
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.7)' }}>
                Your strategic policy choices successfully flattened the transmission curve and protected hospital capacity.
              </div>
            </div>
          )}

          {/* Step 7: Debrief */}
          {currentStep === 'Debrief' && (
            <div style={{ background: 'rgba(123,47,247,0.08)', border: '1px solid #7b2ff7', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#7b2ff7', letterSpacing: '0.15em', marginBottom: 4 }}>
                MISSION DEBRIEF & KNOWLEDGE CHALLENGE
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#fff', lineHeight: 1.5 }}>
                Mission cleared! Next, complete the short Knowledge Challenge Quiz to finalize your score and earn your achievement badge.
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
            <button
              onClick={handleNextStep}
              style={{
                background: 'linear-gradient(135deg, rgba(123,47,247,0.4), rgba(0,255,157,0.4))',
                border: '1px solid #7b2ff7', borderRadius: 8, padding: '0.55rem 1.4rem',
                color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800,
                cursor: 'pointer', letterSpacing: '0.12em',
              }}
            >
              {currentStepIdx < STEPS.length - 1 ? 'NEXT STEP ▶' : 'FINALIZE MISSION & QUIZ ▶'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
