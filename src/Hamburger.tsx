import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Hamburger(props: GroupProps) {
  const { nodes, materials } = useGLTF('/hamburger-draco.glb') as GLTF;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cheese.geometry}
        material={materials.cheeseMaterial}
        position={[0, -1.15, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BottomBun.geometry}
        material={materials.bunMaterial}
        position={[0, -0.88, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Meat.geometry}
        material={materials.meatMaterial}
        position={[0, 1.92, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TopBun.geometry}
        material={materials.bunMaterial}
        position={[0, 3.99, 0]}
        rotation={[Math.PI, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/hamburger-draco.glb');
