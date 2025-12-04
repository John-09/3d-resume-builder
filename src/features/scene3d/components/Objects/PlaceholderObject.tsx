import { Text } from "@react-three/drei";
import type { JSX } from "react";

export const PlaceholderObject = ({
  text,
  ...props
}: JSX.IntrinsicElements["group"] & { text: string }) => {
  return (
    <group {...props}>
      <mesh castShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      <Text
        position={[0, 3, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};
