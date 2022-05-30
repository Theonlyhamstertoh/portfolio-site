import { a } from "@react-spring/three";
import { MeshDistortMaterial, Html, Stars } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import useCustomSpring from "../hooks/useCustomSpring";
import useAudio from "../hooks/useAudio";

// convert the component into a animated component
const Animated_MeshDistortMaterial = a(MeshDistortMaterial);
export function MorphingBall() {
  const noiseBall = useRef();
  // hover state for handling
  const { setHovered, spring, color } = useCustomSpring();

  const { gain, update = null } = useAudio();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const noiseBallMaterial = noiseBall.current.material;

    noiseBall.current.rotation.y = t / 10;
    noiseBall.current.rotation.z = t / 10;
    noiseBall.current.position.y = Math.sin(t * 3) / 10;

    // distort the ball and animate frame
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
        />
      </a.mesh>

      <BigWeiboName />
    </group>
  );
}

function BigWeiboName({}) {
  const groupRef = useRef();
  const { mouse } = useThree();
  console.log(mouse);
  function getMousePosition(e) {
    const xPosition = e.clientX / window.innerWidth - 0.5;
    const yPosition = e.clientY / window.innerHeight - 0.5;
    groupRef.current.rotation.y = (xPosition * Math.PI) / 4;
    groupRef.current.rotation.x = (yPosition * Math.PI) / 4;
  }

  useEffect(() => {
    // do a initial call
    window.addEventListener("mousemove", getMousePosition);
    return () => window.removeEventListener("mousemove", getMousePosition);
  }, []);

  return (
    <group ref={groupRef}>
      <Html transform position={[0, 0, 2]} zIndexRange={[0, 0]}>
        <h1>WEIBO ZHANG</h1>
      </Html>
    </group>
  );
}
// function useMousePosition() {
//   const nMousePosition = useRef([0, 0]);
//   function getMousePosition(e) {
//     const xPosition = e.clientX / window.innerWidth - 0.5;
//     const yPosition = e.clientY / window.innerWidth - 0.5;
//     nMousePosition.current = [xPosition / 4, yPosition / 4];
//   }
//   useEffect(() => {
//     // do a initial call
//     window.addEventListener("mousemove", getMousePosition);
//     return () => window.removeEventListener("mousemove", getMousePosition);
//   }, []);
//   return nMousePosition;
// }
