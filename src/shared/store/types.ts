// src/shared/store/types.ts

export type Section = "home" | "skills" | "experience" | "projects" | "about";

export interface UISlice {
  activePanel: Section | null;
  showSettings: boolean;
  theme: "dark" | "cyberpunk" | "minimal";

  setActivePanel: (panel: Section | null) => void;
  toggleSettings: () => void;
  setTheme: (theme: UISlice["theme"]) => void;
}

export interface VoiceSlice {
  isListening: boolean;
  lastCommand: string | null;
  confidence: number;

  setListening: (value: boolean) => void;
  setLastCommand: (cmd: string, confidence?: number) => void;
}

export interface SceneSlice {
  currentSection: Section;
  cameraTarget: [number, number, number];
  focusObject: string | null;

  setSection: (section: Section) => void;
  setCameraTarget: (pos: [number, number, number]) => void;
  setFocusObject: (name: string | null) => void;
}

export interface AudioSlice {
  audioLevel: number;
  isAudioEnabled: boolean;
  reactiveIntensity: number;
  audioEnabled:boolean,


  setAudioLevel: (level: number) => void;
  toggleAudio: () => void;
  setReactiveIntensity: (val: number) => void;
  setAmbient:(audio: HTMLAudioElement | null) => void
  playEffect: (effectName: string) => void;
}
