import type { StateCreator } from "zustand";

export type AudioSlice = {
  audioEnabled: boolean;
  toggleAudio: () => void;

  playEffect: (name: string) => void;
  currentAmbient: HTMLAudioElement | null;
  setAmbient: (audio: HTMLAudioElement | null) => void;
};

const SOUND_COOLDOWN: Record<string, number> = {
  click_pulse: 200,
  panel_open: 600,
  panel_close: 400,
  voice_success: 500,
  voice_unknown: 1000,
  listening_start: 800,
};

const lastPlayed: Record<string, number> = {};



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

    const now = Date.now();
  const cooldown = SOUND_COOLDOWN[name] ?? 0;
  const lastTime = lastPlayed[name] ?? 0;

  if (now - lastTime < cooldown) return;
  lastPlayed[name] = now;

  const play = (src: string) => {
    const audio = new Audio(src);
    audio.volume = 0.7;
    audio.play().catch(() => {});
  };

  // Try mp3 first, fallback to wav
  const mp3 = `/audio/${name}.mp3`;
  const wav = `/audio/${name}.wav`;

  const audio = new Audio(mp3);
  audio.volume = 0.7;

  audio.onerror = () => {
    play(wav);
  };

  audio.play().catch(() => {});
  },

  currentAmbient: null,

  setAmbient: (audio) => set({ currentAmbient: audio }),
});
