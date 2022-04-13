import { MeshDistortMaterial, MeshWobbleMaterial, shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function MorphingBall() {
  const mat = useRef();
  const mesh = useRef();
  useFrame(({ clock }) => {});

  return (
    <>
      <mesh ref={mesh} receiveShadow>
        <icosahedronBufferGeometry args={[2, 7]} />
        <MeshDistortMaterial
          speed={5}
          wireframe
          color="#ffcc4f"
          polygonOffsetUnits={0.5}></MeshDistortMaterial>
      </mesh>
    </>
  );
}
