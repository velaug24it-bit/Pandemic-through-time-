/**
 * EarthScene.jsx
 * Standalone R3F canvas for Phase 2 – Interactive Digital Earth.
 * Owns OrbitControls, all Earth sub-components, satellites, and routes.
 * Phase 1 MainScene.jsx is completely untouched.
 */
import { useRef, useState, useCallback, useEffect, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Stars,
  AdaptiveDpr,
  PerformanceMonitor,
} from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

import DigitalEarth       from '../components/earth/DigitalEarth';
import GlobeInteractionLayer from '../components/earth/GlobeInteractionLayer';
import CountryMarkers     from '../components/earth/CountryMarkers';
import PandemicRoutes     from '../components/earth/PandemicRoutes';
import OutbreakMarkers    from '../components/earth/OutbreakMarkers';
import BioshieldDome      from '../components/earth/BioshieldDome';
import SatelliteNetwork   from '../components/satellites/SatelliteNetwork';
import CommBeams          from '../components/satellites/CommBeams';
import { latLonToVec3 }  from '../data/countries';

/** Sun directional light rig */
function SunLight() {
  return (
    <>
      <directionalLight
        position={[6, 4, 8]}
        intensity={2.4}
        color="#ffffff"
        castShadow={false}
      />
      <ambientLight intensity={0.75} color="#e0f2fe" />
      <directionalLight
        position={[-6, -3, -6]}
        intensity={0.6}
        color="#38bdf8"
      />
    </>
  );
}

/** Controls + GSAP camera */
function CameraRig({ targetRef, orbitRef }) {
  const { camera } = useThree();

  useEffect(() => {
    // Initial cinematic pull back
    gsap.from(camera.position, {
      x: 0, y: 0, z: 3,
      duration: 2, ease: 'power3.inOut',
    });
  }, [camera]);

  return (
    <OrbitControls
      ref={orbitRef}
      enablePan={false}
      enableZoom
      enableRotate
      zoomSpeed={0.6}
      rotateSpeed={0.5}
      minDistance={2.5}
      maxDistance={12}
      autoRotate={false}
      dampingFactor={0.08}
      enableDamping
    />
  );
}

/** Nebula ring sprites */
function SpaceAmbience() {
  return (
    <>
      <Stars radius={120} depth={60} count={6000} factor={4} saturation={0.3} fade speed={0.5} />
      {/* Nebula tint */}
      <mesh scale={[100, 100, 100]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#000510" side={THREE.BackSide} />
      </mesh>
    </>
  );
}

/** Fallback */
function EarthFallback() {
  return (
    <mesh>
      <sphereGeometry args={[2, 16, 16]} />
      <meshBasicMaterial color="#0d3a6e" wireframe />
    </mesh>
  );
}

/** Inner canvas scene */
function EarthCanvasScene({
  autoRotate, showShield, showRoutes, showOrbits,
  selectedCountry,
  onCountryHover, onCountryClick,
  earthRotYRef,
}) {
  const earthGroupRef    = useRef();
  const orbitRef         = useRef();
  const lastInteractTime = useRef(Date.now());
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const { camera }       = useThree();

  // Handle selectedCountry camera fly-to & focal lock
  useEffect(() => {
    if (!selectedCountry || !earthGroupRef.current) return;

    lastInteractTime.current = Date.now();

    const [vx, vy, vz] = latLonToVec3(selectedCountry.lat, selectedCountry.lon, 2);
    const targetRotY   = -Math.atan2(vx, vz);

    // 1. Smoothly rotate Earth so country faces front (+Z)
    gsap.to(earthGroupRef.current.rotation, {
      y: targetRotY,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (earthRotYRef) earthRotYRef.current = earthGroupRef.current.rotation.y;
      },
    });

    // 2. Smoothly zoom camera to focus on centered country
    gsap.to(camera.position, {
      x: 0,
      y: vy * 0.6 + 0.2,
      z: 3.8,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (orbitRef.current) {
          orbitRef.current.target.set(0, vy * 0.2, 0);
          orbitRef.current.update();
        }
      },
    });
  }, [selectedCountry, camera, earthRotYRef]);

  useFrame(({ clock }) => {
    const timeSinceInteract = (Date.now() - lastInteractTime.current) / 1000;
    const shouldRotate = autoRotate && timeSinceInteract > 10;

    if (shouldRotate && earthGroupRef.current) {
      earthGroupRef.current.rotation.y += 0.002;
      if (earthRotYRef) earthRotYRef.current = earthGroupRef.current.rotation.y;
    }
  });

  const handleCountryHover = useCallback((c) => {
    setHoveredCountry(c);
    onCountryHover?.(c);
  }, [onCountryHover]);

  const handleCountryClick = useCallback((c) => {
    lastInteractTime.current = Date.now();
    onCountryClick?.(c);
  }, [onCountryClick]);

  return (
    <>
      <SunLight />
      <SpaceAmbience />
      <CameraRig orbitRef={orbitRef} />

      <Suspense fallback={<EarthFallback />}>
        {/* Earth Group with vector boundaries and surface raycaster */}
        <group ref={earthGroupRef}>
          <DigitalEarth
            autoRotate={false}
            selectedCountry={selectedCountry}
            hoveredCountry={hoveredCountry}
          />

          {/* 3D Surface Click & Touch Raycaster */}
          <GlobeInteractionLayer
            selectedCountry={selectedCountry}
            onCountryHover={handleCountryHover}
            onCountryClick={handleCountryClick}
          />

          {/* Country markers (on the globe surface) */}
          <CountryMarkers
            onCountryHover={handleCountryHover}
            onCountryClick={handleCountryClick}
          />

          {/* Outbreak hotspot rings */}
          <OutbreakMarkers />

          {/* Pandemic routes (arcs) */}
          {showRoutes && <PandemicRoutes />}

          {/* BioShield dome (optional toggle) */}
          {showShield && <BioshieldDome />}
        </group>

        {/* Satellites + beams */}
        <SatelliteNetwork showOrbits={showOrbits} />
        <CommBeams visible />
      </Suspense>
    </>
  );
}

export default function EarthScene({
  autoRotate, showShield, showRoutes, showOrbits,
  selectedCountry,
  onCountryHover, onCountryClick,
  earthRotYRef,
}) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 55, near: 0.01, far: 2000 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      shadows={false}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />
      <EarthCanvasScene
        autoRotate={autoRotate}
        showShield={showShield}
        showRoutes={showRoutes}
        showOrbits={showOrbits}
        selectedCountry={selectedCountry}
        onCountryHover={onCountryHover}
        onCountryClick={onCountryClick}
        earthRotYRef={earthRotYRef}
      />
    </Canvas>
  );
}
