import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function GlitteringStars({ volumeFrequency }) {
  // 3D mesh points
  const starsRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    starsRef.current.rotation.z = Math.sin(t / 10) * 0.5;
    starsRef.current.rotation.y = Math.cos(t / 10) * 0.5;
    starsRef.current.rotation.x = Math.sin(t / 50) * 2.5;
  });
  return (
    <Stars
      ref={starsRef}
      radius={50}
      depth={80}
      count={7000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}
