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
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import Section from "./components/Section";
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
            <GlitteringStars />
          </Scroll>
          <Scroll html>
            <LoadingScreen />
            <MenuNavigator />
            <Section title="ABOUT ME"></Section>
            <ProjectSection />
            <ContactSection />
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

function ContactSection() {
  return (
    <Section title="" className="scrollContainer">
      <div className="flex-center flexCol addMedMargin yellow">
        <p>Reach out to me through email or social media</p>
        <h1 className="email">weibozhang50@gmail.com</h1>
        <div className="flex-center">
          <a target="_blank" href="https://github.com/Theonlyhamstertoh">
            <img src="/icons/github.svg" />
          </a>
          <a
            target="_blank"
            href="www.linkedin.com/in/weibozhang
"
          >
            <img src="/icons/linkedin.svg" />
          </a>
        </div>
      </div>
    </Section>
  );
}

function LoadingScreen() {
  const [mode, setMode] = useStore((state) => [state.mode, state.setMode]);

  return !mode && <button onClick={(e) => setMode("start")}>Start</button>;
}
export default App;

function MenuNavigator() {
  return (
    <div className="flex-center buttonContainer">
      <a href="#" target="_blank" className="primaryButton">
        Contact
      </a>
      <a href="#" target="_blank" className="primaryButton">
        Projects
      </a>
      <a href="#" target="_blank" className="primaryButton">
        Works
      </a>
    </div>
  );
}
