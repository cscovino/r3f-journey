import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useEffect, useRef } from 'react';
import { Mesh, MeshMatcapMaterial, sRGBEncoding, TorusGeometry } from 'three';
// import { useState } from 'react';
// import { MeshMatcapMaterial, TorusGeometry } from 'three';

const torusGeometry = new TorusGeometry(1, 0.6, 16, 32);
const material = new MeshMatcapMaterial();

export default function Experience() {
  // const [torusGeometry, setTorusGeometry] = useState<TorusGeometry>();
  // const [material, setMaterial] = useState<MeshMatcapMaterial>();
  const donuts = useRef<Array<Mesh>>([]);
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  useEffect(() => {
    if (matcapTexture) {
      matcapTexture.encoding = sRGBEncoding;
      matcapTexture.needsUpdate = true;

      material.matcap = matcapTexture;
      material.needsUpdate = true;
    }
  }, []);

  useFrame((_, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <torusGeometry */}
      {/*   ref={setTorusGeometry as (instance: TorusGeometry) => void} */}
      {/*   args={[1, 0.6, 16, 32]} */}
      {/* /> */}
      {/* <meshMatcapMaterial */}
      {/*   ref={setMaterial as (instance: MeshMatcapMaterial) => void} */}
      {/*   matcap={matcapTexture} */}
      {/* /> */}

      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          HELLO R3F
        </Text3D>
      </Center>

      {[...Array(100)].map((_, idx) => {
        return (
          <mesh
            ref={(element) => {
              if (element) donuts.current[idx] = element;
            }}
            key={`donut-${idx}`}
            geometry={torusGeometry}
            material={material}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        );
      })}
    </>
  );
}
