/**
 * InfectionControlPanel.jsx
 * Interactive 6-step cellular infection player panel:
 *  - Step 0: Attachment (Spike binding to ACE2)
 *  - Step 1: Cell Entry (Endocytosis)
 *  - Step 2: Uncoating & Replication
 *  - Step 3: Assembly & Budding
 *  - Step 4: Cell Damage & Release
 *  - Step 5: Vaccine & Antibody Defense
 */
import { motion } from 'framer-motion';

const STEPS = [
  { id: 0, title: '1. ATTACHMENT',       desc: 'Viral spike protein binds host cell ACE2 receptor' },
  { id: 1, title: '2. CELL ENTRY',       desc: 'Viral membrane fuses with lipid bilayer (Endocytosis)' },
  { id: 2, title: '3. REPLICATION',      desc: 'Viral +ssRNA uncoats into cytoplasm and replicates' },
  { id: 3, title: '4. ASSEMBLY',         desc: 'New capsids assemble at endoplasmic reticulum' },
  { id: 4, title: '5. CELL DAMAGE',      desc: 'Host cell ruptures releasing hundreds of progeny' },
  { id: 5, title: '6. VACCINE DEFENSE',  desc: 'Y-Antibodies neutralize spike proteins preventing entry' },
];

export default function InfectionControlPanel({ currentStep = 0, onSetStep }) {
  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 65, left: 16,
        width: 320, zIndex: 600,
        background: 'rgba(15,0,8,0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,23,68,0.3)',
        borderRadius: 14, padding: '1rem',
        boxShadow: '0 0 30px rgba(255,23,68,0.2), 0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ff1744', letterSpacing: '0.2em' }}>
        ◈ CELLULAR INFECTION PIPELINE
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#fff', margin: '2px 0 8px' }}>
        STAGE {currentStep + 1} OF 6
      </div>

      {/* Step selector list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.8rem' }}>
        {STEPS.map((s) => {
          const active = currentStep === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSetStep?.(s.id)}
              id={`btn-infection-step-${s.id}`}
              style={{
                textAlign: 'left',
                background: active ? 'rgba(255,23,68,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? '#ff1744' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 6, padding: '0.45rem 0.60rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', fontWeight: 700, color: active ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                {s.title}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: active ? '#ff1744' : 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                {s.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => onSetStep?.(Math.max(0, currentStep - 1))}
          id="btn-step-prev"
          disabled={currentStep === 0}
          style={{
            flex: 1, padding: '0.4rem 0',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6, color: currentStep === 0 ? 'rgba(255,255,255,0.2)' : '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem', cursor: 'pointer',
          }}
        >
          ◀ PREV STEP
        </button>
        <button
          onClick={() => onSetStep?.(Math.min(5, currentStep + 1))}
          id="btn-step-next"
          disabled={currentStep === 5}
          style={{
            flex: 1, padding: '0.4rem 0',
            background: 'rgba(255,23,68,0.25)', border: '1px solid #ff1744',
            borderRadius: 6, color: currentStep === 5 ? 'rgba(255,255,255,0.2)' : '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          NEXT STEP ▶
        </button>
      </div>
    </motion.div>
  );
}
