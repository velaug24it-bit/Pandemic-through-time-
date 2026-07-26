/**
 * MuseumScene.jsx
 * Standalone R3F 3D Canvas for the Historical Pandemic Museum (Phase 3 Enhancement).
 * Architectural Features:
 *  - Modern metallic & glass exhibition hall
 *  - Unique 3D Pathogen exhibit (Pathogen3DViewer - 12 distinct biological models)
 *  - Interactive Medical Tools exhibit (Genomic Sequencer DNA Helix)
 *  - AI Guide ARIA orb
 *  - Locked Future Portals
 *  - OrbitControls + GSAP camera moves
 */
import { useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles, AdaptiveDpr, PerformanceMonitor, Html } from '@react-three/drei';
import * as THREE from 'three';
import AIOrb from '../components/ai/AIOrb';
import Pathogen3DViewer from '../components/pathogens/Pathogen3DViewer';
import WebXRManager from '../components/vr/WebXRManager';

/** 3D DNA Double Helix Exhibit */
function DNAExhibit({ position = [3, 0.5, -2] }) {
  const groupRef = useRef();
  const count    = 24;

  const pairs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count) * 3 - 1.5;
      const r = 0.5;
      return {
        y,
        p1: [Math.cos(t) * r, y, Math.sin(t) * r],
        p2: [-Math.cos(t) * r, y, -Math.sin(t) * r],
      };
    });
  }, [count]);

  return (
    <group ref={groupRef} position={position}>
      {pairs.map((pair, idx) => (
        <group key={idx}>
          <mesh position={pair.p1}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={pair.p2}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#7b2ff7" emissive="#7b2ff7" emissiveIntensity={0.6} />
          </mesh>
          <line>
            <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(...pair.p1),
              new THREE.Vector3(...pair.p2),
            ])} />
            <lineBasicMaterial color="#00ff9d" transparent opacity={0.5} />
          </line>
        </group>
      ))}
      <pointLight color="#00c8ff" intensity={1} distance={4} />
      <Html center position={[0, -1.8, 0]} distanceFactor={8}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.45rem',
          color: '#00c8ff', letterSpacing: '0.12em',
          background: 'rgba(0,10,25,0.8)', border: '1px solid rgba(0,200,255,0.2)',
          borderRadius: 4, padding: '0.2rem 0.5rem', whiteSpace: 'nowrap',
        }}>
          GENOMIC SEQUENCER
        </div>
      </Html>
    </group>
  );
}

/** Museum Hall Architecture */
function MuseumArchitecture() {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#050e1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <gridHelper args={[30, 30, 0x00c8ff, 0x002244]} position={[0, 0.01, 0]} />

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#040a14" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Ceiling Holo Light Strips */}
      {[-8, -4, 0, 4, 8].map((x) => (
        <mesh key={x} position={[x, 5.95, 0]}>
          <boxGeometry args={[0.1, 0.05, 28]} />
          <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Back Wall */}
      <mesh position={[0, 3, -12]}>
        <boxGeometry args={[28, 6, 0.1]} />
        <meshStandardMaterial color="#0a1524" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Columns */}
      {[-10, 10].map((x) => (
        <group key={x} position={[x, 3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.35, 6, 16]} />
            <meshStandardMaterial color="#1a2b3c" metalness={0.85} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.32, 0.03, 8, 24]} />
            <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Locked Future Phase Portal Door */
function FuturePortalDoor() {
  return (
    <group position={[8, 0, -8]} rotation={[0, -Math.PI / 4, 0]}>
      <mesh>
        <boxGeometry args={[2.5, 4.0, 0.15]} />
        <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <ringGeometry args={[0.6, 0.7, 32]} />
        <meshStandardMaterial color="#ff3860" emissive="#ff3860" emissiveIntensity={1.5} />
      </mesh>
      <Html center position={[0, 0.9, 0.2]} distanceFactor={8}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.45rem',
          color: '#ff3860', letterSpacing: '0.15em',
          background: 'rgba(25,0,10,0.85)', border: '1px solid rgba(255,56,96,0.3)',
          borderRadius: 4, padding: '0.2rem 0.5rem', whiteSpace: 'nowrap',
        }}>
          🔒 FUTURE PORTAL (PHASE 4)
        </div>
      </Html>
    </group>
  );
}

export default function MuseumScene({ currentPandemic, viewMode = 'normal', wireframe = false }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 60, near: 0.01, far: 1000 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        maxDistance={12}
        minDistance={2}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />

      <Suspense fallback={null}>
        {/* Lights */}
        <ambientLight color="#0a1a2a" intensity={0.4} />
        <directionalLight position={[6, 8, 4]} intensity={1.8} color="#e0f0ff" />
        <pointLight position={[0, 3, 0]} color="#00c8ff" intensity={2} distance={15} />

        {/* Museum architecture */}
        <MuseumArchitecture />

        {/* Unique 3D Pathogen Model Exhibit */}
        <Pathogen3DViewer
          pandemic={currentPandemic}
          viewMode={viewMode}
          wireframe={wireframe}
          position={[-2.5, 0.8, -2.5]}
        />

        {/* 3D DNA Helix Exhibit */}
        <DNAExhibit position={[2.8, 0.6, -2.5]} />

        {/* AI Orb Assistant ARIA */}
        <AIOrb position={[0, 0.5, -1.0]} />

        {/* Future Portal */}
        <FuturePortalDoor />

        {/* Ambient dust sparkles */}
        <Sparkles count={120} scale={[20, 10, 20]} size={0.5} speed={0.04} opacity={0.25} color="#00c8ff" />
        {/* WebXR Manager & VR Locomotion */}
        <WebXRManager />
      </Suspense>
    </Canvas>
  );
}
