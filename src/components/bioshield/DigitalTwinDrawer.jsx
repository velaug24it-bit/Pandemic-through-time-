/**
 * DigitalTwinDrawer.jsx
 * Digital Twin Inspector & AI Health Surveillance Panel for Phase 7 (Modules 2, 3 & 5).
 * Displays live building telemetry and city-wide environmental bio-surveillance alerts.
 */
import { motion } from 'framer-motion';

export default function DigitalTwinDrawer({ selectedBuilding }) {
  if (!selectedBuilding) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -320 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 70, left: 16, width: 320, zIndex: 600,
        background: 'rgba(2,10,25,0.94)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,255,157,0.35)', borderRadius: 14, padding: '0.85rem',
        boxShadow: '0 0 30px rgba(0,255,157,0.2)',
        maxHeight: 'calc(100vh - 180px)', overflowY: 'auto', color: '#fff',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00ff9d', letterSpacing: '0.2em' }}>
        DIGITAL TWIN TELEMETRY
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 900, marginBottom: '0.6rem' }}>
        {selectedBuilding.icon} {selectedBuilding.name}
      </div>

      {/* Building Status Grid */}
      <div style={{ background: 'rgba(0,255,157,0.05)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 10, padding: '0.6rem', marginBottom: '0.8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.48rem' }}>
          <div>BUILDING TYPE: <span style={{ color: '#00ff9d' }}>{selectedBuilding.type}</span></div>
          <div>POWER STATUS: <span style={{ color: '#00c8ff' }}>{selectedBuilding.power}</span></div>
          <div>CAPACITY: <span style={{ color: '#fff' }}>{selectedBuilding.capacity}</span></div>
          <div>EMERGENCY: <span style={{ color: '#00ff9d' }}>{selectedBuilding.emergencyLevel}</span></div>
          <div>MEDICINE STOCK: <span style={{ color: '#ffb700' }}>{selectedBuilding.medicineStock}</span></div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
          ACTIVE R&D: <span style={{ color: '#fff' }}>{selectedBuilding.projects}</span>
        </div>
      </div>

      {/* Module 3: AI Health Monitor Indicators */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: 4 }}>
        CITY-WIDE HEALTH INDICATORS
      </div>
      <div style={{ background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 8, padding: '0.6rem', marginBottom: '0.8rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.7)' }}>🌡️ Fever Reports: <span style={{ color: '#00ff9d' }}>0.02% (Baseline)</span></div>
        <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.7)' }}>🫁 Respiratory Symptoms: <span style={{ color: '#00ff9d' }}>Nominal</span></div>
        <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.7)' }}>🏥 Hospital Admissions: <span style={{ color: '#00ff9d' }}>12 / Day</span></div>
        <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.7)' }}>💉 City Vaccine Rate: <span style={{ color: '#7b2ff7' }}>94.8% Immunized</span></div>
      </div>

      {/* Module 5: AI Bio-Surveillance Alert Grid */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ffb700', letterSpacing: '0.15em', marginBottom: 4 }}>
        AI SURVEILLANCE & EARLY DETECTION
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.42rem' }}>
        <div style={{ background: 'rgba(255,183,0,0.08)', border: '1px solid rgba(255,183,0,0.2)', borderRadius: 6, padding: '0.35rem', color: '#fff' }}>
          🛫 Airport Thermal Screening: 100% Passengers Cleared
        </div>
        <div style={{ background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 6, padding: '0.35rem', color: '#fff' }}>
          🌊 Wastewater Bio-Sampling: Zero Pathogens Detected
        </div>
        <div style={{ background: 'rgba(0,200,255,0.08)', border: '1px solid rgba(0,200,255,0.2)', borderRadius: 6, padding: '0.35rem', color: '#fff' }}>
          🦅 Wildlife Bio-Observation: Zoonotic Risk Low
        </div>
      </div>
    </motion.div>
  );
}
