import create from "zustand";
import { suspend } from "suspend-react";
const useStore = create((set, get) => ({
  playMusic: false,
  mode: false,
  mobile: {
    check: false,
    resize: 1,
  },
  audioData: suspend(() => createAudio("/audio/aladdin.mp3"), ["/audio/aladdin.mp3"]),
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
}));

export default useStore;
