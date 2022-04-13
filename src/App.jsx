import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import randomColor from "randomcolor";
import * as THREE from "three";
import {
  CameraShake,
  Html,
  OrbitControls,
  Scroll,
  ScrollControls,
  useHelper,
} from "@react-three/drei";
import { MorphingBall } from "./MorphingBall";
function App() {
  const [count, setCount] = useState(0);
  const main_Light = useRef();
  // useHelper(main_Light, THREE.DirectionalLightHelper);
  return (
    <>
      <OrbitControls />

      <fog attach="fog" args={["#ffcc4f", 0, 50]} />
      <color attach="background" args={[0x000000]} />
      <directionalLight castShadow ref={main_Light} position={[0, 5, 10]} />
      {/* <gridHelper args={[25, 25]} /> */}
      <MorphingBall />
      {/* {<axesHelper args={[10]} />} */}
      {/* <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} /> */}
    </>
  );
}

function Scene() {}

function Box() {
  const color = randomColor();
  const randomXYPosition = [
    Math.floor((Math.random() - 0.5) * 15),
    Math.floor((Math.random() - 0.5) * 15),
    0,
  ];
  return (
    <mesh position={randomXYPosition}>
      <boxBufferGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default App;
