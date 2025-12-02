// src/shared/store/slices/voiceSlice.ts
import type { VoiceSlice } from "../types";

export const createVoiceSlice = (set: any): VoiceSlice => ({
  isListening: false,
  lastCommand: null,
  confidence: 0,

  setListening: (val) => set({ isListening: val }),
  setLastCommand: (cmd, confidence = 1) =>
    set({ lastCommand: cmd, confidence }),
});
