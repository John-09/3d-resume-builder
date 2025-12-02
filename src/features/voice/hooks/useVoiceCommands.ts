// src/features/voice/hooks/useVoiceCommands.ts
import { useEffect, useRef } from "react";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useAppStore } from "../../../shared/store/useAppStore";
import type { Section } from "../../../shared/store/types";

/**
 * Command shape:
 * - match: string | RegExp  (if string, 'includes' (case-insensitive) is used)
 * - handler: (matchText: string, raw: string) => void
 * - description?: string
 */
type VoiceCommand = {
  match: string | RegExp;
  handler: (matched: string, raw: string) => void;
  description?: string;
};

type UseVoiceCommandsOptions = {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  autoRestart?: boolean;
  commands?: VoiceCommand[];
};

export function useVoiceCommands(opts: UseVoiceCommandsOptions = {}) {
  const {
    lang = "en-US",
    continuous = true,
    interimResults = false,
    autoRestart = true,
    commands = [],
  } = opts;

  const speech = useSpeechRecognition({ lang, continuous, interimResults, autoRestart });
  const setLastCommand = useAppStore((s) => s.setLastCommand);
  const setSection = useAppStore((s) => s.setSection);
  const setActivePanel = useAppStore((s) => s.setActivePanel);
  const toggleAudio = useAppStore((s) => s.toggleAudio);
  const setReactiveIntensity = useAppStore((s) => s.setReactiveIntensity);
  const setFocusObject = useAppStore((s) => s.setFocusObject);

  // to avoid executing same text repeatedly (some browsers may fire duplicates)
  const lastHandledRef = useRef<string | null>(null);

  useEffect(() => {
    const raw = speech.lastTranscript?.trim();
    if (!raw) return;
    const text = raw.toLowerCase();

    // avoid duplicates within short time window
    if (lastHandledRef.current === text) return;
    lastHandledRef.current = text;
    setTimeout(() => (lastHandledRef.current = null), 1200);

    // store last command into Zustand for UI
    setLastCommand(raw, speech.confidence ?? 0);

    // Try to match against provided commands
    for (const cmd of commands) {
      if (typeof cmd.match === "string") {
        if (text.includes(cmd.match.toLowerCase())) {
          cmd.handler(cmd.match as string, raw);
          return;
        }
      } else if (cmd.match instanceof RegExp) {
        const m = text.match(cmd.match);
        if (m) {
          cmd.handler(m[0], raw);
          return;
        }
      }
    }

    // Basic default parsing (fallback) — common phrases
    if (text.includes("skills") || text.includes("skill")) {
      setSection("skills" as Section);
      setActivePanel("skills" as Section);
      setFocusObject(null);
      return;
    }
    if (text.includes("experience") || text.includes("work")) {
      setSection("experience" as Section);
      setActivePanel("experience" as Section);
      setFocusObject(null);
      return;
    }
    if (text.includes("project") || text.includes("projects")) {
      setSection("projects" as Section);
      setActivePanel("projects" as Section);
      setFocusObject(null);
      return;
    }
    if (text.includes("home") || text.includes("entrance") || text.includes("back")) {
      setSection("home" as Section);
      setActivePanel(null);
      setFocusObject(null);
      return;
    }
    if (text.includes("toggle audio") || text.includes("mute") || text.includes("unmute")) {
      toggleAudio();
      return;
    }
    if (text.includes("increase intensity") || text.includes("make it stronger")) {
      setReactiveIntensity((v) => Math.min(3, v + 0.4));
      return;
    }
    if (text.includes("decrease intensity") || text.includes("make it softer")) {
      setReactiveIntensity((v) => Math.max(0, v - 0.4));
      return;
    }

    // If nothing matched, optionally you can show "I didn't get that" visually.
    // For now we simply store the last command and do nothing.
    // setLastCommand(`(no match) ${raw}`, speech.confidence ?? 0);
  }, [
    speech.lastTranscript,
    speech.confidence,
    commands,
    setLastCommand,
    setSection,
    setActivePanel,
    toggleAudio,
    setReactiveIntensity,
    setFocusObject,
    speech,
  ]);

  return {
    ...speech,
  };
}
