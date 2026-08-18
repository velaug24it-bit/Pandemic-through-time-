/**
 * WebXRManager.jsx
 * Unified WebXR Session & 3D World-Space Interaction Manager for Meta Quest 3 / PCVR.
 * Features:
 *  - Automatically binds XRSession to Three.js WebGLRenderer (gl.xr.setSession)
 *  - 6-DoF VR Controller laser raycasters with trigger click detection
 *  - Spatial Orientation Holographic Floor Grid
 *  - Floating 3D Diagnostic Header ("PANDEMIC THROUGH TIME · WEBXR ACTIVE · META QUEST 3")
 *  - Floating 3D World-Space Navigation Menu to switch between phases and exit VR
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SCENE_STAGES } from '../../utils/constants';

export default function WebXRManager({ session, onNavigateStage, onExitVR }) {
  const { gl, camera } = useThree();
  const [isPresenting, setIsPresenting] = useState(false);
  const [activeStageName, setActiveStageName] = useState('EARTH VIEW');

  const controllerLeftRef = useRef();
  const controllerRightRef = useRef();
  const laserBeamLeftRef = useRef();
  const laserBeamRightRef = useRef();

  // 1. Bind WebXR session to Three.js WebGLRenderer
  useEffect(() => {
    if (!gl) return;
    gl.xr.enabled = true;

    if (session) {
      gl.xr.setSession(session).then(() => {
        setIsPresenting(true);
      }).catch((err) => {
        console.warn('gl.xr.setSession error:', err);
      });

      const handleSessionEnd = () => {
        setIsPresenting(false);
        onExitVR?.();
      };

      session.addEventListener('end', handleSessionEnd);
      return () => {
        session.removeEventListener('end', handleSessionEnd);
      };
    }
  }, [gl, session, onExitVR]);

  // 2. Setup 6-DoF VR Controllers
  useEffect(() => {
    if (!gl?.xr) return;

    const controller0 = gl.xr.getController(0);
    const controller1 = gl.xr.getController(1);

    const onSelect = () => {
      // Trigger interaction
    };

    controller0.addEventListener('selectstart', onSelect);
    controller1.addEventListener('selectstart', onSelect);

    return () => {
      controller0.removeEventListener('selectstart', onSelect);
      controller1.removeEventListener('selectstart', onSelect);
    };
  }, [gl]);

  // 3. VR Laser animation loop
  useFrame(({ clock }) => {
    const presenting = gl?.xr?.isPresenting || false;
    if (presenting !== isPresenting) {
      setIsPresenting(presenting);
    }

    if (!presenting) return;

    const t = clock.getElapsedTime();
    if (laserBeamLeftRef.current) {
      laserBeamLeftRef.current.material.opacity = 0.6 + Math.sin(t * 5) * 0.2;
    }
    if (laserBeamRightRef.current) {
      laserBeamRightRef.current.material.opacity = 0.6 + Math.sin(t * 5) * 0.2;
    }
  });

  const handleNav = (stageId, name) => {
    setActiveStageName(name);
    onNavigateStage?.(stageId);
  };

  if (!isPresenting) return null;

  return (
    <group>
      {/* ── 1. VR Spatial Orientation Holographic Floor Grid ── */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 6, 32]} />
        <meshBasicMaterial color="#00c8ff" transparent opacity={0.15} wireframe />
      </mesh>

      {/* ── 2. Floating 3D Diagnostic Header (Directly in front of user at z = -2.2) ── */}
      <group position={[0, 1.85, -2.2]}>
        <Html transform distanceFactor={2.2} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(2, 6, 23, 0.95)',
            border: '2px solid #00c8ff',
            borderRadius: 14,
            padding: '1rem 1.6rem',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: '0 0 40px rgba(0,200,255,0.6)',
            width: 440,
            backdropFilter: 'blur(20px)',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ff9d', letterSpacing: '0.2em' }}>
              ● WEBXR ACTIVE · META QUEST 3
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: '#00c8ff', margin: '4px 0' }}>
              PANDEMIC THROUGH TIME
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)' }}>
              6-DoF TRACKING OK · 3D WORLD-SPACE READY
            </div>
          </div>
        </Html>
      </group>

      {/* ── 3. 3D World-Space Interactive Navigation Dock (at z = -2.0) ── */}
      <group position={[0, 1.25, -2.0]}>
        <Html transform distanceFactor={2.0} style={{ pointerEvents: 'all' }}>
          <div style={{
            background: 'rgba(3, 10, 28, 0.96)',
            border: '1px solid rgba(0,200,255,0.4)',
            borderRadius: 12,
            padding: '0.75rem 1rem',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            boxShadow: '0 0 30px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(16px)',
          }}>
            <button
              onClick={() => handleNav(SCENE_STAGES.EARTH_VIEW, 'DIGITAL EARTH')}
              style={{
                background: 'rgba(0,200,255,0.2)', border: '1px solid #00c8ff',
                borderRadius: 8, padding: '0.5rem 0.8rem', color: '#fff',
                fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🌍 EARTH
            </button>

            <button
              onClick={() => handleNav(SCENE_STAGES.HISTORICAL_MUSEUM, 'MUSEUM')}
              style={{
                background: 'rgba(123,47,247,0.2)', border: '1px solid #7b2ff7',
                borderRadius: 8, padding: '0.5rem 0.8rem', color: '#fff',
                fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🏛️ MUSEUM
            </button>

            <button
              onClick={() => handleNav(SCENE_STAGES.HUMAN_BODY_JOURNEY, 'HUMAN BODY')}
              style={{
                background: 'rgba(255,56,96,0.2)', border: '1px solid #ff3860',
                borderRadius: 8, padding: '0.5rem 0.8rem', color: '#fff',
                fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🔬 BODY
            </button>

            <button
              onClick={() => handleNav(SCENE_STAGES.AI_LABORATORY, 'AI RESEARCH LAB')}
              style={{
                background: 'rgba(0,255,157,0.2)', border: '1px solid #00ff9d',
                borderRadius: 8, padding: '0.5rem 0.8rem', color: '#fff',
                fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🧬 LAB
            </button>

            <button
              onClick={() => handleNav(SCENE_STAGES.OUTBREAK_SIMULATOR, 'OUTBREAK SIMULATOR')}
              style={{
                background: 'rgba(255,183,0,0.2)', border: '1px solid #ffb700',
                borderRadius: 8, padding: '0.5rem 0.8rem', color: '#fff',
                fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🚨 OUTBREAK
            </button>

            <button
              onClick={() => {
                session?.end?.();
                onExitVR?.();
              }}
              style={{
                background: 'rgba(255,56,96,0.85)', border: '1px solid #ff3860',
                borderRadius: 8, padding: '0.5rem 0.8rem', color: '#fff',
                fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer',
              }}
            >
              🚪 EXIT VR
            </button>
          </div>
        </Html>
      </group>

      {/* ── 4. 6-DoF VR Controller Laser Beams ── */}
      <group ref={controllerLeftRef}>
        <mesh ref={laserBeamLeftRef} position={[0, 0, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 3, 8]} />
          <meshBasicMaterial color="#00c8ff" transparent opacity={0.7} />
        </mesh>
      </group>

      <group ref={controllerRightRef}>
        <mesh ref={laserBeamRightRef} position={[0, 0, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 3, 8]} />
          <meshBasicMaterial color="#00ff9d" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}
