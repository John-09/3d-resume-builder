import { Text } from "@react-three/drei";
import { HologramPanel } from "./HologramPanel";

export const ExperiencePanel = ({ visible, position }) => {
  return (
    <HologramPanel position={position} width={8} height={3.5} visible={visible}>
      <Text
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="top"
        position={[0, 1.8, 0.01]}
      >
        Experience
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, 0.6, 0.01]}>
        • Frontend Developer – 2.6 years
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, 0.0, 0.01]}>
        • React, TypeScript, Tailwind
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, -0.6, 0.01]}>
        • Node.js APIs, Prisma, SQL
      </Text>
    </HologramPanel>
  );
};
