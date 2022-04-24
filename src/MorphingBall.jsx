import { useSpring, a, config } from "@react-spring/three";
import {
  MeshDistortMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import randomColor from "randomcolor";
import { suspend } from "suspend-react";
import { createAudio } from "./createAudio";
const Animated_MeshDistortMaterial = a(MeshDistortMaterial);

export function MorphingBall({ url, ...props }) {
  // 3D mesh points
  const distortMaterial = useRef();
  const noiseBall = useRef();
  const noisePoints = useRef();
  const [isMobile, setMobile] = useState({ on: false, divideBy: 1 });

  // hover state for handling
  const [hovered, setHovered] = useState(false);
  const { scale, distort, speed, wireframe } = useSpring({
    // wireframe: hovered ? true : false,
    scale: hovered ? 1.15 / isMobile.divideBy : 1 / isMobile.divideBy,
    distort: hovered ? 0 : 0,
    speed: 12,
    wireframe: hovered ? false : true,
    config: { mass: 3, tension: 200, friction: 10 },
  });

  const { lightColor } = useSpring({
    lightColor: randomColor({ luminosity: "light" }),
    config: config.slow,
  });

  const { gain, context, update } = suspend(
    () => createAudio("/audio/Tchaikovsky - Waltz of the Flowers.m4a"),
    ["/audio/Tchaikovsky - Waltz of the Flowers.m4a"]
  );
  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination);
    // Disconnect it on unmount
    return () => gain.disconnect();
  }, [gain, context]);

  useEffect(() => {
    window.addEventListener("resize", updateBallSize);
    return () => window.addEventListener("resize", updateBallSize);
  }, []);

  const updateBallSize = useCallback(() => {
    if (window.innerWidth < 450) {
      setMobile({ on: true, divideBy: 2 });
    } else {
      setMobile({ on: false, divideBy: 1 });
    }
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

    let avg = update();
    noiseBall.current.material.distort = Math.min(avg / 80, 0.85);
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
          ref={distortMaterial}
          wireframe={wireframe}
          speed={speed}
          color={lightColor}
          distort={distort}
          metalness={0.3}></Animated_MeshDistortMaterial>
      </a.mesh>
    </group>
  );
}


