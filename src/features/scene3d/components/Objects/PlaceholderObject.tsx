import { Text } from "@react-three/drei";
import type { JSX } from "react";

type MeshProps = JSX.IntrinsicElements["mesh"];

type Props = MeshProps & {
  text: string;
};

export const PlaceholderObject = ({ text, ...props }: Props) => {
  return (
    <group {...props}>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};
