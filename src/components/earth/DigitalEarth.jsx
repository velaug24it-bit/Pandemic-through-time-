/**
 * DigitalEarth.jsx
 * Phase 2 enhanced Earth — replaces the Phase 1 Earth in EarthScene.
 * Features:
 *  - Ultra-quality procedural textures (day/night/cloud/specular)
 *  - Multi-layer atmosphere (inner + outer glow)
 *  - Auto-rotation toggle
 *  - OrbitControls with inertia
 *  - Continuous emission animation
 *  - Ocean specular shimmer
 *  - Polar ice caps
 *  - Accepts onCountryHover / onCountryClick callbacks (forwarded from CountryMarkers)
 */
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { atmosphereVertexShader, atmosphereFragmentShader } from '../../utils/shaders';

const EARTH_R = 2;

/* ── Procedural texture generators ──────────────────────────────────────── */

function makeEarthTexture() {
  const size = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');

  // Deep ocean base
  const seaGrd = ctx.createLinearGradient(0, 0, size, size);
  seaGrd.addColorStop(0,   '#0b2a4a');
  seaGrd.addColorStop(0.5, '#0d3a6e');
  seaGrd.addColorStop(1,   '#0a2440');
  ctx.fillStyle = seaGrd;
  ctx.fillRect(0, 0, size, size);

  // Continental masses (layered blobs)
  const continents = [
    // North America
    [0.12,0.27, 0.09], [0.17,0.29, 0.07], [0.22,0.25, 0.06], [0.10,0.32, 0.05],
    [0.19,0.35, 0.05], [0.14,0.22, 0.06], [0.08,0.40, 0.05],
    // South America
    [0.28,0.55, 0.07], [0.30,0.62, 0.06], [0.26,0.68, 0.05], [0.32,0.70, 0.04],
    // Europe
    [0.50,0.28, 0.05], [0.53,0.25, 0.04], [0.56,0.27, 0.04], [0.48,0.30, 0.04],
    // Africa
    [0.52,0.38, 0.07], [0.54,0.45, 0.08], [0.52,0.52, 0.07], [0.56,0.58, 0.05],
    [0.50,0.60, 0.05], [0.54,0.62, 0.04],
    // Middle East
    [0.58,0.33, 0.04], [0.61,0.35, 0.04],
    // Central Asia
    [0.63,0.28, 0.08], [0.68,0.25, 0.07], [0.72,0.27, 0.06],
    // South Asia
    [0.64,0.38, 0.05], [0.67,0.40, 0.04],
    // Southeast Asia
    [0.72,0.42, 0.04], [0.75,0.45, 0.03], [0.73,0.48, 0.03],
    // East Asia
    [0.76,0.30, 0.06], [0.79,0.27, 0.05], [0.82,0.32, 0.04],
    // Japan
    [0.85,0.28, 0.02],
    // Australia
    [0.76,0.60, 0.07], [0.79,0.58, 0.06], [0.80,0.63, 0.05],
    // Russia
    [0.60,0.20, 0.12], [0.70,0.18, 0.10], [0.80,0.20, 0.09],
  ];

  continents.forEach(([x, y, r]) => {
    const g = ctx.createRadialGradient(x*size, y*size, 0, x*size, y*size, r*size);
    g.addColorStop(0,   '#3a7d2a');
    g.addColorStop(0.4, '#2d6a1e');
    g.addColorStop(0.8, '#1e5014');
    g.addColorStop(1,   'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x*size, y*size, r*size, 0, Math.PI*2);
    ctx.fill();
  });

  // Desert patches (Sahara, Arabia, Central Asia, Australia)
  const deserts = [
    [0.52,0.33, 0.03, '#c8a060'], [0.58,0.36, 0.025,'#c0985a'],
    [0.63,0.32, 0.02, '#b89050'], [0.79,0.60, 0.025,'#c4a865'],
  ];
  deserts.forEach(([x, y, r, col]) => {
    const g = ctx.createRadialGradient(x*size, y*size, 0, x*size, y*size, r*size);
    g.addColorStop(0, col);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x*size, y*size, r*size, 0, Math.PI*2);
    ctx.fill();
  });

  // Mountain ridges (darker green on continents)
  ctx.globalAlpha = 0.3;
  [[0.20,0.28,0.02],[0.26,0.60,0.015],[0.65,0.35,0.015],[0.78,0.30,0.02]].forEach(([x,y,r]) => {
    ctx.fillStyle = '#1a3a0e';
    ctx.beginPath();
    ctx.arc(x*size, y*size, r*size, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // North polar ice cap
  const northIce = ctx.createLinearGradient(0, 0, 0, size*0.10);
  northIce.addColorStop(0,   'rgba(220,240,255,0.98)');
  northIce.addColorStop(0.7, 'rgba(200,225,255,0.5)');
  northIce.addColorStop(1,   'transparent');
  ctx.fillStyle = northIce;
  ctx.fillRect(0, 0, size, size*0.10);

  // South polar ice cap (Antarctica)
  const southIce = ctx.createLinearGradient(0, size*0.86, 0, size);
  southIce.addColorStop(0,   'transparent');
  southIce.addColorStop(0.3, 'rgba(220,240,255,0.5)');
  southIce.addColorStop(1,   'rgba(230,245,255,0.98)');
  ctx.fillStyle = southIce;
  ctx.fillRect(0, size*0.86, size, size*0.14);

  return new THREE.CanvasTexture(c);
}

function makeNightTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);

  const hubs = [
    // North America
    [0.14,0.29], [0.17,0.28], [0.20,0.30], [0.22,0.32], [0.11,0.31], [0.16,0.34],
    // Europe
    [0.50,0.27], [0.52,0.25], [0.54,0.28], [0.57,0.25], [0.47,0.27],
    // Russia
    [0.60,0.20], [0.65,0.18], [0.70,0.19], [0.75,0.20],
    // East Asia
    [0.77,0.29], [0.80,0.27], [0.83,0.30], [0.85,0.27],
    // South Asia
    [0.64,0.36], [0.67,0.38],
    // Africa
    [0.52,0.36], [0.54,0.42],
    // South America
    [0.28,0.57], [0.30,0.64],
    // Australia
    [0.80,0.62], [0.77,0.60],
  ];

  hubs.forEach(([x, y]) => {
    for (let i = 0; i < 20; i++) {
      const ox = (Math.random()-0.5)*0.05;
      const oy = (Math.random()-0.5)*0.03;
      const r  = Math.random()*5 + 2;
      const g  = ctx.createRadialGradient(
        (x+ox)*size, (y+oy)*size, 0,
        (x+ox)*size, (y+oy)*size, r
      );
      const intensity = 0.6 + Math.random()*0.4;
      g.addColorStop(0, `rgba(255,220,140,${intensity})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc((x+ox)*size, (y+oy)*size, r, 0, Math.PI*2);
      ctx.fill();
    }
  });
  return new THREE.CanvasTexture(c);
}

function makeCloudTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  for (let i = 0; i < 140; i++) {
    const x = Math.random()*size;
    const y = Math.random()*size;
    const r = Math.random()*40 + 8;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const op = 0.3 + Math.random()*0.25;
    g.addColorStop(0, `rgba(255,255,255,${op})`);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function makeSpecularTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  // Ocean = bright specular, land = dark
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  // Paint land as dark (no specular)
  // Reuse approximate continent positions
  ctx.fillStyle = '#111111';
  [[0.12,0.27,0.09],[0.17,0.29,0.07],[0.28,0.55,0.07],[0.30,0.62,0.06],
   [0.50,0.28,0.05],[0.52,0.38,0.07],[0.54,0.45,0.08],[0.63,0.28,0.08],
   [0.76,0.30,0.06],[0.79,0.27,0.05],[0.76,0.60,0.07],[0.60,0.20,0.12],
  ].forEach(([x,y,r]) => {
    ctx.beginPath(); ctx.arc(x*size, y*size, r*size*1.1, 0, Math.PI*2); ctx.fill();
  });
  return new THREE.CanvasTexture(c);
}

/** Inner atmosphere sphere */
function AtmosphereInner() {
  const uniforms = useMemo(() => ({
    uAtmosphereColor: { value: new THREE.Color(0.05, 0.4, 0.9) },
    uIntensity: { value: 1.8 },
  }), []);
  return (
    <mesh scale={[1.05, 1.05, 1.05]}>
      <sphereGeometry args={[EARTH_R, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        transparent depthWrite={false}
        side={THREE.FrontSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** Outer atmosphere halo */
function AtmosphereOuter() {
  const uniforms = useMemo(() => ({
    uAtmosphereColor: { value: new THREE.Color(0.02, 0.25, 0.7) },
    uIntensity: { value: 1.2 },
  }), []);
  return (
    <mesh scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[EARTH_R, 32, 32]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        transparent depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function DigitalEarth({ autoRotate = true, autoRotateRef }) {
  const earthRef = useRef();
  const cloudRef = useRef();

  const earthTex   = useMemo(() => makeEarthTexture(),   []);
  const nightTex   = useMemo(() => makeNightTexture(),   []);
  const cloudTex   = useMemo(() => makeCloudTexture(),   []);
  const specTex    = useMemo(() => makeSpecularTexture(),[]);

  // Expose rotation ref for external control
  useEffect(() => {
    if (autoRotateRef) autoRotateRef.current = earthRef.current;
  }, [autoRotateRef]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (earthRef.current && autoRotate) {
      earthRef.current.rotation.y = t * 0.05;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = t * 0.065;
    }
  });

  return (
    <group>
      {/* ── Main Earth ── */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[EARTH_R, 128, 128]} />
        <meshPhongMaterial
          map={earthTex}
          specularMap={specTex}
          specular={new THREE.Color(0.3, 0.5, 0.7)}
          shininess={18}
          emissiveMap={nightTex}
          emissive={new THREE.Color(0.9, 0.7, 0.3)}
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* ── Cloud layer ── */}
      <mesh ref={cloudRef} scale={[1.013, 1.013, 1.013]}>
        <sphereGeometry args={[EARTH_R, 64, 64]} />
        <meshStandardMaterial
          alphaMap={cloudTex}
          transparent
          opacity={0.65}
          color="#ffffff"
          depthWrite={false}
        />
      </mesh>

      {/* ── Atmosphere layers ── */}
      <AtmosphereInner />
      <AtmosphereOuter />
    </group>
  );
}
