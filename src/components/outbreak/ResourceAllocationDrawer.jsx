/**
 * ResourceAllocationDrawer.jsx
 * Resource Management & Regional Allocation Center for Phase 6 (Module 5).
 * Manages 8 Critical Healthcare Resources:
 *  - Doctors, Nurses, Hospital Beds, ICU Beds, Ventilators, Medicines, Vaccines, Emergency Funds ($B)
 *  - Displays live shortages with risk warning colors across 6 Global Regions
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { OUTBREAK_REGIONS } from '../../utils/constants';

export default function ResourceAllocationDrawer() {
  const [selectedRegionId, setSelectedRegionId] = useState('africa');
  const [allocatedAid, setAllocatedAid] = useState({
    asia: 15, europe: 20, africa: 5, northamerica: 25, latinamerica: 10, middleeast: 10,
  });

  const selectedRegion = OUTBREAK_REGIONS.find(r => r.id === selectedRegionId) || OUTBREAK_REGIONS[0];

  const handleSliderChange = (regionId, val) => {
    setAllocatedAid(prev => ({
      ...prev,
      [regionId]: parseInt(val),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 320 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 110, right: 16, width: 330, zIndex: 600,
        background: 'rgba(2,10,25,0.94)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,200,255,0.35)', borderRadius: 14, padding: '0.85rem',
        boxShadow: '0 0 30px rgba(0,200,255,0.2)',
        maxHeight: 'calc(100vh - 200px)', overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00c8ff', letterSpacing: '0.2em' }}>
          RESOURCE MANAGEMENT
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#00ff9d' }}>
          6 GLOBAL REGIONS
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
        REGIONAL AID ALLOCATION
      </div>

      {/* Region Selector Pills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.3rem', marginBottom: '0.8rem' }}>
        {OUTBREAK_REGIONS.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedRegionId(r.id)}
            style={{
              background: selectedRegionId === r.id ? 'rgba(0,200,255,0.25)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${selectedRegionId === r.id ? '#00c8ff' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 6, padding: '0.3rem', color: selectedRegionId === r.id ? '#fff' : 'rgba(255,255,255,0.6)',
              fontFamily: 'var(--font-mono)', fontSize: '0.42rem', cursor: 'pointer', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
            }}
          >
            {r.flag} {r.name}
          </button>
        ))}
      </div>

      {/* Selected Region Telemetry Card */}
      <div style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.2)', borderRadius: 10, padding: '0.6rem', marginBottom: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: '#fff' }}>
            {selectedRegion.flag} {selectedRegion.name}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', padding: '0.1rem 0.4rem', borderRadius: 4, background: selectedRegion.risk === 'Red' ? 'rgba(255,56,96,0.3)' : selectedRegion.risk === 'Orange' ? 'rgba(255,145,0,0.3)' : 'rgba(0,255,157,0.2)', color: selectedRegion.risk === 'Red' ? '#ff3860' : selectedRegion.risk === 'Orange' ? '#ff9100' : '#00ff9d', fontWeight: 700 }}>
            {selectedRegion.risk} RISK
          </div>
        </div>

        {/* 8 Medical Resource Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.6rem' }}>
          <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>👨‍⚕️ Doctors: <span style={{ color: '#fff' }}>{(selectedRegion.doctors / 1000).toFixed(0)}k</span></div>
          <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>👩‍⚕️ Nurses: <span style={{ color: '#fff' }}>{(selectedRegion.nurses / 1000).toFixed(0)}k</span></div>
          <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>🏥 Hospital Beds: <span style={{ color: '#fff' }}>{(selectedRegion.beds / 1000000).toFixed(1)}M</span></div>
          <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>🫁 ICU Beds: <span style={{ color: '#00ff9d' }}>{(selectedRegion.icu / 1000).toFixed(0)}k</span></div>
          <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>💨 Ventilators: <span style={{ color: '#00c8ff' }}>{(selectedRegion.icu * 0.8 / 1000).toFixed(0)}k</span></div>
          <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>💊 Medicines: <span style={{ color: '#ffb700' }}>Surge Active</span></div>
          <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>💉 Vaccines: <span style={{ color: '#7b2ff7' }}>{(selectedRegion.vaccines / 1000000).toFixed(0)}M</span></div>
          <div style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>💰 Funds: <span style={{ color: '#00ff9d' }}>${allocatedAid[selectedRegion.id] || 10}B</span></div>
        </div>

        {/* Aid Slider */}
        <div style={{ marginTop: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#00c8ff', marginBottom: 2 }}>
            <span>ALLOCATE EMERGENCY AID ($B)</span>
            <span>${allocatedAid[selectedRegion.id] || 10}B</span>
          </div>
          <input
            type="range" min="0" max="50" step="5"
            value={allocatedAid[selectedRegion.id] || 10}
            onChange={(e) => handleSliderChange(selectedRegion.id, e.target.value)}
            style={{ width: '100%', accentColor: '#00c8ff' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
