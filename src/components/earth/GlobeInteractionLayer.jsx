/**
 * GlobeInteractionLayer.jsx
 * Precision 3D surface raycasting & touch interaction layer.
 * Allows users to touch/click or hover anywhere on the 3D Earth surface,
 * converting 3D intersection coordinates into latitude/longitude,
 * and selecting/highlighting the exact country underneath.
 */
import { useRef, useCallback, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { findCountryAtLatLon } from '../../data/countryPolygons';

const EARTH_R = 2.01;

export default function GlobeInteractionLayer({ onCountryHover, onCountryClick, selectedCountry }) {
  const meshRef = useRef();
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState([0, 0, 0]);

  // Convert 3D intersection point on sphere to latitude and longitude
  const getLatLonFromPoint = useCallback((worldPoint, mesh) => {
    // Transform point to mesh local coordinate space (handling Earth rotation)
    const localPoint = mesh.worldToLocal(worldPoint.clone()).normalize();

    // phi = angle from +Y (North pole), theta = angle around Y in X-Z plane
    const lat = 90 - Math.acos(Math.max(-1, Math.min(1, localPoint.y))) * (180 / Math.PI);
    let lon = Math.atan2(localPoint.z, -localPoint.x) * (180 / Math.PI) - 180;
    while (lon < -180) lon += 360;
    while (lon > 180) lon -= 360;

    return { lat, lon };
  }, []);

  const handlePointerMove = useCallback((e) => {
    e.stopPropagation();
    if (!meshRef.current) return;

    const { lat, lon } = getLatLonFromPoint(e.point, meshRef.current);
    const country = findCountryAtLatLon(lat, lon);

    if (country) {
      setHoveredCountry(country);
      setTooltipPos([e.point.x, e.point.y + 0.15, e.point.z]);
      onCountryHover?.(country);
      document.body.style.cursor = 'pointer';
    } else {
      setHoveredCountry(null);
      onCountryHover?.(null);
      document.body.style.cursor = 'default';
    }
  }, [getLatLonFromPoint, onCountryHover]);

  const handlePointerOut = useCallback(() => {
    setHoveredCountry(null);
    onCountryHover?.(null);
    document.body.style.cursor = 'default';
  }, [onCountryHover]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (!meshRef.current) return;

    const { lat, lon } = getLatLonFromPoint(e.point, meshRef.current);
    const country = findCountryAtLatLon(lat, lon);

    if (country) {
      onCountryClick?.(country);
    }
  }, [getLatLonFromPoint, onCountryClick]);

  return (
    <group>
      {/* Invisible raycasting sphere surface */}
      <mesh
        ref={meshRef}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[EARTH_R, 64, 64]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Floating 3D Tooltip when hovering over a country */}
      {hoveredCountry && (
        <Html position={tooltipPos} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(2, 6, 23, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid #c084fc',
            borderRadius: 8,
            padding: '0.4rem 0.75rem',
            color: '#ffffff',
            boxShadow: '0 0 20px rgba(192, 132, 252, 0.4)',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <span>{hoveredCountry.emoji}</span>
            <span style={{ color: '#f3e8ff' }}>{hoveredCountry.name}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.45rem',
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.15)',
              padding: '0.1rem 0.35rem',
              borderRadius: 4,
            }}>
              CLICK TO FOCUS
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
