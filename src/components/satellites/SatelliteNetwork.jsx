/**
 * SatelliteNetwork.jsx
 * 8 satellites on unique orbital paths.
 * Each satellite:
 *  - Main body box + solar panel wings
 *  - Blinking communication antenna light
 *  - Orbit ring (faint torus)
 *  - Smooth orbital animation
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SATELLITES } from '../../data/satelliteConfig';

function SatelliteBody({ sat }) {
  const groupRef   = useRef();
  const lightRef   = useRef();
  const blinkRef   = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * sat.speed + sat.offset;
    if (groupRef.current) {
      // Orbit in a tilted plane
      const euler = new THREE.Euler(sat.tiltX, 0, sat.tiltZ);
      const quat  = new THREE.Quaternion().setFromEuler(euler);
      const pos   = new THREE.Vector3(Math.cos(t) * sat.radius, 0, Math.sin(t) * sat.radius);
      pos.applyQuaternion(quat);
      groupRef.current.position.copy(pos);
      groupRef.current.rotation.y = t;
      groupRef.current.rotation.x = 0.3;
    }
    // Blink comm light
    blinkRef.current += clock.getDelta() * 2;
    if (lightRef.current) {
      lightRef.current.intensity = Math.abs(Math.sin(clock.getElapsedTime() * 3 + sat.offset)) > 0.9 ? 0.8 : 0;
    }
  });

  return (
    <group ref={groupRef} scale={[0.22, 0.22, 0.22]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.08, 0.04, 0.12]} />
        <meshStandardMaterial color="#334455" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Solar panel left */}
      <mesh position={[-0.18, 0, 0]}>
        <boxGeometry args={[0.22, 0.02, 0.14]} />
        <meshStandardMaterial color={sat.panelColor} metalness={0.5} roughness={0.4} emissive={sat.panelColor} emissiveIntensity={0.2} />
      </mesh>
      {/* Solar panel right */}
      <mesh position={[0.18, 0, 0]}>
        <boxGeometry args={[0.22, 0.02, 0.14]} />
        <meshStandardMaterial color={sat.panelColor} metalness={0.5} roughness={0.4} emissive={sat.panelColor} emissiveIntensity={0.2} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.1, 4]} />
        <meshStandardMaterial color="#aabbcc" metalness={0.9} />
      </mesh>
      {/* Comm blink light */}
      <pointLight ref={lightRef} color={sat.color} intensity={0} distance={0.5} position={[0, 0.12, 0]} />
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.012, 4, 4]} />
        <meshBasicMaterial color={sat.color} />
      </mesh>
    </group>
  );
}

function OrbitRing({ sat }) {
  const ringGeometry = useMemo(() => {
    // Create a torus in a tilted plane
    const geo = new THREE.TorusGeometry(sat.radius, 0.005, 4, 128);
    return geo;
  }, [sat]);

  const euler = useMemo(() => new THREE.Euler(sat.tiltX, 0, sat.tiltZ), [sat]);

  return (
    <mesh rotation={euler}>
      <primitive object={ringGeometry} />
      <meshBasicMaterial color={sat.color} transparent opacity={0.12} />
    </mesh>
  );
}

export default function SatelliteNetwork({ showOrbits = true }) {
  return (
    <group>
      {SATELLITES.map((sat) => (
        <group key={sat.id}>
          {showOrbits && <OrbitRing sat={sat} />}
          <SatelliteBody sat={sat} />
        </group>
      ))}
    </group>
  );
}
