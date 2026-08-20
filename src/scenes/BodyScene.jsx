/**
 * BodyScene.jsx
 * Standalone R3F 3D Canvas for the Human Body Journey (Phase 4).
 * Renders:
 *  - Microscopic organic environment lighting & soft exponential fog matching active organ color
 *  - View mode routing: Bloodstream, Host Cell, Infection Simulation, Immune Defense, Vaccine Explainer, DNA Genetics
 */
import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { ORGAN_SYSTEMS, SCENE_STAGES } from '../utils/constants';

import BloodstreamEnvironment from '../components/humanbody/BloodstreamEnvironment';
import CellularWorld          from '../components/humanbody/CellularWorld';
import InfectionSimulation3D  from '../components/humanbody/InfectionSimulation3D';
import ImmuneSystem3D         from '../components/humanbody/ImmuneSystem3D';
import VaccineExplainer3D     from '../components/humanbody/VaccineExplainer3D';
import DNAGenetics3D          from '../components/humanbody/DNAGenetics3D';

import WebXRManager from '../components/vr/WebXRManager';

import { Stars } from '@react-three/drei';

export function BodySceneContent({
  organId = 'bloodstream',
  viewMode = 'bloodstream',
  infectionStep = 0,
  xrSession,
  onNavigateStage,
  onExitVR,
}) {
  const isVR = Boolean(xrSession);
  const currentOrgan = useMemo(() => {
    return ORGAN_SYSTEMS.find(o => o.id === organId) || ORGAN_SYSTEMS[0];
  }, [organId]);

  const render3DContent = () => {
    switch (viewMode) {
      case 'bloodstream':
        return <BloodstreamEnvironment organId={organId} />;
      case 'cellular':
        return <CellularWorld />;
      case 'infection':
        return <InfectionSimulation3D currentStep={infectionStep} />;
      case 'immune':
        return <ImmuneSystem3D />;
      case 'vaccine':
        return <VaccineExplainer3D />;
      case 'genetics':
        return <DNAGenetics3D />;
      default:
        return <BloodstreamEnvironment organId={organId} />;
    }
  };

  return (
    <Suspense fallback={null}>
      {/* 360-degree Microscopic Organic Lighting */}
      <ambientLight color={currentOrgan.color} intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} color="#e0f0ff" />
      <pointLight position={[0, 0, 0]} color={currentOrgan.color} intensity={2.5} distance={16} />

      {/* 360-degree Cellular Space Background */}
      <Stars radius={90} depth={40} count={3000} factor={4} saturation={0.5} fade />

      {/* Dynamic 3D Microscopic World — Centered in VR at eye level [0, 1.2, -2.5] */}
      <group position={isVR ? [0, 1.2, -2.5] : [0, 0, 0]}>
        {render3DContent()}
      </group>

      {/* Flowing plasma dust sparkles in 360 degrees */}
      <Sparkles count={180} scale={[24, 24, 24]} size={0.65} speed={0.08} opacity={0.4} color={currentOrgan.color} />

      {/* WebXR Manager & VR Locomotion */}
      <WebXRManager
        session={xrSession}
        currentStage={SCENE_STAGES.HUMAN_BODY_JOURNEY}
        onNavigateStage={onNavigateStage}
        onExitVR={onExitVR}
      />
    </Suspense>
  );
}

export default function BodyScene({
  organId = 'bloodstream',
  viewMode = 'bloodstream',
  infectionStep = 0,
  xrSession,
  onNavigateStage,
  onExitVR,
}) {
  const currentOrgan = useMemo(() => {
    return ORGAN_SYSTEMS.find(o => o.id === organId) || ORGAN_SYSTEMS[0];
  }, [organId]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60, near: 0.01, far: 1000 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(currentOrgan.color, 0.035);
      }}
    >
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      <OrbitControls
        enabled={!xrSession}
        enablePan={false}
        enableZoom
        enableRotate
        maxDistance={10}
        minDistance={1.5}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />

      <BodySceneContent
        organId={organId}
        viewMode={viewMode}
        infectionStep={infectionStep}
        xrSession={xrSession}
        onNavigateStage={onNavigateStage}
        onExitVR={onExitVR}
      />
    </Canvas>
  );
}
