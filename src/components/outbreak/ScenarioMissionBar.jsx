/**
 * ScenarioMissionBar.jsx
 * Unified sub-header control bar for Phase 6 (WHO Command Center).
 * Contains:
 *  - Scenario selector dropdown
 *  - Simulation time counter & controls (Day count, Play/Pause, Speed 1x 2x 5x, Reset)
 *  - Analytics & Debrief report triggers
 *  - Quick mission objectives status badges
 */
import { motion } from 'framer-motion';
import { OUTBREAK_SCENARIOS, MISSION_OBJECTIVES } from '../../utils/constants';

export default function ScenarioMissionBar({
  activeScenarioId,
  onSelectScenario,
  state,
  isRunning,
  speed,
  onTogglePlay,
  onSetSpeed,
  onReset,
  onOpenAnalytics,
  onOpenDebrief,
}) {
  if (!state) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 52, left: 0, right: 0,
        height: 42, zIndex: 590,
        background: 'rgba(2,10,25,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,200,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      {/* Left: Scenario Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: '#00c8ff', letterSpacing: '0.1em' }}>SCENARIO:</span>
        <select
          value={activeScenarioId}
          onChange={(e) => onSelectScenario(e.target.value)}
          style={{
            background: 'rgba(0,12,28,0.9)', border: '1px solid #00c8ff', borderRadius: 4,
            padding: '0.15rem 0.4rem', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.58rem',
            cursor: 'pointer', outline: 'none',
          }}
        >
          {OUTBREAK_SCENARIOS.map(s => (
            <option key={s.id} value={s.id}>{s.name} (R0 = {s.r0})</option>
          ))}
        </select>
      </div>

      {/* Center: Simulation Time & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* Day Ticker */}
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 800, color: '#ff3860' }}>
          DAY {state.day}
        </div>

        {/* Play/Pause */}
        <button
          onClick={onTogglePlay}
          style={{
            background: isRunning ? 'rgba(255,56,96,0.2)' : 'rgba(0,255,157,0.2)',
            border: `1px solid ${isRunning ? '#ff3860' : '#00ff9d'}`,
            borderRadius: 4, padding: '0.2rem 0.5rem',
            color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isRunning ? '⏸ PAUSE' : '▶ RUN'}
        </button>

        {/* Speed 1x 2x 5x */}
        <div style={{ display: 'flex', gap: '0.2rem' }}>
          {[1, 2, 5].map((spd) => (
            <button
              key={spd}
              onClick={() => onSetSpeed(spd)}
              style={{
                background: speed === spd ? 'rgba(0,200,255,0.25)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${speed === spd ? '#00c8ff' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 3, padding: '0.18rem 0.4rem',
                color: speed === spd ? '#fff' : 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-mono)', fontSize: '0.48rem', cursor: 'pointer',
              }}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 4, padding: '0.2rem 0.45rem',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
            cursor: 'pointer',
          }}
        >
          🔄 RESET
        </button>
      </div>

      {/* Right: Analytics, Debrief & Objectives */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Objectives */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {MISSION_OBJECTIVES.map(obj => {
            let passed = false;
            if (obj.id === 'deathsTarget') passed = (state.deceased || 0) < obj.target;
            if (obj.id === 'icuCapacity') passed = (state.icuOccupancy || 0) < obj.target;
            if (obj.id === 'vaccineCoverage') passed = (state.vaccineCoverage || 0) >= obj.target;

            return (
              <div key={obj.id} style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.55rem' }}>{passed ? '✅' : '⏳'}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: passed ? '#00ff9d' : 'rgba(255,255,255,0.5)' }}>
                  {obj.title}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />

        {/* Analytics Button */}
        <button
          onClick={onOpenAnalytics}
          style={{
            background: 'rgba(0,200,255,0.2)', border: '1px solid #00c8ff',
            borderRadius: 4, padding: '0.2rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 0 10px rgba(0,200,255,0.2)',
          }}
        >
          📈 ANALYTICS
        </button>

        {/* Debrief Report Button */}
        <button
          onClick={onOpenDebrief}
          style={{
            background: 'rgba(0,255,157,0.2)', border: '1px solid #00ff9d',
            borderRadius: 4, padding: '0.2rem 0.55rem', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 0 10px rgba(0,255,157,0.2)',
          }}
        >
          📊 DEBRIEF
        </button>
      </div>
    </motion.div>
  );
}
