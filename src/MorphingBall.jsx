import { useSpring, a, config } from "@react-spring/three";
import {
  GradientTexture,
  Html,
  Icosahedron,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import randomColor from "randomcolor";
import { TubeBufferGeometry } from "three";
import { TorusKnotBufferGeometry } from "three";

const Animated_MeshDistortMaterial = a(MeshDistortMaterial);
export function MorphingBall() {
  const noiseBall = useRef();
  const noisePoints = useRef();
  const [hovered, setHovered] = useState(false);
  const { scale, distort, speed, wireframe } = useSpring({
    // wireframe: hovered ? true : false,
    scale: hovered ? 1.15 : 1,
    distort: hovered ? 0.7 : 0.5,
    speed: hovered ? 5 : 3,
    wireframe: hovered ? false : true,
    config: { mass: 5, tension: 400, friction: 10 },
  });

  const { lightColor, darkerColor } = useSpring({
    lightColor: randomColor({ luminosity: "light" }),
    darkerColor: randomColor({ luminosity: "random" }),
    config: config.slow,
  });

  useEffect(() => {
    // console.log((noiseBall.current.speed = 8));
    // console.log((noiseBall.current.material.distort = 0.7));
  });
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const noiseBallMaterial = noiseBall.current.material;

    THREE.MathUtils.lerp(noiseBallMaterial.distort);
    noiseBall.current.rotation.y = t / 10;
    noiseBall.current.rotation.z = t / 10;
    noiseBall.current.position.y = Math.sin(t * 3) / 10;
    noisePoints.current.rotation.y = noiseBall.current.rotation.y;
    noisePoints.current.rotation.z = noiseBall.current.rotation.z;
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
      <points ref={noisePoints} receiveShadow>
        <octahedronBufferGeometry args={[4.3, 50]} />

        <a.pointsMaterial size={0.03} color="#000000" />
      </points>

      <a.mesh
        receiveShadow
        ref={noiseBall}
        scale={scale}
        onPointerOver={(e) => setHovered(!hovered)}
        onPointerOut={(e) => setHovered(!hovered)}>
        <icosahedronBufferGeometry args={[4, 30]} />
        <Animated_MeshDistortMaterial
          wireframe={wireframe}
          speed={3}
          color={lightColor}
          distort={0.5}
          metalness={0.3}></Animated_MeshDistortMaterial>
      </a.mesh>
    </group>
  );
}
