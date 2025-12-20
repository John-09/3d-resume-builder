// import { useFrame, useThree } from "@react-three/fiber";
// import { useAppStore } from "../../../shared/store/useAppStore";
// import * as THREE from "three";

// export const CameraController = () => {
//   const { camera } = useThree();
//   const cameraTarget = useAppStore((s) => s.cameraTarget);
//   const currentSection = useAppStore((s) => s.currentSection);

//   // Where the camera should look for each section
//   const lookTargets = {
//     home: new THREE.Vector3(0, 2, 0),
//     projects: new THREE.Vector3(-12, 2, 0),
//     experience: new THREE.Vector3(0, 2, -5),
//     skills: new THREE.Vector3(12, 2, 0),
//   };

//   useFrame(() => {
//     // Smooth camera position
//     camera.position.lerp(new THREE.Vector3(...cameraTarget), 0.05);

//     // Smooth camera orientation
//     camera.lookAt(lookTargets[currentSection]);
//   });

//   return null;
// };

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useAppStore } from "../../../shared/store/useAppStore";
import type { Section } from "../../../shared/store/types";

type CamPreset = {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
};

// 🎯 Stable camera presets
// const PRESETS: Record<Section | "home", CamPreset> = {
//   home: {
//     position: new THREE.Vector3(0, 6, 25),
//     lookAt: new THREE.Vector3(0, 2, 0),
//   },
//   projects: {
//     position: new THREE.Vector3(-10, 4, 14),
//     lookAt: new THREE.Vector3(-14, 3, 2),
//   },
//   skills: {
//     position: new THREE.Vector3(10, 4, 14),
//     lookAt: new THREE.Vector3(14, 3, 2),
//   },
//   experience: {
//     position: new THREE.Vector3(0, 2, 10),
//     lookAt: new THREE.Vector3(0, 2, -3),
//   },
// };

const PRESETS: Record<Section | "home", CamPreset> = {
  home: {
    position: new THREE.Vector3(0, 6, 26),
    lookAt: new THREE.Vector3(0, 3, 0),
  },

  experience: {
    // This one already worked well – slight polish
    position: new THREE.Vector3(0, 4, 14),
    lookAt: new THREE.Vector3(0, 4, 0),
  },

  projects: {
    // Move camera BACK and slightly inward
    position: new THREE.Vector3(-16, 5, 18),
    lookAt: new THREE.Vector3(-10, 4, 0),
  },

  skills: {
    // Mirror of projects
    position: new THREE.Vector3(16, 5, 26),
    lookAt: new THREE.Vector3(10, 4, 0),
  },
};

export const CameraController = () => {
  const { camera } = useThree();
  const section = useAppStore((s) => s.currentSection);

  // Smoothed refs (this is the key)
  const currentPos = useRef(camera.position.clone());
  const currentLook = useRef(new THREE.Vector3());

  // Subtle idle motion
  const idleOffset = useRef(0);

  useFrame((state, delta) => {
    const preset = PRESETS[section ?? "home"];

    // 🎥 Smooth camera movement
    currentPos.current.lerp(preset.position, 3 * delta);
    currentLook.current.lerp(preset.lookAt, 3 * delta);

    // 🌬️ Subtle breathing (only when idle)
    idleOffset.current += delta;
    const idleY = Math.sin(idleOffset.current * 0.6) * 0.05;
    const idleX = Math.cos(idleOffset.current * 0.4) * 0.04;

    camera.position.set(
      currentPos.current.x + idleX,
      currentPos.current.y + idleY,
      currentPos.current.z
    );

    camera.lookAt(currentLook.current);
  });

  return null;
};
