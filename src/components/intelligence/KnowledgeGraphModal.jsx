/**
 * KnowledgeGraphModal.jsx
 * Pandemic Knowledge Graph Network Visualization for Phase 9 (Module 3).
 * Connects Pandemics, Viruses, Bacteria, Vaccines, Discoveries, and WHO Alliances.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KNOWLEDGE_GRAPH_NODES, KNOWLEDGE_GRAPH_EDGES } from '../../utils/constants';

export default function KnowledgeGraphModal({ visible, onClose }) {
  const [selectedNode, setSelectedNode] = useState(KNOWLEDGE_GRAPH_NODES[0]);

  if (!visible) return null;

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
            width: '100%', maxWidth: '820px',
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(123,47,247,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(123,47,247,0.3)',
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#7b2ff7', letterSpacing: '0.2em' }}>
            MODULE 3 · NETWORK VISUALIZATION
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 1rem' }}>
            PANDEMIC KNOWLEDGE GRAPH MATRIX
          </div>

          {/* Node Grid Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.2rem' }}>
            {KNOWLEDGE_GRAPH_NODES.map(n => (
              <button
                key={n.id}
                onClick={() => setSelectedNode(n)}
                style={{
                  background: selectedNode.id === n.id ? `${n.color}25` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedNode.id === n.id ? n.color : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8, padding: '0.6rem', textAlign: 'left', cursor: 'pointer',
                  color: '#fff', transition: 'all 0.2s',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: n.color }}>{n.type.toUpperCase()}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 800, marginTop: 2 }}>{n.label}</div>
              </button>
            ))}
          </div>

          {/* Selected Node Connections Card */}
          {selectedNode && (
            <div style={{ background: 'rgba(123,47,247,0.06)', border: '1px solid rgba(123,47,247,0.25)', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#7b2ff7', letterSpacing: '0.15em', marginBottom: 4 }}>
                NODE DETAILS & ASSOCIATED CONNECTIONS
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: selectedNode.color, marginBottom: '0.6rem' }}>
                {selectedNode.label} ({selectedNode.type})
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                ACTIVE GRAPH CONNECTIONS:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {KNOWLEDGE_GRAPH_EDGES.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).map((e, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '0.4rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.5rem' }}>
                    <span style={{ color: '#00c8ff' }}>{e.from}</span> ──[{e.label}]──▶ <span style={{ color: '#00ff9d' }}>{e.to}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
