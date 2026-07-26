/**
 * DrugDiscoveryLab.jsx
 * Workstation 5: Molecular Drug Discovery & Binding Simulator
 * Features:
 *  - 3D Drug Molecule Binding Simulation
 *  - Protein Docking & Receptor Interaction
 *  - Candidate Inhibitor Ranking
 */
import { useState } from 'react';
import { motion } from 'framer-motion';

const DRUG_CANDIDATES = [
  { id: 'mol-1', name: 'Inhibitor Alpha-9', bindingEnergy: '-9.4 kcal/mol', affinity: '98.2%', status: 'OPTIMAL BINDING', color: '#00ff9d' },
  { id: 'mol-2', name: 'Compound Delta-4', bindingEnergy: '-7.8 kcal/mol', affinity: '84.5%', status: 'MODERATE BINDING', color: '#ffb700' },
  { id: 'mol-3', name: 'Peptide Beta-2',   bindingEnergy: '-4.2 kcal/mol', affinity: '52.1%', status: 'WEAK BINDING', color: '#ff3860' },
];

export default function DrugDiscoveryLab() {
  const [selectedDrug, setSelectedDrug] = useState(DRUG_CANDIDATES[0]);
  const [docking,      setDocking]      = useState(false);

  const testDocking = (d) => {
    setSelectedDrug(d);
    setDocking(true);
    setTimeout(() => setDocking(false), 1000);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 3D Docking Visualization */}
      <group position={[0, 0, 0]}>
        {/* Receptor Target Sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.0, 24, 24]} />
          <meshStandardMaterial color="#ff3860" transparent opacity={0.5} wireframe />
        </mesh>
        {/* Drug Molecule Binding */}
        <mesh position={[docking ? 1.5 : 0.4, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={selectedDrug.color} emissive={selectedDrug.color} emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          position: 'fixed', top: 70, left: 16, width: 320, zIndex: 600,
          background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,56,96,0.3)', borderRadius: 14, padding: '1rem',
          boxShadow: '0 0 30px rgba(255,56,96,0.2)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ff3860', letterSpacing: '0.2em' }}>
          WORKSTATION 05
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          DRUG DISCOVERY & DOCKING
        </div>

        {/* Candidate Selector */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>CANDIDATE MOLECULES:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.8rem' }}>
          {DRUG_CANDIDATES.map(d => (
            <button
              key={d.id}
              onClick={() => testDocking(d)}
              style={{
                textAlign: 'left', padding: '0.45rem 0.65rem',
                background: selectedDrug.id === d.id ? `${d.color}20` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selectedDrug.id === d.id ? d.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 6, cursor: 'pointer',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', fontWeight: 700, color: '#fff' }}>{d.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: d.color }}>BINDING ENERGY: {d.bindingEnergy}</div>
            </button>
          ))}
        </div>

        {/* Docking Result */}
        <div style={{ background: 'rgba(255,56,96,0.06)', border: '1px solid rgba(255,56,96,0.3)', borderRadius: 8, padding: '0.6rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>AFFINITY RATING</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: selectedDrug.color, margin: '2px 0' }}>
            {selectedDrug.affinity}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#fff', fontWeight: 700 }}>
            STATUS: {selectedDrug.status}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
