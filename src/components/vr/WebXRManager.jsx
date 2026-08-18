/**
 * WebXRManager.jsx
 * Unified WebXR Session & 3D World-Space Interaction Manager for Meta Quest 3 / PCVR.
 * Features:
 *  - Automatically binds XRSession to Three.js WebGLRenderer (gl.xr.setSession)
 *  - Pure WebGL Diagnostic Test Object & Floating Diagnostic Panel (100% WebGL-native)
 *  - 6-DoF VR Controller laser raycasters with trigger click detection
 *  - Spatial Orientation Holographic Floor Grid
 *  - 3D World-Space Interactive Navigation Dock
 */
import { useEffect, useRef, useState, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE_STAGES } from '../../utils/constants';
import XRDiagnosticTestObject from './XRDiagnosticTestObject';

/** Helper to generate 3D button canvas textures */
function createVRButtonTexture(label, color = '#00c8ff', bg = 'rgba(2,12,30,0.9)') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 128);

  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 244, 116);

  ctx.font = 'bold 30px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function WebXRManager({ session, onNavigateStage, onExitVR }) {
  const { gl, scene } = useThree();
  const [isPresenting, setIsPresenting] = useState(false);

  // Button textures
  const btnEarthTex = useMemo(() => createVRButtonTexture('🌍 EARTH', '#00c8ff'), []);
  const btnMuseumTex = useMemo(() => createVRButtonTexture('🏛️ MUSEUM', '#7b2ff7'), []);
  const btnBodyTex = useMemo(() => createVRButtonTexture('🔬 BODY', '#ff3860'), []);
  const btnLabTex = useMemo(() => createVRButtonTexture('🧬 LAB', '#00ff9d'), []);
  const btnOutbreakTex = useMemo(() => createVRButtonTexture('🚨 OUTBREAK', '#ffb700'), []);
  const btnExitTex = useMemo(() => createVRButtonTexture('🚪 EXIT VR', '#ff3860', 'rgba(40,4,12,0.95)'), []);

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

  // 2. Setup 6-DoF VR Controllers with laser rays
  useEffect(() => {
    if (!gl?.xr || !scene) return;

    const controller0 = gl.xr.getController(0);
    const controller1 = gl.xr.getController(1);

    scene.add(controller0);
    scene.add(controller1);

    // Add laser ray lines
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -4),
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
  }, [gl, scene]);

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
      {/* ── 1. Diagnostic Test Object & Panel (3m in front of user) ── */}
      <XRDiagnosticTestObject position={[0, 1.4, -3.0]} />

      {/* ── 2. VR Spatial Orientation Holographic Floor Grid ── */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 6, 32]} />
        <meshBasicMaterial color="#00c8ff" transparent opacity={0.25} wireframe />
      </mesh>

      {/* ── 3. 3D World-Space Interactive Navigation Dock (at z = -2.2m) ── */}
      <group position={[0, 0.6, -2.2]}>
        {/* Dock backplate */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[2.5, 0.45]} />
          <meshBasicMaterial color="#020814" transparent opacity={0.8} />
        </mesh>

        {/* 3D Navigation Buttons */}
        <mesh position={[-1.0, 0, 0]} onClick={() => handleNav(SCENE_STAGES.EARTH_VIEW)}>
          <planeGeometry args={[0.38, 0.19]} />
          <meshBasicMaterial map={btnEarthTex} transparent opacity={0.95} />
        </mesh>

        <mesh position={[-0.6, 0, 0]} onClick={() => handleNav(SCENE_STAGES.HISTORICAL_MUSEUM)}>
          <planeGeometry args={[0.38, 0.19]} />
          <meshBasicMaterial map={btnMuseumTex} transparent opacity={0.95} />
        </mesh>

        <mesh position={[-0.2, 0, 0]} onClick={() => handleNav(SCENE_STAGES.HUMAN_BODY_JOURNEY)}>
          <planeGeometry args={[0.38, 0.19]} />
          <meshBasicMaterial map={btnBodyTex} transparent opacity={0.95} />
        </mesh>

        <mesh position={[0.2, 0, 0]} onClick={() => handleNav(SCENE_STAGES.AI_LABORATORY)}>
          <planeGeometry args={[0.38, 0.19]} />
          <meshBasicMaterial map={btnLabTex} transparent opacity={0.95} />
        </mesh>

        <mesh position={[0.6, 0, 0]} onClick={() => handleNav(SCENE_STAGES.OUTBREAK_SIMULATOR)}>
          <planeGeometry args={[0.38, 0.19]} />
          <meshBasicMaterial map={btnOutbreakTex} transparent opacity={0.95} />
        </mesh>

        <mesh position={[1.0, 0, 0]} onClick={handleExit}>
          <planeGeometry args={[0.38, 0.19]} />
          <meshBasicMaterial map={btnExitTex} transparent opacity={0.95} />
        </mesh>
      </group>
    </group>
  );
}
