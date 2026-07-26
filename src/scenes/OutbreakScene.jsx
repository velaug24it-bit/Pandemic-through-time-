/**
 * OutbreakScene.jsx
 * Standalone R3F 3D Canvas for Phase 6 – WHO Emergency Operations Theater.
 * Architectural Features:
 *  - 3D Holographic Central Digital Earth Globe with live outbreak heat nodes
 *  - Command center conference consoles & curved digital screens
 *  - Satellite comm transmission beams (CommBeams)
 *  - AI Command Advisor ARIA hologram
 */
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

import DigitalEarth from '../components/earth/DigitalEarth';
import CommBeams    from '../components/satellites/CommBeams';
import AIOrb        from '../components/ai/AIOrb';

/** Command Center Theater Architecture */
function CommandTheaterArchitecture() {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Metallic Floor Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#040b14" metalness={0.8} roughness={0.2} />
      </mesh>
      <gridHelper args={[30, 30, 0xff3860, 0x002244]} position={[0, 0.01, 0]} />

      {/* Panoramic Curved Monitoring Wall */}
      <mesh position={[0, 4, -12]}>
        <boxGeometry args={[32, 10, 0.1]} />
        <meshStandardMaterial color="#ff3860" transparent opacity={0.12} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Conference Desks Ring */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5, 5.2, 32]} />
        <meshStandardMaterial color="#ff3860" emissive="#ff3860" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export default function OutbreakScene({ isRunning = true }) {
  const earthRotRef = useRef(0);

  return (
    <Canvas
      camera={{ position: [0, 2, 7], fov: 60, near: 0.01, far: 1000 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        maxDistance={14}
        minDistance={3}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />

      <Suspense fallback={null}>
        {/* Lights */}
        <ambientLight color="#1a0008" intensity={0.6} />
        <directionalLight position={[6, 8, 4]} intensity={2.0} color="#ff88a0" />
        <pointLight position={[0, 4, 0]} color="#ff3860" intensity={2} distance={15} />

        {/* Command Theater Floor & Walls */}
        <CommandTheaterArchitecture />

        {/* 3D Central Holographic Earth */}
        <group position={[0, 0.2, 0]}>
          <DigitalEarth rotYRef={earthRotRef} autoRotate={isRunning} />
          <CommBeams />
        </group>

        {/* AI Advisor ARIA Hologram */}
        <AIOrb position={[3.2, 1.5, -1]} />

        {/* Red Emergency Particles */}
        <Sparkles count={150} scale={[20, 10, 20]} size={0.6} speed={0.06} opacity={0.35} color="#ff3860" />
      </Suspense>
    </Canvas>
  );
}
