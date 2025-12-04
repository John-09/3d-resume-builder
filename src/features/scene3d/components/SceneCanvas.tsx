// src/features/scene3d/components/SceneCanvas.tsx
import { Canvas } from "@react-three/fiber";
import { RoomScene } from "./RoomScene";
import { CameraController } from "./CameraController";

export const SceneCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 12], fov: 45 }}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
        background: "black",
      }}
    >
      {/* Lights */}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 20, 10]} intensity={2} castShadow />

      {/* Camera Logic */}
      <CameraController />

      {/* Actual Scene */}
      <RoomScene />
    </Canvas>
  );
};
