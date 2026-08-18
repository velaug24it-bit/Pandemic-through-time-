/**
 * XRDiagnosticTestObject.jsx
 * Diagnostic 3D Test Object for WebXR on Meta Quest 3.
 * Renders directly at z = -3.0m in front of the XR camera:
 *  - 3D Test Cube with MeshBasicMaterial & wireframe edges
 *  - Pure WebGL CanvasTexture floating text panel:
 *    "WEBXR TEST"
 *    "IF YOU CAN SEE THIS, XR SCENE WORKS"
 *    "PANDEMIC THROUGH TIME · META QUEST 3"
 */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createDiagnosticPanelTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = 'rgba(2, 8, 24, 0.95)';
  ctx.fillRect(0, 0, 1024, 512);

  // Border & Accent lines
  ctx.strokeStyle = '#00c8ff';
  ctx.lineWidth = 12;
  ctx.strokeRect(16, 16, 992, 480);

  ctx.strokeStyle = '#00ff9d';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, 968, 456);

  // Status Indicator Dot
  ctx.fillStyle = '#00ff9d';
  ctx.beginPath();
  ctx.arc(80, 80, 16, 0, Math.PI * 2);
  ctx.fill();

  // Header
  ctx.font = 'bold 36px monospace';
  ctx.fillStyle = '#00ff9d';
  ctx.fillText('● WEBXR ACTIVE · META QUEST 3', 120, 92);

  // Main Test Title
  ctx.font = '900 64px sans-serif';
  ctx.fillStyle = '#00c8ff';
  ctx.fillText('WEBXR TEST', 80, 190);

  // Main Test Message
  ctx.font = 'bold 44px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('IF YOU CAN SEE THIS, XR SCENE WORKS', 80, 260);

  // Subtitle
  ctx.font = '500 32px sans-serif';
  ctx.fillStyle = 'rgba(200, 230, 255, 0.9)';
  ctx.fillText('PANDEMIC THROUGH TIME · 3D WORLD-SPACE', 80, 330);

  // Diagnostics details
  ctx.font = '30px monospace';
  ctx.fillStyle = 'rgba(0, 255, 157, 0.85)';
  ctx.fillText('DISTANCE: 3.0m · 6-DoF TRACKING OK · WEBGL ACTIVE', 80, 420);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function XRDiagnosticTestObject({ position = [0, 1.4, -3.0] }) {
  const cubeRef = useRef();
  const panelTex = useMemo(() => createDiagnosticPanelTexture(), []);

  useFrame(({ clock }) => {
    if (cubeRef.current) {
      const t = clock.getElapsedTime();
      cubeRef.current.rotation.y = t * 0.8;
      cubeRef.current.rotation.x = t * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* ── 1. Diagnostic Test Cube (at center, z = 0 relative to group) ── */}
      <group position={[0, -0.2, 0]}>
        <mesh ref={cubeRef}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="#00c8ff" wireframe={false} />
        </mesh>
        {/* Wireframe outer cage */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.54, 0.54, 0.54]} />
          <meshBasicMaterial color="#00ff9d" wireframe />
        </mesh>
      </group>

      {/* ── 2. Pure WebGL Floating Diagnostic Text Panel (above cube) ── */}
      <mesh position={[0, 0.7, 0]}>
        <planeGeometry args={[2.2, 1.1]} />
        <meshBasicMaterial map={panelTex} transparent opacity={0.96} side={THREE.DoubleSide} />
      </mesh>

      {/* ── 3. Basic Fallback Point Light directly illuminating the test area ── */}
      <pointLight color="#ffffff" intensity={2.0} distance={8} position={[0, 1, 1]} />
    </group>
  );
}
