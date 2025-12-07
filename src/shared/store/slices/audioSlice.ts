import type { StateCreator } from "zustand";

export type AudioSlice = {
  audioEnabled: boolean;
  toggleAudio: () => void;

  playEffect: (name: string) => void;
  currentAmbient: HTMLAudioElement | null;
  setAmbient: (audio: HTMLAudioElement | null) => void;
};

export const createAudioSlice: StateCreator<any, [], [], AudioSlice> = (
  set,
  get
) => ({
  audioEnabled: true,

  toggleAudio: () => {
    const enabled = get().audioEnabled;

    if (enabled && get().currentAmbient) {
      get().currentAmbient.pause();
    } else if (!enabled && get().currentAmbient) {
      get().currentAmbient.play().catch(() => {});
    }

    set({ audioEnabled: !enabled });
  },

  playEffect: (name: string) => {
    if (!get().audioEnabled) return;

    try {
      const audio = new Audio(`/audio/${name}.mp3`);
      audio.volume = 0.7;
      audio.play().catch(() => {});
    } catch {}
  },

  currentAmbient: null,

  setAmbient: (audio) => set({ currentAmbient: audio }),
});
