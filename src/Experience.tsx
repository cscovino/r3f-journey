import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  Physics,
  RigidBody,
  Debug,
  RapierRigidBody,
  InstancedRigidBodies,
  InstancedRigidBodyProps,
  CuboidCollider,
  CylinderCollider,
  // BallCollider,
} from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useMemo, useRef, useState } from 'react';
import { Euler, InstancedMesh, Quaternion } from 'three';

export default function Experience() {
  const [hitSound] = useState(() => new Audio('./hit.mp3'));
  const twister = useRef<RapierRigidBody>(null);
  const cube = useRef<RapierRigidBody>(null);
  const hamburger = useGLTF('./hamburger.glb');
  const cubesCount = 1000;
  const cubesRef = useRef<InstancedMesh>(null);

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];

    for (let i = 0; i < cubesCount; i++) {
      const position = (Math.random() - 0.5) * 8;
      const scale = 0.2 + Math.random() * 0.8;
      instances.push({
        key: 'instance_' + Math.random(),
        position: [position, 6 * i, position],
        rotation: [Math.random(), Math.random(), Math.random()],
        scale: [scale, scale, scale],
      });
    }

    return instances;
  }, []);

  const cubeJump = () => {
    if (cube.current) {
      const mass = cube.current.mass();
      cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, true);
      cube.current.applyTorqueImpulse(
        { x: Math.random() - 0.5, y: 1, z: Math.random() - 0.5 },
        true,
      );
    }
  };

  const collisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };

  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new Matrix4();
  //     matrix.compose(new Vector3(i * 2, 0, 0), new Quaternion(), new Vector3(1, 1, 1));
  //     cubesRef.current?.setMatrixAt(i, matrix);
  //   }
  // }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new Euler(0, time * 3.0, 0);
    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current?.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current?.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.81, 0]}>
        {/* <Debug /> */}

        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          onCollisionEnter={collisionEnter}
          // onCollisionExit={() => console.log('exit')}
          // onSleep={() => console.log('sleep')}
          // onWake={() => console.log('wake')}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
        </RigidBody>

        <RigidBody ref={twister} position={[0, -0.8, 0]} friction={0} type="kinematicPosition">
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <CylinderCollider args={[0.15, 1.25]} position={[0, 0, 0]} />
          <primitive object={hamburger.scene} scale={0.25} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            ref={cubesRef}
            castShadow
            args={[undefined, undefined, cubesCount]}
            count={cubesCount}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>

        {/* <RigidBody colliders={false} position={[0, 1, 0]} rotation={[Math.PI * 0.5, 0, 0]}> */}
        {/*   {/1* <CuboidCollider args={[1.5, 1.5, 0.5]} /> *1/} */}
        {/*   <BallCollider args={[1.5]} /> */}
        {/*   <mesh castShadow> */}
        {/*     <torusGeometry args={[1, 0.5, 16, 32]} /> */}
        {/*     <meshStandardMaterial color="mediumpurple" /> */}
        {/*   </mesh> */}
        {/* </RigidBody> */}

        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
