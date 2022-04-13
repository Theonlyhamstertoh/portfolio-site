import {
  GradientTexture,
  Icosahedron,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function MorphingBall() {
  const noiseBall = useRef();
  const noisePoints = useRef();
  useFrame(({ clock }) => {
    // noisePoints.current.rotation.y = noiseBall.current.mesh.rotation.y;
    // noisePoints.current.rotation.z = noiseBall.current.mesh.rotation.z;
    // console.log(noisePoints.current, noiseBall.current);
  });

  return (
    <group>
      <points ref={noisePoints} receiveShadow>
        <icosahedronBufferGeometry args={[4, 7]} />
        <pointsMaterial size={0.03} />
      </points>
      <Icosahedron ref={noiseBall} args={[4, 7]}>
        <MeshDistortMaterial speed={3} distort={0.5} color="#ffcc4f"></MeshDistortMaterial>
      </Icosahedron>
    </group>
  );
}
