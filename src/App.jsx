import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { MorphingBall } from "./components/MorphingBall";
import useStore from "./components/useStore";
function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
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
        autoRotate
      />
      <PerspectiveCamera
        makeDefault
        ref={virtualCamera}
        name="Camera"
        position={[0, 15, 0]}
      >
        <pointLight castShadow intensity={1} />
      </PerspectiveCamera>
      <ambientLight intensity={0.15} />
      <color attach="background" args={[0x000000]} />
      <Suspense fallback={null}>
        <MorphingBall />
      </Suspense>
      <gridHelper />
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
