import { useSpring, a, config } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useStore, { useAudio } from "./useStore";
import useCustomSpring from "../hooks/useCustomSpring";

// convert the component into a animated component
const Animated_MeshDistortMaterial = a(MeshDistortMaterial);

export function MorphingBall() {
  const noiseBall = useRef();
  // hover state for handling
  const { hovered, setHovered, spring, color } = useCustomSpring();

  const { update = null } = useAudio();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const noiseBallMaterial = noiseBall.current.material;

    noiseBall.current.rotation.y = t / 10;
    noiseBall.current.rotation.z = t / 10;
    noiseBall.current.position.y = Math.sin(t * 3) / 10;

    // distort the ball
    if (update) {
      const avg = update();
      noiseBallMaterial.distort = Math.min(avg / 150, 0.85);
    }
  });

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
          speed={12}
          color={color}
          metalness={0.3}
        ></Animated_MeshDistortMaterial>
      </a.mesh>
    </group>
  );
}
