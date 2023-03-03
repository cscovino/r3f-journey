import { Canvas } from '@react-three/fiber';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Color } from 'three';
import Experience from './Experience';
import './index.css';

// function onCreated({ scene }: RootState) {
//   // gl.setClearColor('#ff0000', 1);
//   scene.background = new Color('#ff0000');
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas
      shadows
      gl={{ antialias: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      // onCreated={onCreated}
    >
      <Experience />
    </Canvas>
  </React.StrictMode>,
);
