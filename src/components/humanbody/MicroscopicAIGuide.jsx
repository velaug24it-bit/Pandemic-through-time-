/**
 * MicroscopicAIGuide.jsx
 * AI Assistant ARIA guide card for the microscopic human body journey.
 * Features real-time voice synthesis triggers & biological process explanations.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AI_NARRATIONS = {
  bloodstream: 'You are currently inside the vascular bloodstream tunnel. Notice the red blood cells carrying oxygen and leukocytes guarding against pathogens.',
  cellular:    'This is a human host cell. The outer lipid bilayer membrane expresses ACE2 receptors, which viruses try to hijack for entry.',
  infection:   'Watch how viral spike proteins attach to host cell receptors, fuse with the membrane, and hijack host ribosomes to replicate.',
  immune:      'Macrophages engulf invading pathogens through phagocytosis, while B-Cells release Y-shaped antibodies to tag and neutralize viruses.',
  vaccine:     'Vaccines deliver harmless mRNA instructions to host ribosomes, training B-Cells to produce protective antibodies before live infection.',
  genetics:    'The double helix contains genetic code written in A-T and C-G base pairs. Mutations in viral RNA create new variant strains.',
};

export default function MicroscopicAIGuide({ viewMode = 'bloodstream' }) {
  const [minimized, setMinimized] = useState(false);
  const narration = AI_NARRATIONS[viewMode] || AI_NARRATIONS.bloodstream;

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 65, right: 16,
        width: 300, zIndex: 600,
        background: 'rgba(15,0,8,0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,200,255,0.3)',
        borderRadius: 14, padding: '0.8rem 1rem',
        boxShadow: '0 0 30px rgba(0,200,255,0.2), 0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '1.0rem', color: '#00c8ff' }}>🤖</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800, color: '#00c8ff', letterSpacing: '0.15em' }}>
              AI GUIDE · ARIA
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.4)' }}>
              BIOLOGICAL NARRATION
            </div>
          </div>
        </div>
        <button
          onClick={() => setMinimized(m => !m)}
          id="btn-toggle-ai-guide"
          style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 4, color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
            padding: '0.15rem 0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          }}
        >
          {minimized ? '+' : '–'}
        </button>
      </div>

      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: '0.6rem' }}
          >
            <div style={{
              background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.1)',
              borderRadius: 8, padding: '0.65rem',
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#cceeff', lineHeight: 1.5,
            }}>
              "{narration}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
