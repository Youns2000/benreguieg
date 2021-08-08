import {React, useState} from "react";
import { Canvas,useThree } from "react-three-fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useSpring } from 'react-spring'
import "./Younes.css";

export default function Younes() {
  const [posCam,setPosCam] = useState([5, 5, 5]);

  function Box() {
    const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
    return (
      <mesh
        onClick={() => {
          api.velocity.set(0, 2, 0);
          // setPosCam([10, 5, 5]);
        }}
        ref={ref}
        position={[0, 2, 0]}
      >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="hotpink" />
      </mesh>
    );
  }

  function Controls() {
    const { gl, camera } = useThree()
  
    useSpring({
      from: {
        z: 300
      },
      z: 2,
      onFrame: ({ z }) => {
        camera.position.z = z
      }
    })
  
    return <OrbitControls autoRotate target={[0, 0, 0]} angle={0.3} args={[camera, gl.domElement]} />
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
      {/* <OrbitControls /> */}
      <Controls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        <Box />
        <Plane />
      </Physics>
    </Canvas>
  );
}