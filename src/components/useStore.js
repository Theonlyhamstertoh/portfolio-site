import create from "zustand";
import { suspend } from "suspend-react";
import randomColor from "randomcolor"
import { createAudio } from "../createAudio";
import { useSpring, config } from "@react-spring/three";
import { useState } from "react";
export const useStore = create((set, get) => ({
  playMusic: false,
  mode: false,
  mobile: null,
  hovered: false,
  audioData: () => console.log("AUDIO DATA"),
  // audioData: () => suspend(() => createAudio("/audio/aladdin.mp3"), ["/audio/aladdin.mp3"]),
  getAudioData: () => audioData,
  setMode: (mode) => set((state) => ({ mode: mode })),
  setPlay: (mode) => set((state) => ({ playMusic: mode })),
  setMobile: () => {
    const isMobile = window.width < 450;
    const mobile = get().mobile;
    // if both are exactly the same already, then do nothing
    if (isMobile === mobile.check) return;
    console.log(isMobile);

    set((state) => {
      if (isMobile) {
        return { mobile: { check: true, resize: 2 } };
      } else {
        return { mobile: { check: false, resize: 1 } };
      }
    });
  },
  setHovered: () => set((state) => ({hovered: !hovered})), 
}));



export function useCustomSpring() {
  const [hovered, setHovered] = useState(false);

  
    const spring = useSpring({
      scale: hovered ? 1.15 : 1 ,
      distort: hovered ? 0.1 : 0.5,
      speed: hovered ? 8 : 8,
      wireframe: hovered ? false : true,
      config: { mass: 3, tension: 200, friction: 10 },
  });

  const { color } = useSpring({
    color: randomColor({ luminosity: "light" }),
    config: config.slow,
  });

  return { hovered, setHovered, spring, color}
}


export default useStore;
