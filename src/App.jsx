import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import randomColor from "randomcolor";
import * as THREE from "three";
import {
  CameraShake,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  useHelper,
} from "@react-three/drei";
import { MorphingBall } from "./MorphingBall";
function App() {
  const [count, setCount] = useState(0);
  const main_Light = useRef();
  useHelper(main_Light, THREE.PointLightHelper);

  const virtualCamera = useRef();

  useEffect(() => {
    console.log(virtualCamera.current.position);
  });

  return (
    <>
      <OrbitControls
        maxDistance={17.5}
        minDistance={12.5}
        camera={virtualCamera.current}
        enablePan={false}
        enable
      />
      <PerspectiveCamera makeDefault ref={virtualCamera} name="Camera" position={[0, 15, 0]}>
        <pointLight castShadow intensity={1} />
      </PerspectiveCamera>
      <color attach="background" args={[0x000000]} />
      {/* <gridHelper args={[25, 25]} /> */}
      <MorphingBall />
      {/* {<axesHelper args={[10]} />} */}
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
