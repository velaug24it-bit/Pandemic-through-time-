/**
 * MainScene.jsx
 * Root React Three Fiber canvas orchestrating all 3D scenes by stage.
 * Uses GSAP for camera transitions between stages on desktop.
 * In WebXR (Meta Quest 3):
 *  - Envelops the user in a True 360-Degree Spatial 3D World (VR360SpatialWorld)
 *  - FRONT: Space Command Center Hub
 *  - LEFT: Historical Pandemic Museum with 3D Pathogens
 *  - RIGHT: Biomedical AI Research Lab with HoloTable & Robotic Arm
 *  - BACK: Grand 3D Digital Earth with NASA textures & Satellites
 *  - ABOVE: Orbital Space & Torus Station
 *  - BELOW: Futuristic Command Center Floor Platform
 */
import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

import VR360SpatialWorld from '../components/vr/VR360SpatialWorld';
import SpaceEnvironment from '../components/space/SpaceEnvironment';
import RocketLaunch     from '../components/space/RocketLaunch';
import InteractiveEarth from '../components/earth/InteractiveEarth';
import OrbitalStation   from '../components/station/OrbitalStation';
import AIOrb            from '../components/ai/AIOrb';
import HolographicMap   from '../components/missioncontrol/HolographicMap';
import WebXRManager     from '../components/vr/WebXRManager';

import { SCENE_STAGES, CAMERA_POSITIONS } from '../utils/constants';

/** Hovering maintenance drone inside station corridor */
function MaintenanceDrone({ position = [0, 0, 0], range = 2.5, speed = 0.6 }) {
  const droneRef = useRef();
  useFrame(({ clock }) => {
    if (!droneRef.current) return;
    const t = clock.getElapsedTime() * speed;
    droneRef.current.position.x = position[0] + Math.sin(t) * range;
    droneRef.current.position.y = position[1] + Math.cos(t * 1.6) * 0.15;
    droneRef.current.rotation.y = Math.sin(t * 0.8) * 0.4;
  });

  return (
    <group ref={droneRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#1e2c3a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#00c8ff" />
      </mesh>
      <pointLight color="#00c8ff" intensity={0.8} distance={2} position={[0, 0, 0.18]} />
      {[-0.2, 0.2].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.1, 0.02, 0.08]} />
          <meshStandardMaterial color="#334455" metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/** Mechanical sliding airlock door */
function AirlockDoor({ isOpen }) {
  const doorLeftRef  = useRef();
  const doorRightRef = useRef();

  useEffect(() => {
    if (isOpen) {
      gsap.to(doorLeftRef.current?.position,  { x: -3.8, duration: 1.8, ease: 'power2.inOut' });
      gsap.to(doorRightRef.current?.position, { x: 3.8,  duration: 1.8, ease: 'power2.inOut' });
    }
  }, [isOpen]);

  return (
    <group position={[0, 0, 2.5]}>
      <mesh>
        <torusGeometry args={[2.8, 0.12, 8, 32]} />
        <meshStandardMaterial color="#334455" metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh ref={doorLeftRef} position={[-1.25, 0, 0]}>
        <boxGeometry args={[2.5, 4.2, 0.12]} />
        <meshStandardMaterial color="#0e1a26" metalness={0.75} roughness={0.25} />
      </mesh>
      <mesh ref={doorRightRef} position={[1.25, 0, 0]}>
        <boxGeometry args={[2.5, 4.2, 0.12]} />
        <meshStandardMaterial color="#0e1a26" metalness={0.75} roughness={0.25} />
      </mesh>
      <pointLight color={isOpen ? '#00ff9d' : '#ff3860'} intensity={2} distance={5} position={[0, 2.1, 0.15]} />
    </group>
  );
}

/** Camera controller — uses GSAP to animate between stage positions on desktop */
function CameraController({ stage }) {
  const { camera, gl } = useThree();
  const targetRef   = useRef(new THREE.Vector3(0, 0, 0));
  const isVR = gl?.xr?.isPresenting || false;

  useEffect(() => {
    if (isVR) return;
    const cfg = CAMERA_POSITIONS[stage];
    if (!cfg) return;

    gsap.to(camera.position, {
      x: cfg.pos[0],
      y: cfg.pos[1],
      z: cfg.pos[2],
      duration: 2.2,
      ease: 'power3.inOut',
    });

    gsap.to(targetRef.current, {
      x: cfg.target[0],
      y: cfg.target[1],
      z: cfg.target[2],
      duration: 2.2,
      ease: 'power3.inOut',
    });
  }, [stage, camera, isVR]);

  useFrame(() => {
    if (!isVR) {
      camera.lookAt(targetRef.current);
    }
  });

  return null;
}

/** Fallback while suspense loads */
function SceneFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#00c8ff" />
    </mesh>
  );
}

