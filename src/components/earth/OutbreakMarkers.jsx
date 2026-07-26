/**
 * OutbreakMarkers.jsx
 * Pulsing outbreak hotspot indicators at 12 city positions.
 * Each marker shows:
 *  - Double ring pulse
 *  - Severity color
 *  - Clickable info panel (Html)
 */
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { OUTBREAK_HOTSPOTS, CITIES } from '../../data/pandemicRoutes';
import { latLonToVec3, RISK_COLORS } from '../../data/countries';

const EARTH_R = 2;

function OutbreakMarker({ hotspot, index }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const [open, setOpen] = useState(false);

  const city    = CITIES[hotspot.city];
  if (!city) return null;

  const pos   = useMemo(() => latLonToVec3(city.lat, city.lon, EARTH_R + 0.05), [city]);
  const color = RISK_COLORS[hotspot.severity] || '#ffb700';

  const normalVec = useMemo(() => {
    const v = new THREE.Vector3(...pos);
    return v.normalize();
  }, [pos]);

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normalVec);
    return q;
  }, [normalVec]);

  useFrame(({ clock }) => {
    const t  = clock.getElapsedTime() + index * 0.6;
    const s1 = 1 + ((t * 1.5) % 1) * 2.5;
    const s2 = 1 + (((t * 1.5) + 0.5) % 1) * 2.5;
    const a1 = 1 - ((t * 1.5) % 1);
    const a2 = 1 - (((t * 1.5) + 0.5) % 1);

    if (ring1Ref.current) {
      ring1Ref.current.scale.setScalar(s1);
      ring1Ref.current.material.opacity = a1 * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.scale.setScalar(s2);
      ring2Ref.current.material.opacity = a2 * 0.4;
    }
  });

  return (
    <group position={pos} quaternion={quaternion}>
      {/* Core dot */}
      <mesh onClick={() => setOpen(o => !o)}>
        <circleGeometry args={[0.04, 12]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Pulse ring 1 */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[0.04, 0.06, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Pulse ring 2 (offset) */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.04, 0.055, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Popup */}
      <Html center distanceFactor={7} position={[0, 0, 0.18]} style={{ pointerEvents: open ? 'all' : 'none' }}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'rgba(5,0,15,0.92)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${color}55`,
                borderRadius: 8,
                padding: '0.7rem 0.9rem',
                width: 190,
                boxShadow: `0 0 20px ${color}33`,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: color,
                letterSpacing: '0.2em',
                marginBottom: '0.4rem',
              }}>
                ⚠ OUTBREAK ALERT · {hotspot.severity.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                {city.name}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#cceeff', marginBottom: '0.3rem' }}>
                {hotspot.pathogen}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)' }}>
                REPORTED: {hotspot.reported}
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  marginTop: '0.6rem', background: 'transparent',
                  border: `1px solid ${color}44`, borderRadius: 4,
                  color: color, fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem', padding: '0.2rem 0.5rem',
                  cursor: 'pointer', letterSpacing: '0.1em',
                }}
                id={`btn-close-outbreak-${index}`}
              >
                DISMISS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Html>
    </group>
  );
}

export default function OutbreakMarkers() {
  return (
    <group>
      {OUTBREAK_HOTSPOTS.map((h, i) => (
        <OutbreakMarker key={`${h.city}-${i}`} hotspot={h} index={i} />
      ))}
    </group>
  );
}
