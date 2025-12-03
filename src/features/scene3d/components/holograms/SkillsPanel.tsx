import { Text } from "@react-three/drei";
import { HologramPanel } from "./HologramPanel";

export const SkillsPanel = ({ visible }: { visible: boolean }) => {
  return (
    <HologramPanel
      position={[1.5, 1.8, -0.2]}
      width={2}
      height={1.2}
      visible={visible}
    >
      <Text fontSize={0.12} color="white" anchorX="left" anchorY="top">
        Skills
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.2, 0]}
        anchorX="left"
      >
        • React.js
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.35, 0]}
        anchorX="left"
      >
        • TypeScript
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.5, 0]}
        anchorX="left"
      >
        • Node.js
      </Text>
    </HologramPanel>
  );
};
