// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef } from "react";
// import * as THREE from "three";
// import { useAppStore } from "../../../shared/store/useAppStore";

// export const CameraController = () => {
//   const camera = useThree((s) => s.camera);
//   const target = useRef(new THREE.Vector3());

//   const cameraTarget = useAppStore((s) => s.cameraTarget);

//   useFrame(() => {
//     target.current.set(...cameraTarget);
//     camera.position.lerp(target.current, 0.05);
//     camera.lookAt(0, 2, 0);
//   });

//   return null;
// };

import { useThree, useFrame } from "@react-three/fiber";
import { useAppStore } from "../../../shared/store/useAppStore";
import * as THREE from "three";

export const CameraController = () => {
  const { camera } = useThree();
  const cameraTarget = useAppStore((s) => s.cameraTarget);
  const currentSection = useAppStore((s) => s.currentSection);

  // Lookup table for where the camera should look
  const lookTargets: Record<string, [number, number, number]> = {
    home: [0, 2, 0],
    projects: [-12, 2, 0],
    experience: [0, 2, -5],
    skills: [12, 2, 0],
  };

  useFrame(() => {
    // Smooth camera position
    camera.position.lerp(new THREE.Vector3(...cameraTarget), 0.05);

    // Smooth look-at toward the active cube
    const lookAt = new THREE.Vector3(...lookTargets[currentSection]);
    camera.lookAt(lookAt);
  });

  return null;
};
