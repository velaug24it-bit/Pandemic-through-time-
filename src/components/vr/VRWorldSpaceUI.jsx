/**
 * VRWorldSpaceUI.jsx
 * World-Space 3D Floating VR Panel & VR Accessibility Comfort Controller for Phase 10.
 * Features:
 *  - 3D Floating Menu Panel in VR space
 *  - Seated / Standing Mode toggle
 *  - Snap / Smooth Turn toggle
 *  - Dominant Hand & Movement Speed adjustment
 */
import { useState } from 'react';
import { Html } from '@react-three/drei';

export default function VRWorldSpaceUI({ position = [0, 1.6, -2], onNavigatePhase }) {
  const [seatedMode, setSeatedMode]       = useState(false);
  const [snapTurn, setSnapTurn]           = useState(true);
  const [dominantHand, setDominantHand]   = useState('right');

  return (
    <group position={position}>
      {/* 3D Glass Panel Frame */}
      <mesh>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial color="#020a18" transparent opacity={0.85} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.25, 1.45]} />
        <meshBasicMaterial color="#00c8ff" transparent opacity={0.4} />
      </mesh>

      {/* HTML Overlay Panel inside 3D VR space */}
      <Html center transform distanceFactor={3} style={{ pointerEvents: 'all' }}>
        <div style={{
          width: 320, padding: '1rem', background: 'rgba(2,10,25,0.95)',
          border: '1px solid #00c8ff', borderRadius: 12, color: '#fff',
          fontFamily: 'var(--font-mono)', textAlign: 'center',
          boxShadow: '0 0 30px rgba(0,200,255,0.3)',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#00c8ff', letterSpacing: '0.2em', marginBottom: 6 }}>
            🥽 VR CONTROL & COMFORT CENTER
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem', marginBottom: '0.8rem' }}>
            <button
              onClick={() => setSeatedMode(m => !m)}
              style={{
                padding: '0.35rem', borderRadius: 6,
                background: seatedMode ? 'rgba(0,255,157,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${seatedMode ? '#00ff9d' : 'rgba(255,255,255,0.1)'}`,
                color: '#fff', fontSize: '0.48rem', cursor: 'pointer',
              }}
            >
              {seatedMode ? '🪑 SEATED MODE' : '🧍 STANDING'}
            </button>

            <button
              onClick={() => setSnapTurn(s => !s)}
              style={{
                padding: '0.35rem', borderRadius: 6,
                background: snapTurn ? 'rgba(123,47,247,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${snapTurn ? '#7b2ff7' : 'rgba(255,255,255,0.1)'}`,
                color: '#fff', fontSize: '0.48rem', cursor: 'pointer',
              }}
            >
              {snapTurn ? '⚡ SNAP TURN (45°)' : '🔄 SMOOTH TURN'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
            <button
              onClick={() => setDominantHand(h => h === 'right' ? 'left' : 'right')}
              style={{
                flex: 1, padding: '0.35rem', borderRadius: 6,
                background: 'rgba(0,200,255,0.15)', border: '1px solid #00c8ff',
                color: '#00c8ff', fontSize: '0.48rem', cursor: 'pointer',
              }}
            >
              ✋ HAND: {dominantHand.toUpperCase()}
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
