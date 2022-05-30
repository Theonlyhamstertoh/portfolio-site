import create from "zustand";
export const useStore = create((set, get) => ({
  playMusic: false,
  mode: false,
  mobile: false,
  getAudioData: () => audioData,
  setMode: (mode) => set((state) => ({ mode: mode })),
  setPlay: (mode) => set((state) => ({ playMusic: mode })),
  setMobile: (mode) => set((state) => ({ mobile: mode })),
  mobileResizeHelper: (mode) => {
    const isMobile = window.innerWidth < 550;

    // if both are exactly the same already, then do nothing
    if (isMobile === get().mobile) return;
    return isMobile ? get().setMobile(true) : get().setMobile(false);
  },
}));

export default useStore;
