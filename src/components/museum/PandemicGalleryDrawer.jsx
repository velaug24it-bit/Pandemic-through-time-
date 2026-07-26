/**
 * PandemicGalleryDrawer.jsx
 * Comprehensive educational drawer for the active museum exhibit.
 * Enhanced with Phase 4 "JOURNEY INSIDE HUMAN BODY" CTA button.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = ['Overview', 'Symptoms', 'Medical Response', 'Lessons Learned'];

export default function PandemicGalleryDrawer({ pandemic, onClose, onStartHumanBodyJourney }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!pandemic) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={pandemic.id}
        initial={{ x: 340, opacity: 0 }}
        animate={{ x: 0,   opacity: 1 }}
        exit={{ x: 340,    opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 60, right: 16, bottom: 90,
          width: 320,
          zIndex: 600,
          background: 'rgba(2,10,25,0.94)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${pandemic.color || '#00c8ff'}44`,
          borderRadius: 14,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: `0 0 40px ${pandemic.color || '#00c8ff'}22, 0 8px 32px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Top Accent Stripe */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${pandemic.color || '#00c8ff'}, transparent)` }} />

        {/* Header */}
        <div style={{ padding: '1rem 1rem 0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.2em' }}>
                ◈ EXHIBIT FILE #{pandemic.year}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: '2px 0' }}>
                {pandemic.name}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#00ff9d' }}>
                {pandemic.era}
              </div>
            </div>
            <button
              onClick={onClose}
              id="btn-close-gallery-drawer"
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 4, color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
                padding: '0.2rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              }}
            >✕</button>
          </div>

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.8rem' }}>
            {[
              { label: 'DEATH TOLL', val: pandemic.deaths, col: pandemic.color },
              { label: 'PATHOGEN',   val: pandemic.pathogen },
              { label: 'TYPE',       val: pandemic.type },
              { label: 'ORIGIN',     val: pandemic.origin },
            ].map(({ label, val, col }) => (
              <div key={label} style={{
                background: 'rgba(0,200,255,0.04)',
                border: '1px solid rgba(0,200,255,0.1)',
                borderRadius: 6, padding: '0.4rem 0.5rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.1em' }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', fontWeight: 700, color: col || '#e0f0ff', marginTop: 2 }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', borderTop: '1px solid rgba(0,200,255,0.1)', borderBottom: '1px solid rgba(0,200,255,0.1)' }}>
          {SECTIONS.map((sec, i) => (
            <button
              key={sec}
              onClick={() => setActiveTab(i)}
              id={`btn-exhibit-tab-${i}`}
              style={{
                flex: 1, padding: '0.45rem 0',
                background: activeTab === i ? 'rgba(0,200,255,0.12)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === i ? `2px solid ${pandemic.color || '#00c8ff'}` : '2px solid transparent',
                color: activeTab === i ? (pandemic.color || '#00c8ff') : 'rgba(255,255,255,0.35)',
                fontFamily: 'var(--font-mono)', fontSize: '0.45rem',
                letterSpacing: '0.05em', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {sec.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Scrollable Tab Content */}
        <div style={{ flex: 1, padding: '0.8rem 1rem', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {/* Tab 0: Overview */}
              {activeTab === 0 && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.15em', marginBottom: 6 }}>
                    SUMMARY
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#cceeff', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                    {pandemic.summary}
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.15em', marginBottom: 6 }}>
                    TRANSMISSION SPREAD
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#cceeff', lineHeight: 1.6 }}>
                    {pandemic.spread}
                  </p>
                </div>
              )}

              {/* Tab 1: Symptoms */}
              {activeTab === 1 && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.15em', marginBottom: 8 }}>
                    CLINICAL SYMPTOMS
                  </div>
                  {pandemic.symptoms.map((sym, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.08)',
                      borderRadius: 6, padding: '0.4rem 0.6rem', marginBottom: '0.4rem',
                    }}>
                      <span style={{ color: pandemic.color || '#ff3860', fontSize: '0.7rem' }}>☣</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#e0f0ff' }}>{sym}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Medical Response */}
              {activeTab === 2 && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.15em', marginBottom: 6 }}>
                    HISTORICAL RESPONSE
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#cceeff', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                    {pandemic.response}
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.15em', marginBottom: 6 }}>
                    SOCIETAL IMPACT
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#cceeff', lineHeight: 1.6 }}>
                    {pandemic.impact}
                  </p>
                </div>
              )}

              {/* Tab 3: Lessons Learned */}
              {activeTab === 3 && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#00ff9d', letterSpacing: '0.15em', marginBottom: 6 }}>
                    KEY SCIENTIFIC LESSON
                  </div>
                  <div style={{
                    background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.2)',
                    borderRadius: 8, padding: '0.8rem',
                    fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#ffffff', lineHeight: 1.6,
                  }}>
                    "{pandemic.lessons}"
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase 4 CTA: Journey Inside Human Body */}
        <div style={{ padding: '0.6rem 0.8rem', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,23,68,0.2)' }}>
          <button
            onClick={onStartHumanBodyJourney}
            id="btn-start-human-body-journey"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(255,23,68,0.4), rgba(123,47,247,0.3))',
              border: '1px solid #ff1744',
              borderRadius: 8,
              padding: '0.55rem 0',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(255,23,68,0.35)',
            }}
          >
            🔬 JOURNEY INSIDE HUMAN BODY ▶
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
