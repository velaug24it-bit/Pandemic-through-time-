/**
 * LabScene.jsx
 * Standalone R3F 3D Canvas for the AI Research Laboratory & Vaccine Center (Phase 5).
 * Real-World High-Tech Biomedical Research Center Architecture:
 *  - Polished metallic lab floor with illuminated LED perimeter guides
 *  - Panoramic Glass Cleanroom Enclosure & Laser Scan Beams
 *  - Cryogenic Storage Tanks & Bio-Containment Racks
 *  - Interactive HoloTable, Robotic Sample Arm & Security Drones
 *  - Workstation-Specific 3D Realism:
 *     1. Analysis: SARS-CoV-2 Spike Protein 3D structure
 *     2. Sequencing: Double-Helix DNA strand with base pair bonds
 *     3. Microscope: Lens Optics Assembly focused on specimen slide
 *     4. Diagnostics: Holographic Biomarker Matrix & Neural Core
 *     5. Drug Discovery: Molecular Compound Docking animation
 *     6. Vaccine Pipeline: mRNA Lipid Nanoparticle (LNP) Delivery Capsule
 *     7. Dashboard: Global Disease Surveillance Holo-Sphere
 */
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

import RoboticArm3D  from '../components/researchlab/RoboticArm3D';
import HoloTable3D   from '../components/researchlab/HoloTable3D';
import AIOrb         from '../components/ai/AIOrb';
import WebXRManager  from '../components/vr/WebXRManager';
import Covid19Model  from '../components/pathogens/Covid19Model';
import DNAGenetics3D from '../components/humanbody/DNAGenetics3D';
import { SCENE_STAGES } from '../utils/constants';

