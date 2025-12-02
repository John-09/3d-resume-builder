// src/features/voice/components/VoiceStatusIndicator.tsx
import React from "react";
import { useAppStore } from "../../../shared/store/useAppStore";

export const VoiceStatusIndicator: React.FC = () => {
  const isListening = useAppStore((s) => s.isListening);
  const lastCommand = useAppStore((s) => s.lastCommand);
  const confidence = useAppStore((s) => s.confidence);

  return (
    <div className="text-xs text-slate-300 flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${
          isListening ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
        }`}
      />
      <div>
        <div className="whitespace-nowrap">
          {isListening ? "Listening..." : "Idle"}
        </div>
        <div className="text-[11px] text-slate-400 truncate max-w-xs">
          {lastCommand
            ? `${lastCommand} (${Math.round((confidence ?? 0) * 100)}%)`
            : "No command yet"}
        </div>
      </div>
    </div>
  );
};
