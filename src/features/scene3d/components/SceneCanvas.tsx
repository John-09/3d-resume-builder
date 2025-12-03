// src/features/scene3d/components/SceneCanvas.tsx
import { Canvas } from "@react-three/fiber";
import { RoomScene } from "./RoomScene";
import { CameraController } from "./CameraController";

export const SceneCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 5], fov: 55 }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

      {/* Smooth camera controller */}
      <CameraController />

      {/* 3D room content */}
      <RoomScene />
    </Canvas>
  );
};