/** Floating Autonomous Security Drone */
function SecurityDrone({ position = [2.5, 2.0, -1] }) {
  const droneRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (droneRef.current) {
      droneRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15;
      droneRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group ref={droneRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#00c8ff" metalness={0.9} roughness={0.1} emissive="#0044aa" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <ringGeometry args={[0.24, 0.28, 24]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.8} />
      </mesh>
    </group>
  );
}

/** Cryogenic Storage Tanks & Bio-Containment Incubators */
function CryoTanks() {
  return (
    <group position={[-5.5, -1.5, -6]}>
      {[-1.5, 1.5].map((x, i) => (
        <group key={i} position={[x, 1.8, 0]}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 3.6, 24]} />
            <meshStandardMaterial color="#0b1e30" metalness={0.85} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0, 0.71]}>
            <boxGeometry args={[0.8, 2.8, 0.02]} />
            <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={0.6} transparent opacity={0.5} />
          </mesh>
          <mesh position={[0, 1.85, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.1, 24]} />
            <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Real-World High-Tech Laboratory Architecture */
function RealWorldLabArchitecture() {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Polished Epoxy Lab Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#030812" metalness={0.9} roughness={0.1} />
      </mesh>
      <gridHelper args={[32, 32, 0x00c8ff, 0x002244]} position={[0, 0.01, 0]} />

      {/* Safety Perimeter LED Strips */}
      {[-10, 10].map((x) => (
        <mesh key={x} position={[x, 0.02, 0]}>
          <boxGeometry args={[0.1, 0.02, 32]} />
          <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.5} />
        </mesh>
      ))}

      {/* Cleanroom Curved Glass Enclosure */}
      <mesh position={[0, 5, -11]}>
        <boxGeometry args={[30, 10, 0.12]} />
        <meshStandardMaterial color="#00c8ff" transparent opacity={0.15} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Overhead Laser Scanner Beam */}
      <mesh position={[0, 6, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 0.05]} />
        <meshBasicMaterial color="#00ff9d" transparent opacity={0.6} />
      </mesh>

      {/* Supercomputer Server Processing Racks */}
      {[-7, 7].map((x) => (
        <group key={x} position={[x, 3.5, -8.5]}>
          <mesh>
            <boxGeometry args={[1.8, 7, 1.4]} />
            <meshStandardMaterial color="#061220" metalness={0.85} roughness={0.15} />
          </mesh>
          {[1, 2, 3, 4, 5, 6].map((y) => (
            <mesh key={y} position={[0, y * 0.9 - 3.1, 0.71]}>
              <boxGeometry args={[1.5, 0.06, 0.02]} />
              <meshStandardMaterial color={y % 2 === 0 ? '#00ff9d' : '#00c8ff'} emissive={y % 2 === 0 ? '#00ff9d' : '#00c8ff'} emissiveIntensity={2} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Cryogenic Bio-Storage Tanks */}
      <CryoTanks />
    </group>
  );
}

/** 5. Drug Discovery Molecular Compound Docking Animation */
function DrugDiscovery3D() {
  const ligandRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ligandRef.current) {
      // Docking motion into binding pocket
      ligandRef.current.position.x = Math.sin(t * 1.5) * 0.4 + 0.3;
      ligandRef.current.position.y = Math.cos(t * 1.5) * 0.2;
      ligandRef.current.rotation.y = t * 2;
    }
  });

  return (
    <group position={[0, 0.4, 0]}>
      {/* Target Viral Receptor Pocket */}
      <mesh>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial color="#ff3860" wireframe emissive="#880022" emissiveIntensity={0.5} />
      </mesh>
      {/* Docking Small Molecule Ligand */}
      <group ref={ligandRef} position={[0.5, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.8} />
        </mesh>
        {[-0.2, 0.2].map((x) => (
          <mesh key={x} position={[x, 0.15, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** 6. Vaccine mRNA Lipid Nanoparticle (LNP) Capsule */
function VaccineCapsule3D() {
  const lnpRef = useRef();

  useFrame(({ clock }) => {
    if (lnpRef.current) {
      lnpRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      lnpRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={lnpRef} position={[0, 0.5, 0]}>
      {/* Translucent Outer Lipid Shell */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial color="#00c8ff" transparent opacity={0.4} emissive="#0044aa" emissiveIntensity={0.6} />
      </mesh>
      {/* Inner mRNA Genetic Strand Payload Core */}
      <mesh>
        <torusKnotGeometry args={[0.5, 0.12, 64, 16]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.8} />
      </mesh>
    </group>
  );
}

/** 7. Global Research Surveillance Holo-Sphere */
function ResearchDashboard3D() {
  const holoRef = useRef();

  useFrame(({ clock }) => {
    if (holoRef.current) {
      holoRef.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={holoRef} position={[0, 0.6, 0]}>
      <mesh>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial color="#00c8ff" wireframe emissive="#0088cc" emissiveIntensity={1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.02, 8, 32]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

export default function LabScene({
  activeStationId = 'analysis',
  xrSession,
  onNavigateStage,
  onExitVR,
}) {
  const renderWorkstation3DModel = () => {
    switch (activeStationId) {
      case 'analysis':
        return <Covid19Model viewMode="normal" />;
      case 'sequencing':
        return <DNAGenetics3D />;
      case 'microscope':
        return <Covid19Model viewMode="crossSection" />;
      case 'diagnostics':
        return (
          <group position={[0, 0.5, 0]}>
            <mesh>
              <icosahedronGeometry args={[0.85, 2]} />
              <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.2} wireframe />
            </mesh>
          </group>
        );
      case 'drug':
        return <DrugDiscovery3D />;
      case 'vaccine':
        return <VaccineCapsule3D />;
      case 'dashboard':
        return <ResearchDashboard3D />;
      default:
        return <Covid19Model viewMode="normal" />;
    }
  };

  return (
    <Canvas
      camera={{ position: [0, 1.2, 5.2], fov: 58, near: 0.01, far: 1000 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2('#040c18', 0.03);
      }}
    >
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      <OrbitControls
        enabled={!xrSession}
        enablePan={false}
        enableZoom
        enableRotate
        maxDistance={12}
        minDistance={2}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />

      <Suspense fallback={null}>
        {/* Real-World High-Tech Lab Lighting */}
        <ambientLight color="#061628" intensity={0.6} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} color="#e0f0ff" />
        <pointLight position={[0, 4, 0]} color="#00c8ff" intensity={2.2} distance={16} />

        {/* Real-World High-Tech Lab Architecture */}
        <RealWorldLabArchitecture />

        {/* Holographic Workspace Table */}
        <HoloTable3D position={[0, -1.1, 0]} />

        {/* Articulated Robotic Sample Arm */}
        <RoboticArm3D position={[-2.5, -0.5, -1]} />

        {/* Autonomous Security Drone */}
        <SecurityDrone position={[2.5, 1.8, -1]} />

        {/* AI Orb Assistant ARIA */}
        <AIOrb position={[0, 1.6, -1.2]} />

        {/* Active Workstation 3D Real-World Model */}
        {renderWorkstation3DModel()}

        {/* Floating Bio-Particles */}
        <Sparkles count={150} scale={[20, 10, 20]} size={0.6} speed={0.05} opacity={0.35} color="#00c8ff" />

        {/* WebXR Manager & VR Locomotion */}
        <WebXRManager
          session={xrSession}
          currentStage={SCENE_STAGES.AI_LABORATORY}
          onNavigateStage={onNavigateStage}
          onExitVR={onExitVR}
        />
      </Suspense>
    </Canvas>
  );
}
