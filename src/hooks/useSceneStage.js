/**
 * useSceneStage.js
 * Hook to drive scene stage transitions with timing.
 * Returns current stage and a setter used across components.
 */
import { useState, useCallback, useRef } from 'react';
import { SCENE_STAGES, DURATIONS } from '../utils/constants';

export function useSceneStage() {
  const [stage, setStage] = useState(SCENE_STAGES.LOADING);
  const timerRef = useRef(null);

  const advanceTo = useCallback((nextStage, delay = 0) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStage(nextStage);
    }, delay);
  }, []);

  /** Auto-advance through the cinematic sequence */
  const startSequence = useCallback((onComplete) => {
    const seq = [
      { stage: SCENE_STAGES.CINEMATIC_INTRO, delay: DURATIONS.loading },
      { stage: SCENE_STAGES.ROCKET_LAUNCH,   delay: DURATIONS.loading + DURATIONS.intro },
      { stage: SCENE_STAGES.SPACE_FLIGHT,    delay: DURATIONS.loading + DURATIONS.intro + DURATIONS.rocketLaunch },
      { stage: SCENE_STAGES.ORBITAL_STATION, delay: DURATIONS.loading + DURATIONS.intro + DURATIONS.rocketLaunch + DURATIONS.spaceFlight },
      { stage: SCENE_STAGES.COMMAND_CENTER,  delay: DURATIONS.loading + DURATIONS.intro + DURATIONS.rocketLaunch + DURATIONS.spaceFlight + DURATIONS.docking },
    ];

    const timers = seq.map(({ stage, delay }) =>
      setTimeout(() => setStage(stage), delay)
    );

    const totalDelay = seq[seq.length - 1].delay + 1000;
    const doneTimer  = setTimeout(() => { onComplete?.(); }, totalDelay);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, []);

  return { stage, setStage, advanceTo, startSequence };
}
