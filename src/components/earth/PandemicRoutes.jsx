/**
 * PandemicRoutes.jsx
 * Animated disease transmission route arcs between cities.
 * Renders:
 *  - Air routes (blue arcs with animated dashes)
 *  - Sea routes (cyan wider arcs)
 *  - Spread routes (red animated particle flows)
 *  - Particle dots traveling along each arc
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  AIR_ROUTES, SEA_ROUTES, SPREAD_ROUTES,
  buildArcPoints,
} from '../../data/pandemicRoutes';

/** Single animated arc line */
function AnimatedArc({ fromKey, toKey, color, type, speed = 0.5 }) {
  const lineRef     = useRef();
  const particleRef = useRef();
  const progressRef = useRef(Math.random()); // stagger start

  const arcHeight = type === 'sea' ? 0.25 : type === 'spread' ? 0.5 : 0.38;
  const points    = useMemo(
    () => buildArcPoints(fromKey, toKey, 2.06, 60, arcHeight),
    [fromKey, toKey, arcHeight]
  );

  const geometry = useMemo(() => {
    if (!points.length) return null;
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints(points.map(([x,y,z]) => new THREE.Vector3(x,y,z)));
    return geo;
  }, [points]);

  // Particle geometry (single traveling dot)
  const particleGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    progressRef.current = (progressRef.current + speed * 0.003) % 1;
    const p = progressRef.current;

    if (particleRef.current && points.length) {
      const idx  = Math.min(Math.floor(p * (points.length - 1)), points.length - 2);
      const frac = p * (points.length - 1) - idx;
      const [ax,ay,az] = points[idx];
      const [bx,by,bz] = points[idx+1];
      const arr = particleRef.current.geometry.attributes.position.array;
      arr[0] = ax + (bx-ax)*frac;
      arr[1] = ay + (by-ay)*frac;
      arr[2] = az + (bz-az)*frac;
      particleRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Pulse line opacity
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.2 + Math.abs(Math.sin(t * 0.8 + progressRef.current * Math.PI)) * 0.35;
    }
  });

  if (!geometry) return null;

  const opacity  = type === 'spread' ? 0.5 : 0.35;
  const lineWidth = type === 'sea' ? 1.5 : 1;

  return (
    <group>
      {/* Arc line */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={lineWidth} />
      </line>

      {/* Traveling particle */}
      <points ref={particleRef} geometry={particleGeo}>
        <pointsMaterial
          color={color}
          size={type === 'spread' ? 0.06 : 0.04}
          sizeAttenuation
          transparent opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function PandemicRoutes({ showAir = true, showSea = true, showSpread = true }) {
  return (
    <group>
      {showAir && AIR_ROUTES.map((r, i) => (
        <AnimatedArc key={`air-${i}`} {...r} speed={0.5} />
      ))}
      {showSea && SEA_ROUTES.map((r, i) => (
        <AnimatedArc key={`sea-${i}`} {...r} speed={0.3} />
      ))}
      {showSpread && SPREAD_ROUTES.map((r, i) => (
        <AnimatedArc key={`spread-${i}`} {...r} type="spread" />
      ))}
    </group>
  );
}
