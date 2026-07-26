/**
 * SearchBar.jsx
 * Country search input with live filtering and fly-to on select.
 * Emits onSelectCountry(country) so EarthScene can trigger camera fly-to.
 */
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES, RISK_COLORS } from '../../data/countries';

export default function SearchBar({ onSelectCountry }) {
  const [query,    setQuery]    = useState('');
  const [focused,  setFocused]  = useState(false);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const select = (country) => {
    setQuery('');
    setFocused(false);
    onSelectCountry?.(country);
  };

  // Keyboard shortcut: Ctrl+F or /
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' || (e.ctrlKey && e.key === 'f')) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 52, left: 16,
      zIndex: 600,
      width: 260,
    }}>
      {/* Input */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        background: 'rgba(2,8,22,0.88)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${focused ? 'rgba(0,200,255,0.5)' : 'rgba(0,200,255,0.18)'}`,
        borderRadius: 8,
        padding: '0.5rem 0.8rem',
        transition: 'border-color 0.2s',
        boxShadow: focused ? '0 0 20px rgba(0,200,255,0.15)' : 'none',
      }}>
        <span style={{ color: 'rgba(0,200,255,0.5)', fontSize: '0.75rem' }}>🔍</span>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search countries... (Press /)"
          id="input-country-search"
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: '#e0f0ff', fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem', flex: 1, letterSpacing: '0.05em',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              background: 'transparent', border: 'none',
              color: 'rgba(0,200,255,0.4)', cursor: 'pointer', fontSize: '0.7rem',
            }}
          >✕</button>
        )}
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: 4,
              background: 'rgba(2,8,22,0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,200,255,0.18)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            {results.map(c => {
              const color = RISK_COLORS[c.risk];
              return (
                <button
                  key={c.id}
                  onClick={() => select(c)}
                  id={`btn-search-result-${c.id}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    width: '100%', padding: '0.55rem 0.8rem',
                    background: 'transparent', border: 'none',
                    borderBottom: '1px solid rgba(0,200,255,0.06)',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,255,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '0.9rem' }}>{c.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#e0f0ff' }}>
                      {c.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(0,200,255,0.4)' }}>
                      {c.region}
                    </div>
                  </div>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: color, boxShadow: `0 0 4px ${color}`,
                    flexShrink: 0,
                  }} />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      <AnimatePresence>
        {focused && query.length > 0 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              marginTop: 4,
              background: 'rgba(2,8,22,0.9)',
              border: '1px solid rgba(0,200,255,0.12)',
              borderRadius: 8, padding: '0.7rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
              color: 'rgba(0,200,255,0.35)', textAlign: 'center',
              letterSpacing: '0.1em',
            }}
          >
            NO RESULTS FOR "{query.toUpperCase()}"
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
