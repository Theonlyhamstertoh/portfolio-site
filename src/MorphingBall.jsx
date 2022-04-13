import { useSpring, a, config } from "@react-spring/three";
import {
  GradientTexture,
  Icosahedron,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import randomColor from "randomcolor";

export function MorphingBall() {
  const noiseBall = useRef();
  const noisePoints = useRef();
  const newColor = useMemo(() => randomColor());
  const currentColor = useMemo(() => new THREE.Color(randomColor()));
  const [hovered, setHovered] = useState(false);
  const { scale, distort, speed } = useSpring({
    // wireframe: hovered ? true : false,
    scale: hovered ? 1.2 : 1,
    distort: hovered ? 0.7 : 0.5,
    speed: hovered ? 5 : 3,
    config: config.wobbly,
  });

  useEffect(() => {
    console.log(newColor, currentColor);
  });
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const noiseBallColor = noiseBall.current.material.color;
    hovered && noiseBallColor.lerp(currentColor.set(newColor).convertSRGBToLinear(), 0.01);

    // THREE.MathUtils.lerp(noiseBall.current.material.color, new THREE.Color("#326aef"));
    noiseBall.current.rotation.y = t / 10;
    noiseBall.current.rotation.z = t / 10;
    noiseBall.current.position.y = Math.sin(t / 2);
    noiseBall.current.position.x = Math.cos(t / 10);
    // noisePoints.current.rotation.y = noiseBall.current.rotation.y;
    // noisePoints.current.rotation.z = noiseBall.current.rotation.z;
  });

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
    }),
    []
  );

  return (
    <group>
      {/* <points ref={noisePoints} receiveShadow>
        <icosahedronBufferGeometry args={[4, 19]} />
        <pointsMaterial size={0.03} color={color} />
      </points> */}
      <a.mesh
        ref={noiseBall}
        scale={scale}
        onPointerOver={(e) => setHovered(!hovered)}
        onPointerOut={(e) => setHovered(!hovered)}>
        <icosahedronBufferGeometry args={[4, 30]} />
        <MeshDistortMaterial
          // wireframe
          speed={3}
          distort={0.5}></MeshDistortMaterial>
      </a.mesh>
    </group>
  );
}
