/**
 * VRSpatialAudio.jsx
 * Positional Spatial 3D Audio Emitter Component for Phase 10.
 * Attaches a THREE.AudioListener to the VR camera and creates 3D sound emitters.
 */
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function VRSpatialAudio({ position = [0, 0, 0], refDistance = 2, maxDistance = 15 }) {
  const { camera } = useThree();
  const soundRef  = useRef(null);

  useEffect(() => {
    if (!camera) return;

    // Attach AudioListener to VR Camera if not already present
    let listener = camera.children.find(c => c instanceof THREE.AudioListener);
    if (!listener) {
      listener = new THREE.AudioListener();
      camera.add(listener);
    }

    const sound = new THREE.PositionalAudio(listener);
    sound.setRefDistance(refDistance);
    sound.setMaxDistance(maxDistance);
    soundRef.current = sound;

    return () => {
      if (sound.isPlaying) sound.stop();
    };
  }, [camera, refDistance, maxDistance]);

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}
