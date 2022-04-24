import create from "zustand";
import { suspend } from "suspend-react";
import randomColor from "randomcolor";
import { createAudio } from "../createAudio";
import { useSpring, config } from "@react-spring/three";
import { useState, useEffect, useCallback } from "react";
export const useStore = create((set, get) => ({
  playMusic: false,
  mode: false,
  getAudioData: () => audioData,
  setMode: (mode) => set((state) => ({ mode: mode })),
  setPlay: (mode) => set((state) => ({ playMusic: mode })),
}));

function intializeAudioData() {
  return suspend(
    () => createAudio("/audio/aladdin.mp3"),
    ["/audio/aladdin.mp3"]
  );
}

export function useAudio() {
  const mode = useStore((state) => state.mode);
  const { gain, context, update } = mode === "start" && intializeAudioData();
  useEffect(() => {
    console.log(mode);
    if (mode === "start") {
      // Connect the gain node, which plays the audio
      gain.connect(context.destination);
      // Disconnect it on unmount
      return () => gain.disconnect();
    }
  }, [gain, context, mode]);

  return { gain, context, update };
}

export default useStore;
