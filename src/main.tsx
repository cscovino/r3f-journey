import { Canvas } from '@react-three/fiber';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ACESFilmicToneMapping, sRGBEncoding } from 'three';

import Experience from './Experience';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas
      flat
      dpr={[1, 2]}
      gl={{ antialias: true, toneMapping: ACESFilmicToneMapping, outputEncoding: sRGBEncoding }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
    >
      <Experience />
    </Canvas>
  </React.StrictMode>,
);
