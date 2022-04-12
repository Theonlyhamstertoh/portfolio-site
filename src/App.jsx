import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import randomColor from "randomcolor";
import { CameraShake, Html, OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { MorphingBall } from "./MorphingBall";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Canvas>
      <OrbitControls />

      <fog attach="fog" args={["#7121cc", 0, 50]} />
      <color attach="background" args={[0x000000]} />
      <ambientLight />
      <Suspense>
        <MorphingBall />
      </Suspense>
      <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} />
    </Canvas>
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
