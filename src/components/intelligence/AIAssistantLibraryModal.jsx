/**
 * AIAssistantLibraryModal.jsx
 * AI Knowledge Assistant & Interactive Learning Library for Phase 9 (Modules 7 & 8).
 * Features:
 *  - Interactive ARIA AI Query Console
 *  - Searchable Medical Glossary & Virus/Bacteria/Vaccine Encyclopedia
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEARNING_LIBRARY_ENTRIES } from '../../utils/constants';

export default function AIAssistantLibraryModal({ visible, onClose }) {
  const [activeTab, setActiveTab] = useState('library');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiResponse, setAiResponse] = useState('Greetings, Commander. Select any medical term or ask a scientific concept to receive AI analysis.');

  if (!visible) return null;

  const filteredEntries = LEARNING_LIBRARY_ENTRIES.filter(e =>
    e.term.toLowerCase().includes(searchTerm.toLowerCase()) || e.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(255,56,96,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(255,56,96,0.3)',
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#ff3860', letterSpacing: '0.2em' }}>
            MODULE 7 & 8 · AI KNOWLEDGE CENTER
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 1rem' }}>
            AI KNOWLEDGE ASSISTANT & LEARNING LIBRARY
          </div>

          {/* Tab Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <button
              onClick={() => setActiveTab('library')}
              style={{
                flex: 1, padding: '0.5rem', borderRadius: 8,
                background: activeTab === 'library' ? 'rgba(255,56,96,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeTab === 'library' ? '#ff3860' : 'rgba(255,255,255,0.1)'}`,
                color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              📚 INTERACTIVE MEDICAL LIBRARY
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              style={{
                flex: 1, padding: '0.5rem', borderRadius: 8,
                background: activeTab === 'ai' ? 'rgba(0,200,255,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeTab === 'ai' ? '#00c8ff' : 'rgba(255,255,255,0.1)'}`,
                color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🤖 ARIA AI CONSULTANT
            </button>
          </div>

          {/* Tab 1: Library */}
          {activeTab === 'library' && (
            <div>
              <input
                type="text"
                placeholder="🔍 Search medical terms, virus, bacteria, vaccines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', background: 'rgba(0,12,28,0.9)',
                  border: '1px solid #ff3860', borderRadius: 8, padding: '0.4rem 0.8rem',
                  color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', marginBottom: '1rem',
                }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                {filteredEntries.map(e => (
                  <div
                    key={e.id}
                    onClick={() => {
                      setActiveTab('ai');
                      setAiResponse(`[AI Analysis for ${e.term}]: ${e.desc} Recommended Path: Visit Phase 5 AI Laboratory or Phase 3 Pandemic Museum.`);
                    }}
                    style={{
                      background: 'rgba(255,56,96,0.04)', border: '1px solid rgba(255,56,96,0.2)',
                      borderRadius: 10, padding: '0.8rem', cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#ff3860', fontWeight: 700 }}>
                      [{e.category.toUpperCase()}]
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#fff', margin: '2px 0 4px' }}>
                      {e.term}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                      {e.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: AI Assistant */}
          {activeTab === 'ai' && (
            <div style={{ background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.25)', borderRadius: 12, padding: '1.2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: 6 }}>
                🤖 ARIA · AI RESEARCH CONSULTANT
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#fff', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                {aiResponse}
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[
                  'Compare COVID-19 vs Spanish Flu',
                  'Explain mRNA Vaccine Delivery',
                  'Summarize Black Death Quarantine',
                  'Recommend Recommended Learning Path',
                ].map(q => (
                  <button
                    key={q}
                    onClick={() => setAiResponse(`[ARIA AI]: ${q} — Analysis complete. All 8 learning modules contain detailed interactive 3D simulations.`)}
                    style={{
                      background: 'rgba(0,200,255,0.12)', border: '1px solid #00c8ff',
                      borderRadius: 6, padding: '0.35rem 0.6rem', color: '#00c8ff',
                      fontFamily: 'var(--font-mono)', fontSize: '0.48rem', cursor: 'pointer',
                    }}
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
