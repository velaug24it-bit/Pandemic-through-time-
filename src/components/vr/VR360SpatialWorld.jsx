/**
 * VR360SpatialWorld.jsx
 * Master True 360-Degree Immersive 3D World for WebXR (Meta Quest 3).
 *
 * 360° Spatial Layout:
 *  - FRONT (Z ≈ -4.5m): 🚀 Space Command Center (Consoles, Holographic Map, AI Orb, Airlock, Drones, Panoramic View)
 *  - LEFT  (X ≈ -5.5m): 🏛️ Historical Pandemic Museum Sector (Pedestals with 3D Pathogen Models, DNA Helix)
 *  - RIGHT (X ≈ +5.5m): 🔬 Biomedical AI Research Lab Sector (HoloTable, Robotic Arm, Protein Docking, CryoTanks)
 *  - BACK  (Z ≈ +7.5m): 🌍 Digital Earth Observation Sector (NASA Satellite Earth, Clouds, Atmosphere, Satellites)
 *  - ABOVE (Y ≈ +8.0m): 🛰️ Orbital Space (Overhead Station Torus Ring, Satellites, Twinkling Starfield)
 *  - BELOW (Y ≈ -1.4m): Futuristic Command Center Floor Platform with Illuminated Sector Runways
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Sector Components
import HolographicMap   from '../missioncontrol/HolographicMap';
import AIOrb            from '../ai/AIOrb';
import DigitalEarth     from '../earth/DigitalEarth';
import SatelliteNetwork from '../satellites/SatelliteNetwork';
import CommBeams        from '../satellites/CommBeams';
import SpaceEnvironment from '../space/SpaceEnvironment';
import OrbitalStation   from '../station/OrbitalStation';
import HoloTable3D      from '../researchlab/HoloTable3D';
import RoboticArm3D     from '../researchlab/RoboticArm3D';
import Covid19Model     from '../pathogens/Covid19Model';
import BlackDeathModel  from '../pathogens/BlackDeathModel';
import SpanishFluModel  from '../pathogens/SpanishFluModel';
import CholeraModel     from '../pathogens/CholeraModel';
import SmallpoxModel    from '../pathogens/SmallpoxModel';
import EbolaModel       from '../pathogens/EbolaModel';
import DNAGenetics3D    from '../humanbody/DNAGenetics3D';

/** Helper to generate 3D spatial title panel textures */
function createSectorTitleTexture(title, subtitle, color = '#00c8ff', icon = '◈') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Glass dark background
  ctx.fillStyle = 'rgba(2, 10, 28, 0.92)';
  ctx.fillRect(0, 0, 1024, 256);

  // Border & Accent line
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, 1004, 236);

  // Glowing header bar
  ctx.fillStyle = color;
  ctx.fillRect(10, 10, 1004, 16);

  // Title
  ctx.font = 'bold 56px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(`${icon} ${title}`, 512, 110);

  // Subtitle
  ctx.font = '32px monospace';
  ctx.fillStyle = color;
  ctx.fillText(subtitle, 512, 185);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Hovering maintenance drone */
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
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#1e2c3a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#00c8ff" />
      </mesh>
      <pointLight color="#00c8ff" intensity={0.8} distance={2} position={[0, 0, 0.18]} />
      {[-0.2, 0.2].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.1, 0.02, 0.08]} />
          <meshStandardMaterial color="#334455" metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/** Floating Autonomous Security Drone in Lab */
function SecurityDrone({ position = [5.0, 2.0, -1] }) {
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
        <meshStandardMaterial color="#00ff9d" metalness={0.9} roughness={0.1} emissive="#0044aa" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <ringGeometry args={[0.24, 0.28, 24]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.8} />
      </mesh>
    </group>
  );
}

