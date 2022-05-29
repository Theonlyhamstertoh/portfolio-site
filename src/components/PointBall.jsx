// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";

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
