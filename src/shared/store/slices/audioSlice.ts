// src/shared/store/slices/audioSlice.ts
import type { AudioSlice } from "../types";

export const createAudioSlice = (set: any): AudioSlice => ({
  audioLevel: 0,
  isAudioEnabled: true,
  reactiveIntensity: 1,

  setAudioLevel: (level) => set({ audioLevel: level }),
  toggleAudio: () =>
    set((s: AudioSlice) => ({ isAudioEnabled: !s.isAudioEnabled })),
  setReactiveIntensity: (val) => set({ reactiveIntensity: val }),
});
