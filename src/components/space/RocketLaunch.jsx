/**
 * RocketLaunch.jsx
 * Full cinematic rocket launch scene in Three.js:
 *  - Launch pad
 *  - Procedural rocket mesh
 *  - Smoke & fire particle systems
 *  - Camera shake via GSAP
 *  - Cloud layer
 *  NOTE: Countdown overlay is rendered as a separate HTML overlay in App.jsx
 *        to avoid rendering HTML elements inside the R3F Canvas.
 */
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

/** Procedural rocket geometry */
function Rocket({ launched }) {
  const rocketRef = useRef();

  useFrame(({ clock }) => {
    if (!rocketRef.current) return;
    if (launched) {
      rocketRef.current.position.y += 0.06;
      rocketRef.current.position.y = Math.min(rocketRef.current.position.y, 60);
    }
  });

  return (
    <group ref={rocketRef} position={[0, 0.6, 0]}>
      {/* Main body */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.18, 1.8, 16]} />
        <meshStandardMaterial color="#c8d4e0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 1.15, 0]}>
        <coneGeometry args={[0.15, 0.55, 16]} />
        <meshStandardMaterial color="#b0bcc8" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Fins x3 */}
      {[0, 120, 240].map((deg) => (
        <mesh key={deg} position={[0, -0.7, 0]} rotation={[0, (deg * Math.PI) / 180, 0]}>
          <group>
            <mesh position={[0.22, 0, 0]}>
              <boxGeometry args={[0.25, 0.5, 0.04]} />
              <meshStandardMaterial color="#99aabb" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        </mesh>
      ))}
      {/* Engine nozzle */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.2, 12]} />
        <meshStandardMaterial color="#666677" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Window */}
      <mesh position={[0, 0.5, 0.16]}>
        <circleGeometry args={[0.06, 12]} />
        <meshBasicMaterial color="#003355" />
      </mesh>
      {/* Engine glow */}
      {launched && (
        <pointLight color="#ff6600" intensity={4} distance={4} position={[0, -1.1, 0]} />
      )}
    </group>
  );
}

/** Launch Pad */
function LaunchPad() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Base plate */}
      <mesh receiveShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.2, 16]} />
        <meshStandardMaterial color="#334455" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Tower left */}
      <mesh position={[-0.5, 1.0, 0]}>
        <boxGeometry args={[0.06, 2.0, 0.06]} />
        <meshStandardMaterial color="#445566" metalness={0.7} />
      </mesh>
      {/* Tower right */}
      <mesh position={[0.5, 1.0, 0]}>
        <boxGeometry args={[0.06, 2.0, 0.06]} />
        <meshStandardMaterial color="#445566" metalness={0.7} />
      </mesh>
      {/* Cross brace */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.04]} />
        <meshStandardMaterial color="#556677" />
      </mesh>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1a2030" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}

/** Smoke particle system */
function SmokeParticles({ active }) {
  const meshRef = useRef();
  const count   = 300;

  const { positions, velocities, ages } = useMemo(() => {
    const pos  = new Float32Array(count * 3);
    const vel  = new Float32Array(count * 3);
    const age  = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 0.5;
      pos[i*3+1] = -0.5;
      pos[i*3+2] = (Math.random() - 0.5) * 0.5;
      vel[i*3]   = (Math.random() - 0.5) * 0.02;
      vel[i*3+1] = Math.random() * 0.04 + 0.01;
      vel[i*3+2] = (Math.random() - 0.5) * 0.02;
      age[i]     = Math.random();
    }
    return { positions: pos, velocities: vel, ages: age };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  useFrame(() => {
    if (!active || !meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i*3]   += velocities[i*3]   + (Math.random()-0.5) * 0.01;
      pos[i*3+1] += velocities[i*3+1];
      pos[i*3+2] += velocities[i*3+2] + (Math.random()-0.5) * 0.01;
      ages[i]    += 0.008;
      if (ages[i] > 1) {
        pos[i*3]   = (Math.random()-0.5)*0.5;
        pos[i*3+1] = -0.5;
        pos[i*3+2] = (Math.random()-0.5)*0.5;
        ages[i]    = 0;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial
        color="#aaaaaa"
        size={0.35}
        transparent
        opacity={0.45}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/** Fire particle system */
function FireParticles({ active }) {
  const ref   = useRef();
  const count = 200;

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const vels = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random()-0.5)*0.06,
      y: Math.random()*0.08+0.02,
      z: (Math.random()-0.5)*0.06,
      age: Math.random(),
    }))
  , []);

  useFrame(() => {
    if (!active || !ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    vels.forEach((v, i) => {
      pos[i*3]   += v.x;
      pos[i*3+1] -= v.y; // fire goes down (exhaust)
      pos[i*3+2] += v.z;
      v.age      += 0.02;
      if (v.age > 1) {
        pos[i*3]   = (Math.random()-0.5)*0.2;
        pos[i*3+1] = -0.9;
        pos[i*3+2] = (Math.random()-0.5)*0.2;
        v.age = 0;
      }
    });
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#ff5500"
        size={0.22}
        transparent
        opacity={0.8}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Camera shake effect using GSAP */
function CameraShake({ active }) {
  const { camera } = useThree();
  const originRef   = useRef(camera.position.clone());

  useEffect(() => {
    if (!active) return;
    const shake = () => {
      gsap.to(camera.position, {
        x: originRef.current.x + (Math.random()-0.5)*0.08,
        y: originRef.current.y + (Math.random()-0.5)*0.05,
        duration: 0.05,
        onComplete: shake,
      });
    };
    shake();
    const id = setTimeout(() => {
      gsap.killTweensOf(camera.position);
      gsap.to(camera.position, { ...originRef.current, duration: 0.5 });
    }, 4000);
    return () => { clearTimeout(id); gsap.killTweensOf(camera.position); };
  }, [active, camera]);

  return null;
}



export default function RocketLaunch({ onComplete, onCountdown }) {
  const [countdown, setCountdown] = useState(5);
  const [launched,  setLaunched]  = useState(false);
  const [shaking,   setShaking]   = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => {
      const next = countdown - 1;
      setCountdown(next);
      onCountdown?.(next);
    }, 1000);
    return () => clearTimeout(id);
  }, [countdown, onCountdown]);

  useEffect(() => {
    if (countdown === 0) {
      setLaunched(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 3500);
      setTimeout(() => onComplete?.(), 5500);
    }
  }, [countdown, onComplete]);

  return (
    <>
      {/* 3D scene objects only – no HTML elements */}
      <LaunchPad />
      <Rocket launched={launched} />
      <SmokeParticles active={launched} />
      <FireParticles  active={launched} />
      <CameraShake    active={shaking}  />

      {/* Atmospheric cloud layer */}
      <Sparkles count={60} scale={[30, 8, 30]} position={[0, 14, 0]}
        size={6} speed={0.05} opacity={0.12} color="#ccddee" />
    </>
  );
}
