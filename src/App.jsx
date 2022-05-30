import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import {
  Html,
  Image,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  Scroll,
  ScrollControls,
  Stars,
} from "@react-three/drei";
import { MorphingBall } from "./components/MorphingBall";
import useStore from "./components/useStore";
import ProjectSection from "./components/ProjectSection";
import GlitteringStars from "./components/GlitteringStars";
function App() {
  const [mobile, mobileResizeHelper] = useStore((state) => [
    state.mobile,
    state.mobileResizeHelper,
  ]);

  useEffect(() => {
    // do a initial call
    mobileResizeHelper();
    window.addEventListener("resize", mobileResizeHelper);
    return () => window.removeEventListener("resize", mobileResizeHelper);
  }, [mobile]);

  return (
    <>
      <img src="/background.png" className="background" />
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
}

function Scene() {
  const virtualCamera = useRef();

  return (
    <>
      {/* <LoadingScreen /> */}
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
        <ScrollControls damping={4} pages={10}>
          <Preload />
          <Scroll>
            <MorphingBall />
            <GlitteringStars />
          </Scroll>
          <Scroll html>
            <ProjectSection />
          </Scroll>
        </ScrollControls>
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
