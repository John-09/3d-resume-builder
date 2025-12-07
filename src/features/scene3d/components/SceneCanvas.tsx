// src/features/scene3d/components/SceneCanvas.tsx
import { Canvas } from "@react-three/fiber";
import { RoomScene } from "./RoomScene";
import { CameraController } from "./CameraController";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useAppStore } from "../../../shared/store/useAppStore";
import { useEffect } from "react";

export const SceneCanvas = () => {
  const audioEnabled = useAppStore((s) => s.audioEnabled);
  const setAmbient = useAppStore((s) => s.setAmbient);
  useEffect(() => {
    const ambient = new Audio("/audio/ambient_room.mp3");
    ambient.loop = true;
    ambient.volume = 0.4;

    setAmbient(ambient);

    // play ONLY after user interacts
    const enableAudio = () => {
      if (audioEnabled) {
        ambient.play().catch(() => {});
      }
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };

    window.addEventListener("click", enableAudio);
    window.addEventListener("keydown", enableAudio);

    return () => {
      ambient.pause();
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
  }, [audioEnabled, setAmbient]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 6, 25], fov: 45 }}
      style={{ width: "100vw", height: "100vh", background: "black" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

      <CameraController />
      <RoomScene />
      <EffectComposer>
        <Bloom
          intensity={1.2} // Brightness of glow
          luminanceThreshold={0.2} // What emits glow
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
};
