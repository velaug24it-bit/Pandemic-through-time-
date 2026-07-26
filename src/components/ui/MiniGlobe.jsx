/**
 * MiniGlobe.jsx
 * Small holographic mini-globe that shows the current hemisphere being viewed.
 * Rotates in sync with the main Earth.
 */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MiniEarth({ rotY }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y = rotY.current;
  });

  const texture = useMemo(() => {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0d3a6e';
    ctx.fillRect(0,0,size,size);
    // Simple continents
    ctx.fillStyle = '#2d6a1e';
    [[0.14,0.28,0.08],[0.28,0.60,0.07],[0.50,0.28,0.05],
     [0.52,0.42,0.07],[0.63,0.25,0.09],[0.76,0.28,0.07],[0.79,0.60,0.06]
    ].forEach(([x,y,r]) => {
      ctx.beginPath(); ctx.arc(x*size,y*size,r*size,0,Math.PI*2); ctx.fill();
    });
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial map={texture} emissive={new THREE.Color(0,0.05,0.1)} emissiveIntensity={0.3} />
    </mesh>
  );
}

function MiniAtmo() {
  return (
    <mesh scale={[1.08, 1.08, 1.08]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#0044aa" transparent opacity={0.12} side={THREE.BackSide} />
    </mesh>
  );
}

export default function MiniGlobe({ rotYRef }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 90, right: 16,
      zIndex: 600,
      width: 100, height: 100,
      borderRadius: '50%',
      overflow: 'hidden',
      border: '1px solid rgba(0,200,255,0.3)',
      boxShadow: '0 0 20px rgba(0,100,200,0.3), inset 0 0 20px rgba(0,0,40,0.6)',
      background: 'rgba(0,4,16,0.7)',
    }}>
      <Canvas camera={{ position: [0,0,2.5], fov: 50 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3,2,3]} intensity={1.2} color="#fff5e0" />
        <pointLight color="#0044ff" intensity={0.5} distance={5} />
        <MiniEarth rotY={rotYRef || { current: 0 }} />
        <MiniAtmo />
      </Canvas>
      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 4, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: 'var(--font-mono)', fontSize: '0.38rem',
        color: 'rgba(0,200,255,0.5)', letterSpacing: '0.08em',
        pointerEvents: 'none',
      }}>
        MINI-MAP
      </div>
    </div>
  );
}
