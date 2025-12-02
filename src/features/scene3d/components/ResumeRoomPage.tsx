// src/features/scene3d/components/ResumeRoomPage.tsx
import { VoiceCommandButton } from "../../voice/components/VoiceCommandButton";
import { VoiceStatusIndicator } from "../../voice/components/VoiceStatusIndicator";

export const ResumeRoomPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VoiceCommandButton />
          <VoiceStatusIndicator />
        </div>
      </div>

      <div className="flex-1">
        {/* Placeholder for the Canvas / RoomScene */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
              Welcome
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold">
              3D Resume Room (Scene will be here)
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Use voice commands like "Go to skills", "Show experience", "Open
              projects", "Highlight project alpha", or "Toggle audio".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
