import { useFrame } from '@react-three/fiber';
import {
  // AccumulativeShadows,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  Stage,
  // Sky,
  // RandomizedLight,
  useHelper,
  // BakeShadows,
  // SoftShadows,
} from '@react-three/drei';
import { MutableRefObject, useRef } from 'react';
import { Perf } from 'r3f-perf';
import { DirectionalLight, Mesh, DirectionalLightHelper, Object3D } from 'three';
import { useControls } from 'leva';

export default function Experience() {
  const directionalLight = useRef<DirectionalLight>(null);
  const cube = useRef<Mesh>(null);

  const { color, opacity, blur } = useControls('contact shadows', {
    color: '#4b2709',
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  // const { sunPosition } = useControls('sky', {
  //   sunPosition: { value: [1, 2, 3] },
  // });

  const { envMapIntensity, envMapHeight, envMapScale, envMapRadius } = useControls(
    'environment map',
    {
      envMapIntensity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 10 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    },
  );

  useFrame((_, delta) => {
    if (cube.current) {
      // const time = state.clock.elapsedTime;
      // cube.current.position.x = 2 + Math.sin(time);
      cube.current.rotation.y += delta * 0.2;
    }
  });

  useHelper(directionalLight as MutableRefObject<Object3D>, DirectionalLightHelper, 1);

  return (
    <>
      {/* <Environment */}
      {/*   // background */}
      {/*   preset="sunset" */}
      {/*   ground={{ */}
      {/*     height: envMapHeight, */}
      {/*     radius: envMapRadius, */}
      {/*     scale: envMapScale, */}
      {/*   }} */}
      {/*   // files={[ */}
      {/*   //   './environmentMaps/2/px.jpg', */}
      {/*   //   './environmentMaps/2/nx.jpg', */}
      {/*   //   './environmentMaps/2/py.jpg', */}
      {/*   //   './environmentMaps/2/ny.jpg', */}
      {/*   //   './environmentMaps/2/pz.jpg', */}
      {/*   //   './environmentMaps/2/nz.jpg', */}
      {/*   // ]} */}
      {/*   // files="./environmentMaps/the_sky_is_on_fire_2k.hdr" */}
      {/*   // resolution={32} */}
      {/* > */}
      {/*   {/1* <color args={['#000000']} attach="background" /> *1/} */}
      {/*   {/1* <Lightformer position-z={-5} scale={10} color="red" intensity={10} form="ring" /> *1/} */}
      {/*   {/1* <mesh position-z={-5} scale={10}> *1/} */}
      {/*   {/1*   <planeGeometry /> *1/} */}
      {/*   {/1*   <meshBasicMaterial color={[10, 0, 0]} /> *1/} */}
      {/*   {/1* </mesh> *1/} */}
      {/* </Environment> */}

      {/* <BakeShadows /> */}
      {/* <SoftShadows focus={0} samples={10} size={25} /> */}

      {/* <color args={['ivory']} attach="background" /> */}

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows */}
      {/*   position={[0, -0.99, 0]} */}
      {/*   scale={10} */}
      {/*   color="#316d39" */}
      {/*   opacity={0.8} */}
      {/*   frames={Infinity} */}
      {/*   temporal */}
      {/*   blend={100} */}
      {/* > */}
      {/*   <RandomizedLight */}
      {/*     amount={8} */}
      {/*     radius={1} */}
      {/*     ambient={0.5} */}
      {/*     intensity={1} */}
      {/*     bias={0.001} */}
      {/*     position={[1, 2, 3]} */}
      {/*     castShadow */}
      {/*   /> */}
      {/* </AccumulativeShadows> */}

      {/* <ContactShadows */}
      {/*   position={[0, 0, 0]} */}
      {/*   scale={10} */}
      {/*   resolution={512} */}
      {/*   far={5} */}
      {/*   color={color} */}
      {/*   opacity={opacity} */}
      {/*   blur={blur} */}
      {/*   frames={1} */}
      {/* /> */}

      {/* <directionalLight */}
      {/*   ref={directionalLight} */}
      {/*   castShadow */}
      {/*   position={sunPosition} */}
      {/*   intensity={1.5} */}
      {/*   shadow-mapSize={[1024, 1024]} */}
      {/*   shadow-camera-near={1} */}
      {/*   shadow-camera-far={10} */}
      {/*   shadow-camera-top={5} */}
      {/*   shadow-camera-right={5} */}
      {/*   shadow-camera-bottom={-5} */}
      {/*   shadow-camera-left={-5} */}
      {/* /> */}
      {/* <ambientLight intensity={0.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <mesh castShadow position-x={-2} position-y={1}> */}
      {/*   <sphereGeometry /> */}
      {/*   <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} /> */}
      {/* </mesh> */}

      {/* <mesh castShadow ref={cube} position-x={2} position-y={1} scale={1.5}> */}
      {/*   <boxGeometry /> */}
      {/*   <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} /> */}
      {/* </mesh> */}

      <Stage
        shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh castShadow position-x={-2} position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh castShadow ref={cube} position-x={2} position-y={1} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>
      </Stage>

      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}> */}
      {/*   <planeGeometry /> */}
      {/*   <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} /> */}
      {/* </mesh> */}
    </>
  );
}
