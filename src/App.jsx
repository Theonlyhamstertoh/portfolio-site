import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { MorphingBall } from "./components/MorphingBall";
import useStore from "./components/useStore";
import Section from "./components/Section";
import PointBall from "./components/PointBall";
function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
      <Section>ABOUT ME</Section>
      <section>PROJECTS</section>
      <section>CONTACT ME</section>
    </>
  );
}

function Scene() {
  const virtualCamera = useRef();

  return (
    <>
      <LoadingScreen />
      <OrbitControls
        maxDistance={20}
        minDistance={13}
        camera={virtualCamera.current}
        enablePan={false}
        // autoRotate
        enableZoom={false}
      />
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
