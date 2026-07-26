/**
 * RoboticArm3D.jsx
 * 3D Articulated Laboratory Robotic Arm:
 *  - Metallic joint segments
 *  - Animated sweeping scan motion
 *  - Laser tip light
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function RoboticArm3D({ position = [-2.5, -0.5, -1] }) {
  const baseRef  = useRef();
  const jointRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (baseRef.current) {
      baseRef.current.rotation.y = Math.sin(t * 0.8) * 0.4;
    }
    if (jointRef.current) {
      jointRef.current.rotation.z = Math.sin(t * 1.2) * 0.2;
    }
  });

  return (
    <group ref={baseRef} position={position}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#1c2a38" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Vertical Column */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        <meshStandardMaterial color="#00c8ff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Joint 1 */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#7b2ff7" emissive="#7b2ff7" emissiveIntensity={0.6} />
      </mesh>

      {/* Articulated Arm Segment */}
      <group ref={jointRef} position={[0, 0.7, 0]}>
        <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.8, 0.08, 0.08]} />
          <meshStandardMaterial color="#37474f" metalness={0.7} />
        </mesh>
        {/* End Effector Scanner Tool */}
        <mesh position={[0.7, 0.6, 0]}>
          <cylinderGeometry args={[0.04, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1} />
        </mesh>
        <pointLight position={[0.7, 0.5, 0]} color="#00ff9d" intensity={1} distance={2} />
      </group>
    </group>
  );
}
