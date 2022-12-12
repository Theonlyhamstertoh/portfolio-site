import { useState, useEffect, useCallback } from "react";
import useStore from "../components/useStore";
import { suspend } from "suspend-react";
import { createAudio } from "../createAudio";
export default function useAudio() {
  const mode = useStore((state) => state.mode);
  const { gain, context, update, source } = mode === "start" && intializeAudioData();
  useEffect(() => {
    if (mode === "start") {
      // Connect the gain node, which plays the audio
      gain.connect(context.destination);
      // Disconnect it on unmount
      return () => {
        gain.disconnect();
      };
    }
  }, [gain, context, mode]);

  return { gain, context, update };
}

function intializeAudioData() {
  return suspend(
    () => createAudio("/audio/Just the Two of Us.m4a"),
    ["/audio/Just the Two of Us.m4a"]
  );
}
