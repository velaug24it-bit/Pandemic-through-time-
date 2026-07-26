/**
 * ResearchArchiveModal.jsx
 * Research Archive & Export Center for Phase 9 (Modules 5 & 11).
 * Features:
 *  - Searchable, filterable repository of reports from all completed phases
 *  - Export PDF & Print triggers
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESEARCH_ARCHIVE_REPORTS } from '../../utils/constants';

export default function ResearchArchiveModal({ visible, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  if (!visible) return null;

  const categories = ['All', 'History', 'Viral', 'Genomics', 'Laboratory', 'Simulation', 'Future City', 'Certification'];

  const filteredReports = RESEARCH_ARCHIVE_REPORTS.filter(r => {
    const matchesCat = selectedCat === 'All' || r.category === selectedCat;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            background: 'rgba(2,10,25,0.96)', border: '1px solid rgba(0,255,157,0.4)',
            borderRadius: 16, padding: '1.5rem', boxShadow: '0 0 40px rgba(0,255,157,0.3)',
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00ff9d', letterSpacing: '0.2em' }}>
            MODULE 5 & 11 · RESEARCH REPOSITORY
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 1rem' }}>
            GLOBAL RESEARCH ARCHIVE & EXPORT CENTER
          </div>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Search reports by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1, minWidth: '240px', background: 'rgba(0,12,28,0.9)',
                border: '1px solid #00ff9d', borderRadius: 8, padding: '0.4rem 0.8rem',
                color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
              }}
            />

            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              style={{
                background: 'rgba(0,12,28,0.9)', border: '1px solid #00ff9d',
                borderRadius: 8, padding: '0.4rem 0.8rem', color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', cursor: 'pointer',
              }}
            >
              {categories.map(c => (
                <option key={c} value={c}>Category: {c}</option>
              ))}
            </select>
          </div>

          {/* Reports List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem' }}>
            {filteredReports.map(r => (
              <div
                key={r.id}
                style={{
                  background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.2)',
                  borderRadius: 10, padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00ff9d', fontWeight: 700 }}>
                      [{r.category.toUpperCase()}]
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>
                      {r.title}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                    {r.summary}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                    RECORD DATE: {r.date} · EVALUATION SCORE: {r.score}
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  style={{
                    background: 'rgba(0,255,157,0.2)', border: '1px solid #00ff9d', borderRadius: 6,
                    padding: '0.35rem 0.75rem', color: '#fff', fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  📄 EXPORT PDF
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
