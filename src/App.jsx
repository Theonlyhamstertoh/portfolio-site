import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import {
    Html,
    PerspectiveCamera,
    Preload,
    Scroll,
    ScrollControls,
    useProgress,
} from "@react-three/drei";
useStore;
import { MorphingBall } from "./components/MorphingBall";
import ProjectSection from "./components/ProjectSection";
import GlitteringStars from "./components/GlitteringStars";
import useStore from "./components/useStore";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
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
    const [mode, setMode] = useStore((state) => [state.mode, state.setMode]);

    return (
        <Route path="/home">
            <img src="/background.png" className="background" />
            <button className="play-button" onClick={() => setMode("start")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1024 1024"
                >
                    <path
                        fill="#dbd6b5e7"
                        d="m892.1 737.8l-110.3-63.7a15.9 15.9 0 0 0-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0 0 21.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0 0 21.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 0 0-21.7-5.9L746 287.8a15.99 15.99 0 0 0-5.8 21.8L760 344zm174 132H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zM625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3c16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1z"
                    />
                </svg>{" "}
                <p className="play-text">Play Audio</p>
            </button>
            <Canvas dpr={1} performance={{ min: 0.1 }}>
                <Scene />
            </Canvas>
        </Route>
    );
}
function Scene() {
    const virtualCamera = useRef();

    return (
        <>
            <PerspectiveCamera makeDefault ref={virtualCamera} name="Camera" position={[0, 0, 15]}>
                <pointLight castShadow intensity={1} />
            </PerspectiveCamera>
            <ambientLight intensity={0.15} />
            <Suspense fallback={null}>
                <ScrollControls damping={6} pages={1}>
                    <Preload />
                    <Scroll>
                        <MorphingBall />
                        <GlitteringStars />
                    </Scroll>
                    {/* <Scroll html>
                        <Link href="/" onClick={() => setMode(false)}>
                            <img className="weibo-logo" src="/icons/weibo-logo.svg" />
                        </Link>
                        <Section title="" className="addPageMargin scrollContainer">
                            <h3 className="addMedMargin">
                                Hi! I'm <strong>Weibo Zhang!</strong> I build things for the web.
                                I'm a college student and still figuring out my path. During the
                                time I am not coding, I enjoy filming and photographing with my
                                camera. I strive to continuously push myself to face discomfort. If
                                you would like to contact me, don't hesitate! My email is at the
                                bottom of this page. See you around :))
                            </h3>
                        </Section>
                        <ProjectSection />
                        <ContactSection />
                    </Scroll> */}
                </ScrollControls>
            </Suspense>
            <EffectComposer multisampling={0} disableNormalPass={true}>
                <Bloom luminanceThreshold={0} luminanceSmoothing={0} opacity={0.45} />
                <Noise opacity={0.045} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
            </EffectComposer>
        </>
    );
}

export default App;
