// import { OrbitControls } from '@react-three/drei';
import {
  // Debug,
  Physics,
} from '@react-three/rapier';
import Effects from './Effects';
import { Level } from './Level';
import Lights from './Lights';
import Player from './Player';
import { useGame } from './stores/useGame';

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={['#252731']} attach="background" />
      {/* <OrbitControls makeDefault /> */}

      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>

      <Effects />
    </>
  );
}
