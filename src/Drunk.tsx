import { forwardRef } from 'react';
import { BlendFunction } from 'postprocessing';
import DrunkEffect from './DrunkEffect';

export interface DrunkProps {
  frequency: number;
  amplitude: number;
  blendFunction: BlendFunction;
}

export default forwardRef(function Drunk(props: DrunkProps, ref) {
  const effect = new DrunkEffect(props);

  return <primitive ref={ref} object={effect} />;
});
