import {
  Center,
  OrbitControls,
  shaderMaterial,
  Sparkles,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { Color, ShaderMaterial } from 'three';
import { extend, Object3DNode, useFrame } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';
import { useRef } from 'react';

const PortalMaterial: typeof ShaderMaterial & { [name: string]: any } = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new Color('#ffffff'),
    uColorEnd: new Color('#000000'),
  },
  portalVertexShader,
  portalFragmentShader,
);

extend({ PortalMaterial });
declare module '@react-three/fiber' {
  interface ThreeElements {
    portalMaterial: Object3DNode<typeof PortalMaterial, typeof PortalMaterial>;
  }
}

export default function Experience() {
  const { nodes } = useGLTF('./model/portal.glb') as GLTF;
  const bakedTexture = useTexture('./model/baked.jpg');
  bakedTexture.flipY = false;

  const portalMaterial = useRef<typeof PortalMaterial>(null);

  useFrame((_, delta) => {
    if (portalMaterial.current) portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <color args={['#030202']} attach="background" />

      <OrbitControls makeDefault />

      <Center>
        <mesh
          geometry={nodes.baked.geometry}
          position={nodes.baked.position}
          rotation={nodes.baked.rotation}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
          <meshBasicMaterial color="#ffb14d" />
        </mesh>
        <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
          <meshBasicMaterial color="#ffb14d" />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          {/* <shaderMaterial */}
          {/*   vertexShader={portalVertexShader} */}
          {/*   fragmentShader={portalFragmentShader} */}
          {/*   uniforms={{ */}
          {/*     uTime: { value: 0 }, */}
          {/*     uColorStart: { value: new Color('#ffffff') }, */}
          {/*     uColorEnd: { value: new Color('#000000') }, */}
          {/*   }} */}
          {/* /> */}
          <portalMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} count={40} />
      </Center>
    </>
  );
}
