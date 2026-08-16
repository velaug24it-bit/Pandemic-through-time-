/**
 * CountryMarkers.jsx
 * Interactive country markers positioned on the globe surface.
 * Features:
 *  - 50 country markers as spheres
 *  - Hover: scale up + ring glow + name label
 *  - Click: camera fly-to + emit onCountryClick
 *  - Color coded by pandemic risk
 *  - Animated pulse on critical/high countries
 */
import { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { COUNTRIES, RISK_COLORS, latLonToVec3 } from '../../data/countries';

const EARTH_R = 2;

function PulseRing({ color, risk }) {
  const ringRef = useRef();
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t     = clock.getElapsedTime();
    const pulse = (Math.sin(t * 2.5) * 0.5 + 0.5);
    ringRef.current.scale.setScalar(1 + pulse * (risk === 'critical' ? 0.8 : 0.4));
    ringRef.current.material.opacity = 0.6 - pulse * 0.5;
  });
  return (
    <mesh ref={ringRef}>
      <ringGeometry args={[0.035, 0.05, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CountryMarker({ country, onHover, onClick }) {
  const meshRef   = useRef();
  const [hovered, setHovered] = useState(false);
  const color  = RISK_COLORS[country.risk] || '#00c8ff';
  const pos    = useMemo(() => latLonToVec3(country.lat, country.lon, EARTH_R + 0.04), [country]);
  const posVec = useMemo(() => new THREE.Vector3(...pos), [pos]);

  // Billboard rotation to face outward from globe center
  const normal = useMemo(() => posVec.clone().normalize(), [posVec]);
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return q;
  }, [normal]);

  useFrame(() => {
    if (!meshRef.current) return;
    const target = hovered ? 1.8 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
  });

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    setHovered(true);
    onHover?.(country);
    document.body.style.cursor = 'pointer';
  }, [country, onHover]);

  const handlePointerOut = useCallback((e) => {
    e.stopPropagation();
    setHovered(false);
    onHover?.(null);
    document.body.style.cursor = 'default';
  }, [onHover]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onClick?.(country, posVec);
  }, [country, posVec, onClick]);

  return (
    <group position={pos} quaternion={quaternion}>
      {/* Marker sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.016, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.8 : 0.4}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Vertical light beam when hovered */}
      {hovered && (
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.003, 0.015, 0.7, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      )}

      {/* Pulse ring for high-risk or hovered */}
      {(country.risk === 'critical' || country.risk === 'high' || hovered) && (
        <PulseRing color={color} risk={country.risk} />
      )}

      {/* Hover label */}
      {hovered && (
        <Html
          center
          distanceFactor={8}
          position={[0, 0.12, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(0,8,20,0.9)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${color}55`,
            borderRadius: 6,
            padding: '0.35rem 0.6rem',
            whiteSpace: 'nowrap',
            boxShadow: `0 0 12px ${color}44`,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color, letterSpacing: '0.1em' }}>
              {country.emoji} {country.name}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
              {country.region} · {country.risk.toUpperCase()}
            </div>
          </div>
        </Html>
      )}

      {/* Point glow */}
      <pointLight color={color} intensity={hovered ? 0.8 : 0.15} distance={0.5} />
    </group>
  );
}

export default function CountryMarkers({ onCountryHover, onCountryClick }) {
  const { camera } = useThree();

  const handleClick = useCallback((country, posVec) => {
    // Fly camera toward clicked country
    const dir    = posVec.clone().normalize();
    const camPos = dir.clone().multiplyScalar(5);
    gsap.to(camera.position, {
      x: camPos.x, y: camPos.y, z: camPos.z,
      duration: 1.5, ease: 'power3.inOut',
    });
    onCountryClick?.(country);
  }, [camera, onCountryClick]);

  return (
    <group>
      {COUNTRIES.map((c) => (
        <CountryMarker
          key={c.id}
          country={c}
          onHover={onCountryHover}
          onClick={handleClick}
        />
      ))}
    </group>
  );
}
