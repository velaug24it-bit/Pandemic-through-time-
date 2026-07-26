/**
 * InteractiveEarth.jsx
 * Premium Earth with:
 *  - Multi-texture day/night blend (procedural colors, no external files)
 *  - Custom atmosphere glow shader
 *  - Animated cloud layer
 *  - Satellite orbit ring
 *  - Continuous slow rotation
 *  - Glowing transmission arcs (animated)
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { atmosphereVertexShader, atmosphereFragmentShader } from '../../utils/shaders';
import { EARTH_RADIUS } from '../../utils/constants';

/** Generate a simple procedural Earth-like texture */
function createEarthTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Ocean base
  ctx.fillStyle = '#0d3a6e';
  ctx.fillRect(0, 0, size, size);

  // Simple continent shapes via noise-like blobs
  ctx.fillStyle = '#2d6a1e';
  const blobs = [
    [0.15, 0.30, 0.12], [0.20, 0.32, 0.08], [0.25, 0.28, 0.07],
    [0.55, 0.33, 0.09], [0.60, 0.36, 0.07], [0.65, 0.30, 0.06],
    [0.45, 0.55, 0.07], [0.50, 0.50, 0.09], [0.40, 0.45, 0.06],
    [0.78, 0.40, 0.06], [0.80, 0.35, 0.05], [0.82, 0.45, 0.04],
    [0.30, 0.65, 0.08], [0.35, 0.60, 0.06], [0.25, 0.68, 0.05],
    [0.70, 0.65, 0.06], [0.72, 0.60, 0.05], [0.68, 0.70, 0.04],
    [0.10, 0.50, 0.10], [0.85, 0.20, 0.08], [0.92, 0.55, 0.06],
  ];

  blobs.forEach(([x, y, r]) => {
    const grd = ctx.createRadialGradient(x*size, y*size, 0, x*size, y*size, r*size);
    grd.addColorStop(0, '#3d7a28');
    grd.addColorStop(0.5, '#2d6a1e');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x*size, y*size, r*size, 0, Math.PI*2);
    ctx.fill();
  });

  // Desert patches
  ctx.fillStyle = '#a0824a';
  [[0.62, 0.33, 0.04],[0.16, 0.34, 0.03]].forEach(([x,y,r]) => {
    ctx.beginPath(); ctx.arc(x*size, y*size, r*size, 0, Math.PI*2); ctx.fill();
  });

  // Ice caps
  const iceGrd1 = ctx.createLinearGradient(0, 0, 0, size*0.12);
  iceGrd1.addColorStop(0, 'rgba(220,240,255,0.95)');
  iceGrd1.addColorStop(1, 'transparent');
  ctx.fillStyle = iceGrd1;
  ctx.fillRect(0, 0, size, size*0.12);

  const iceGrd2 = ctx.createLinearGradient(0, size*0.88, 0, size);
  iceGrd2.addColorStop(0, 'transparent');
  iceGrd2.addColorStop(1, 'rgba(220,240,255,0.9)');
  ctx.fillStyle = iceGrd2;
  ctx.fillRect(0, size*0.88, size, size*0.12);

  return new THREE.CanvasTexture(canvas);
}

/** Night lights texture */
function createNightTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  const lights = [
    [0.17, 0.31], [0.20, 0.33], [0.14, 0.29], // Europe
    [0.58, 0.31], [0.62, 0.29], [0.66, 0.33], // Asia
    [0.26, 0.38], [0.30, 0.40],                // Africa/ME
    [0.82, 0.38], [0.86, 0.40], [0.80, 0.36], // East Asia
    [0.35, 0.52], [0.40, 0.50],                // South America
    [0.45, 0.46], [0.48, 0.52],                // Central Africa
  ];

  lights.forEach(([x, y]) => {
    for (let i = 0; i < 12; i++) {
      const ox = (Math.random()-0.5) * 0.08;
      const oy = (Math.random()-0.5) * 0.04;
      const grd = ctx.createRadialGradient(
        (x+ox)*size, (y+oy)*size, 0,
        (x+ox)*size, (y+oy)*size, 6
      );
      grd.addColorStop(0, 'rgba(255,230,150,0.9)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc((x+ox)*size, (y+oy)*size, 6, 0, Math.PI*2);
      ctx.fill();
    }
  });
  return new THREE.CanvasTexture(canvas);
}

