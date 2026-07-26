/**
 * SmartHospitalModal.jsx
 * Interactive Smart Hospital Department Explorer for Phase 7 (Module 4).
 * Explores 6 Hospital Departments:
 *  - Emergency Triage, ICU, Bio-Isolation, Automated Lab, Robotic Pharmacy, Ambulance Dispatch
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEPARTMENTS = [
  { id: 'er',         name: 'Emergency Triage',    beds: '30/300 occupied', tech: 'AI Symptom Scanner & Infrared Camera', icon: '🚨' },
  { id: 'icu',        name: 'Intensive Care (ICU)', beds: '8/120 occupied',  tech: 'Negative Pressure & Automated Ventilators', icon: '🫁' },
  { id: 'isolation',  name: 'Bio-Isolation Wing',  beds: '0/50 occupied',   tech: 'HEPA Air Filtration & UV Robot Disinfection', icon: '☣️' },
  { id: 'lab',        name: 'Automated Bio-Lab',    beds: 'N/A',             tech: 'PCR Sequencing & High-Throughput Robotics', icon: '🔬' },
  { id: 'pharmacy',   name: 'Robotic Pharmacy',    beds: 'N/A',             tech: 'Automated Drug Compounding & Drone Dispatch', icon: '💊' },
  { id: 'ambulance',  name: 'Ambulance Dispatch',  beds: '15 Active Drones',tech: 'Autonomous Aerial Medical Transports', icon: '🚑' },
];

export default function SmartHospitalModal({ visible, onClose }) {
  const [activeDeptId, setActiveDeptId] = useState('er');

  if (!visible) return null;

  const dept = DEPARTMENTS.find(d => d.id === activeDeptId) || DEPARTMENTS[0];

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
            width: '100%', maxWidth: '640px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(255,56,96,0.4)',
            borderRadius: 16, padding: '1.4rem', boxShadow: '0 0 40px rgba(255,56,96,0.3)',
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

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#ff3860', letterSpacing: '0.2em' }}>
            BIOSHIELD 2050 · SMART HOSPITAL COMPLEX
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
            INTERACTIVE DEPARTMENT EXPLORER
          </div>

          {/* Department Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginBottom: '1rem' }}>
            {DEPARTMENTS.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveDeptId(d.id)}
                style={{
                  background: activeDeptId === d.id ? 'rgba(255,56,96,0.25)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeDeptId === d.id ? '#ff3860' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8, padding: '0.4rem', color: activeDeptId === d.id ? '#fff' : 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.45rem', cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                {d.icon} {d.name}
              </button>
            ))}
          </div>

          {/* Active Department Inspector */}
          <div style={{ background: 'rgba(255,56,96,0.05)', border: '1px solid rgba(255,56,96,0.2)', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
              {dept.icon} {dept.name}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#ff3860', marginBottom: '0.6rem' }}>
              BED OCCUPANCY: {dept.beds}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.7)' }}>
              INTEGRATED TECHNOLOGY: <span style={{ color: '#00ff9d' }}>{dept.tech}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
