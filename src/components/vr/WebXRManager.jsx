/**
 * WebXRManager.jsx
 * Unified WebXR Session & 3D World-Space Interaction Manager for Meta Quest 3 / PCVR.
 * Features:
 *  - Full 6-DoF Controller Raycaster with Meta Quest trigger ('select' / 'selectstart') click detection
 *  - Haptic feedback pulse on hover/click for Meta Quest Touch Plus controllers
 *  - Sequential Step-by-Step Flow Navigation matching the laptop website order:
 *      Phase 1 (Command) -> Phase 2 (Earth) -> Phase 3 (Museum) -> Phase 4 (Body) ->
 *      Phase 5 (Lab) -> Phase 6 (Outbreak) -> Phase 7 (BioShield) -> Phase 8 (Challenge) -> Phase 9 (Intel)
 *  - Big Prominent "NEXT PHASE ▶" & "◀ PREV PHASE" Action Bar in VR
 *  - 3D Quick-Select Grid for all 9 phases + Exit VR button
 *  - Visual hover highlight and laser dot on 3D buttons
 */
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE_STAGES } from '../../utils/constants';

// Ordered sequence of the website phases
const ORDERED_PHASES = [
  { id: SCENE_STAGES.COMMAND_CENTER,    num: 1, name: 'SPACE COMMAND',      icon: '🚀', color: '#00c8ff' },
  { id: SCENE_STAGES.EARTH_VIEW,         num: 2, name: 'DIGITAL EARTH',      icon: '🌍', color: '#38bdf8' },
  { id: SCENE_STAGES.HISTORICAL_MUSEUM,  num: 3, name: 'PANDEMIC MUSEUM',    icon: '🏛️', color: '#7b2ff7' },
  { id: SCENE_STAGES.HUMAN_BODY_JOURNEY, num: 4, name: 'HUMAN BODY JOURNEY', icon: '🫁', color: '#ff3860' },
  { id: SCENE_STAGES.AI_LABORATORY,      num: 5, name: 'AI RESEARCH LAB',    icon: '🔬', color: '#00ff9d' },
  { id: SCENE_STAGES.OUTBREAK_SIMULATOR, num: 6, name: 'OUTBREAK SIMULATOR', icon: '🚨', color: '#ffb700' },
  { id: SCENE_STAGES.BIOSHIELD_2050,     num: 7, name: 'BIOSHIELD 2050',     icon: '🛡️', color: '#00e5ff' },
  { id: SCENE_STAGES.CHALLENGE_PLATFORM, num: 8, name: 'CRISIS CHALLENGE',   icon: '🏆', color: '#a855f7' },
  { id: SCENE_STAGES.INTELLIGENCE_PLATFORM, num: 9, name: 'HEALTH INTEL HUB', icon: '🌐', color: '#00ff9d' },
];

