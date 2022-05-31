import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import {
  Html,
  Loader,
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
import ContactSection from "./components/ContactSection";
import MenuNavigator from "./components/MenuNavigator";
import { Route } from "wouter";
import { Link } from "wouter";
MenuNavigator;
function App() {
  return (
    <>
      <CanvasContainer />
      <LoadingScreen />
    </>
  );
}

function LoadingScreen() {
  const [mode, setMode] = useStore((state) => [state.mode, state.setMode]);
  return (
    !mode && (
      <Route path="/">
        <img src="/icons/weibo-logo.svg" className="centered startIcon" />
        <Link href="/home" onClick={() => setMode("start")}>
          <button
            style={{
              top: "65%",
            }}
            className="startButton centered"
          >
            Enter
          </button>
        </Link>
      </Route>
    )
  );
}

function CanvasContainer() {
  return (
    <Route path="/home">
      <img src="/background.png" className="background" />
      <Canvas>
        <Scene />
      </Canvas>
      <Loader />
    </Route>
  );
}
function Scene() {
  const virtualCamera = useRef();
  const [setMode] = useStore((state) => [state.setMode]);
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
            {/* <LoadingScreen /> */}
            <Link href="/" onClick={() => setMode(false)}>
              <img className="weibo-logo" src="/icons/weibo-logo.svg" />
            </Link>
            {/* <MenuNavigator /> */}
            <Section title="" className="addPageMargin scrollContainer">
              <h3 className="addMedMargin">
                Hi! I'm <strong>Weibo Zhang!</strong> I build things for the
                web. I'm a college student and still figuring out my path.
                During the time I am not coding, I enjoy filming and
                photographing with my camera. I strive to continuously push
                myself to face discomfort. If you would like to contact me,
                don't hesitate! My email is at the bottom of this page. See you
                around :))
              </h3>
            </Section>
            <ProjectSection />
            <ContactSection />
            {/* <YoutubeEmbed embedId="GlTuk1wAlvI" /> */}
          </Scroll>
          <Scroll></Scroll>
        </ScrollControls>
      </Suspense>
      <Loader />
      <EffectComposer multisampling={0} disableNormalPass={true}>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0} opacity={0.35} />
        <Noise opacity={0.045} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
export default App;
