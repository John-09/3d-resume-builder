// src/shared/store/slices/uiSlice.ts
import type { UISlice } from "../types";

export const createUISlice = (set: any, get: any): UISlice => ({
  activePanel: null,
  showSettings: false,
  theme: "dark",

  setActivePanel: (panel) => set({ activePanel: panel }),
  toggleSettings: () =>
    set((s: UISlice) => ({ showSettings: !s.showSettings })),
  setTheme: (theme) => set({ theme }),
});
