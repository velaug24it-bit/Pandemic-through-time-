/**
 * IntelligenceScene.jsx
 * Standalone R3F 3D Canvas for Phase 9 – Global Health Intelligence & Digital Twin Platform (Module 1).
 * Features:
 *  - Master 3D Command Theater Architecture
 *  - Giant Holographic Digital Twin Earth with rotating data rings
 *  - Volumetric cyan & purple telemetry particle streams
 *  - OrbitControls with interactive camera moves
 */
import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

import DigitalEarth from '../components/earth/DigitalEarth';
import CommBeams from '../components/satellites/CommBeams';
import WebXRManager from '../components/vr/WebXRManager';

/** 3D Master Intelligence Command Theater Architecture */
function CommandHubArchitecture() {
  return (
    <group position={[0, -2.0, 0]}>
      {/* Metallic Floor Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial color="#020914" metalness={0.85} roughness={0.15} />
      </mesh>
      <gridHelper args={[36, 36, 0x00c8ff, 0x7b2ff7]} position={[0, 0.01, 0]} />

      {/* Holographic Ring Base Pedestal */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5.8, 64]} />
        <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.2, 6.5, 64]} />
        <meshStandardMaterial color="#7b2ff7" emissive="#7b2ff7" emissiveIntensity={1.0} />
      </mesh>

      {/* Panoramic Hexagonal Intelligence Screen Arrays */}
      <mesh position={[0, 5, -14]}>
        <boxGeometry args={[36, 12, 0.12]} />
        <meshStandardMaterial color="#00c8ff" transparent opacity={0.08} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function IntelligenceScene() {
  const earthRotRef = useRef(0);

  return (
    <Canvas
      camera={{ position: [0, 2.5, 8], fov: 60, near: 0.01, far: 1000 }}
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
        maxDistance={16}
        minDistance={3}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />

      <Suspense fallback={null}>
        {/* Ambient & Spotlight Lighting */}
        <ambientLight color="#001833" intensity={0.6} />
        <directionalLight position={[8, 10, 6]} intensity={2.2} color="#c8e8ff" />
        <pointLight position={[0, 4, 0]} color="#00c8ff" intensity={2.5} distance={18} />
        <pointLight position={[0, -1, 0]} color="#7b2ff7" intensity={1.8} distance={12} />

        {/* Command Hub Floor & Wall Architecture */}
        <CommandHubArchitecture />

        {/* Central Holographic Digital Twin Earth */}
        <group position={[0, 0.4, 0]}>
          <DigitalEarth rotYRef={earthRotRef} autoRotate />
          <CommBeams />
        </group>

        {/* Ambient Telemetry Sparkles */}
        <Sparkles count={180} scale={[24, 12, 24]} size={0.6} speed={0.05} opacity={0.4} color="#00c8ff" />
        <Sparkles count={100} scale={[20, 10, 20]} size={0.8} speed={0.08} opacity={0.3} color="#7b2ff7" />
        {/* WebXR Manager & VR Locomotion */}
        <WebXRManager />
      </Suspense>
    </Canvas>
  );
}
