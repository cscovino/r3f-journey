import { useKeyboardControls } from '@react-three/drei';
import { addEffect } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { phase, useGame } from './stores/useGame';

export default function Interface() {
  const time = useRef<HTMLDivElement>(null);

  const restart = useGame((state) => state.restart);
  const phaseState = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime: number | string = 0;
      if (state.phase === phase.PLAYING) elapsedTime = Date.now() - state.startTime;
      else if (state.phase === phase.ENDED) elapsedTime = state.endTime - state.startTime;
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });

    return () => unsubscribeEffect();
  }, []);

  return (
    <div className="interface">
      <div ref={time} className="time">
        0.00
      </div>
      {phaseState === phase.ENDED ? (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      ) : null}
      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? 'active' : ''}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? 'active' : ''}`}></div>
          <div className={`key ${backward ? 'active' : ''}`}></div>
          <div className={`key ${rightward ? 'active' : ''}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}
