// src/features/voice/config/defaultCommandMap.ts
import { useAppStore } from "../../../shared/store/useAppStore";

/**
 * This file demonstrates command -> handler wiring.
 * We export a factory function that returns commands tied to the store actions.
 * Use inside a component or top-level hook to pass commands into useVoiceCommands.
 */

export const createDefaultCommands = () => {
  const setSection = useAppStore.getState().setSection;
  const setActivePanel = useAppStore.getState().setActivePanel;
  const setFocusObject = useAppStore.getState().setFocusObject;
  const toggleAudio = useAppStore.getState().toggleAudio;
  const setReactiveIntensity = useAppStore.getState().setReactiveIntensity;

  const commands = [
    {
      match: /go to (skills|skill)/i,
      handler: () => {
        setSection("skills");
        setActivePanel("skills");
      },
      description: "Go to skills area",
    },
    {
      match: /show (experience|work)/i,
      handler: () => {
        setSection("experience");
        setActivePanel("experience");
      },
      description: "Show experience timeline",
    },
    {
      match: /open (projects|project)/i,
      handler: () => {
        setSection("projects");
        setActivePanel("projects");
      },
      description: "Open projects",
    },
    {
      match: /highlight (.+)/i,
      handler: (_matched, raw) => {
        // e.g. "highlight project alpha" -> focusObject = "project alpha"
        const m = raw.match(/highlight (.+)/i);
        if (m?.[1]) {
          setFocusObject(m[1].trim());
          setActivePanel(null);
        }
      },
      description: "Highlight a named object",
    },
    {
      match: /toggle audio|mute|unmute/i,
      handler: () => {
        toggleAudio();
      },
      description: "Toggle audio on/off",
    },
    {
      match: /increase intensity|make it stronger/i,
      handler: () => {
        setReactiveIntensity((v) => Math.min(3, v + 0.4));
      },
      description: "Increase audio-reactive intensity",
    },
    {
      match: /decrease intensity|make it softer/i,
      handler: () => {
        setReactiveIntensity((v) => Math.max(0, v - 0.4));
      },
      description: "Decrease audio-reactive intensity",
    },
  ];

  return commands;
};
