import { SceneCanvas } from "./SceneCanvas";
import { VoiceCommandButton } from "../../voice/components/VoiceCommandButton";

export const ResumeRoomPage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-black">
      {/* Voice button */}
      <div className="absolute top-4 left-4 z-20">
        <VoiceCommandButton />
      </div>

      {/* Fullscreen 3D Canvas */}
      <SceneCanvas />
    </div>
  );
};
