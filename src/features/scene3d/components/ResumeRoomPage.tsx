// src/features/scene3d/pages/ResumeRoomPage.tsx
import { SceneCanvas } from "../components/SceneCanvas";
import { VoiceCommandButton } from "../../voice/components/VoiceCommandButton";
import { SceneHUD } from "./SceneHUD";

export const ResumeRoomPage = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 overflow-hidden bg-black">
      {/* Voice Button */}

      <SceneHUD />
      <div className="absolute top-4 left-4 z-20">
        <VoiceCommandButton />
      </div>
      <SceneCanvas />
    </div>
  );
};
