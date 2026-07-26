/**
 * PublicEducationModal.jsx
 * Interactive Public Education Exhibit & Mini Learning Activities for Phase 7 (Module 9).
 * Features:
 *  - Hand Hygiene Science (Soap Lipid Membrane Disruption)
 *  - mRNA Vaccine Action Mechanism (Ribosome Translation)
 *  - Mask Aerosol Filtration Efficiency
 *  - Preparedness & Immune Resilience Principles
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXHIBITS = [
  { id: 'hygiene',  title: 'Hand Hygiene Science', icon: '🧼', text: 'Soap molecules contain hydrophobic tails that bind to and disrupt viral lipid membranes in 20 seconds, dissolving the virus structural envelope.' },
  { id: 'vaccines', title: 'mRNA Vaccine Mechanism',icon: '💉', text: 'mRNA instructs host cell ribosomes to temporarily produce harmless spike proteins, training T-cells & B-cells without live virus exposure.' },
  { id: 'masks',    title: 'Mask Aerosol Filtration',icon: '😷', text: 'N95 electrostatic fibers trap micro-droplets (< 0.3 microns) via Brownian motion and electrostatic attraction, reducing viral load by 95%.' },
  { id: 'lifestyle',title: 'Immune System Resilience',icon: '🥗', text: 'Adequate sleep, Vitamin D3, zinc, and regular cardiovascular exercise maintain T-cell surveillance activity and reduce chronic inflammation.' },
];

export default function PublicEducationModal({ visible, onClose }) {
  const [activeExhibitId, setActiveExhibitId] = useState('hygiene');
  const [completedExhibits, setCompletedExhibits] = useState(new Set());

  if (!visible) return null;

  const exhibit = EXHIBITS.find(e => e.id === activeExhibitId) || EXHIBITS[0];

  const completeExhibit = (id) => {
    setCompletedExhibits(prev => new Set([...prev, id]));
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 900,
        background: 'rgba(0,4,12,0.85)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '620px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(123,47,247,0.4)',
            borderRadius: 16, padding: '1.4rem', boxShadow: '0 0 40px rgba(123,47,247,0.3)',
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

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#7b2ff7', letterSpacing: '0.2em' }}>
            BIOSHIELD 2050 · PUBLIC EDUCATION CENTER
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
            INTERACTIVE PREPAREDNESS EXHIBITS
          </div>

          {/* Exhibit Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '1rem' }}>
            {EXHIBITS.map(e => (
              <button
                key={e.id}
                onClick={() => setActiveExhibitId(e.id)}
                style={{
                  background: activeExhibitId === e.id ? 'rgba(123,47,247,0.25)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeExhibitId === e.id ? '#7b2ff7' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8, padding: '0.4rem', color: activeExhibitId === e.id ? '#fff' : 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.48rem', cursor: 'pointer', textAlign: 'left',
                }}
              >
                {e.icon} {e.title} {completedExhibits.has(e.id) ? '✅' : ''}
              </button>
            ))}
          </div>

          {/* Active Exhibit Display */}
          <div style={{ background: 'rgba(123,47,247,0.05)', border: '1px solid rgba(123,47,247,0.2)', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
              {exhibit.icon} {exhibit.title}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, marginBottom: '0.8rem' }}>
              {exhibit.text}
            </div>
            <button
              onClick={() => completeExhibit(exhibit.id)}
              style={{
                background: 'rgba(0,255,157,0.2)', border: '1px solid #00ff9d',
                borderRadius: 6, padding: '0.35rem 0.8rem', color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              {completedExhibits.has(exhibit.id) ? '✓ EXHIBIT COMPLETED' : 'COMPLETE MINI-ACTIVITY'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
