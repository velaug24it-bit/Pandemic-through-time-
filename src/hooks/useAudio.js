/**
 * useAudio.js
 * React hook for managing the procedural audio engine.
 * Initialises on first user interaction and exposes play methods.
 * Enhanced for Phase 6 – Global Outbreak Simulator & WHO Emergency Response Center.
 */
import { useEffect, useRef, useCallback } from 'react';
import { audioEngine } from '../utils/audioEngine';

export function useAudio() {
  const initializedRef = useRef(false);

  /** Bootstrap audio on the first pointer/key event */
  const initAudio = useCallback(() => {
    if (initializedRef.current) return;
    audioEngine.init();
    audioEngine.resume();
    initializedRef.current = true;
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
    return () => {
      window.removeEventListener('pointerdown', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, [initAudio]);

  return {
    initAudio,
    startSpaceAmbience:    () => audioEngine.startSpaceAmbience(),
    stopSpaceAmbience:     () => audioEngine.stopSpaceAmbience(),
    startBloodstreamAudio: () => audioEngine.startBloodstreamAudio(),
    stopBloodstreamAudio:  () => audioEngine.stopBloodstreamAudio(),
    startLabAmbience:      () => audioEngine.startLabAmbience(),
    stopLabAmbience:       () => audioEngine.stopLabAmbience(),
    playEmergencySiren:    () => audioEngine.playEmergencySiren(),
    playSatellitePing:     () => audioEngine.playSatellitePing(),
    playPolicyChime:       () => audioEngine.playPolicyChime(),
    playScanBeep:          () => audioEngine.playScanBeep(),
    playRoboticArmClick:   () => audioEngine.playRoboticArmClick(),
    playCellEntrySound:    () => audioEngine.playCellEntrySound(),
    playImmuneActivation:  () => audioEngine.playImmuneActivation(),
    startComputerHum:      () => audioEngine.startComputerHum(),
    stopComputerHum:       () => audioEngine.stopComputerHum(),
    startRocketEngine:     () => audioEngine.startRocketEngine(),
    stopRocketEngine:      () => audioEngine.stopRocketEngine(),
    playDockingSound:      () => audioEngine.playDockingSound(),
    playAirlockDoor:       () => audioEngine.playAirlockDoor(),
    playPressureRelease:   () => audioEngine.playPressureRelease(),
    playRadioChatter:      () => audioEngine.playRadioChatter(),
    playAIVoice:           () => audioEngine.playAIVoice(),
    playButtonClick:       () => audioEngine.playButtonClick(),
    playWhoosh:            () => audioEngine.playWhoosh(),
    missionBeep:           () => audioEngine.missionBeep(),
    beep:          (f, d, g)  => audioEngine.beep(f, d, g),
    setVolume:     (v)         => audioEngine.setVolume(v),
  };
}
