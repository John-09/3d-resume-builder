// src/shared/store/useAppStore.ts
import { create } from "zustand";

import { createUISlice } from "./slices/uiSlice";
import { createVoiceSlice } from "./slices/voiceSlice";
import { createSceneSlice } from "./slices/sceneSlice";
import { createAudioSlice } from "./slices/audioSlice";

import type { UISlice, VoiceSlice, SceneSlice, AudioSlice } from "./types";

type AppStore = UISlice & VoiceSlice & SceneSlice & AudioSlice;

export const useAppStore = create<AppStore>()((set, get) => ({
  ...createUISlice(set, get),
  ...createVoiceSlice(set, get),
  ...createSceneSlice(set, get),
  ...createAudioSlice(set, get),
}));

