/**
 * BodyHUD.jsx
 * Top navigation header for Phase 4 – Human Body Journey.
 * Enhanced with Phase 5 "🔬 ENTER AI RESEARCH LAB ▶" CTA button.
 */
import { motion } from 'framer-motion';
import { BODY_VIEW_MODES, ORGAN_SYSTEMS } from '../../utils/constants';

export default function BodyHUD({
  activeOrganId = 'bloodstream',
  activeViewMode = 'bloodstream',
  onSelectViewMode,
  onStartAILaboratory,
  onReturnToMuseum,
}) {
  const currentOrgan = ORGAN_SYSTEMS.find(o => o.id === activeOrganId) || ORGAN_SYSTEMS[0];

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.2rem',
        height: 52,
        background: 'rgba(15,0,8,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,23,68,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      }}
    >
      {/* Left – Logo & Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{currentOrgan.icon}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 800, color: '#ff1744', letterSpacing: '0.2em' }}>
              HUMAN BODY JOURNEY
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>
              {currentOrgan.name.toUpperCase()} · {currentOrgan.scale}
            </div>
          </div>
        </div>
      </div>

      {/* Center – View Mode Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {BODY_VIEW_MODES.map((mode) => {
          const active = activeViewMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onSelectViewMode?.(mode.id)}
              id={`btn-body-mode-${mode.id}`}
              style={{
                background: active ? 'rgba(255,23,68,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? '#ff1744' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 6,
                padding: '0.3rem 0.6rem',
                color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-mono)', fontSize: '0.48rem', letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
              }}
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right – Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {/* Phase 5 CTA Button */}
        <button
          onClick={onStartAILaboratory}
          id="btn-hud-start-ai-lab"
          style={{
            background: 'linear-gradient(135deg, rgba(0,200,255,0.3), rgba(0,255,157,0.3))',
            border: '1px solid #00c8ff',
            borderRadius: 6,
            padding: '0.35rem 0.8rem',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            boxShadow: '0 0 12px rgba(0,200,255,0.3)',
            transition: 'all 0.2s',
          }}
        >
          <span>🔬 ENTER AI RESEARCH LAB</span>
        </button>

        {/* Return Button */}
        <button
          onClick={onReturnToMuseum}
          id="btn-body-return"
          style={{
            background: 'rgba(0,200,255,0.15)',
            border: '1px solid rgba(0,200,255,0.4)',
            borderRadius: 6,
            padding: '0.35rem 0.9rem',
            color: '#00c8ff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            transition: 'all 0.2s',
          }}
        >
          <span>◀ RETURN TO MUSEUM</span>
        </button>
      </div>
    </motion.div>
  );
}
