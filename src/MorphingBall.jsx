import { useSpring, a, config } from "@react-spring/three";
import {
  GradientTexture,
  Html,
  Icosahedron,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  shaderMaterial,
  PositionalAudio,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import randomColor from "randomcolor";
import { suspend } from "suspend-react";
const Animated_MeshDistortMaterial = a(MeshDistortMaterial);

export function MorphingBall({ url, sound }) {
  // 3D mesh points
  const noiseBall = useRef();
  const noisePoints = useRef();

  // hover state for handling
  const [hovered, setHovered] = useState(false);
  const { scale, distort, speed, wireframe } = useSpring({
    // wireframe: hovered ? true : false,
    scale: hovered ? 1.15 : 1,
    distort: hovered ? 0 : 0,
    speed: hovered ? 0 : 0,
    wireframe: hovered ? false : true,
    config: { mass: 3, tension: 300, friction: 10 },
  });

  const { lightColor } = useSpring({
    lightColor: randomColor({ luminosity: "light" }),
    config: config.slow,
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const noiseBallMaterial = noiseBall.current.material;

    THREE.MathUtils.lerp(noiseBallMaterial.distort);
    noiseBall.current.rotation.y = t / 10;
    noiseBall.current.rotation.z = t / 10;
    noiseBall.current.position.y = Math.sin(t * 3) / 10;
    // noisePoints.current.rotation.y = noiseBall.current.rotation.y;
    // noisePoints.current.rotation.z = noiseBall.current.rotation.z;

    if (analyser.current) {
      const data = analyser.current.getAverageFrequency();
      (data / 100) * 2;
      noiseBall.current.material.distort = data / 56;
      noiseBall.current.material.speed = data / 10;
    }
  });

  // <Analyzer /> will not run before everything else in the suspense block is resolved.
  // That means <PositionalAudio/>, which executes async, is ready by the time we're here.
  // The next frame (useEffect) is guaranteed(!) to access positional-audios ref.
  const analyser = useRef();
  useEffect(() => {
    analyser.current = new THREE.AudioAnalyser(sound.current, 64);
    console.log(analyser);
  }, []);

  return (
    <group>
      {/* <points ref={noisePoints} receiveShadow>
        <octahedronBufferGeometry args={[4.4, 50]} />

        <a.pointsMaterial size={0.03} color="#000000" />
      </points>
  */}
      <a.mesh
        receiveShadow
        ref={noiseBall}
        scale={scale}
        onPointerOver={(e) => setHovered(!hovered)}
        onPointerOut={(e) => setHovered(!hovered)}>
        <icosahedronBufferGeometry args={[4, 30]} />
        <Animated_MeshDistortMaterial
          wireframe={wireframe}
          speed={speed}
          color={lightColor}
          distort={distort}
          metalness={0.3}></Animated_MeshDistortMaterial>
      </a.mesh>
    </group>
  );
}

export function PlaySound({ url }) {
  // This component creates a suspense block, blocking execution until
  // all async tasks (in this case PositionAudio) have been resolved.
  const sound = useRef();
  const [play, setPlay] = useState(false);

  useFrame(() => {
    // play && console.log(sound.current);
  });
  return (
    <Suspense fallback={null}>
      {!play && (
        <Html>
          <button onClick={(e) => setPlay(true)}>Play</button>
        </Html>
      )}
      {play && (
        <PositionalAudio
          setVolume={50}
          gain={10}
          autoplay
          loopEnd={undefined}
          url={"/audio/alladin.mp3"}
          ref={sound}
        />
      )}
      {play && <MorphingBall sound={sound} />}
    </Suspense>
  );
}
