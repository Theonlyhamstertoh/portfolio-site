import { MeshWobbleMaterial, shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import fragment from "./glsl/main.frag";
import vertex from "./glsl/main.vert";
const theme = {
  _gray: 0x222222,
  _dark: 0x000000, // Background
  _cont: 0x444444, // Lines
  _blue: 0x000fff,
  _red: 0xf00000, //
  _cyan: 0x00ffff, // Material
  _white: 0xf00589, // Lights
};

export function MorphingBall() {
  const mat = useRef();
  const mesh = useRef();
  useFrame(({ clock }) => {
    uniforms.time.value = (options.perlin.time / 10) * clock.getElapsedTime();
    uniforms.morph.value = options.perlin.morph;
    uniforms.dnoise.value = options.perlin.dnoise;

    mat.current.uniforms["RGBr"].value = options.chroma.RGBr / 10;
    mat.current.uniforms["RGBg"].value = options.chroma.RGBg / 10;
    mat.current.uniforms["RGBb"].value = options.chroma.RGBb / 10;
    mat.current.uniforms["RGBn"].value = options.chroma.RGBn / 100;
    mat.current.uniforms["RGBm"].value = options.chroma.RGBm;
    mat.current.uniforms["psize"].value = options.sphere.psize;

    // mesh.current.point.rotation.y = mesh.current.mesh.rotation.y;
    // mesh.current.point.rotation.z = mesh.current.mesh.rotation.z;
  });

  return (
    <>
      <mesh ref={mesh} receiveShadow>
        <icosahedronBufferGeometry args={[20, 10]} />
        {/* <portalMaterial /> */}
        {/* <meshNormalMaterial /> */}
        <shaderMaterial
          attach="material"
          ref={mat}
          args={[
            {
              uniforms: uniforms,
              side: THREE.DoubleSide,
              vertexShader: vertex,
              fragmentShader: fragment,
              wireframe: true,
            },
          ]}
        />
      </mesh>
    </>
  );
}

const uniforms = {
  time: {
    type: "f",
    value: 0.0,
  },
  RGBr: {
    type: "f",
    value: 4.5,
  },
  RGBg: {
    type: "f",
    value: 3.0,
  },
  RGBb: {
    type: "f",
    value: 2.0,
  },
  RGBn: {
    type: "f",
    value: 0.0,
  },
  RGBm: {
    type: "f",
    value: 1.0,
  },
  morph: {
    type: "f",
    value: 0.0,
  },
  dnoise: {
    type: "f",
    value: 3.0,
  },
  psize: {
    type: "f",
    value: 3.0,
  },
};

const options = {
  perlin: {
    time: 4.0,
    morph: 14.6,
    dnoise: 2,
  },
  chroma: {
    RGBr: 3.4,
    RGBg: 5,
    RGBb: 4.1,
    RGBn: 0.23,
    RGBm: 1.0,
  },
  camera: {
    zoom: 150,
    speedY: 0.6,
    speedX: 0.0,
    guide: false,
  },
  sphere: {
    wireframe: false,
    points: false,
    psize: 3,
  },
};
