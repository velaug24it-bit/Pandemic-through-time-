/**
 * DigitalEarth.jsx
 * Photorealistic NASA Satellite Vector Earth matching Image 1 and Image 2.
 * Features:
 *  - Real NASA High-Resolution Satellite Surface Texture (/textures/earth_atmos_2048.jpg)
 *  - Real Country Boundaries generated from Natural Earth GeoJSON (/data/countries.geojson)
 *  - Dynamic Country Polygonal Highlight: When a country (e.g. India) is selected or hovered,
 *    its exact GeoJSON polygon is rendered in glowing violet/purple (#c084fc / #a855f7) with neon edges (Image 2)
 *  - Realistic Cloud Layer (/textures/earth_clouds.png) and subtle atmospheric rim glow
 */
import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { atmosphereVertexShader, atmosphereFragmentShader } from '../../utils/shaders';

const EARTH_R = 2.0;

// Convert [lon, lat] coordinate to 3D Cartesian Vector on a sphere of radius R
function geoToVec3(lon, lat, radius = EARTH_R) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
     (radius * Math.cos(phi)),
     (radius * Math.sin(phi) * Math.sin(theta))
  );
}

/** Inner & Outer Atmospheric Halos */
function AtmosphereInner() {
  const uniforms = useMemo(() => ({
    uAtmosphereColor: { value: new THREE.Color(0.12, 0.45, 0.95) },
    uIntensity: { value: 1.6 },
  }), []);

  return (
    <mesh scale={[1.02, 1.02, 1.02]}>
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

function AtmosphereOuter() {
  const uniforms = useMemo(() => ({
    uAtmosphereColor: { value: new THREE.Color(0.06, 0.3, 0.85) },
    uIntensity: { value: 1.3 },
  }), []);

  return (
    <mesh scale={[1.1, 1.1, 1.1]}>
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

/** Realistic Cloud Layer */
function CloudLayer() {
  const cloudRef = useRef();
  const [cloudTexture, setCloudTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/textures/earth_clouds.png', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      setCloudTexture(tex);
    });
  }, []);

  useFrame(() => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0003;
    }
  });

  if (!cloudTexture) return null;

  return (
    <mesh ref={cloudRef} scale={[1.008, 1.008, 1.008]}>
      <sphereGeometry args={[EARTH_R, 64, 64]} />
      <meshStandardMaterial
        map={cloudTexture}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** 3D Vector Country Boundaries and Dynamic Polygonal Highlight */
function CountryBordersLayer({ selectedCountry, hoveredCountry, onFeaturesLoaded }) {
  const [features, setFeatures] = useState([]);
  const [borderGeometry, setBorderGeometry] = useState(null);

  // Load world countries GeoJSON
  useEffect(() => {
    fetch('/data/countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.features) {
          setFeatures(data.features);
          onFeaturesLoaded?.(data.features);

          // Build LineSegments for all world country borders
          const points = [];
          const r = EARTH_R + 0.003;

          data.features.forEach((feat) => {
            const { type, coordinates } = feat.geometry;
            const processRing = (ring) => {
              for (let i = 0; i < ring.length - 1; i++) {
                const p1 = geoToVec3(ring[i][0], ring[i][1], r);
                const p2 = geoToVec3(ring[i + 1][0], ring[i + 1][1], r);
                points.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
              }
            };

            if (type === 'Polygon') {
              coordinates.forEach(processRing);
            } else if (type === 'MultiPolygon') {
              coordinates.forEach((poly) => poly.forEach(processRing));
            }
          });

          const geom = new THREE.BufferGeometry();
          geom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
          setBorderGeometry(geom);
        }
      })
      .catch((err) => console.error('Error loading world GeoJSON:', err));
  }, [onFeaturesLoaded]);

  // Find the GeoJSON feature for selected or hovered country
  const targetFeature = useMemo(() => {
    const targetName = selectedCountry?.name?.toLowerCase() || hoveredCountry?.name?.toLowerCase();
    const targetId = selectedCountry?.id?.toLowerCase() || hoveredCountry?.id?.toLowerCase();
    if (!targetName && !targetId) return null;

    return features.find((f) => {
      const name = f.properties.NAME?.toLowerCase() || f.properties.ADMIN?.toLowerCase() || '';
      const iso = f.properties.ISO_A3?.toLowerCase() || '';
      const iso2 = f.properties.ISO_A2?.toLowerCase() || '';
      return (
        name.includes(targetName) ||
        targetName.includes(name) ||
        iso === targetId ||
        iso2 === targetId ||
        (targetId === 'usa' && (name.includes('united states') || iso === 'usa')) ||
        (targetId === 'ind' && (name.includes('india') || iso === 'ind'))
      );
    });
  }, [features, selectedCountry, hoveredCountry]);

  // Build filled polygonal surface mesh for the selected country (like India in Image 2)
  const highlightedMeshGeometry = useMemo(() => {
    if (!targetFeature) return null;

    const r = EARTH_R + 0.005;
    const { type, coordinates } = targetFeature.geometry;
    const vertices = [];
    const indices = [];

    const buildPolygonTris = (ring) => {
      if (ring.length < 3) return;

      // Center point of polygon
      let avgLon = 0, avgLat = 0;
      ring.forEach(([lon, lat]) => {
        avgLon += lon;
        avgLat += lat;
      });
      avgLon /= ring.length;
      avgLat /= ring.length;

      const centerVec = geoToVec3(avgLon, avgLat, r);
      const startIndex = vertices.length / 3;
      vertices.push(centerVec.x, centerVec.y, centerVec.z);

      // Ring vertices
      for (let i = 0; i < ring.length; i++) {
        const v = geoToVec3(ring[i][0], ring[i][1], r);
        vertices.push(v.x, v.y, v.z);
      }

      // Fan triangles from center to ring
      for (let i = 0; i < ring.length - 1; i++) {
        indices.push(startIndex, startIndex + 1 + i, startIndex + 2 + i);
      }
    };

    if (type === 'Polygon') {
      coordinates.forEach(buildPolygonTris);
    } else if (type === 'MultiPolygon') {
      coordinates.forEach((poly) => poly.forEach(buildPolygonTris));
    }

    if (vertices.length === 0) return null;

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [targetFeature]);

  return (
    <group>
      {/* 1. All World Country Vector Outlines (Image 1 style crisp cyan borders) */}
      {borderGeometry && (
        <lineSegments geometry={borderGeometry}>
          <lineBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.7}
            linewidth={1.5}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* 2. Highlighted Country Polygon Mesh (Image 2 style glowing filled purple polygon!) */}
      {highlightedMeshGeometry && (
        <mesh geometry={highlightedMeshGeometry}>
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.85}
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

export default function DigitalEarth({
  autoRotate = false,
  rotYRef,
  selectedCountry,
  hoveredCountry,
  onFeaturesLoaded,
}) {
  const earthMeshRef = useRef();
  const [earthTexture, setEarthTexture] = useState(null);

  // Load authentic NASA satellite Earth texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/textures/earth_atmos_2048.jpg', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      setEarthTexture(tex);
    });
  }, []);

  useFrame(({ clock }) => {
    if (autoRotate && earthMeshRef.current) {
      earthMeshRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      if (rotYRef) rotYRef.current = earthMeshRef.current.rotation.y;
    }
  });

  return (
    <group ref={earthMeshRef}>
      {/* Real NASA Satellite Earth Sphere */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[EARTH_R, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.65}
          metalness={0.15}
          emissive="#03122b"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Real Vector Country Outlines & Dynamic Purple Polygon Fill */}
      <CountryBordersLayer
        selectedCountry={selectedCountry}
        hoveredCountry={hoveredCountry}
        onFeaturesLoaded={onFeaturesLoaded}
      />

      {/* Atmospheric Cloud Layer */}
      <CloudLayer />

      {/* Atmospheric Halos */}
      <AtmosphereInner />
      <AtmosphereOuter />
    </group>
  );
}
