/**
 * CommBeams.jsx
 * Animated data transmission beams from satellites to ground stations.
 * Uses thin line geometry + opacity pulse for laser-like effect.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SATELLITES } from '../../data/satelliteConfig';
import { GROUND_STATIONS } from '../../data/satelliteConfig';
import { latLonToVec3 } from '../../data/countries';

const EARTH_R = 2;

function CommBeam({ satIndex, stationIndex, color }) {
  const lineRef  = useRef();
  const phaseRef = useRef(Math.random() * Math.PI * 2);

  // Satellite position reference (updated each frame by SatelliteNetwork)
  const satPosRef = useRef(new THREE.Vector3());

  const stationPos = useMemo(() => {
    const gs = GROUND_STATIONS[stationIndex];
    if (!gs) return new THREE.Vector3();
    const [x,y,z] = latLonToVec3(gs.lat, gs.lon, EARTH_R);
    return new THREE.Vector3(x,y,z);
  }, [stationIndex]);

  const sat = SATELLITES[satIndex];

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t   = clock.getElapsedTime() * sat.speed + sat.offset;
    const euler = new THREE.Euler(sat.tiltX, 0, sat.tiltZ);
    const quat  = new THREE.Quaternion().setFromEuler(euler);
    const satPos = new THREE.Vector3(Math.cos(t)*sat.radius, 0, Math.sin(t)*sat.radius);
    satPos.applyQuaternion(quat);

    if (lineRef.current) {
      const arr = lineRef.current.geometry.attributes.position.array;
      arr[0] = satPos.x; arr[1] = satPos.y; arr[2] = satPos.z;
      arr[3] = stationPos.x; arr[4] = stationPos.y; arr[5] = stationPos.z;
      lineRef.current.geometry.attributes.position.needsUpdate = true;

      // Pulse
      const op = (Math.sin(clock.getElapsedTime() * 3 + phaseRef.current) + 1) * 0.5;
      lineRef.current.material.opacity = op * 0.25;
    }
  });

  return (
    <line ref={lineRef} geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  );
}

export default function CommBeams({ visible = true }) {
  if (!visible) return null;

  // Pair each satellite with 1 ground station
  const pairs = SATELLITES.map((sat, i) => ({
    satIndex:     i,
    stationIndex: i % GROUND_STATIONS.length,
    color:        sat.color,
  }));

  return (
    <group>
      {pairs.map(({ satIndex, stationIndex, color }) => (
        <CommBeam
          key={`beam-${satIndex}-${stationIndex}`}
          satIndex={satIndex}
          stationIndex={stationIndex}
          color={color}
        />
      ))}
    </group>
  );
}
