/**
 * PolicyDirectivePanel.jsx
 * Strategic Player Decision Center for Phase 6 (Module 4).
 * Enacts 16 Emergency Action Directives organized into 4 strategic categories:
 *  - Travel & Borders, Testing & Prevention, Healthcare & ICU, Vaccination & Economics
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { POLICY_DIRECTIVES } from '../../utils/constants';

const CATEGORIES = ['All', 'Travel', 'Prevention', 'Healthcare', 'Vaccination'];

export default function PolicyDirectivePanel({ activePolicies = [], onTogglePolicy }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPolicies = POLICY_DIRECTIVES.filter(p => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Prevention') return p.category === 'Prevention' || p.category === 'Testing' || p.category === 'Containment';
    if (activeCategory === 'Vaccination') return p.category === 'Vaccination' || p.category === 'Economics' || p.category === 'Aid';
    return p.category === activeCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -320 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 110, left: 16, width: 330, zIndex: 600,
        background: 'rgba(2,10,25,0.94)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,56,96,0.35)', borderRadius: 14, padding: '0.85rem',
        boxShadow: '0 0 30px rgba(255,56,96,0.2)',
        maxHeight: 'calc(100vh - 200px)', overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#ff3860', letterSpacing: '0.2em' }}>
          DECISION CENTER (16 DIRECTIVES)
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#00ff9d' }}>
          {activePolicies.length} ENACTED
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
        EMERGENCY RESPONSE POLICIES
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? 'rgba(255,56,96,0.3)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeCategory === cat ? '#ff3860' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 6, padding: '0.25rem 0.45rem', color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-mono)', fontSize: '0.42rem', letterSpacing: '0.08em', cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Policy List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {filteredPolicies.map((p) => {
          const active = activePolicies.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => onTogglePolicy(p)}
              style={{
                textAlign: 'left', padding: '0.45rem 0.6rem',
                background: active ? 'rgba(255,56,96,0.22)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? '#ff3860' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', fontWeight: 700, color: active ? '#fff' : 'rgba(255,255,255,0.8)' }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: active ? '#ff3860' : 'rgba(255,255,255,0.35)', fontWeight: 700 }}>
                  {active ? '● ENACTED' : 'OFF'}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: active ? '#ff99aa' : 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                {p.desc}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
