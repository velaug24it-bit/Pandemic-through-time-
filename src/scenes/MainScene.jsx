/**
 * MainScene.jsx
 * Root React Three Fiber canvas orchestrating all 3D scenes by stage.
 * Uses GSAP for camera transitions between stages on desktop.
 * In WebXR (Meta Quest 3):
 *  - Fully illuminates the Space Command Center & Earth with dedicated VR lighting
 *  - Opens the panoramic window view so Earth and space are visible from inside the station
 *  - Positions all main objects (Holographic Map, AI Orb, Drones, Earth, Station) at comfortable VR distances
 */
import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

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
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#1e2c3a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Sensor Lens */}
      <mesh position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#00c8ff" />
      </mesh>
      <pointLight color="#00c8ff" intensity={0.8} distance={2} position={[0, 0, 0.18]} />
      {/* Rotors */}
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
      {/* Frame */}
      <mesh>
        <torusGeometry args={[2.8, 0.12, 8, 32]} />
        <meshStandardMaterial color="#334455" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Left door */}
      <mesh ref={doorLeftRef} position={[-1.25, 0, 0]}>
        <boxGeometry args={[2.5, 4.2, 0.12]} />
        <meshStandardMaterial color="#0e1a26" metalness={0.75} roughness={0.25} />
      </mesh>
      {/* Right door */}
      <mesh ref={doorRightRef} position={[1.25, 0, 0]}>
        <boxGeometry args={[2.5, 4.2, 0.12]} />
        <meshStandardMaterial color="#0e1a26" metalness={0.75} roughness={0.25} />
      </mesh>
      {/* Status indicator light */}
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
  const isFlight   = stage >= SCENE_STAGES.SPACE_FLIGHT || isVR;
  const isStation  = stage >= SCENE_STAGES.ORBITAL_STATION || isVR;
  const isCommand  = stage >= SCENE_STAGES.COMMAND_CENTER || isVR;

  return (
    <>
      {/* Performance adaptive DPR */}
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      {/* Camera controller */}
      <CameraController stage={stage} />

      <Suspense fallback={<SceneFallback />}>
        {/* ── VR & Desktop Scene Lighting ── */}
        <ambientLight color="#88aacc" intensity={isVR ? 1.2 : 0.6} />
        <directionalLight
          position={[6, 12, 6]}
          intensity={isVR ? 2.5 : 1.8}
          color="#ffffff"
        />

        {/* ── Space environment (stars, moon, solar directional light) ── */}
        <SpaceEnvironment visible={isFlight} />

        {/* ── Rocket launch sequence (desktop intro) ── */}
        {isRocket && !isVR && (
          <RocketLaunch onComplete={onRocketComplete} onCountdown={onCountdown} />
        )}

        {/* ── Earth (Framed outside the panoramic window in Command Center) ── */}
        {isFlight && (
          <InteractiveEarth
            position={isCommand ? [-2.8, 0.4, -9.0] : [0, 0, 0]}
          />
        )}

        {/* ── Orbital station ── */}
        {isStation && (
          <OrbitalStation position={[0, 0, -12]} />
        )}

        {/* ── Command center holographic elements ── */}
        {isCommand && (
          <group position={[0, 0, 0]}>
            {/* Sliding airlock door */}
            <AirlockDoor isOpen={isCommand} />

            {/* Maintenance Drones */}
            <MaintenanceDrone position={[-2, 1.8, -2]} range={2} speed={0.5} />
            <MaintenanceDrone position={[2, 2.2, -4]}  range={3} speed={0.7} />

            {/* Holographic globe */}
            <HolographicMap position={[-1.8, 0.5, -2.5]} />

            {/* AI orb */}
            <AIOrb position={[2.0, 0.3, -1.8]} />

            {/* Command center interior lighting */}
            <pointLight color="#00c8ff" intensity={2.5} distance={15} position={[0, 2.5, -2]} />
            <pointLight color="#7b2ff7" intensity={1.8} distance={12} position={[-3, 2, -3]} />

            {/* Transparent floor plane */}
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

            {/* Grid floor lines */}
            <gridHelper args={[20, 20, 0x00c8ff, 0x003366]} position={[0, -1.49, 0]} />

            {/* Station interior side walls */}
            <mesh position={[-8, 0, -3]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[8, 8, 0.1]} />
              <meshStandardMaterial color="#142436" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[8, 0, -3]} rotation={[0, -Math.PI / 2, 0]}>
              <boxGeometry args={[8, 8, 0.1]} />
              <meshStandardMaterial color="#142436" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Station back wall with OPENING for Panoramic Window */}
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

            {/* Giant Panoramic Window (Clear glass opening) */}
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

            {/* Window metal frame border */}
            <mesh position={[0, 0.8, -5.92]}>
              <ringGeometry args={[3.8, 4.2, 4]} />
              <meshStandardMaterial color="#3a4f66" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Holo light strips on ceiling */}
            {[-3, 0, 3].map((x) => (
              <mesh key={x} position={[x, 3.9, -3]}>
                <boxGeometry args={[0.08, 0.05, 6]} />
                <meshStandardMaterial emissive="#00c8ff" emissiveIntensity={2} color="#002244" />
              </mesh>
            ))}
          </group>
        )}

        {/* Rocket launch pad lighting */}
        {isRocket && (
          <>
            <spotLight position={[3, 6, 3]} angle={0.4} penumbra={0.5} intensity={2} color="#fff5e0" />
            <pointLight position={[0, 0, 0]} color="#ff4400" intensity={0} />
          </>
        )}

        {/* WebXR Manager & VR Locomotion */}
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
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0, xr: { enabled: true } }}
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
