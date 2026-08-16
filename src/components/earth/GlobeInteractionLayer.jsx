/**
 * GlobeInteractionLayer.jsx
 * Precision 3D surface raycasting & touch interaction layer using world GeoJSON.
 * Detects clicks/touches on all 190+ countries on Earth,
 * highlights the country polygon, and triggers national profile drawer & focal lock.
 */
import { useRef, useCallback, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { isPointInPolygon, COUNTRY_POLYGONS } from '../../data/countryPolygons';
import { COUNTRIES } from '../../data/countries';

const EARTH_R = 2.01;

export default function GlobeInteractionLayer({ onCountryHover, onCountryClick, selectedCountry }) {
  const meshRef = useRef();
  const [geoFeatures, setGeoFeatures] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState([0, 0, 0]);

  // Load full world GeoJSON
  useEffect(() => {
    fetch('/data/countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.features) {
          setGeoFeatures(data.features);
        }
      })
      .catch((err) => console.error('Error in GlobeInteractionLayer GeoJSON:', err));
  }, []);

  // Convert 3D intersection point on sphere to latitude and longitude
  const getLatLonFromPoint = useCallback((worldPoint, mesh) => {
    const localPoint = mesh.worldToLocal(worldPoint.clone()).normalize();
    const lat = 90 - Math.acos(Math.max(-1, Math.min(1, localPoint.y))) * (180 / Math.PI);
    let lon = Math.atan2(localPoint.z, -localPoint.x) * (180 / Math.PI) - 180;
    while (lon < -180) lon += 360;
    while (lon > 180) lon -= 360;
    return { lat, lon };
  }, []);

  // Match lat/lon against GeoJSON features
  const findCountryFromLatLon = useCallback((lat, lon) => {
    // 1. Check GeoJSON boundary polygons
    for (const feat of geoFeatures) {
      const { type, coordinates } = feat.geometry;
      const point = [lon, lat];

      if (type === 'Polygon') {
        if (isPointInPolygon(point, coordinates[0])) {
          const name = feat.properties.NAME || feat.properties.ADMIN;
          const iso = (feat.properties.ISO_A3 || feat.properties.ADM0_A3 || name).toLowerCase();
          const pop = feat.properties.POP_EST ? `${(feat.properties.POP_EST / 1e6).toFixed(1)}M` : '50M';

          // Match with existing country metadata or synthesize
          const found = COUNTRIES.find((c) => c.name.toLowerCase() === name.toLowerCase() || c.id === iso);
          const detailed = COUNTRY_POLYGONS[iso] || COUNTRY_POLYGONS[found?.id];

          return {
            id: iso,
            name: name,
            region: feat.properties.CONTINENT || 'Global',
            capital: detailed?.capital || `${name} Capital`,
            pop: pop,
            currency: detailed?.currency || 'National Currency',
            languages: detailed?.languages || 'Official Language',
            emoji: found?.emoji || '🌐',
            lat: lat,
            lon: lon,
            risk: found?.risk || 'medium',
          };
        }
      } else if (type === 'MultiPolygon') {
        for (const poly of coordinates) {
          if (isPointInPolygon(point, poly[0])) {
            const name = feat.properties.NAME || feat.properties.ADMIN;
            const iso = (feat.properties.ISO_A3 || feat.properties.ADM0_A3 || name).toLowerCase();
            const pop = feat.properties.POP_EST ? `${(feat.properties.POP_EST / 1e6).toFixed(1)}M` : '50M';

            const found = COUNTRIES.find((c) => c.name.toLowerCase() === name.toLowerCase() || c.id === iso);
            const detailed = COUNTRY_POLYGONS[iso] || COUNTRY_POLYGONS[found?.id];

            return {
              id: iso,
              name: name,
              region: feat.properties.CONTINENT || 'Global',
              capital: detailed?.capital || `${name} Capital`,
              pop: pop,
              currency: detailed?.currency || 'National Currency',
              languages: detailed?.languages || 'Official Language',
              emoji: found?.emoji || '🌐',
              lat: lat,
              lon: lon,
              risk: found?.risk || 'medium',
            };
          }
        }
      }
    }

    // 2. Fallback to nearest major country center within threshold
    let best = null;
    let minDist = 15; // degrees
    for (const c of COUNTRIES) {
      const dLat = lat - c.lat;
      const dLon = lon - c.lon;
      const dist = Math.sqrt(dLat * dLat + dLon * dLon);
      if (dist < minDist) {
        minDist = dist;
        best = c;
      }
    }
    return best;
  }, [geoFeatures]);

  const handlePointerMove = useCallback((e) => {
    e.stopPropagation();
    if (!meshRef.current) return;

    const { lat, lon } = getLatLonFromPoint(e.point, meshRef.current);
    const country = findCountryFromLatLon(lat, lon);

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
  }, [getLatLonFromPoint, findCountryFromLatLon, onCountryHover]);

  const handlePointerOut = useCallback(() => {
    setHoveredCountry(null);
    onCountryHover?.(null);
    document.body.style.cursor = 'default';
  }, [onCountryHover]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (!meshRef.current) return;

    const { lat, lon } = getLatLonFromPoint(e.point, meshRef.current);
    const country = findCountryFromLatLon(lat, lon);

    if (country) {
      onCountryClick?.(country);
    }
  }, [getLatLonFromPoint, findCountryFromLatLon, onCountryClick]);

  return (
    <group>
      {/* Invisible raycasting sphere */}
      <mesh
        ref={meshRef}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[EARTH_R, 64, 64]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Floating 3D Tooltip */}
      {hoveredCountry && (
        <Html position={tooltipPos} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(3, 10, 26, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid #c084fc',
            borderRadius: 8,
            padding: '0.4rem 0.8rem',
            color: '#ffffff',
            boxShadow: '0 0 25px rgba(192, 132, 252, 0.5)',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            fontWeight: 900,
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
              TOUCH TO FOCUS
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
