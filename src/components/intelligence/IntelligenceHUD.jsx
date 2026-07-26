/**
 * IntelligenceHUD.jsx
 * Master Telemetry & Navigation Header Bar for Phase 9 (Module 1).
 * Features:
 *  - Real-time Global Intelligence Telemetry Counters
 *  - Launchers for all Phase 9 Intelligence Modules
 */
import { motion } from 'framer-motion';

export default function IntelligenceHUD({
  onOpenDigitalTwin,
  onOpenKnowledgeGraph,
  onOpenTimeline,
  onOpenArchive,
  onOpenAnalytics,
  onOpenLibrary,
  onOpenProgress,
  onOpenAccessibility,
  onReturnToMissionControl,
}) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 54, zIndex: 600,
        background: 'rgba(1,4,12,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,200,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem', boxShadow: '0 4px 30px rgba(0,200,255,0.2)',
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.2rem', color: '#00c8ff' }}>🌐</span>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 900, color: '#00c8ff', letterSpacing: '0.15em' }}>
            GLOBAL HEALTH INTELLIGENCE PLATFORM
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)' }}>
            DIGITAL TWIN & PANDEMIC KNOWLEDGE MATRIX
          </div>
        </div>
      </div>

      {/* Module Launch Buttons */}
      <div className="responsive-dock mobile-scroll-dock" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflowX: 'auto' }}>
        <button
          onClick={onOpenDigitalTwin}
          style={{
            background: 'rgba(0,200,255,0.15)', border: '1px solid #00c8ff',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          🌐 TWIN EARTH
        </button>

        <button
          onClick={onOpenKnowledgeGraph}
          style={{
            background: 'rgba(123,47,247,0.15)', border: '1px solid #7b2ff7',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          🕸️ GRAPH
        </button>

        <button
          onClick={onOpenTimeline}
          style={{
            background: 'rgba(255,183,0,0.15)', border: '1px solid #ffb700',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          📜 TIMELINE
        </button>

        <button
          onClick={onOpenArchive}
          style={{
            background: 'rgba(0,255,157,0.15)', border: '1px solid #00ff9d',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          📁 ARCHIVE
        </button>

        <button
          onClick={onOpenAnalytics}
          style={{
            background: 'rgba(0,229,255,0.15)', border: '1px solid #00e5ff',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          📊 ANALYTICS
        </button>

        <button
          onClick={onOpenLibrary}
          style={{
            background: 'rgba(255,56,96,0.15)', border: '1px solid #ff3860',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          📚 LIBRARY
        </button>

        <button
          onClick={onOpenProgress}
          style={{
            background: 'rgba(0,255,157,0.15)', border: '1px solid #00ff9d',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          📈 PROGRESS
        </button>

        <button
          onClick={onOpenAccessibility}
          style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          ♿ SETTINGS
        </button>

        <button
          onClick={onReturnToMissionControl}
          style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 6, padding: '0.35rem 0.55rem', color: 'rgba(255,255,255,0.8)',
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          ◀ EXIT
        </button>
      </div>
    </motion.div>
  );
}
