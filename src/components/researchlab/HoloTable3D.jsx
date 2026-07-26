/**
 * HoloTable3D.jsx
 * Interactive 3D Holographic Workspace Table:
 *  - Metallic pedestal base
 *  - Hexagonal glowing holographic projection glass top
 *  - Pulsing energy matrix ring
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HoloTable3D({ position = [0, -1.2, 0] }) {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Table Base Pedestal */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 0.4, 16]} />
        <meshStandardMaterial color="#0a1524" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Center Light Column */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.5} />
      </mesh>

      {/* Glass Projection Surface */}
      <mesh position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.0, 32]} />
        <meshStandardMaterial
          color="#00c8ff"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glowing Projection Matrix Ring */}
      <mesh ref={ringRef} position={[0, 0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.65, 32]} />
        <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={2} />
      </mesh>

      <pointLight position={[0, 0.6, 0]} color="#00c8ff" intensity={2} distance={6} />
    </group>
  );
}
