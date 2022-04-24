import create from "zustand";
import { suspend } from "suspend-react";
import randomColor from "randomcolor"
import { createAudio } from "../createAudio";
import { useSpring, config } from "@react-spring/three";
import { useState, useEffect, useCallback } from "react";
export const useStore = create((set, get) => ({
  playMusic: false,
  mode: false,
  audioData: () => console.log("AUDIO DATA"),
  // audioData: () => suspend(() => createAudio("/audio/aladdin.mp3"), ["/audio/aladdin.mp3"]),
  getAudioData: () => audioData,
  setMode: (mode) => set((state) => ({ mode: mode })),
  setPlay: (mode) => set((state) => ({ playMusic: mode })),
}));




export default useStore;
