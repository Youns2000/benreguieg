import {React, useState} from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import "./Younes.css";

export default function Younes() {
  const [posCam,setPosCam] = useState([5, 5, 5]);

  function Box() {
    const [ref, api] = useBox(() => ({ mass: 1, position: [0, 0, 0] }));
    return (
      <mesh
        onClick={() => {
          // api.velocity.set(0, 2, 0);
          setPosCam([10, 5, 5]);
        }}
        ref={ref}
        position={[0, 0, 0]}
      >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="hotpink" />
      </mesh>
    );
  }

  function cameraTransition(){
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
    // }
  }

  function Plane() {
    const [ref] = usePlane(() => ({
      rotation: [-Math.PI / 2, 0, 0],
    }));
    return (
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshLambertMaterial attach="material" color="lightblue" />
      </mesh>
    );
  }

  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <PerspectiveCamera
        makeDefault
        // rotation={[0, Math.PI/2, 0]}
        fov={75}
        position={posCam}
        near={1}
        far={1000}
      ></PerspectiveCamera>
      <Physics>
        <Box />
        <Plane />
      </Physics>
    </Canvas>
  );
}