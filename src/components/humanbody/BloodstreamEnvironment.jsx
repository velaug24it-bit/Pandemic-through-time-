/**
 * BloodstreamEnvironment.jsx
 * Dynamic Cinematic 3D Microscopic Organ World:
 *  - Master Cinematic Float & Motion (useFrame camera sway)
 *  - CONTINUOUS 3D FLOW & ACTION ANIMATION for every organ system:
 *     1. Bloodstream: Tumbling Red & White Blood Cells flowing downstream
 *     2. Lungs: Breathing Alveoli clusters & streaming blue O2 gas molecules
 *     3. Heart: Rhythmic cardiac heartbeat contractions & traveling pulse waves
 *     4. Brain: Floating Neural Axon nodes & electric synaptic pulse discharges
 *     5. Liver: Rotating Hepatic Lobules & streaming enzymatic detox spheres
 *     6. Kidneys: Pulsing Glomerular Capillaries & streaming filtration droplets
 *     7. Lymphatic: Pulsing Lymph Nodes & streaming T-Cell Lymphocytes
 *     8. Immune Core: Deforming Macrophages & floating, spinning Y-Antibodies
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ORGAN_SYSTEMS } from '../../utils/constants';

/** 1. Bloodstream: Flowing Red & White Blood Cells */
function Bloodstream3D() {
  const rbcs = useMemo(() => Array.from({ length: 40 }, () => ({
    pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, Math.random() * 22 - 16],
    rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    scale: Math.random() * 0.2 + 0.45,
    speed: Math.random() * 0.03 + 0.04,
  })), []);

  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (i < rbcs.length) {
          child.position.z += rbcs[i].speed;
          if (child.position.z > 6) child.position.z = -16;
          child.rotation.x += 0.015;
          child.rotation.y += 0.02;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {rbcs.map((cell, i) => (
        <mesh key={i} position={cell.pos} rotation={cell.rot} scale={cell.scale}>
          <cylinderGeometry args={[0.5, 0.5, 0.18, 24]} />
          <meshStandardMaterial color="#d50000" roughness={0.2} metalness={0.3} emissive="#600000" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, Math.random() * 18 - 12]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#e0f0ff" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** 2. Lungs: Breathing Alveoli Air Sacs & Streaming O2 Molecules */
function Lungs3D() {
  const groupRef = useRef();
  const o2Ref    = useRef();

  const alveoli = useMemo(() => Array.from({ length: 18 }, () => ({
    pos: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, Math.random() * 16 - 10],
    scale: Math.random() * 0.4 + 0.6,
  })), []);

  const o2Molecules = useMemo(() => Array.from({ length: 32 }, () => ({
    pos: [(Math.random() - 0.5) * 7.5, (Math.random() - 0.5) * 7.5, Math.random() * 22 - 16],
    speed: Math.random() * 0.04 + 0.05,
  })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Breathing expansion / contraction
      const breath = 1 + Math.sin(t * 1.8) * 0.08;
      groupRef.current.scale.set(breath, breath, breath);
    }
    if (o2Ref.current) {
      o2Ref.current.children.forEach((child, i) => {
        child.position.z += o2Molecules[i].speed;
        if (child.position.z > 6) child.position.z = -16;
        child.rotation.y += 0.03;
      });
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {alveoli.map((a, i) => (
          <mesh key={i} position={a.pos} scale={a.scale}>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshStandardMaterial color="#00e5ff" transparent opacity={0.55} emissive="#0088cc" emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>
      <group ref={o2Ref}>
        {o2Molecules.map((o, i) => (
          <group key={i} position={o.pos}>
            <mesh position={[-0.08, 0, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.8} />
            </mesh>
            <mesh position={[0.08, 0, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.8} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/** 3. Heart: Double-beat Heartbeat Contractions & Traveling Pulse Waves */
function Heart3D() {
  const heartGroupRef = useRef();
  const pulsesRef     = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (heartGroupRef.current) {
      // Double cardiac pulse rhythm
      const beat = 1 + Math.sin(t * 5) * 0.07 + Math.sin(t * 10) * 0.03;
      heartGroupRef.current.scale.set(beat, beat, beat);
    }
    if (pulsesRef.current) {
      pulsesRef.current.children.forEach((ring) => {
        ring.position.z += 0.08;
        if (ring.position.z > 6) ring.position.z = -16;
      });
    }
  });

  return (
    <group>
      <group ref={heartGroupRef}>
        {[-3, -1, 1, 3].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.25, 0.25, 12, 16]} />
            <meshStandardMaterial color="#ff3860" emissive="#aa0022" emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>
      <group ref={pulsesRef}>
        {[-14, -10, -6, -2, 2].map((z, i) => (
          <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.2, 0.08, 8, 32]} />
            <meshStandardMaterial color="#ff1744" emissive="#ff1744" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** 4. Brain: Floating Axon Nodes & Pulsing Synaptic Electric Discharges */
function Brain3D() {
  const groupRef = useRef();

  const neurons = useMemo(() => Array.from({ length: 24 }, () => ({
    pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, Math.random() * 20 - 14],
    speed: Math.random() * 0.02 + 0.03,
  })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.z += neurons[i].speed;
        if (child.position.z > 6) child.position.z = -14;
        child.rotation.y = t * 0.8 + i;
        child.rotation.x = Math.sin(t + i) * 0.4;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {neurons.map((n, i) => (
        <group key={i} position={n.pos}>
          <mesh>
            <octahedronGeometry args={[0.35, 2]} />
            <meshStandardMaterial color="#7b2ff7" emissive="#7b2ff7" emissiveIntensity={1.8} wireframe />
          </mesh>
          <pointLight color="#7b2ff7" intensity={1.5} distance={3} />
        </group>
      ))}
    </group>
  );
}

/** 5. Liver: Rotating Hepatic Lobules & Streaming Detox Spheres */
function Liver3D() {
  const lobulesRef = useRef();
  const spheresRef = useRef();

  const lobules = useMemo(() => Array.from({ length: 16 }, () => ({
    pos: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, Math.random() * 16 - 10],
  })), []);

  const spheres = useMemo(() => Array.from({ length: 30 }, () => ({
    pos: [(Math.random() - 0.5) * 7.5, (Math.random() - 0.5) * 7.5, Math.random() * 22 - 16],
    speed: Math.random() * 0.04 + 0.04,
  })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lobulesRef.current) {
      lobulesRef.current.rotation.z = t * 0.1;
    }
    if (spheresRef.current) {
      spheresRef.current.children.forEach((s, i) => {
        s.position.z += spheres[i].speed;
        if (s.position.z > 6) s.position.z = -16;
        s.rotation.y += 0.03;
      });
    }
  });

  return (
    <group>
      <group ref={lobulesRef}>
        {lobules.map((l, i) => (
          <mesh key={i} position={l.pos} rotation={[0, i, 0]}>
            <cylinderGeometry args={[0.65, 0.65, 0.45, 6]} />
            <meshStandardMaterial color="#ff9100" emissive="#cc6600" emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>
      <group ref={spheresRef}>
        {spheres.map((s, i) => (
          <mesh key={i} position={s.pos}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** 6. Kidneys: Pulsing Glomerular Capillaries & Streaming Filtration Droplets */
function Kidneys3D() {
  const nephronRef = useRef();
  const dropletsRef = useRef();

  const nephrons = useMemo(() => Array.from({ length: 20 }, () => ({
    pos: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, Math.random() * 16 - 10],
  })), []);

  const droplets = useMemo(() => Array.from({ length: 30 }, () => ({
    pos: [(Math.random() - 0.5) * 7.5, (Math.random() - 0.5) * 7.5, Math.random() * 22 - 16],
    speed: Math.random() * 0.04 + 0.04,
  })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (nephronRef.current) {
      nephronRef.current.children.forEach((n, i) => {
        n.rotation.y = t * 0.5 + i;
      });
    }
    if (dropletsRef.current) {
      dropletsRef.current.children.forEach((d, i) => {
        d.position.z += droplets[i].speed;
        if (d.position.z > 6) d.position.z = -16;
      });
    }
  });

  return (
    <group>
      <group ref={nephronRef}>
        {nephrons.map((n, i) => (
          <mesh key={i} position={n.pos} rotation={[i, 0, i]}>
            <torusGeometry args={[0.45, 0.09, 12, 24]} />
            <meshStandardMaterial color="#ffb700" emissive="#cc9900" emissiveIntensity={1.1} />
          </mesh>
        ))}
      </group>
      <group ref={dropletsRef}>
        {droplets.map((d, i) => (
          <mesh key={i} position={d.pos}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={1.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** 7. Lymphatic: Pulsing Lymph Nodes & Streaming T-Cell Lymphocytes */
function Lymphatic3D() {
  const nodesRef = useRef();
  const tcellsRef = useRef();

  const nodes = useMemo(() => Array.from({ length: 16 }, () => ({
    pos: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, Math.random() * 16 - 10],
  })), []);

  const tcells = useMemo(() => Array.from({ length: 28 }, () => ({
    pos: [(Math.random() - 0.5) * 7.5, (Math.random() - 0.5) * 7.5, Math.random() * 22 - 16],
    speed: Math.random() * 0.04 + 0.045,
  })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (nodesRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      nodesRef.current.scale.set(pulse, pulse, pulse);
    }
    if (tcellsRef.current) {
      tcellsRef.current.children.forEach((tc, i) => {
        tc.position.z += tcells[i].speed;
        if (tc.position.z > 6) tc.position.z = -16;
        tc.rotation.y += 0.02;
      });
    }
  });

  return (
    <group>
      <group ref={nodesRef}>
        {nodes.map((n, i) => (
          <mesh key={i} position={n.pos}>
            <capsuleGeometry args={[0.28, 0.65, 12, 12]} />
            <meshStandardMaterial color="#00ff9d" emissive="#00aa66" emissiveIntensity={1.0} transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
      <group ref={tcellsRef}>
        {tcells.map((tc, i) => (
          <mesh key={i} position={tc.pos}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** 8. Immune Core: Ameboid Macrophages & Floating, Spinning Y-Antibodies */
function Immune3D() {
  const macroRef     = useRef();
  const antibodyRef  = useRef();

  const antibodies = useMemo(() => Array.from({ length: 22 }, () => ({
    pos: [(Math.random() - 0.5) * 7.5, (Math.random() - 0.5) * 7.5, Math.random() * 22 - 16],
    rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    speed: Math.random() * 0.035 + 0.035,
  })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (macroRef.current) {
      macroRef.current.rotation.y = t * 0.3;
      macroRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
    if (antibodyRef.current) {
      antibodyRef.current.children.forEach((ab, i) => {
        ab.position.z += antibodies[i].speed;
        if (ab.position.z > 6) ab.position.z = -16;
        ab.rotation.y += 0.025;
        ab.rotation.x += 0.015;
      });
    }
  });

  return (
    <group>
      {/* Ameboid Macrophage */}
      <mesh ref={macroRef} position={[-1.2, 0, -2]}>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshStandardMaterial color="#00c8ff" emissive="#0055aa" emissiveIntensity={0.8} transparent opacity={0.65} wireframe />
      </mesh>

      {/* Floating, Spinning Y-Shaped Antibodies streaming past camera */}
      <group ref={antibodyRef}>
        {antibodies.map((ab, i) => (
          <group key={i} position={ab.pos} rotation={ab.rot}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.35, 8]} />
              <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.5} />
            </mesh>
            <mesh position={[0.09, 0.14, 0]} rotation={[0, 0, -0.6]}>
              <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
              <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.5} />
            </mesh>
            <mesh position={[-0.09, 0.14, 0]} rotation={[0, 0, 0.6]}>
              <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
              <meshStandardMaterial color="#00c8ff" emissive="#00c8ff" emissiveIntensity={1.5} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function BloodstreamEnvironment({ organId = 'bloodstream' }) {
  const chamberRef = useRef();
  const masterMotionRef = useRef();

  const currentOrgan = useMemo(() => {
    return ORGAN_SYSTEMS.find(o => o.id === organId) || ORGAN_SYSTEMS[0];
  }, [organId]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (chamberRef.current) {
      chamberRef.current.rotation.y = t * 0.02;
    }
    // Master Cinematic Float & Sway
    if (masterMotionRef.current) {
      masterMotionRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      masterMotionRef.current.rotation.z = Math.sin(t * 0.4) * 0.03;
    }
  });

  const renderOrganSpecific3D = () => {
    switch (organId) {
      case 'bloodstream':
        return <Bloodstream3D />;
      case 'lungs':
        return <Lungs3D />;
      case 'heart':
        return <Heart3D />;
      case 'brain':
        return <Brain3D />;
      case 'liver':
        return <Liver3D />;
      case 'kidneys':
        return <Kidneys3D />;
      case 'lymphatic':
        return <Lymphatic3D />;
      case 'immune':
        return <Immune3D />;
      default:
        return <Bloodstream3D />;
    }
  };

  return (
    <group ref={masterMotionRef}>
      {/* 360° Surrounding Microscopic Organ Chamber Sphere */}
      <mesh ref={chamberRef} position={[0, 0, 0]}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshStandardMaterial
          color={currentOrgan.color}
          side={THREE.BackSide}
          roughness={0.6}
          metalness={0.1}
          emissive={currentOrgan.color}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Unique Organ 3D Cellular Structure with Cinematic Flow & Action */}
      {renderOrganSpecific3D()}
    </group>
  );
}
