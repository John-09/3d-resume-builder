// src/shared/store/slices/sceneSlice.ts
import type { SceneSlice } from "../types";

export const createSceneSlice = (set: any): SceneSlice => ({
  currentSection: "home",
  cameraTarget: [0, 1.5, 5],
  focusObject: null,

  setSection: (section) => set({ currentSection: section }),
  setCameraTarget: (pos) => set({ cameraTarget: pos }),
  setFocusObject: (name) => set({ focusObject: name }),
});