/** Inner Scene Content with VR state awareness */
function MainSceneContent({ stage, onRocketComplete, onCountdown, xrSession, onNavigateStage, onExitVR }) {
  const { gl } = useThree();
  const isVR = gl?.xr?.isPresenting || Boolean(xrSession);

  const isRocket   = stage === SCENE_STAGES.ROCKET_LAUNCH;
  const isFlight   = stage >= SCENE_STAGES.SPACE_FLIGHT;
  const isStation  = stage >= SCENE_STAGES.ORBITAL_STATION;
  const isCommand  = stage >= SCENE_STAGES.COMMAND_CENTER;

  return (
    <>
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      {/* Camera controller for desktop */}
      <CameraController stage={stage} />

      <Suspense fallback={<SceneFallback />}>
        {/* ══════════════════════════════════════════════════════════════
            MODE A: TRUE 360-DEGREE IMMERSIVE VR WORLD (Meta Quest 3)
            ══════════════════════════════════════════════════════════════ */}
        {isVR ? (
          <VR360SpatialWorld onNavigateStage={onNavigateStage} />
        ) : (
          /* ══════════════════════════════════════════════════════════════
             MODE B: CINEMATIC DESKTOP PIPELINE (Preserved for Monitor)
             ══════════════════════════════════════════════════════════════ */
          <>
            <ambientLight color="#88aacc" intensity={0.6} />
            <directionalLight position={[6, 12, 6]} intensity={1.8} color="#ffffff" />

            {/* Space environment */}
            <SpaceEnvironment visible={isFlight} />

            {/* Rocket launch sequence */}
            {isRocket && (
              <RocketLaunch onComplete={onRocketComplete} onCountdown={onCountdown} />
            )}

            {/* Earth in desktop window */}
            {isFlight && (
              <InteractiveEarth
                position={isCommand ? [-2.8, 0.4, -9.0] : [0, 0, 0]}
              />
            )}

            {/* Orbital station */}
            {isStation && (
              <OrbitalStation position={[0, 0, -12]} />
            )}

            {/* Desktop Command center holographic elements */}
            {isCommand && (
              <group position={[0, 0, 0]}>
                <AirlockDoor isOpen={isCommand} />
                <MaintenanceDrone position={[-2, 1.8, -2]} range={2} speed={0.5} />
                <MaintenanceDrone position={[2, 2.2, -4]}  range={3} speed={0.7} />
                <HolographicMap position={[-1.8, 0.5, -2.5]} />
                <AIOrb position={[2.0, 0.3, -1.8]} />

                <pointLight color="#00c8ff" intensity={2.5} distance={15} position={[0, 2.5, -2]} />
                <pointLight color="#7b2ff7" intensity={1.8} distance={12} position={[-3, 2, -3]} />

                {/* Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial
                    color="#06182a"
                    transparent
                    opacity={0.9}
                    metalness={0.7}
                    roughness={0.3}
                  />
                </mesh>
                <gridHelper args={[20, 20, 0x00c8ff, 0x003366]} position={[0, -1.49, 0]} />

                {/* Side walls */}
                <mesh position={[-8, 0, -3]} rotation={[0, Math.PI / 2, 0]}>
                  <boxGeometry args={[8, 8, 0.1]} />
                  <meshStandardMaterial color="#142436" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[8, 0, -3]} rotation={[0, -Math.PI / 2, 0]}>
                  <boxGeometry args={[8, 8, 0.1]} />
                  <meshStandardMaterial color="#142436" metalness={0.7} roughness={0.3} />
                </mesh>

                {/* Back wall with opening for window */}
                <mesh position={[-6, 0, -6]}>
                  <boxGeometry args={[4, 8, 0.1]} />
                  <meshStandardMaterial color="#142436" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[6, 0, -6]}>
                  <boxGeometry args={[4, 8, 0.1]} />
                  <meshStandardMaterial color="#142436" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[0, 3.6, -6]}>
                  <boxGeometry args={[8, 0.8, 0.1]} />
                  <meshStandardMaterial color="#142436" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[0, -2.0, -6]}>
                  <boxGeometry args={[8, 1.0, 0.1]} />
                  <meshStandardMaterial color="#142436" metalness={0.7} roughness={0.3} />
                </mesh>

                {/* Panoramic Window */}
                <mesh position={[0, 0.8, -5.94]}>
                  <planeGeometry args={[8, 4.8]} />
                  <meshPhysicalMaterial
                    color="#001830"
                    transmission={0.92}
                    thickness={0.2}
                    roughness={0.05}
                    transparent
                    opacity={0.25}
                  />
                </mesh>

                {/* Window frame border */}
                <mesh position={[0, 0.8, -5.92]}>
                  <ringGeometry args={[3.8, 4.2, 4]} />
                  <meshStandardMaterial color="#3a4f66" metalness={0.85} roughness={0.2} />
                </mesh>
              </group>
            )}

            {/* Launch lighting */}
            {isRocket && (
              <spotLight position={[3, 6, 3]} angle={0.4} penumbra={0.5} intensity={2} color="#fff5e0" />
            )}
          </>
        )}

        {/* WebXR Session & 3D World-Space Navigation Dock */}
        <WebXRManager
          session={xrSession}
          onNavigateStage={onNavigateStage}
          onExitVR={onExitVR}
        />
      </Suspense>
    </>
  );
}

export default function MainScene({ stage, onRocketComplete, onCountdown, xrSession, onNavigateStage, onExitVR }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60, near: 0.01, far: 2000 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <MainSceneContent
        stage={stage}
        onRocketComplete={onRocketComplete}
        onCountdown={onCountdown}
        xrSession={xrSession}
        onNavigateStage={onNavigateStage}
        onExitVR={onExitVR}
      />
    </Canvas>
  );
}