/** Cryogenic Storage Tanks */
function CryoTanks({ position = [6.8, -1.4, 0] }) {
  return (
    <group position={position}>
      {[-1.2, 1.2].map((z, i) => (
        <group key={i} position={[0, 1.2, z]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 2.4, 20]} />
            <meshStandardMaterial color="#0b1e30" metalness={0.85} roughness={0.15} />
          </mesh>
          <mesh position={[0.45, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.6, 1.8, 0.02]} />
            <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={0.6} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.52, 0.52, 0.1, 20]} />
            <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Museum Exhibition Pedestal with 3D model */
function MuseumPedestal({ position, label, color = '#7b2ff7', children }) {
  return (
    <group position={position}>
      {/* Base Pedestal Column */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
        <meshStandardMaterial color="#0e1726" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Glowing Top Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.38, 0.44, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
      </mesh>
      {/* Point Spotlight */}
      <pointLight color={color} intensity={1.5} distance={4} position={[0, 0.8, 0]} />
      {/* 3D Exhibit Content */}
      <group position={[0, 0.5, 0]} scale={[0.55, 0.55, 0.55]}>
        {children}
      </group>
    </group>
  );
}

export default function VR360SpatialWorld({ onNavigateStage }) {
  // Title textures for 4 sectors
  const titleFront = useMemo(() => createSectorTitleTexture('GLOBAL HEALTH COMMAND', 'PHASE 1 · MISSION CONTROL & AIRLOCK', '#00c8ff', '🚀'), []);
  const titleLeft  = useMemo(() => createSectorTitleTexture('HISTORICAL PANDEMIC MUSEUM', 'PHASE 3 · HUMANITY’S FIGHT THROUGH CENTURIES', '#7b2ff7', '🏛️'), []);
  const titleRight = useMemo(() => createSectorTitleTexture('BIOMEDICAL AI RESEARCH LAB', 'PHASE 5 · GENOMICS & VACCINE PIPELINES', '#00ff9d', '🔬'), []);
  const titleBack  = useMemo(() => createSectorTitleTexture('GLOBAL PANDEMIC TELEMETRY', 'PHASE 2 · NASA SATELLITE EARTH & ORBITS', '#38bdf8', '🌍'), []);

  return (
    <group>
      {/* ══════════════════════════════════════════════════════════════════
          0. MASTER 360° LIGHTING & SPACE ENVIRONMENT
          ══════════════════════════════════════════════════════════════════ */}
      <ambientLight color="#88bbdd" intensity={1.2} />
      <directionalLight position={[6, 12, 6]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-6, 10, -6]} intensity={1.4} color="#7b2ff7" />

      {/* Procedural Twinkling Stars & Nebula */}
      <SpaceEnvironment visible={true} />

      {/* ══════════════════════════════════════════════════════════════════
          1. BELOW: FUTURISTIC COMMAND CENTER FLOOR PLATFORM (Y ≈ -1.4m)
          ══════════════════════════════════════════════════════════════════ */}
      <group position={[0, -1.4, 0]}>
        {/* Central Circular Platform Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[14, 64]} />
          <meshStandardMaterial color="#050e1a" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Outer Circular Glow Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[13.7, 14.0, 64]} />
          <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={2} />
        </mesh>

        {/* Central User Orientation Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[1.2, 1.35, 32]} />
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.5} />
        </mesh>

        {/* Inner Grid */}
        <gridHelper args={[28, 28, 0x00c8ff, 0x002244]} position={[0, 0.02, 0]} />

        {/* Glowing Sector Runways connecting Front, Left, Right, Back */}
        {/* Front Runway (Z: 0 to -8) */}
        <mesh position={[0, 0.03, -4]}>
          <boxGeometry args={[0.2, 0.02, 8]} />
          <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={2} />
        </mesh>
        {/* Left Runway (X: 0 to -8) */}
        <mesh position={[-4, 0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.2, 0.02, 8]} />
          <meshStandardMaterial color="#7b2ff7" emissive="#7b2ff7" emissiveIntensity={2} />
        </mesh>
        {/* Right Runway (X: 0 to 8) */}
        <mesh position={[4, 0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.2, 0.02, 8]} />
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={2} />
        </mesh>
        {/* Back Runway (Z: 0 to 8) */}
        <mesh position={[0, 0.03, 4]}>
          <boxGeometry args={[0.2, 0.02, 8]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════
          2. FRONT (Z ≈ -4.5m): 🚀 SPACE COMMAND CENTER
          ══════════════════════════════════════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Front Spatial Sector Title */}
        <mesh position={[0, 2.6, -4.2]}>
          <planeGeometry args={[2.8, 0.7]} />
          <meshBasicMaterial map={titleFront} transparent opacity={0.95} side={THREE.DoubleSide} />
        </mesh>

        {/* Central Holographic Map globe */}
        <HolographicMap position={[-1.8, 0.4, -3.2]} />

        {/* AI Orb ARIA Assistant */}
        <AIOrb position={[1.8, 0.4, -2.8]} />

        {/* Maintenance Drones */}
        <MaintenanceDrone position={[-2.2, 1.8, -2.5]} range={1.8} speed={0.5} />
        <MaintenanceDrone position={[2.2, 2.0, -3.5]}  range={2.2} speed={0.7} />

        {/* Command Center Console Table */}
        <mesh position={[0, -0.6, -3.8]}>
          <boxGeometry args={[4.2, 0.6, 0.8]} />
          <meshStandardMaterial color="#0f1f33" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.28, -3.8]}>
          <boxGeometry args={[4.0, 0.04, 0.7]} />
          <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={0.6} />
        </mesh>

        {/* Front Panoramic Window Frame & Glass */}
        <mesh position={[0, 1.0, -6.5]}>
          <planeGeometry args={[9.0, 5.0]} />
          <meshPhysicalMaterial
            color="#001830"
            transmission={0.92}
            thickness={0.2}
            roughness={0.05}
            transparent
            opacity={0.25}
          />
        </mesh>
        {/* Window Framing Arches */}
        <mesh position={[-4.6, 1.0, -6.5]}>
          <boxGeometry args={[0.4, 5.0, 0.2]} />
          <meshStandardMaterial color="#1a2e47" metalness={0.8} />
        </mesh>
        <mesh position={[4.6, 1.0, -6.5]}>
          <boxGeometry args={[0.4, 5.0, 0.2]} />
          <meshStandardMaterial color="#1a2e47" metalness={0.8} />
        </mesh>
        <mesh position={[0, 3.6, -6.5]}>
          <boxGeometry args={[9.6, 0.4, 0.2]} />
          <meshStandardMaterial color="#1a2e47" metalness={0.8} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════
          3. LEFT (X ≈ -5.5m): 🏛️ HISTORICAL PANDEMIC MUSEUM SECTOR
          ══════════════════════════════════════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Left Spatial Sector Title (Angled towards user) */}
        <mesh position={[-4.5, 2.6, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.8, 0.7]} />
          <meshBasicMaterial map={titleLeft} transparent opacity={0.95} side={THREE.DoubleSide} />
        </mesh>

        {/* Museum Platform Raised Floor */}
        <mesh position={[-5.8, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5, 7]} />
          <meshStandardMaterial color="#080c18" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Array of 3D Pathogen Exhibits */}
        {/* 1. Black Death (Yersinia pestis) */}
        <MuseumPedestal position={[-4.5, -0.6, -2.0]} label="BLACK DEATH" color="#ffb700">
          <BlackDeathModel viewMode="normal" />
        </MuseumPedestal>

        {/* 2. 1918 Spanish Flu */}
        <MuseumPedestal position={[-5.8, -0.6, -1.2]} label="1918 INFLUENZA" color="#00c8ff">
          <SpanishFluModel viewMode="normal" />
        </MuseumPedestal>

        {/* 3. COVID-19 */}
        <MuseumPedestal position={[-6.5, -0.6, 0]} label="COVID-19" color="#ff3860">
          <Covid19Model viewMode="normal" />
        </MuseumPedestal>

        {/* 4. Cholera (Vibrio cholerae) */}
        <MuseumPedestal position={[-5.8, -0.6, +1.2]} label="CHOLERA" color="#00ff9d">
          <CholeraModel viewMode="normal" />
        </MuseumPedestal>

        {/* 5. Smallpox */}
        <MuseumPedestal position={[-4.5, -0.6, +2.0]} label="SMALLPOX" color="#7b2ff7">
          <SmallpoxModel viewMode="normal" />
        </MuseumPedestal>

        {/* 6. Ebola */}
        <MuseumPedestal position={[-6.8, -0.6, +2.2]} label="EBOLA" color="#ff1744">
          <EbolaModel viewMode="normal" />
        </MuseumPedestal>

        {/* 3D Rotating DNA Helix Exhibit Overhead in Museum */}
        <group position={[-5.8, 1.8, 0]} scale={[0.6, 0.6, 0.6]}>
          <DNAGenetics3D />
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════════
          4. RIGHT (X ≈ +5.5m): 🔬 BIOMEDICAL AI RESEARCH LAB SECTOR
          ══════════════════════════════════════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Right Spatial Sector Title (Angled towards user) */}
        <mesh position={[4.5, 2.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.8, 0.7]} />
          <meshBasicMaterial map={titleRight} transparent opacity={0.95} side={THREE.DoubleSide} />
        </mesh>

        {/* Lab Platform Raised Floor */}
        <mesh position={[5.8, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5, 7]} />
          <meshStandardMaterial color="#04121a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Interactive Holographic Workspace Table */}
        <HoloTable3D position={[5.2, -0.8, 0]} />

        {/* 3D Protein Structure on HoloTable */}
        <group position={[5.2, 0.4, 0]} scale={[0.7, 0.7, 0.7]}>
          <Covid19Model viewMode="crossSection" />
        </group>

        {/* Articulated Robotic Sample Arm */}
        <RoboticArm3D position={[4.5, -0.4, -1.5]} />

        {/* Autonomous Security Drone */}
        <SecurityDrone position={[5.2, 2.0, -1.2]} />

        {/* Cryogenic Storage Tanks & Bio-Incubators */}
        <CryoTanks position={[7.0, -1.4, 0]} />

        {/* 3D DNA Base-Pair Helix in Lab */}
        <group position={[5.6, 0.8, 1.8]} scale={[0.5, 0.5, 0.5]}>
          <DNAGenetics3D />
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════════
          5. BACK (Z ≈ +7.5m): 🌍 DIGITAL EARTH OBSERVATION SECTOR
          ══════════════════════════════════════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Back Spatial Sector Title (Facing user from rear) */}
        <mesh position={[0, 4.6, 6.2]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.8, 0.7]} />
          <meshBasicMaterial map={titleBack} transparent opacity={0.95} side={THREE.DoubleSide} />
        </mesh>

        {/* Grand 3D Photorealistic Digital Earth */}
        <group position={[0, 2.2, 7.8]}>
          <DigitalEarth autoRotate={true} />
          {/* Outer Orbiting Satellite Network */}
          <SatelliteNetwork showOrbits={true} />
          <CommBeams visible={true} />
        </group>

        {/* Observation Deck Balcony Railing */}
        <mesh position={[0, -0.7, 3.8]}>
          <cylinderGeometry args={[4.2, 4.2, 0.1, 32, 1, true, 0, Math.PI]} />
          <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, -0.4, 3.8]}>
          <torusGeometry args={[4.2, 0.04, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════
          6. ABOVE: 🛰️ ORBITAL SPACE & OVERHEAD STATION (Y ≈ +8.0m)
          ══════════════════════════════════════════════════════════════════ */}
      <group position={[0, 8.5, 0]}>
        <OrbitalStation position={[0, 0, 0]} />
      </group>
    </group>
  );
}
