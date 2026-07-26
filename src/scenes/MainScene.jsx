/**
 * MainScene.jsx
 * Root React Three Fiber canvas orchestrating all 3D scenes by stage.
 * Uses GSAP for camera transitions between stages.
 * Includes:
 *  - SpaceEnvironment (stars, Milky Way, Moon, Sun)
 *  - RocketLaunch (pad, countdown, thruster fire, smoke, camera shake)
 *  - InteractiveEarth (procedural day/night Earth outside station)
 *  - OrbitalStation (torus ring, solar arrays, docking port)
 *  - MaintenanceDrone (hovering station corridor drones)
 *  - AirlockDoor (sliding mechanical airlock)
 *  - AIOrb & HolographicMap
 */
import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
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

/** Camera controller — uses GSAP to animate between stage positions */
function CameraController({ stage }) {
  const { camera } = useThree();
  const targetRef   = useRef(new THREE.Vector3(0, 0, 0));
  const controlsRef = useRef(null);

  useEffect(() => {
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
  }, [stage, camera]);

  useFrame(() => {
    camera.lookAt(targetRef.current);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={stage >= SCENE_STAGES.COMMAND_CENTER}
      enableRotate={stage >= SCENE_STAGES.COMMAND_CENTER}
      maxDistance={20}
      minDistance={1}
    />
  );
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

export default function MainScene({ stage, onRocketComplete, onCountdown }) {
  const isRocket   = stage === SCENE_STAGES.ROCKET_LAUNCH;
  const isFlight   = stage >= SCENE_STAGES.SPACE_FLIGHT;
  const isStation  = stage >= SCENE_STAGES.ORBITAL_STATION;
  const isCommand  = stage >= SCENE_STAGES.COMMAND_CENTER;
  const isMission  = stage >= SCENE_STAGES.MISSION_CONTROL;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60, near: 0.01, far: 2000 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      {/* Performance adaptive DPR */}
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      {/* Camera controller */}
      <CameraController stage={stage} />

      <Suspense fallback={<SceneFallback />}>
        {/* ── Space environment (always visible from flight onward) ── */}
        <SpaceEnvironment visible={isFlight} />

        {/* ── Rocket launch sequence ── */}
        {isRocket && (
          <RocketLaunch onComplete={onRocketComplete} onCountdown={onCountdown} />
        )}

        {/* ── Earth (visible from space flight onward) ── */}
        {isFlight && (
          <InteractiveEarth
            position={isCommand ? [-4, -1, -8] : [0, 0, 0]}
          />
        )}

        {/* ── Orbital station ── */}
        {isStation && (
          <OrbitalStation position={[0, 0, -10]} />
        )}

        {/* ── Command center holographic elements ── */}
        {isCommand && (
          <>
            {/* Sliding airlock door */}
            <AirlockDoor isOpen={isCommand} />

            {/* Maintenance Drones */}
            <MaintenanceDrone position={[-2, 1.8, -2]} range={2} speed={0.5} />
            <MaintenanceDrone position={[2, 2.2, -4]}  range={3} speed={0.7} />

            {/* Holographic globe */}
            <HolographicMap position={[-1.8, 0.5, -2.5]} />

            {/* AI orb */}
            <AIOrb position={[2.0, 0.3, -1.5]} />

            {/* Command center floor lighting */}
            <pointLight color="#001a33" intensity={2} distance={15} position={[0, -2, 0]} />
            <pointLight color="#003366" intensity={1.5} distance={10} position={[0, 3, -3]} />

            {/* Transparent floor plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial
                color="#001122"
                transparent
                opacity={0.85}
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>

            {/* Grid floor lines */}
            <gridHelper args={[20, 20, 0x003355, 0x001a33]} position={[0, -1.49, 0]} />

            {/* Station interior walls (boxes forming corridor feel) */}
            <mesh position={[0, 0, -6]}>
              <boxGeometry args={[16, 8, 0.1]} />
              <meshStandardMaterial color="#0a1520" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[-8, 0, -3]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[6, 8, 0.1]} />
              <meshStandardMaterial color="#0a1520" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[8, 0, -3]} rotation={[0, -Math.PI / 2, 0]}>
              <boxGeometry args={[6, 8, 0.1]} />
              <meshStandardMaterial color="#0a1520" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Giant Panoramic Window (back wall opening) */}
            <mesh position={[0, 0.8, -5.94]}>
              <planeGeometry args={[10, 4.5]} />
              <meshPhysicalMaterial
                color="#000814"
                transmission={0.95}
                thickness={0.3}
                roughness={0.02}
                transparent
                opacity={0.3}
              />
            </mesh>

            {/* Window metal frame border */}
            <mesh position={[0, 0.8, -5.92]}>
              <ringGeometry args={[4.8, 5.0, 4]} />
              <meshStandardMaterial color="#334455" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Holo light strips on ceiling */}
            {[-3, 0, 3].map((x) => (
              <mesh key={x} position={[x, 3.9, -3]}>
                <boxGeometry args={[0.06, 0.05, 6]} />
                <meshStandardMaterial emissive="#0044aa" emissiveIntensity={2} color="#001133" />
              </mesh>
            ))}
          </>
        )}

        {/* Rocket launch pad lighting */}
        {isRocket && (
          <>
            <spotLight position={[3, 6, 3]} angle={0.4} penumbra={0.5} intensity={2} color="#fff5e0" />
            <pointLight position={[0, 0, 0]} color="#ff4400" intensity={0} />
          </>
        )}
        {/* WebXR Manager & VR Locomotion */}
        <WebXRManager />
      </Suspense>
    </Canvas>
  );
}
