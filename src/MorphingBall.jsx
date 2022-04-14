import { useSpring, a, config } from "@react-spring/three";
import {
  GradientTexture,
  Html,
  Icosahedron,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import randomColor from "randomcolor";
import { TubeBufferGeometry } from "three";
import { TorusKnotBufferGeometry } from "three";
import { suspend } from "suspend-react";
const Animated_MeshDistortMaterial = a(MeshDistortMaterial);
export function MorphingBall({ url, ...props }) {
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

  /*
   * Music Track
   *
   */
  const { gain, context, update } = suspend(
    () => createAudio("/audio/alladin.mp3"),
    ["/audio/alladin.mp3"]
  );
  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination);
    // Disconnect it on unmount
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const noiseBallMaterial = noiseBall.current.material;

    THREE.MathUtils.lerp(noiseBallMaterial.distort);
    noiseBall.current.rotation.y = t / 10;
    noiseBall.current.rotation.z = t / 10;
    noiseBall.current.position.y = Math.sin(t * 3) / 10;
    // noisePoints.current.rotation.y = noiseBall.current.rotation.y;
    // noisePoints.current.rotation.z = noiseBall.current.rotation.z;

    let avg = update();
    noiseBall.current.material.distort = avg / 175;
    noiseBall.current.material.speed = avg / 5;
  });

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

async function createAudio(url) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const source = context.createBufferSource();
  source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res));
  source.loop = true;
  source.start(0);

  // Create gain node and an analyser
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  analyser.fftSize = 64;
  source.connect(analyser);
  analyser.connect(gain);

  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount);
  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data);
      // Calculate a frequency average
      return (data.avg = data.reduce((prev, cur) => prev + cur / data.length, 0));
    },
  };
}
