/**
 * DigitalEarth.jsx
 * Realistic Vector Digital Twin Earth matching Image 1 and Image 2.
 * Features:
 *  - Ultra-high-contrast dark space navy globe with realistic continent geometry
 *  - Crisp neon cyan/blue vector country outlines matching Image 1
 *  - Dynamic Country Polygonal Highlight: When a nation (e.g. India) is selected/hovered,
 *    its exact boundary polygon is filled with glowing purple/violet (#c084fc / #a855f7) with neon edges (Image 2)
 *  - Procedural atmospheric glow shader
 */
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { atmosphereVertexShader, atmosphereFragmentShader } from '../../utils/shaders';
import { COUNTRY_POLYGONS } from '../../data/countryPolygons';

const EARTH_R = 2;

/**
 * Generate high-resolution 2048x1024 vector equirectangular Earth texture
 * with country borders and dynamic polygon highlighting.
 */
function createVectorEarthCanvas(selectedCountryId, hoveredCountryId) {
  const width = 2048;
  const height = 1024;
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');

  // 1. Deep Space Navy Ocean
  const oceanGradient = ctx.createLinearGradient(0, 0, 0, height);
  oceanGradient.addColorStop(0, '#020617');   // Polar dark
  oceanGradient.addColorStop(0.2, '#040d21'); // Deep navy
  oceanGradient.addColorStop(0.5, '#051329'); // Equatorial navy
  oceanGradient.addColorStop(0.8, '#040d21');
  oceanGradient.addColorStop(1, '#020617');
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, width, height);

  // Subtle longitude & latitude grid lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
  ctx.lineWidth = 1;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // 2. Realistic Dark Landmass Base Shapes
  const landmasses = [
    // North America
    [
      [-168, 65], [-140, 70], [-100, 72], [-60, 60], [-55, 45], [-65, 43],
      [-75, 35], [-80, 25], [-97, 26], [-105, 20], [-90, 15], [-77, 8],
      [-82, 9], [-95, 17], [-105, 22], [-117, 32], [-124, 48], [-140, 60],
      [-165, 65]
    ],
    // South America
    [
      [-75, 12], [-60, 10], [-50, 0], [-35, -5], [-37, -13], [-41, -22],
      [-53, -33], [-65, -55], [-75, -50], [-73, -40], [-70, -20], [-80, -4],
      [-77, 8], [-75, 12]
    ],
    // Europe & Asia (Eurasia)
    [
      [-10, 36], [0, 44], [-4, 48], [8, 55], [12, 58], [25, 71], [40, 68],
      [70, 73], [100, 77], [130, 74], [170, 67], [170, 60], [140, 50],
      [130, 42], [120, 35], [122, 28], [108, 20], [105, 10], [100, 2],
      [98, 10], [92, 22], [88, 22], [80, 10], [77, 8], [70, 22], [65, 25],
      [60, 24], [55, 26], [45, 13], [35, 30], [26, 40], [15, 40], [0, 37],
      [-10, 36]
    ],
    // Africa
    [
      [-17, 33], [10, 37], [32, 31], [43, 12], [51, 12], [40, -5], [35, -25],
      [28, -34], [18, -34], [12, -15], [9, 4], [-15, 11], [-17, 33]
    ],
    // Australia
    [
      [114, -22], [128, -15], [136, -12], [142, -10], [153, -28], [150, -37],
      [140, -38], [130, -32], [115, -34], [113, -26], [114, -22]
    ]
  ];

  ctx.fillStyle = '#0a1628'; // Dark high-tech landmass
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.5;

  landmasses.forEach((poly) => {
    ctx.beginPath();
    poly.forEach(([lon, lat], i) => {
      const x = ((lon + 180) / 360) * width;
      const y = ((90 - lat) / 180) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  });

  // 3. Render ALL Vector Country Boundaries (Image 1 style crisp cyan/blue neon outlines)
  Object.keys(COUNTRY_POLYGONS).forEach((key) => {
    const country = COUNTRY_POLYGONS[key];
    const isSelected = selectedCountryId === country.id || selectedCountryId === country.name?.toLowerCase();
    const isHovered = hoveredCountryId === country.id;

    if (country.polygon && country.polygon.length > 2) {
      ctx.beginPath();
      country.polygon.forEach(([lon, lat], i) => {
        const x = ((lon + 180) / 360) * width;
        const y = ((90 - lat) / 180) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();

      // IF SELECTED (like India in Image 2) -> FILL WITH GLOWING VIOLET/PURPLE
      if (isSelected || isHovered) {
        // Glowing purple fill
        ctx.fillStyle = isSelected ? 'rgba(192, 132, 252, 0.75)' : 'rgba(168, 85, 247, 0.45)';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = isSelected ? 25 : 12;
        ctx.fill();

        // Bright neon purple border
        ctx.strokeStyle = '#f3e8ff';
        ctx.lineWidth = isSelected ? 3.5 : 2.5;
        ctx.stroke();

        ctx.shadowBlur = 0; // reset
      } else {
        // Normal country border (cyan/blue neon outline like Image 1)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
    }
  });

  // 4. Subtle City Night Lights
  const cityClusters = [
    [77.2, 28.6], [72.8, 19.0], [88.3, 22.5], [80.2, 13.0], // India
    [-74.0, 40.7], [-118.2, 34.0], [-87.6, 41.8], [-95.3, 29.7], // USA
    [116.4, 39.9], [121.4, 31.2], [113.2, 23.1], // China
    [-0.1, 51.5], [2.3, 48.8], [13.4, 52.5], [12.5, 41.9], // Europe
    [139.7, 35.6], [126.9, 37.5], // Tokyo, Seoul
    [-46.6, -23.5], [-43.1, -22.9], // Brazil
    [151.2, -33.8], [144.9, -37.8], // Australia
    [31.2, 30.0], [28.0, -26.2], // Cairo, Jo'burg
  ];

  cityClusters.forEach(([lon, lat]) => {
    const x = ((lon + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;

    const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
    g.addColorStop(0, 'rgba(255, 235, 150, 0.9)');
    g.addColorStop(0.4, 'rgba(56, 189, 248, 0.5)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Polar Ice Caps
  const nIce = ctx.createLinearGradient(0, 0, 0, height * 0.08);
  nIce.addColorStop(0, 'rgba(186, 230, 253, 0.7)');
  nIce.addColorStop(1, 'transparent');
  ctx.fillStyle = nIce;
  ctx.fillRect(0, 0, width, height * 0.08);

  const sIce = ctx.createLinearGradient(0, height * 0.92, 0, height);
  sIce.addColorStop(0, 'transparent');
  sIce.addColorStop(1, 'rgba(186, 230, 253, 0.7)');
  ctx.fillStyle = sIce;
  ctx.fillRect(0, height * 0.92, width, height * 0.08);

  return new THREE.CanvasTexture(c);
}

/** Inner Atmosphere Layer */
function AtmosphereInner() {
  const uniforms = useMemo(() => ({
    uAtmosphereColor: { value: new THREE.Color(0.15, 0.45, 0.95) },
    uIntensity: { value: 1.8 },
  }), []);

  return (
    <mesh scale={[1.025, 1.025, 1.025]}>
      <sphereGeometry args={[EARTH_R, 64, 64]} />
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

/** Outer Atmosphere Halo */
function AtmosphereOuter() {
  const uniforms = useMemo(() => ({
    uAtmosphereColor: { value: new THREE.Color(0.08, 0.35, 0.85) },
    uIntensity: { value: 1.4 },
  }), []);

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[EARTH_R, 48, 48]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function DigitalEarth({
  autoRotate = false,
  rotYRef,
  selectedCountry,
  hoveredCountry,
}) {
  const earthMeshRef = useRef();

  const selectedId = selectedCountry?.id || (typeof selectedCountry === 'string' ? selectedCountry.toLowerCase() : null);
  const hoveredId = hoveredCountry?.id || (typeof hoveredCountry === 'string' ? hoveredCountry.toLowerCase() : null);

  // Dynamic texture that updates when country selection changes (triggering polygon purple fill like Image 2!)
  const vectorTexture = useMemo(() => {
    return createVectorEarthCanvas(selectedId, hoveredId);
  }, [selectedId, hoveredId]);

  useFrame(({ clock }) => {
    if (autoRotate && earthMeshRef.current) {
      earthMeshRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      if (rotYRef) rotYRef.current = earthMeshRef.current.rotation.y;
    }
  });

  return (
    <group ref={earthMeshRef}>
      {/* Main Vector Earth Sphere */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[EARTH_R, 64, 64]} />
        <meshStandardMaterial
          map={vectorTexture}
          roughness={0.4}
          metalness={0.2}
          emissive="#0284c7"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Atmospheric Glow Shaders */}
      <AtmosphereInner />
      <AtmosphereOuter />
    </group>
  );
}
