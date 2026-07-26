/**
 * HUD.jsx
 * Persistent heads-up display shown during and after the cinematic sequence.
 * Shows stage indicator, time, and system status bar.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SCENE_STAGES } from '../../utils/constants';

const STAGE_LABELS = {
  [SCENE_STAGES.LOADING]:          'SYSTEM BOOT',
  [SCENE_STAGES.CINEMATIC_INTRO]:  'BRIEFING',
  [SCENE_STAGES.ROCKET_LAUNCH]:    'LAUNCH SEQUENCE',
  [SCENE_STAGES.SPACE_FLIGHT]:     'ORBITAL ASCENT',
  [SCENE_STAGES.ORBITAL_STATION]:  'DOCKING APPROACH',
  [SCENE_STAGES.COMMAND_CENTER]:   'SPACE COMMAND CENTER',
  [SCENE_STAGES.MISSION_CONTROL]:  'MISSION CONTROL',
};

export default function HUD({ stage, onMute, muted }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        `${String(now.getUTCHours()).padStart(2,'0')}:${String(now.getUTCMinutes()).padStart(2,'0')}:${String(now.getUTCSeconds()).padStart(2,'0')} UTC`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const showHUD = stage >= SCENE_STAGES.ROCKET_LAUNCH;

  return (
    <AnimatePresence>
      {showHUD && (
        <motion.div
          key="hud"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none' }}
        >
          {/* Top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.8rem 1.5rem',
            background: 'linear-gradient(180deg, rgba(1,4,9,0.8) 0%, transparent 100%)',
          }}>
            {/* Left – logo */}
            <div className="font-display" style={{ color: '#00c8ff', fontSize: '0.65rem', letterSpacing: '0.25em' }}>
              ◈ PTT · SPACE COMMAND
            </div>

            {/* Center – stage */}
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono"
              style={{ color: 'rgba(0,200,255,0.7)', fontSize: '0.6rem', letterSpacing: '0.3em' }}
            >
              {STAGE_LABELS[stage] ?? ''}
            </motion.div>

            {/* Right – time + mute */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="font-mono" style={{ color: 'rgba(0,200,255,0.5)', fontSize: '0.6rem' }}>{time}</span>
              <button
                onClick={onMute}
                style={{
                  pointerEvents: 'all', background: 'transparent', border: 'none',
                  color: muted ? 'rgba(0,200,255,0.3)' : '#00c8ff',
                  cursor: 'pointer', fontSize: '0.8rem',
                }}
                title={muted ? 'Unmute' : 'Mute'}
                id="btn-hud-mute"
              >
                {muted ? '🔇' : '🔊'}
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.6rem 1.5rem',
            background: 'linear-gradient(0deg, rgba(1,4,9,0.8) 0%, transparent 100%)',
          }}>
            <div className="font-mono data-flicker"
              style={{ color: 'rgba(0,200,255,0.4)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
              SYS: NOMINAL · SAT: 247/247 · UPLINK: 99.9%
            </div>
            <div className="font-mono"
              style={{ color: 'rgba(0,200,255,0.35)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
              PANDEMIC THROUGH TIME v1.0
            </div>
          </div>

          {/* Corner brackets */}
          {[
            { top: 12, left: 12 },
            { top: 12, right: 12 },
            { bottom: 12, left: 12 },
            { bottom: 12, right: 12 },
          ].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', width: 16, height: 16, ...pos,
              borderTop:    pos.top !== undefined ? '1px solid rgba(0,200,255,0.3)' : 'none',
              borderBottom: pos.bottom !== undefined ? '1px solid rgba(0,200,255,0.3)' : 'none',
              borderLeft:   pos.left !== undefined ? '1px solid rgba(0,200,255,0.3)' : 'none',
              borderRight:  pos.right !== undefined ? '1px solid rgba(0,200,255,0.3)' : 'none',
            }} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
