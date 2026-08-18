/**
 * WebXRManager.jsx
 * Unified WebXR Session & 3D World-Space Interaction Manager for Meta Quest 3 / PCVR.
 * Features:
 *  - Automatically binds XRSession to Three.js WebGLRenderer (gl.xr.setSession)
 *  - 6-DoF VR Controller laser raycasters with trigger click detection
 *  - Compact 3D World-Space Holographic Command Panel (at z = -1.8m)
 *  - Spatial Stage Navigation: Command, Earth, Museum, Body, Lab, Outbreak, BioShield, Challenge, Intelligence, Exit VR
 */
import { useEffect, useRef, useState, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE_STAGES } from '../../utils/constants';

/** Helper to generate 3D button canvas textures */
function createVRButtonTexture(label, color = '#00c8ff', bg = 'rgba(3,12,32,0.92)') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 112;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 112);

  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.strokeRect(5, 5, 246, 102);

  ctx.font = 'bold 24px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 56);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Helper to generate Command Dock Header texture */
function createVRHeaderTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(2,8,24,0.95)';
  ctx.fillRect(0, 0, 1024, 140);

  ctx.strokeStyle = '#00c8ff';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 1012, 128);

  ctx.font = 'bold 36px sans-serif';
  ctx.fillStyle = '#00c8ff';
  ctx.textAlign = 'center';
  ctx.fillText('PANDEMIC THROUGH TIME · 360° VR SPATIAL HUB', 512, 55);

  ctx.font = '24px monospace';
  ctx.fillStyle = '#00ff9d';
  ctx.fillText('● 6-DoF CONTROLLERS ACTIVE · SELECT MODULE TO ENTER', 512, 100);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function WebXRManager({ session, onNavigateStage, onExitVR }) {
  const { gl, scene } = useThree();
  const [isPresenting, setIsPresenting] = useState(false);

  // Header texture
  const headerTex = useMemo(() => createVRHeaderTexture(), []);

  // Button textures
  const btnCmdTex        = useMemo(() => createVRButtonTexture('🚀 COMMAND', '#00c8ff'), []);
  const btnEarthTex      = useMemo(() => createVRButtonTexture('🌍 EARTH', '#38bdf8'), []);
  const btnMuseumTex     = useMemo(() => createVRButtonTexture('🏛️ MUSEUM', '#7b2ff7'), []);
  const btnLabTex        = useMemo(() => createVRButtonTexture('🔬 LAB', '#00ff9d'), []);
  const btnBodyTex       = useMemo(() => createVRButtonTexture('🫁 BODY', '#ff3860'), []);
  const btnOutbreakTex   = useMemo(() => createVRButtonTexture('🚨 OUTBREAK', '#ffb700'), []);
  const btnBioShieldTex  = useMemo(() => createVRButtonTexture('🛡️ BIOSHIELD', '#00e5ff'), []);
  const btnChallengeTex  = useMemo(() => createVRButtonTexture('🏆 CHALLENGE', '#a855f7'), []);
  const btnIntelTex      = useMemo(() => createVRButtonTexture('🌐 INTEL', '#00ff9d'), []);
  const btnExitTex       = useMemo(() => createVRButtonTexture('🚪 EXIT VR', '#ff3860', 'rgba(45,6,15,0.95)'), []);

  // 1. Bind WebXR session to Three.js WebGLRenderer ONLY when session is active
  useEffect(() => {
    if (!gl?.xr) return;

    if (session) {
      gl.xr.enabled = true;
      gl.xr.setSession(session).then(() => {
        setIsPresenting(true);
      }).catch((err) => {
        console.warn('gl.xr.setSession error:', err);
      });

      const handleSessionEnd = () => {
        setIsPresenting(false);
        if (gl?.xr) gl.xr.enabled = false;
        onExitVR?.();
      };

      session.addEventListener('end', handleSessionEnd);
      return () => {
        session.removeEventListener('end', handleSessionEnd);
      };
    } else {
      gl.xr.enabled = false;
      setIsPresenting(false);
    }
  }, [gl, session, onExitVR]);

  // 2. Setup 6-DoF VR Controllers with laser rays ONLY during active session
  useEffect(() => {
    if (!gl?.xr || !session || typeof gl.xr.getController !== 'function' || !scene) return;

    try {
      const controller0 = gl.xr.getController(0);
      const controller1 = gl.xr.getController(1);

      if (!controller0 || !controller1) return;

      scene.add(controller0);
      scene.add(controller1);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -5),
      ]);
      const lineMat0 = new THREE.LineBasicMaterial({ color: 0x00c8ff, linewidth: 2 });
      const lineMat1 = new THREE.LineBasicMaterial({ color: 0x00ff9d, linewidth: 2 });

      const line0 = new THREE.Line(lineGeo, lineMat0);
      const line1 = new THREE.Line(lineGeo, lineMat1);

      controller0.add(line0);
      controller1.add(line1);

      return () => {
        controller0.remove(line0);
        controller1.remove(line1);
        scene.remove(controller0);
        scene.remove(controller1);
      };
    } catch (err) {
      console.warn('XR Controller setup skipped:', err);
    }
  }, [gl, session, scene]);

  // 3. Monitor presenting state
  useFrame(() => {
    const presenting = gl?.xr?.isPresenting || false;
    if (presenting !== isPresenting) {
      setIsPresenting(presenting);
    }
  });

  const handleNav = (stageId) => {
    onNavigateStage?.(stageId);
  };

  const handleExit = () => {
    session?.end?.();
    onExitVR?.();
  };

  if (!isPresenting) return null;

  return (
    <group>
      {/* ── 3D World-Space Compact Holographic Command Panel (at z = -1.8m) ── */}
      <group position={[0, 1.15, -1.8]}>
        {/* Panel Backdrop */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[2.3, 0.72]} />
          <meshBasicMaterial color="#020917" transparent opacity={0.88} />
        </mesh>
        {/* Panel Border Frame */}
        <mesh position={[0, 0, -0.015]}>
          <planeGeometry args={[2.32, 0.74]} />
          <meshBasicMaterial color="#00c8ff" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Header Ribbon */}
        <mesh position={[0, 0.26, 0]}>
          <planeGeometry args={[2.2, 0.16]} />
          <meshBasicMaterial map={headerTex} transparent opacity={0.96} />
        </mesh>

        {/* ── Row 1 of 3D Buttons (5 items) ── */}
        <group position={[0, 0.08, 0]}>
          <mesh position={[-0.88, 0, 0]} onClick={() => handleNav(SCENE_STAGES.COMMAND_CENTER)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnCmdTex} transparent opacity={0.95} />
          </mesh>
          <mesh position={[-0.44, 0, 0]} onClick={() => handleNav(SCENE_STAGES.EARTH_VIEW)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnEarthTex} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, 0, 0]} onClick={() => handleNav(SCENE_STAGES.HISTORICAL_MUSEUM)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnMuseumTex} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.44, 0, 0]} onClick={() => handleNav(SCENE_STAGES.AI_LABORATORY)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnLabTex} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.88, 0, 0]} onClick={() => handleNav(SCENE_STAGES.HUMAN_BODY_JOURNEY)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnBodyTex} transparent opacity={0.95} />
          </mesh>
        </group>

        {/* ── Row 2 of 3D Buttons (5 items) ── */}
        <group position={[0, -0.10, 0]}>
          <mesh position={[-0.88, 0, 0]} onClick={() => handleNav(SCENE_STAGES.OUTBREAK_SIMULATOR)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnOutbreakTex} transparent opacity={0.95} />
          </mesh>
          <mesh position={[-0.44, 0, 0]} onClick={() => handleNav(SCENE_STAGES.BIOSHIELD_2050)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnBioShieldTex} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, 0, 0]} onClick={() => handleNav(SCENE_STAGES.CHALLENGE_PLATFORM)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnChallengeTex} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.44, 0, 0]} onClick={() => handleNav(SCENE_STAGES.INTELLIGENCE_PLATFORM)}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnIntelTex} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.88, 0, 0]} onClick={handleExit}>
            <planeGeometry args={[0.40, 0.15]} />
            <meshBasicMaterial map={btnExitTex} transparent opacity={0.95} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