/** Cloud layer texture */
function createCloudTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  for (let i = 0; i < 80; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 30 + 10;
    const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, 'rgba(255,255,255,0.45)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

/** Atmosphere glow sphere */
function Atmosphere() {
  const uniforms = useMemo(() => ({
    uAtmosphereColor: { value: new THREE.Color(0.1, 0.5, 1.0) },
    uIntensity: { value: 1.6 },
  }), []);

  return (
    <mesh scale={[1.08, 1.08, 1.08]}>
      <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** Glowing arc between two points on the sphere surface */
function TransmissionArc({ start, end, color = '#00ff9d', progress = 1 }) {
  const ref = useRef();
  const points = useMemo(() => {
    const pts = [];
    const segments = 30;
    for (let i = 0; i <= segments * progress; i++) {
      const t   = i / segments;
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(EARTH_RADIUS * 1.35);
      const p = new THREE.Vector3()
        .copy(start).lerp(end, t)
        .lerp(mid, Math.sin(t * Math.PI) * 0.5);
      pts.push(p);
    }
    return pts;
  }, [start, end, progress]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.6} linewidth={1} />
    </line>
  );
}

const ARC_PAIRS = [
  { a: [0.1, 0.3, -0.95], b: [0.6, -0.2, -0.75], col: '#00c8ff' },
  { a: [-0.7, 0.1, -0.7], b: [0.4, 0.5, -0.76],  col: '#00ff9d' },
  { a: [0.8, -0.4, -0.45],b: [-0.3, 0.5, -0.81], col: '#7b2ff7' },
];

export default function InteractiveEarth({ position = [0, 0, 0] }) {
  const earthRef  = useRef();
  const cloudRef  = useRef();
  const arcRef    = useRef(0);

  const earthTex  = useMemo(() => createEarthTexture(),  []);
  const nightTex  = useMemo(() => createNightTexture(),  []);
  const cloudTex  = useMemo(() => createCloudTexture(),  []);

  const arcProgresses = useRef(ARC_PAIRS.map(() => 0));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Earth slow rotation
    if (earthRef.current) earthRef.current.rotation.y = t * 0.04;

    // Slightly faster cloud rotation
    if (cloudRef.current) cloudRef.current.rotation.y = t * 0.055;

    // Animate arc progress values
    arcProgresses.current = arcProgresses.current.map((p, i) => {
      const phase = (t * 0.3 + i * 1.2) % 3;
      return phase < 1 ? phase : phase < 2 ? 2 - phase : 0;
    });
  });

  return (
    <group position={position}>
      {/* Main Earth sphere */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTex}
          emissiveMap={nightTex}
          emissive={new THREE.Color(0.8, 0.6, 0.2)}
          emissiveIntensity={0.4}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudRef} scale={[1.012, 1.012, 1.012]}>
        <sphereGeometry args={[EARTH_RADIUS, 48, 48]} />
        <meshStandardMaterial
          alphaMap={cloudTex}
          transparent
          opacity={0.6}
          color="#ffffff"
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere */}
      <Atmosphere />

      {/* Satellite orbit ring */}
      <mesh rotation={[Math.PI * 0.4, 0, 0.3]}>
        <torusGeometry args={[EARTH_RADIUS * 1.6, 0.006, 8, 128]} />
        <meshBasicMaterial color="#00c8ff" transparent opacity={0.25} />
      </mesh>

      {/* Animated satellite dot */}
      <SatelliteDot radius={EARTH_RADIUS * 1.6} tilt={[Math.PI * 0.4, 0, 0.3]} />

      {/* Transmission arcs */}
      {ARC_PAIRS.map((arc, i) => {
        const a = new THREE.Vector3(...arc.a).normalize().multiplyScalar(EARTH_RADIUS);
        const b = new THREE.Vector3(...arc.b).normalize().multiplyScalar(EARTH_RADIUS);
        return (
          <TransmissionArc key={i} start={a} end={b} color={arc.col} progress={1} />
        );
      })}

      {/* Sparkle particles (atmospheric debris) */}
      <Sparkles count={120} scale={[6, 6, 6]} size={0.6} speed={0.2} opacity={0.3} color="#00c8ff" />
    </group>
  );
}

function SatelliteDot({ radius, tilt }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.5;
    // Orbit in the tilted plane
    const euler = new THREE.Euler(...tilt);
    const quat  = new THREE.Quaternion().setFromEuler(euler);
    const pos   = new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius);
    pos.applyQuaternion(quat);
    ref.current.position.copy(pos);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#00c8ff" />
    </mesh>
  );
}
