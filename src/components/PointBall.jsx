import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function GlitteringStars() {
  // 3D mesh points
  const starsRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    starsRef.current.rotation.z = Math.sin(t / 10) * 0.5;
    starsRef.current.rotation.y = Math.cos(t / 10) * 0.5;
    starsRef.current.rotation.x = Math.tan(t / 100) * 0.5;
    // console.log(starsRef.current);
  });
  return (
    <Stars
      ref={starsRef}
      radius={50}
      depth={50}
      count={7000}
      factor={4}
      saturation={0}
      fade
      speed={3}
    />
  );
}
// export default function PointBall() {
//   // 3D mesh points
//   const pointsRef = useRef();

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();

//     pointsRef.current.rotation.z = Math.sin(t / 10) * 0.5;
//     // noisePoints.current.rotation.y = noiseBall.current.rotation.y;
//     // noisePoints.current.rotation.z = noiseBall.current.rotation.z;
//   });
//   return (
//     <points ref={pointsRef} receiveShadow>
//       <torusKnotBufferGeometry args={[15, 30, 200, 100]} />

//       <pointsMaterial size={0.03} />
//     </points>
//   );
// }
