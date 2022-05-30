import create from "zustand";
export const useStore = create((set, get) => ({
  playMusic: false,
  mode: false,
  mobile: false,
  setMode: (mode) => set((state) => ({ mode: mode })),
  setPlay: (mode) => set((state) => ({ playMusic: mode })),
}));

export default useStore;
