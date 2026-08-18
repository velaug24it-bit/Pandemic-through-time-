/**
 * BioShieldScene.jsx
 * Standalone R3F 3D Canvas for Phase 7 – BioShield 2050 Future Pandemic Prevention Metropolis.
 * Architectural Features:
 *  - 3D Smart Metropolis: Smart Hospital Tower, AI Research Dome, Transport Hub, Environmental Grid Towers
 *  - Autonomous 3D Medical Drones flying continuous supply routes
 *  - Animated Hospital & Cleaning Robots
 *  - Dynamic Day/Night Cycle lighting & sky dome
 *  - Clickable Digital Twin buildings emitting onSelectBuilding(b)
 */
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { BIOSHIELD_BUILDINGS } from '../utils/constants';

/** Autonomous 3D Medical Supply Drone flying curved city routes (Module 7) */
function BioDrone3D({ pathOffset = 0, speed = 0.5 }) {
  const droneRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + pathOffset;
    if (droneRef.current) {
      droneRef.current.position.x = Math.sin(t) * 6;
      droneRef.current.position.z = Math.cos(t * 0.7) * 6;
      droneRef.current.position.y = 2.5 + Math.sin(t * 2) * 0.2;
      droneRef.current.rotation.y = t + Math.PI / 2;
    }
  });

  return (
    <group ref={droneRef}>
      {/* Central Drone Pod */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#00ff9d" metalness={0.9} roughness={0.1} emissive="#00aa66" emissiveIntensity={0.6} />
      </mesh>
      {/* Medical Supply Package */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.16, 0.12, 0.16]} />
        <meshStandardMaterial color="#ff3860" emissive="#ff3860" emissiveIntensity={0.8} />
      </mesh>
      {/* 4 Rotors */}
      {[-0.2, 0.2].map(x =>
        [-0.2, 0.2].map(z => (
          <mesh key={`${x}-${z}`} position={[x, 0.08, z]}>
            <cylinderGeometry args={[0.08, 0.08, 0.01, 12]} />
            <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.5} />
          </mesh>
        ))
      )}
    </group>
  );
}

/** Animated Hospital Disinfection Robot (Module 8) */
function BioRobot3D({ position = [0, -1.3, 2] }) {
  const robotRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (robotRef.current) {
      robotRef.current.position.x = position[0] + Math.sin(t * 0.8) * 1.2;
      robotRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group ref={robotRef} position={position}>
      {/* Base */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#0b1e30" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.4, 16]} />
        <meshStandardMaterial color="#00c8ff" emissive="#0044aa" emissiveIntensity={0.6} />
      </mesh>
      {/* UV Disinfection Ring Lamp */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.28, 0.03, 8, 24]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

/** 3D Smart Metropolis Buildings (Module 1) */
function CityBuildings({ onSelectBuilding, selectedBuildingId }) {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Polished Epoxy City Ground Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial color="#030914" metalness={0.9} roughness={0.1} />
      </mesh>
      <gridHelper args={[36, 36, 0x00ff9d, 0x002244]} position={[0, 0.01, 0]} />

      {/* Buildings */}
      {BIOSHIELD_BUILDINGS.map((b) => {
        const isSelected = selectedBuildingId === b.id;
        const color = b.id === 'smarthospital' ? '#ff3860' : b.id === 'ailab' ? '#00ff9d' : '#00c8ff';

        return (
          <group
            key={b.id}
            position={b.pos}
            onClick={(e) => {
              e.stopPropagation();
              onSelectBuilding?.(b);
            }}
            cursor="pointer"
          >
            {/* Main Tower Geometry */}
            <mesh position={[0, 2, 0]}>
              {b.id === 'ailab' ? (
                <sphereGeometry args={[1.5, 32, 24]} />
              ) : b.id === 'transporthub' ? (
                <cylinderGeometry args={[1.6, 2.0, 1.8, 24]} />
              ) : (
                <boxGeometry args={[1.6, 4.0, 1.6]} />
              )}
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.35}
                metalness={0.9}
                roughness={0.1}
                emissive={color}
                emissiveIntensity={isSelected ? 0.8 : 0.25}
              />
            </mesh>

            {/* Glowing Rooftop Beacon */}
            <mesh position={[0, b.id === 'ailab' ? 3.6 : 4.1, 0]}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={2} />
            </mesh>

            {/* Selection Halo Ring */}
            {isSelected && (
              <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.8, 2.2, 32]} />
                <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={2} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

import WebXRManager from '../components/vr/WebXRManager';

export default function BioShieldScene({
  isNight = false,
  selectedBuildingId = 'smarthospital',
  onSelectBuilding,
  xrSession,
  onNavigateStage,
  onExitVR,
}) {
  return (
    <Canvas
      camera={{ position: [0, 5, 11], fov: 58, near: 0.01, far: 1000 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: isNight ? 1.4 : 1.0, xr: { enabled: true } }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(isNight ? '#020814' : '#061a2e', 0.025);
      }}
    >
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      <OrbitControls
        enabled={!xrSession}
        enablePan={false}
        enableZoom
        enableRotate
        maxDistance={18}
        minDistance={4}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />

      <Suspense fallback={null}>
        {/* Dynamic Day/Night Lighting */}
        <ambientLight color={isNight ? '#003366' : '#cceeff'} intensity={isNight ? 0.4 : 0.8} />
        <directionalLight
          position={isNight ? [-6, 8, -4] : [8, 12, 6]}
          intensity={isNight ? 1.0 : 2.5}
          color={isNight ? '#00c8ff' : '#ffffff'}
        />
        <pointLight position={[0, 6, 0]} color="#00ff9d" intensity={2} distance={20} />

        {/* 3D Smart City Architecture & Digital Twin */}
        <CityBuildings onSelectBuilding={onSelectBuilding} selectedBuildingId={selectedBuildingId} />

        {/* Autonomous 3D Medical Drones (Module 7) */}
        <BioDrone3D pathOffset={0} speed={0.4} />
        <BioDrone3D pathOffset={Math.PI} speed={0.5} />

        {/* Hospital Disinfection Robots (Module 8) */}
        <BioRobot3D position={[-1.5, -1.3, 1.8]} />
        <BioRobot3D position={[2.0, -1.3, -1.2]} />

        {/* Sparkles Particle Atmosphere */}
        <Sparkles count={180} scale={[25, 12, 25]} size={0.6} speed={0.05} opacity={0.4} color="#00ff9d" />

        {/* WebXR Manager & VR Locomotion */}
        <WebXRManager
          session={xrSession}
          onNavigateStage={onNavigateStage}
          onExitVR={onExitVR}
        />
      </Suspense>
    </Canvas>
  );
}
