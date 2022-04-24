import { useSpring, a, config } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import randomColor from "randomcolor";
import { suspend } from "suspend-react";
import { createAudio } from "../js/createAudio";
import useStore, { useCustomSpring } from "./useStore";


// convert the component into a animated component
const Animated_MeshDistortMaterial = a(MeshDistortMaterial);

export function MorphingBall({ mode }) {
  const noiseBall = useRef();
  const [mobile, setMobile, audioData] = useStore((state) => [
    state.mobile,
    state.setMobile,
    state.audioData,
  ]);

  // hover state for handling
 const { hovered, setHovered, spring, color} = useCustomSpring();


  // const { gain, context, update } = mode === "start" && audioData();

  // useEffect(() => {
  //   console.log(mode);
  //   if (mode === "start") {
  //     // Connect the gain node, which plays the audio
  //     gain.connect(context.destination);
  //     // Disconnect it on unmount
  //     return () => gain.disconnect();
  //   }
  // }, [gain, context, mode]);

  // useEffect(() => {
  //   window.addEventListener("resize", setMobile);
  //   return () => window.addEventListener("resize", setMobile);
  // }, []);

  // useFrame(({ clock }) => {
  //   const t = clock.getElapsedTime();
  //   const noiseBallMaterial = noiseBall.current.material;

  //   THREE.MathUtils.lerp(noiseBallMaterial.distort);
  //   noiseBall.current.rotation.y = t / 10;
  //   noiseBall.current.rotation.z = t / 10;
  //   noiseBall.current.position.y = Math.sin(t * 3) / 10;

  //   if (update) {
  //     const avg = update();
  //     noiseBall.current.material.distort = avg / 175;
  //   }
  // });

  return (
    <group>
      <a.mesh
        receiveShadow
        ref={noiseBall}
        scale={spring.scale}
        onPointerOver={(e) => setHovered(!hovered)}
        onPointerOut={(e) => setHovered(!hovered)}
        >
        <icosahedronBufferGeometry args={[4, 30]} />
        <Animated_MeshDistortMaterial
          wireframe={spring.wireframe}
          speed={spring.speed}
          color={color}
          distort={spring.distort}
          metalness={0.3}></Animated_MeshDistortMaterial>
      </a.mesh>
    </group>
  );
}
