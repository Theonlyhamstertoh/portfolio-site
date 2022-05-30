import { MeshDistortMaterial, Html, Stars } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

export default function BigWeiboName({}) {
  const groupRef = useRef();

  //animate name to follow mouse
  useFrame(({ mouse }) => {
    groupRef.current.rotation.y = (mouse.x * Math.PI) / 4;
    groupRef.current.rotation.x = (-mouse.y * Math.PI) / 4;
  });

  return (
    <group ref={groupRef}>
      <Html transform position={[0, 0, 2]} zIndexRange={[0, 0]}>
        <h1>WEIBO ZHANG</h1>
      </Html>
    </group>
  );
}
