import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import {
  Html,
  PerspectiveCamera,
  Preload,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
useStore;
import { MorphingBall } from "./components/MorphingBall";
import ProjectSection from "./components/ProjectSection";
import GlitteringStars from "./components/GlitteringStars";
import useStore from "./components/useStore";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Outline,
  Select,
  Vignette,
} from "@react-three/postprocessing";
function App() {
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
      <PerspectiveCamera
        makeDefault
        ref={virtualCamera}
        name="Camera"
        position={[0, 0, 15]}
      >
        <pointLight castShadow intensity={1} />
      </PerspectiveCamera>
      <ambientLight intensity={0.15} />
      <Suspense fallback={null}>
        <ScrollControls damping={4} pages={10}>
          <Preload />
          <Scroll>
            <MorphingBall />
          </Scroll>
          <Scroll>
            <GlitteringStars />
          </Scroll>
          <Scroll html>
            <LoadingScreen />
            <ProjectSection />
          </Scroll>
        </ScrollControls>
      </Suspense>

      <EffectComposer multisampling={0} disableNormalPass={true}>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0} opacity={0.35} />
        <Noise opacity={0.045} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

function LoadingScreen() {
  const [mode, setMode] = useStore((state) => [state.mode, state.setMode]);

  return !mode && <button onClick={(e) => setMode("start")}>Start</button>;
}
export default App;
