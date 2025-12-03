import { Text } from "@react-three/drei";
import { HologramPanel } from "./HologramPanel";

export const ExperiencePanel = ({ visible }: { visible: boolean }) => {
  return (
    <HologramPanel
      position={[0, 1.8, -1]}
      width={2.5}
      height={1.5}
      visible={visible}
    >
      <Text fontSize={0.12} color="white" anchorX="left" anchorY="top">
        Experience
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.2, 0]}
        anchorX="left"
      >
        • Frontend Developer – 2.6 years
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.35, 0]}
        anchorX="left"
      >
        • React, TypeScript, Tailwind
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.5, 0]}
        anchorX="left"
      >
        • Node.js APIs, Prisma, SQL
      </Text>
    </HologramPanel>
  );
};
