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
import { MorphingBall, PlaySound } from "./MorphingBall";
function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

function Scene() {
  const [count, setCount] = useState(0);
  const main_Light = useRef();

  useHelper(main_Light, THREE.PointLightHelper);

  const virtualCamera = useRef();
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
      <PlaySound url="./audio/alladin.mp3" />
      {/* {<axesHelper args={[10]} />} */}
    </>
  );
}

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
