// src/features/voice/components/VoiceCommandButton.tsx
import React from "react";
import { useVoiceCommands } from "../hooks/useVoiceCommands";
import { createDefaultCommands } from "../config/defaultCommandMap";

type Props = {
  className?: string;
};

export const VoiceCommandButton: React.FC<Props> = ({ className = "" }) => {
  // create commands factory and pass to hook
  const commands = createDefaultCommands();
  const {
    isSupported,
    isListening,
    start,
    stop,
    interimTranscript,
    lastTranscript,
  } = useVoiceCommands({
    commands,
    continuous: true,
    interimResults: true,
    autoRestart: true,
  });

  if (!isSupported) {
    return (
      <div className={`text-xs text-yellow-300 ${className}`}>
        Voice not supported in this browser
      </div>
    );
  }

  const toggle = () => {
    if (isListening) stop();
    else start();
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <button
        onClick={toggle}
        aria-pressed={isListening}
        aria-label={isListening ? "Stop listening" : "Start voice commands"}
        className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium 
          ${
            isListening
              ? "bg-emerald-500 text-slate-900"
              : "bg-slate-800 text-slate-200"
          } 
          transition-shadow shadow-sm hover:shadow-md focus:outline-none`}
      >
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            isListening ? "bg-white animate-pulse" : "bg-red-400"
          }`}
        />
        {isListening ? "Listening..." : "Voice"}
      </button>

      {/* quick transcript preview */}
      <div className="text-xs text-slate-400 max-w-xs text-center">
        <div className="truncate">
          {interimTranscript || lastTranscript || "Say: 'Go to skills' "}
        </div>
      </div>
    </div>
  );
};
