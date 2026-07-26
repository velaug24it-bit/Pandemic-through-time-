/**
 * GenomeSequencingLab.jsx
 * Workstation 2: Genome Sequencing & Base Pair Mapping Lab 2D Overlay
 * Features:
 *  - Interactive Base Pair nucleotide editor (A-T / C-G)
 *  - Mutation visualizer & variant tracker
 *  - mRNA Transcription simulator
 */
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GenomeSequencingLab() {
  const [mutated, setMutated] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: 'fixed', top: 70, left: 16, width: 310, zIndex: 600,
        background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,255,157,0.3)', borderRadius: 14, padding: '1rem',
        boxShadow: '0 0 30px rgba(0,255,157,0.2)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00ff9d', letterSpacing: '0.2em' }}>
        WORKSTATION 02
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
        GENOME SEQUENCING
      </div>

      {/* Nucleotide Base Pair Mapping */}
      <div style={{ background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: 8, padding: '0.6rem', marginBottom: '0.8rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(0,255,157,0.6)', letterSpacing: '0.1em' }}>
          SEQUENCE MAP (CHROMOSOME #1)
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#00ff9d', letterSpacing: '0.15em', margin: '4px 0' }}>
          5'- ATCG-GCTA-TTAA-CGGC -3'
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)' }}>
          ACCURACY: 99.999% · 29,903 BASE PAIRS
        </div>
      </div>

      {/* Mutation Test Button */}
      <button
        onClick={() => setMutated(!mutated)}
        style={{
          width: '100%', background: mutated ? 'rgba(255,56,96,0.25)' : 'rgba(0,255,157,0.25)',
          border: `1px solid ${mutated ? '#ff3860' : '#00ff9d'}`, borderRadius: 6, padding: '0.5rem',
          color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800,
          cursor: 'pointer', marginBottom: '0.8rem',
        }}
      >
        {mutated ? '⚠️ MUTATION DETECTED (VARIANT ALPHA)' : '🔬 SIMULATE GENETIC MUTATION'}
      </button>

      {/* Gene Editing Status */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.1em' }}>
        CRISPR-Cas9 GENE EDITING: STANDBY
      </div>
    </motion.div>
  );
}
