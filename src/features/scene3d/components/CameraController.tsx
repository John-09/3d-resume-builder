import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useAppStore } from "../../../shared/store/useAppStore";

export const CameraController = () => {
  const camera = useThree((state) => state.camera);
  const target = useRef(new THREE.Vector3());

  const cameraTarget = useAppStore((s) => s.cameraTarget);

  useFrame(() => {
    target.current.set(...cameraTarget);

    // Smooth camera movement
    camera.position.lerp(target.current, 0.05);

    // Always look at center of room
    camera.lookAt(0, 1, 0);
  });

  return null;
};
