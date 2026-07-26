/**
 * DigitalTwinEarthModal.jsx
 * Digital Twin Earth Layer Controller for Phase 9 (Module 2).
 * Allows users to toggle 9 interactive global data layers:
 *  - Climate, Population, Healthcare, Vaccination, Transportation, Hospitals, Research Labs, Disease History, Preparedness Index
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DIGITAL_TWIN_LAYERS } from '../../utils/constants';

export default function DigitalTwinEarthModal({ visible, onClose }) {
  const [activeLayers, setActiveLayers] = useState(['healthcare', 'vaccination', 'research', 'preparedness']);

  if (!visible) return null;

  const toggleLayer = (layerId) => {
    setActiveLayers(prev =>
      prev.includes(layerId) ? prev.filter(l => l !== layerId) : [...prev, layerId]
    );
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 940,
        background: 'rgba(0,4,12,0.85)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: '100%', maxWidth: '780px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(0,200,255,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(0,200,255,0.3)',
            color: '#fff', position: 'relative', maxHeight: '88vh', overflowY: 'auto',
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00c8ff', letterSpacing: '0.2em' }}>
            MODULE 2 · DIGITAL TWIN TELEMETRY
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 1rem' }}>
            DIGITAL TWIN EARTH LAYER CONTROLLER
          </div>

          {/* Layers Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.2rem' }}>
            {DIGITAL_TWIN_LAYERS.map(l => {
              const isActive = activeLayers.includes(l.id);

              return (
                <div
                  key={l.id}
                  onClick={() => toggleLayer(l.id)}
                  style={{
                    background: isActive ? `${l.color}15` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isActive ? l.color : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 10, padding: '0.8rem', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: '1.3rem' }}>{l.icon}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.4rem', padding: '0.15rem 0.4rem', borderRadius: 4,
                      background: isActive ? `${l.color}30` : 'rgba(255,255,255,0.06)',
                      color: isActive ? l.color : 'rgba(255,255,255,0.5)', fontWeight: 700,
                    }}>
                      {isActive ? '● ON' : '○ OFF'}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 800, color: '#fff' }}>
                    {l.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>
                    {l.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
