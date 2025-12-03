import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  width?: number;
  height?: number;
  position: [number, number, number];
  children?: React.ReactNode;
  visible: boolean; // controlled by Zustand
};

export const HologramPanel = ({
  width = 2,
  height = 1.2,
  position,
  children,
  visible,
}: Props) => {
  const groupRef = useRef<THREE.Group>(null!);

  // opacity fade animation
  const opacity = useRef(0);

  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    // Smoothly face the camera
    groupRef.current.lookAt(camera.position);

    // Fade in/out
    const targetOpacity = visible ? 1 : 0;
    opacity.current += (targetOpacity - opacity.current) * 0.1;
  });

  return (
    <group ref={groupRef} position={position} scale={1}>
      {/* Hologram background */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          transparent
          opacity={0.6 * opacity.current}
          color="#00eaff"
          emissive="#00d0ff"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Content */}
      <group position={[0, 0, 0.01]} scale={0.9}>
        {children}
      </group>
    </group>
  );
};
