/**
 * BiologicalInfoPanel.jsx
 * Detailed biological classification panel for the active pathogen exhibit.
 * Displays:
 *  - Scientific Name, Common Name, Family, Type
 *  - Genome, Size, Host/Vector, Affected Organs
 *  - Incubation Period, Mortality Rate, Vaccine Status, Modern Treatments
 *  - Interactive 3D View Mode Buttons (Normal, Cross-Section, Exploded, Wireframe, Compare)
 */
import { motion } from 'framer-motion';

export default function BiologicalInfoPanel({
  pandemic,
  viewMode,
  onSetViewMode,
  wireframe,
  onToggleWireframe,
  onOpenCompare,
}) {
  if (!pandemic) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 60, left: 16,
        width: 300,
        zIndex: 600,
        background: 'rgba(2,10,25,0.92)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${pandemic.color || '#00c8ff'}44`,
        borderRadius: 14,
        padding: '1rem',
        boxShadow: `0 0 30px ${pandemic.color || '#00c8ff'}22, 0 8px 32px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <span style={{ fontSize: '1.2rem', color: pandemic.color || '#00c8ff' }}>🔬</span>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.2em' }}>
            BIOLOGICAL TELEMETRY
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
            {pandemic.pathogen}
          </div>
        </div>
      </div>

      {/* Classification Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.8rem' }}>
        {[
          { label: 'TYPE',       val: pandemic.type },
          { label: 'FAMILY',     val: pandemic.family },
          { label: 'GENOME',     val: pandemic.genome },
          { label: 'SIZE',       val: pandemic.size },
          { label: 'INCUBATION', val: pandemic.incubation },
          { label: 'MORTALITY',  val: pandemic.mortality, col: pandemic.color },
        ].map(({ label, val, col }) => (
          <div key={label} style={{
            background: 'rgba(0,200,255,0.04)',
            border: '1px solid rgba(0,200,255,0.1)',
            borderRadius: 6, padding: '0.35rem 0.5rem',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.1em' }}>
              {label}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 600, color: col || '#e0f0ff', marginTop: 1 }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* Host & Organs */}
      <div style={{ background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.1)', borderRadius: 6, padding: '0.4rem 0.6rem', marginBottom: '0.8rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.1em' }}>
          HOST / VECTOR
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: '#cceeff', marginBottom: 4 }}>
          {pandemic.host}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.1em' }}>
          TARGET ORGANS
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: '#cceeff' }}>
          {pandemic.organs}
        </div>
      </div>

      {/* 3D Pathogen Controls */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: '#00c8ff', letterSpacing: '0.15em', marginBottom: 6 }}>
        ◈ 3D PATHOGEN VIEW MODES
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.6rem' }}>
        <button
          onClick={() => onSetViewMode?.('normal')}
          id="btn-view-normal"
          style={{
            background: viewMode === 'normal' ? 'rgba(0,200,255,0.25)' : 'rgba(0,8,22,0.6)',
            border: `1px solid ${viewMode === 'normal' ? '#00c8ff' : 'rgba(0,200,255,0.2)'}`,
            borderRadius: 6, padding: '0.35rem 0',
            color: viewMode === 'normal' ? '#00c8ff' : 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em',
            cursor: 'pointer',
          }}
        >
          NORMAL
        </button>

        <button
          onClick={() => onSetViewMode?.(viewMode === 'crossSection' ? 'normal' : 'crossSection')}
          id="btn-view-cross-section"
          style={{
            background: viewMode === 'crossSection' ? 'rgba(0,255,157,0.25)' : 'rgba(0,8,22,0.6)',
            border: `1px solid ${viewMode === 'crossSection' ? '#00ff9d' : 'rgba(0,200,255,0.2)'}`,
            borderRadius: 6, padding: '0.35rem 0',
            color: viewMode === 'crossSection' ? '#00ff9d' : 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em',
            cursor: 'pointer',
          }}
        >
          CUTAWAY
        </button>

        <button
          onClick={() => onSetViewMode?.(viewMode === 'exploded' ? 'normal' : 'exploded')}
          id="btn-view-exploded"
          style={{
            background: viewMode === 'exploded' ? 'rgba(255,183,0,0.25)' : 'rgba(0,8,22,0.6)',
            border: `1px solid ${viewMode === 'exploded' ? '#ffb700' : 'rgba(0,200,255,0.2)'}`,
            borderRadius: 6, padding: '0.35rem 0',
            color: viewMode === 'exploded' ? '#ffb700' : 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em',
            cursor: 'pointer',
          }}
        >
          EXPLODED
        </button>

        <button
          onClick={onToggleWireframe}
          id="btn-view-wireframe"
          style={{
            background: wireframe ? 'rgba(123,47,247,0.25)' : 'rgba(0,8,22,0.6)',
            border: `1px solid ${wireframe ? '#7b2ff7' : 'rgba(0,200,255,0.2)'}`,
            borderRadius: 6, padding: '0.35rem 0',
            color: wireframe ? '#7b2ff7' : 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em',
            cursor: 'pointer',
          }}
        >
          WIREFRAME
        </button>
      </div>

      {/* Compare Pathogens Button */}
      <button
        onClick={onOpenCompare}
        id="btn-open-compare"
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, rgba(0,200,255,0.2), rgba(123,47,247,0.2))',
          border: '1px solid #00c8ff',
          borderRadius: 8,
          padding: '0.45rem 0',
          color: '#ffffff',
          fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700,
          letterSpacing: '0.15em',
          cursor: 'pointer',
          boxShadow: '0 0 16px rgba(0,200,255,0.25)',
        }}
      >
        🧬 COMPARE PATHOGENS
      </button>
    </motion.div>
  );
}
