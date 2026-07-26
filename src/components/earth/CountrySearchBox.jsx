/**
 * CountrySearchBox.jsx
 * Autocomplete Search Component for Phase 2 Digital Twin Earth.
 * Supports:
 *  - Full country name, ISO codes, and partial string matching
 *  - Flag icons & risk badges
 *  - Keyboard navigation (Arrow keys, Enter, Escape)
 *  - Recent search chips
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES, RISK_COLORS } from '../../data/countries';

export default function CountrySearchBox({ onSelectCountry, selectedCountry }) {
  const [query, setQuery]           = useState('');
  const [isOpen, setIsOpen]         = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const [recents, setRecents]       = useState(['India', 'United States', 'Japan', 'Germany']);
  const inputRef                    = useRef(null);

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.id.toLowerCase().includes(query.toLowerCase()) ||
    c.region.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  const handleSelect = (country) => {
    onSelectCountry(country);
    setQuery(country.name);
    setIsOpen(false);
    setFocusedIdx(-1);
    setRecents(prev => Array.from(new Set([country.name, ...prev])).slice(0, 5));
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIdx(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIdx(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter' && focusedIdx >= 0 && filtered[focusedIdx]) {
      e.preventDefault();
      handleSelect(filtered[focusedIdx]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 56, left: 16, zIndex: 700, width: 'clamp(240px, 22vw, 300px)' }}>
      {/* Search Input Container */}
      <div style={{
        background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,200,255,0.4)', borderRadius: 10,
        padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
        boxShadow: '0 0 20px rgba(0,200,255,0.2)',
      }}>
        <span style={{ fontSize: '0.85rem', color: '#00c8ff' }}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search country (India, USA)..."
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setFocusedIdx(-1);
          }}
          onKeyDown={handleKeyDown}
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '0.68rem',
            width: '100%', fontWeight: 700,
          }}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      <AnimatePresence>
        {isOpen && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              marginTop: 4, background: 'rgba(2,10,25,0.96)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,200,255,0.3)', borderRadius: 10,
              padding: '0.3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
              maxHeight: 280, overflowY: 'auto',
            }}
          >
            {filtered.map((c, idx) => {
              const riskColor = RISK_COLORS[c.risk] || '#00c8ff';
              const isFocused = idx === focusedIdx;

              return (
                <div
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.4rem 0.6rem', borderRadius: 6, cursor: 'pointer',
                    background: isFocused ? 'rgba(0,200,255,0.2)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>{c.emoji}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', fontWeight: 800, color: '#fff' }}>
                        {c.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>
                        {c.region} · POP: {c.pop}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.38rem', padding: '0.12rem 0.35rem',
                    borderRadius: 4, background: `${riskColor}25`, border: `1px solid ${riskColor}`,
                    color: riskColor, fontWeight: 700,
                  }}>
                    {c.risk.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Searches Chips */}
      {!isOpen && recents.length > 0 && (
        <div style={{ display: 'flex', gap: '0.25rem', marginTop: 6, overflowX: 'hidden' }}>
          {recents.slice(0, 3).map(rName => {
            const found = COUNTRIES.find(c => c.name === rName);
            if (!found) return null;

            return (
              <button
                key={rName}
                onClick={() => handleSelect(found)}
                style={{
                  background: 'rgba(0,10,25,0.85)', border: '1px solid rgba(0,200,255,0.3)',
                  borderRadius: 12, padding: '0.15rem 0.45rem', color: '#fff',
                  fontFamily: 'var(--font-mono)', fontSize: '0.44rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap',
                }}
              >
                <span>{found.emoji}</span>
                <span>{found.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
