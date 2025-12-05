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

import { useFrame, useThree } from "@react-three/fiber";
import { useAppStore } from "../../../shared/store/useAppStore";
import * as THREE from "three";

export const CameraController = () => {
  const { camera } = useThree();
  const cameraTarget = useAppStore((s) => s.cameraTarget);
  const currentSection = useAppStore((s) => s.currentSection);

  // Where the camera should look for each section
  const lookTargets = {
    home: new THREE.Vector3(0, 2, 0),
    projects: new THREE.Vector3(-12, 2, 0),
    experience: new THREE.Vector3(0, 2, -5),
    skills: new THREE.Vector3(12, 2, 0),
  };

  useFrame(() => {
    // Smooth camera position
    camera.position.lerp(new THREE.Vector3(...cameraTarget), 0.05);

    // Smooth camera orientation
    camera.lookAt(lookTargets[currentSection]);
  });

  return null;
};
