import { a } from "@react-spring/three";
import { MeshDistortMaterial, Html } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import useCustomSpring from "../hooks/useCustomSpring";
import useAudio from "../hooks/useAudio";

// convert the component into a animated component
const Animated_MeshDistortMaterial = a(MeshDistortMaterial);
const SPEED = 3;
export function MorphingBall() {
  const noiseBall = useRef();
  // hover state for handling
  const { hovered, setHovered, spring, color } = useCustomSpring();

  const { gain, update = null } = useAudio();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const noiseBallMaterial = noiseBall.current.material;

    noiseBall.current.rotation.y = t / 10;
    noiseBall.current.rotation.z = t / 10;
    noiseBall.current.position.y = Math.sin(t * 3) / 10;

    // distort the ball
    if (update) {
      const avg = update();
      noiseBallMaterial.distort = Math.min(avg / 160, 0.85);
    }
  });

  return (
    <group>
      <a.mesh
        receiveShadow
        ref={noiseBall}
        scale={spring.scale}
        onPointerOver={(e) => setHovered(true)}
        onPointerOut={(e) => setHovered(false)}
      >
        <icosahedronBufferGeometry args={[4, 40]} />
        <Animated_MeshDistortMaterial
          wireframe={spring.wireframe}
          speed={12}
          color={color}
          metalness={0.3}
        ></Animated_MeshDistortMaterial>
        <Html transform sprite>
          <h1>WEIBO ZHANG</h1>
        </Html>
      </a.mesh>
    </group>
  );
}
