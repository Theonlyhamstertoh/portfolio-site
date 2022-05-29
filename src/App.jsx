import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import { MorphingBall } from "./components/MorphingBall";
import useStore from "./components/useStore";
import ProjectSection from "./components/ProjectSection";
import PointBall from "./components/PointBall";
import GlitteringStars from "./components/PointBall";
function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
      <ProjectSection />
      {/* <section>PROJECTS</section> */}
      <section>CONTACT ME</section>
    </>
  );
}

function Scene() {
  const virtualCamera = useRef();

  return (
    <>
      <LoadingScreen />
      {/* <OrbitControls
        maxDistance={20}
        minDistance={13}
        camera={virtualCamera.current}
        enablePan={false}
        // autoRotate
        enableZoom={false}
      /> */}
      <PerspectiveCamera
        makeDefault
        ref={virtualCamera}
        name="Camera"
        position={[0, 0, 15]}
      >
        <pointLight castShadow intensity={1} />
      </PerspectiveCamera>
      <ambientLight intensity={0.15} />
      {/* <color attach="background" args={[0x1b1b1b]} /> */}
      <Suspense fallback={null}>
        <MorphingBall />
        <GlitteringStars />
        {/* <PointBall /> */}
      </Suspense>
    </>
  );
}

function LoadingScreen() {
  const [mode, setMode] = useStore((state) => [state.mode, state.setMode]);

  return (
    <Html fullscreen>
      {!mode && <button onClick={(e) => setMode("start")}>Start</button>}
    </Html>
  );
}
export default App;
