// src/shared/store/slices/sceneSlice.ts
import type { SceneSlice } from "../types";
// import { ScenePositions } from "../../../features/scene3d/config/scenePositions";

// export const createSceneSlice = (set: any): SceneSlice => ({
//   currentSection: "home",
//   cameraTarget: [0, 1.5, 5],
//   focusObject: null,

//   setSection: (section) =>
//     set({
//       currentSection: section,
//       cameraTarget: ScenePositions[section],
//     }),
//   setCameraTarget: (pos) => set({ cameraTarget: pos }),
//   setFocusObject: (name) => set({ focusObject: name }),
// });


import { ScenePositions } from "../../../features/scene3d/config/scenePositions";


export const createSceneSlice = (set: any, get: any):any => ({
  currentSection: "home",
  activePanel: null,

  cameraTarget: ScenePositions.home,

  setSection: (section) =>
    set({
      currentSection: section,
      activePanel: section === "home" ? null : section,
      cameraTarget: ScenePositions[section],
    }),
});
