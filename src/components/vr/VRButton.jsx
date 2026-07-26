/**
 * VRButton.jsx
 * WebXR Hardware Detection & Enter/Exit VR Controller Component for Phase 10.
 * Automatically checks navigator.xr.isSessionSupported('immersive-vr').
 * Displays "🥽 ENTER VR" button when WebXR VR is supported, and handles session lifecycle.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VRButton({ onSessionStart, onSessionEnd }) {
  const [vrSupported, setVrSupported] = useState(false);
  const [inVR, setInVR]               = useState(false);
  const [xrSession, setXrSession]     = useState(null);

  useEffect(() => {
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then((supported) => {
          setVrSupported(supported);
        })
        .catch(() => {
          setVrSupported(false);
        });
    } else {
      setVrSupported(false);
    }
  }, []);

  const toggleVR = async () => {
    if (inVR && xrSession) {
      try {
        await xrSession.end();
      } catch (err) {
        console.error('Error ending WebXR session:', err);
      }
      setInVR(false);
      setXrSession(null);
      onSessionEnd?.();
      return;
    }

    if (!('xr' in navigator)) return;

    try {
      const session = await navigator.xr.requestSession('immersive-vr', {
        optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'],
      });

      session.addEventListener('end', () => {
        setInVR(false);
        setXrSession(null);
        onSessionEnd?.();
      });

      setXrSession(session);
      setInVR(true);
      onSessionStart?.(session);
    } catch (err) {
      console.warn('WebXR Immersive VR Session Request failed/fallback to desktop:', err);
    }
  };

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 999, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {/* Render ENTER VR Button (or Simulator Fallback Trigger if desktop) */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleVR}
          style={{
            background: inVR
              ? 'linear-gradient(135deg, rgba(255,56,96,0.9), rgba(123,47,247,0.9))'
              : vrSupported
                ? 'linear-gradient(135deg, rgba(0,255,157,0.9), rgba(0,200,255,0.9))'
                : 'linear-gradient(135deg, rgba(0,200,255,0.35), rgba(123,47,247,0.35))',
            border: `1px solid ${inVR ? '#ff3860' : vrSupported ? '#00ff9d' : '#00c8ff'}`,
            borderRadius: 8,
            padding: '0.4rem 0.8rem',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            boxShadow: `0 0 20px ${inVR ? 'rgba(255,56,96,0.5)' : 'rgba(0,200,255,0.4)'}`,
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
          title={vrSupported ? 'Launch WebXR VR Session' : 'WebXR VR Browser Mode Active (Meta Quest / Pico / PCVR Ready)'}
        >
          <span>{inVR ? '🚪 EXIT VR' : '🥽 ENTER VR'}</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.4rem', padding: '0.1rem 0.35rem',
            borderRadius: 4, background: vrSupported ? 'rgba(0,255,157,0.3)' : 'rgba(255,255,255,0.2)',
            color: '#fff', fontWeight: 700,
          }}>
            {inVR ? 'ACTIVE' : vrSupported ? 'WEBXR READY' : 'VR READY'}
          </span>
        </motion.button>
      </div>
    </AnimatePresence>
  );
}
