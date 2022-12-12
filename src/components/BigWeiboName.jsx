import { MeshDistortMaterial, Html, Stars } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import MenuNavigator from "./MenuNavigator";

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
        <p className="credits">
          Just The Two Of Us | Bill Withers
          {/* Fukashigi no Carte |
          <a href="https://myanimelist.net/anime/37450/Seishun_Buta_Yarou_wa_Bunny_Girl_Senpai_no_Yume_wo_Minai">
            <img class="bunny" src="/bunny girl.png" />
          </a> */}
        </p>
      </Html>
    </group>
  );
}
