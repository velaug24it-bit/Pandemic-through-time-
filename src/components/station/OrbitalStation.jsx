/**
 * OrbitalStation.jsx
 * Futuristic procedural orbital station built entirely from Three.js geometry:
 *  - Central torus ring
 *  - 4 radial spokes + habitat modules
 *  - Docking platform
 *  - Holographic blue emissive strips
 *  - Solar panel arrays
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

function SpokeModule({ angle }) {
  const rad = (angle * Math.PI) / 180;
  const r   = 3.5;
  const x   = Math.cos(rad) * r;
  const z   = Math.sin(rad) * r;

  return (
    <group rotation={[0, rad, 0]}>
      {/* Spoke */}
      <mesh position={[r / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, r, 8]} />
        <meshStandardMaterial color="#445566" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Habitat module */}
      <group position={[r + 0.5, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.0, 0.55, 0.55]} />
          <meshStandardMaterial color="#445566" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Glass window */}
        <mesh position={[0, 0, 0.28]}>
          <planeGeometry args={[0.7, 0.35]} />
          <meshPhysicalMaterial
            color="#0a1a2a"
            metalness={0.1}
            roughness={0.05}
            transmission={0.8}
            thickness={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Holo strip top */}
        <mesh position={[0, 0.29, 0]}>
          <boxGeometry args={[1.0, 0.03, 0.55]} />
          <meshStandardMaterial color="#003355" emissive="#00aaff" emissiveIntensity={1.2} metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Solar panel */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1.2, 0.02, 0.5]} />
          <meshStandardMaterial color="#112244" emissive="#001133" emissiveIntensity={0.3} metalness={0.4} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function DockingPort() {
  return (
    <group position={[0, -1.8, 0]}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.6, 0.4, 16]} />
        <meshStandardMaterial color="#445566" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6, 12]} />
        <meshStandardMaterial color="#223344" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Docking light ring */}
      <mesh position={[0, -0.18, 0]}>
        <torusGeometry args={[0.5, 0.025, 8, 24]} />
        <meshStandardMaterial emissive="#00c8ff" emissiveIntensity={2} color="#003355" />
      </mesh>
      <pointLight color="#00c8ff" intensity={1.5} distance={5} position={[0, -0.2, 0]} />
    </group>
  );
}

function SolarArray({ side }) {
  const s = side === 'left' ? -1 : 1;
  return (
    <group position={[0, 0, s * 5.5]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.5, 8]} />
        <meshStandardMaterial color="#445566" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.0, 0.02, 1.0]} />
        <meshStandardMaterial color="#112244" emissive="#001133" emissiveIntensity={0.3} metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[2.0, 0.02, 1.0]} />
        <meshStandardMaterial color="#112244" emissive="#001133" emissiveIntensity={0.3} metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function OrbitalStation({ position = [0, 0, -10] }) {
  const stationRef = useRef();

  useFrame(({ clock }) => {
    if (stationRef.current) {
      stationRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={stationRef} position={position}>
      {/* Main ring torus */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.28, 16, 80]} />
        <meshStandardMaterial color="#445566" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Inner holo ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.88, 0.88, 1]}>
        <torusGeometry args={[3.5, 0.04, 8, 80]} />
        <meshStandardMaterial emissive="#00aaff" emissiveIntensity={1.5} color="#003355" />
      </mesh>

      {/* Central hub */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#334455" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Hub emissive ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.03, 8, 24]} />
        <meshStandardMaterial emissive="#00c8ff" emissiveIntensity={2} color="#003355" />
      </mesh>

      {/* 4 spokes + modules */}
      <SpokeModule angle={0}   />
      <SpokeModule angle={90}  />
      <SpokeModule angle={180} />
      <SpokeModule angle={270} />

      {/* Solar arrays */}
      <SolarArray side="left"  />
      <SolarArray side="right" />

      {/* Docking port */}
      <DockingPort />

      {/* Point lights */}
      <pointLight color="#00aaff" intensity={2} distance={12} />
      <pointLight color="#0055aa" intensity={1} distance={20} position={[0, 3, 0]} />

      {/* Thruster nozzles */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh key={deg} position={[Math.cos(rad)*3.5, -0.3, Math.sin(rad)*3.5]}>
            <cylinderGeometry args={[0.06, 0.10, 0.15, 8]} />
            <meshStandardMaterial emissive="#ff6600" emissiveIntensity={0.8} color="#333344" />
          </mesh>
        );
      })}

      {/* Particle debris cloud */}
      <Sparkles count={80} scale={[16, 16, 16]} size={0.4} speed={0.03} opacity={0.2} color="#88aacc" />
    </group>
  );
}
