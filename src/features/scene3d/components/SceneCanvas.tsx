// src/features/scene3d/components/SceneCanvas.tsx
import { Canvas } from "@react-three/fiber";
import { RoomScene } from "./RoomScene";
import { CameraController } from "./CameraController";

export const SceneCanvas = () => {
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
    </Canvas>
  );
};