/** Helper to generate 3D button canvas textures */
function createButtonCanvasTexture(label, sublabel = '', color = '#00c8ff', bg = 'rgba(4,14,36,0.92)', isPrimary = false) {
  const canvas = document.createElement('canvas');
  canvas.width = isPrimary ? 360 : 220;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border
  ctx.strokeStyle = color;
  ctx.lineWidth = isPrimary ? 6 : 4;
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  // Text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (sublabel) {
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, canvas.width / 2, 38);

    ctx.font = '13px monospace';
    ctx.fillStyle = color;
    ctx.fillText(sublabel, canvas.width / 2, 70);
  } else {
    ctx.font = isPrimary ? 'bold 24px sans-serif' : 'bold 20px sans-serif';
    ctx.fillStyle = isPrimary ? '#ffffff' : color;
    ctx.fillText(label, canvas.width / 2, 50);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Helper to generate VR Header Banner texture */
function createHeaderBannerTexture(currentPhaseName, stepStr) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 120;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(2,8,24,0.96)';
  ctx.fillRect(0, 0, 1024, 120);

  ctx.strokeStyle = '#00c8ff';
  ctx.lineWidth = 5;
  ctx.strokeRect(5, 5, 1014, 110);

  ctx.font = 'bold 30px sans-serif';
  ctx.fillStyle = '#00c8ff';
  ctx.textAlign = 'center';
  ctx.fillText(`PANDEMIC THROUGH TIME · ${stepStr}`, 512, 45);

  ctx.font = '22px monospace';
  ctx.fillStyle = '#00ff9d';
  ctx.fillText(`● ACTIVE: ${currentPhaseName} · POINT & PULL TRIGGER TO NAVIGATE`, 512, 85);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function WebXRManager({
  session,
  currentStage = SCENE_STAGES.EARTH_VIEW,
  onNavigateStage,
  onExitVR,
}) {
  const { gl, scene } = useThree();
  const [isPresenting, setIsPresenting] = useState(false);
  const [hoveredButtonKey, setHoveredButtonKey] = useState(null);

  const buttonsRef = useRef(new Map());
  const raycasterRef = useRef(new THREE.Raycaster());
  const tempMatrixRef = useRef(new THREE.Matrix4());
  const controllersRef = useRef([]);

  // Find active phase index
  const activePhaseIndex = useMemo(() => {
    const idx = ORDERED_PHASES.findIndex(p => p.id === currentStage);
    return idx >= 0 ? idx : 1; // Default to Earth View (index 1)
  }, [currentStage]);

  const activePhase = ORDERED_PHASES[activePhaseIndex] || ORDERED_PHASES[1];
  const nextPhase = ORDERED_PHASES[(activePhaseIndex + 1) % ORDERED_PHASES.length];
  const prevPhase = ORDERED_PHASES[(activePhaseIndex - 1 + ORDERED_PHASES.length) % ORDERED_PHASES.length];

  // Dynamic Header Texture
  const headerTex = useMemo(() => {
    return createHeaderBannerTexture(
      activePhase.name,
      `PHASE ${activePhase.num} OF ${ORDERED_PHASES.length}`
    );
  }, [activePhase]);

  // Next & Prev Textures
  const nextBtnTex = useMemo(() => {
    return createButtonCanvasTexture(`NEXT: ${nextPhase.icon} ${nextPhase.name} ▶`, 'STEP FORWARD IN STORYLINE', '#00ff9d', 'rgba(0,40,25,0.95)', true);
  }, [nextPhase]);

  const prevBtnTex = useMemo(() => {
    return createButtonCanvasTexture(`◀ PREV: ${prevPhase.name}`, 'STEP BACKWARD', '#38bdf8', 'rgba(4,18,36,0.95)', false);
  }, [prevPhase]);

  const exitBtnTex = useMemo(() => {
    return createButtonCanvasTexture('🚪 EXIT VR', 'RETURN TO BROWSER', '#ff3860', 'rgba(45,6,15,0.95)', false);
  }, []);

  // Phase Quick-Select Textures
  const phaseTextures = useMemo(() => {
    return ORDERED_PHASES.map((p) => ({
      ...p,
      tex: createButtonCanvasTexture(`${p.icon} P${p.num}`, p.name, p.color, p.id === currentStage ? 'rgba(0,50,70,0.95)' : 'rgba(3,12,30,0.92)'),
    }));
  }, [currentStage]);

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

  // 2. Setup 6-DoF VR Controllers with laser rays & trigger click handlers
  useEffect(() => {
    if (!gl?.xr || !session || typeof gl.xr.getController !== 'function' || !scene) return;

    try {
      const controller0 = gl.xr.getController(0);
      const controller1 = gl.xr.getController(1);

      if (!controller0 || !controller1) return;

      scene.add(controller0);
      scene.add(controller1);
      controllersRef.current = [controller0, controller1];

      // Laser lines
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

      // Trigger selection handler for VR controller
      const handleSelect = (event) => {
        const controller = event.target;
        tempMatrixRef.current.identity().extractRotation(controller.matrixWorld);
        raycasterRef.current.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        raycasterRef.current.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrixRef.current);

        const interactiveMeshes = Array.from(buttonsRef.current.values()).map(b => b.mesh).filter(Boolean);
        const intersects = raycasterRef.current.intersectObjects(interactiveMeshes, false);

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object;
          for (const [key, btn] of buttonsRef.current.entries()) {
            if (btn.mesh === hitMesh) {
              // Trigger haptic vibration on Meta Quest controller if available
              if (controller.gamepad?.hapticActuators && controller.gamepad.hapticActuators[0]) {
                try {
                  controller.gamepad.hapticActuators[0].pulse(0.8, 50);
                } catch (e) {}
              }
              btn.action?.();
              break;
            }
          }
        }
      };

      controller0.addEventListener('select', handleSelect);
      controller1.addEventListener('select', handleSelect);
      controller0.addEventListener('selectstart', handleSelect);
      controller1.addEventListener('selectstart', handleSelect);

      return () => {
        controller0.removeEventListener('select', handleSelect);
        controller1.removeEventListener('select', handleSelect);
        controller0.removeEventListener('selectstart', handleSelect);
        controller1.removeEventListener('selectstart', handleSelect);
        controller0.remove(line0);
        controller1.remove(line1);
        scene.remove(controller0);
        scene.remove(controller1);
        controllersRef.current = [];
      };
    } catch (err) {
      console.warn('XR Controller setup skipped:', err);
    }
  }, [gl, session, scene]);

  // 3. VR Raycaster hover detection per frame
  useFrame(() => {
    const presenting = gl?.xr?.isPresenting || false;
    if (presenting !== isPresenting) {
      setIsPresenting(presenting);
    }

    if (!presenting || controllersRef.current.length === 0) return;

    let hitKey = null;
    const interactiveMeshes = Array.from(buttonsRef.current.values()).map(b => b.mesh).filter(Boolean);

    for (const controller of controllersRef.current) {
      tempMatrixRef.current.identity().extractRotation(controller.matrixWorld);
      raycasterRef.current.ray.origin.setFromMatrixPosition(controller.matrixWorld);
      raycasterRef.current.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrixRef.current);

      const intersects = raycasterRef.current.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        for (const [key, btn] of buttonsRef.current.entries()) {
          if (btn.mesh === hitMesh) {
            hitKey = key;
            break;
          }
        }
        if (hitKey) break;
      }
    }

    if (hitKey !== hoveredButtonKey) {
      setHoveredButtonKey(hitKey);
    }
  });

  // Register interactive mesh callback
  const registerButton = useCallback((key, mesh, action) => {
    if (mesh) {
      buttonsRef.current.set(key, { mesh, action });
    } else {
      buttonsRef.current.delete(key);
    }
  }, []);

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
      {/* ── 3D World-Space Sequential Command Cockpit (at z = -1.8m, angled up slightly) ── */}
      <group position={[0, 1.15, -1.8]} rotation={[-0.1, 0, 0]}>
        {/* Panel Backdrop */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[2.5, 0.95]} />
          <meshBasicMaterial color="#010614" transparent opacity={0.92} />
        </mesh>
        {/* Panel Border Frame */}
        <mesh position={[0, 0, -0.015]}>
          <planeGeometry args={[2.52, 0.97]} />
          <meshBasicMaterial color="#00c8ff" wireframe transparent opacity={0.4} />
        </mesh>

        {/* ── 1. Top Header Banner ── */}
        <mesh position={[0, 0.38, 0]}>
          <planeGeometry args={[2.4, 0.14]} />
          <meshBasicMaterial map={headerTex} transparent opacity={0.98} />
        </mesh>

        {/* ── 2. Primary Sequential Navigation Action Row ── */}
        {/* Prev Phase Button */}
        <mesh
          position={[-0.72, 0.20, hoveredButtonKey === 'prev' ? 0.02 : 0]}
          scale={hoveredButtonKey === 'prev' ? [1.06, 1.06, 1] : [1, 1, 1]}
          ref={(m) => registerButton('prev', m, () => handleNav(prevPhase.id))}
          onClick={() => handleNav(prevPhase.id)}
        >
          <planeGeometry args={[0.44, 0.15]} />
          <meshBasicMaterial map={prevBtnTex} transparent opacity={0.96} />
        </mesh>

        {/* Large Highlighted "NEXT PHASE ▶" Action Button */}
        <mesh
          position={[0.0, 0.20, hoveredButtonKey === 'next' ? 0.03 : 0]}
          scale={hoveredButtonKey === 'next' ? [1.08, 1.08, 1] : [1, 1, 1]}
          ref={(m) => registerButton('next', m, () => handleNav(nextPhase.id))}
          onClick={() => handleNav(nextPhase.id)}
        >
          <planeGeometry args={[0.92, 0.15]} />
          <meshBasicMaterial map={nextBtnTex} transparent opacity={0.98} />
        </mesh>

        {/* Exit VR Button */}
        <mesh
          position={[0.72, 0.20, hoveredButtonKey === 'exit' ? 0.02 : 0]}
          scale={hoveredButtonKey === 'exit' ? [1.06, 1.06, 1] : [1, 1, 1]}
          ref={(m) => registerButton('exit', m, handleExit)}
          onClick={handleExit}
        >
          <planeGeometry args={[0.44, 0.15]} />
          <meshBasicMaterial map={exitBtnTex} transparent opacity={0.96} />
        </mesh>

        {/* ── 3. Ordered 9-Phase Storyline Grid (Row 1: Phases 1 to 5) ── */}
        <group position={[0, 0.03, 0]}>
          {phaseTextures.slice(0, 5).map((p, idx) => {
            const posX = (idx - 2) * 0.47;
            const isHovered = hoveredButtonKey === `phase_${p.id}`;
            const isCurrent = p.id === currentStage;
            return (
              <mesh
                key={p.id}
                position={[posX, 0, isHovered ? 0.02 : 0]}
                scale={isHovered ? [1.06, 1.06, 1] : isCurrent ? [1.02, 1.02, 1] : [1, 1, 1]}
                ref={(m) => registerButton(`phase_${p.id}`, m, () => handleNav(p.id))}
                onClick={() => handleNav(p.id)}
              >
                <planeGeometry args={[0.43, 0.14]} />
                <meshBasicMaterial map={p.tex} transparent opacity={isCurrent ? 1.0 : 0.9} />
              </mesh>
            );
          })}
        </group>

        {/* ── 4. Ordered 9-Phase Storyline Grid (Row 2: Phases 6 to 9) ── */}
        <group position={[0, -0.14, 0]}>
          {phaseTextures.slice(5, 9).map((p, idx) => {
            const posX = (idx - 1.5) * 0.47;
            const isHovered = hoveredButtonKey === `phase_${p.id}`;
            const isCurrent = p.id === currentStage;
            return (
              <mesh
                key={p.id}
                position={[posX, 0, isHovered ? 0.02 : 0]}
                scale={isHovered ? [1.06, 1.06, 1] : isCurrent ? [1.02, 1.02, 1] : [1, 1, 1]}
                ref={(m) => registerButton(`phase_${p.id}`, m, () => handleNav(p.id))}
                onClick={() => handleNav(p.id)}
              >
                <planeGeometry args={[0.43, 0.14]} />
                <meshBasicMaterial map={p.tex} transparent opacity={isCurrent ? 1.0 : 0.9} />
              </mesh>
            );
          })}
        </group>

        {/* ── 5. Bottom Instructions Bar ── */}
        <mesh position={[0, -0.32, 0]}>
          <planeGeometry args={[2.3, 0.08]} />
          <meshBasicMaterial color="#001830" transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}
