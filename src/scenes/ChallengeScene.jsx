/**
 * ChallengeScene.jsx
 * Standalone R3F 3D Canvas for Phase 8 – Global Collaboration & Crisis Challenge Hub.
 * Architectural Features:
 *  - 3D Holographic Mission Theater: Metallic floor grid, curved holographic mission wall, 3D rotating trophy core
 *  - Interactive 3D challenge node pedestals
 *  - Ambient Sparkles & volumetric spotlight beams
 */
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

/** 3D Rotating Master Trophy Core */
function MasterTrophyCore() {
  const trophyRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (trophyRef.current) {
      trophyRef.current.rotation.y = t * 0.6;
      trophyRef.current.position.y = 1.2 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={trophyRef}>
      {/* Outer Holographic Star Octahedron */}
      <mesh>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#7b2ff7" wireframe emissive="#7b2ff7" emissiveIntensity={1.5} />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

/** 3D Challenge Theater Architecture */
function ChallengeTheaterArchitecture() {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Polished Epoxy Floor Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#040a17" metalness={0.9} roughness={0.1} />
      </mesh>
      <gridHelper args={[32, 32, 0x7b2ff7, 0x002244]} position={[0, 0.01, 0]} />

      {/* Curved Holographic Mission Wall */}
      <mesh position={[0, 4, -12]}>
        <boxGeometry args={[30, 10, 0.1]} />
        <meshStandardMaterial color="#7b2ff7" transparent opacity={0.15} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Center Pedestal Base */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 3.2, 32]} />
        <meshStandardMaterial color="#7b2ff7" emissive="#7b2ff7" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

import WebXRManager from '../components/vr/WebXRManager';

export default function ChallengeScene({
  xrSession,
  onNavigateStage,
  onExitVR,
}) {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 7.5], fov: 60, near: 0.01, far: 1000 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2('#040b18', 0.03);
      }}
    >
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      <OrbitControls
        enabled={!xrSession}
        enablePan={false}
        enableZoom
        enableRotate
        maxDistance={14}
        minDistance={3}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />

      <Suspense fallback={null}>
        {/* Theater Lighting */}
        <ambientLight color="#120628" intensity={0.6} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} color="#d8b4ff" />
        <pointLight position={[0, 4, 0]} color="#7b2ff7" intensity={2.5} distance={16} />

        {/* 3D Challenge Theater Floor & Wall */}
        <ChallengeTheaterArchitecture />

        {/* 3D Rotating Master Trophy Core */}
        <MasterTrophyCore />

        {/* Floating Particles Atmosphere */}
        <Sparkles count={180} scale={[24, 12, 24]} size={0.65} speed={0.06} opacity={0.4} color="#7b2ff7" />

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
