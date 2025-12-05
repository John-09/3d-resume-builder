import { Text } from "@react-three/drei";
import { HologramPanel } from "./HologramPanel";

export const SkillsPanel = ({ visible, position }) => {
  return (
    <HologramPanel position={position} width={8} height={3.5} visible={visible}>
      <Text
        fontSize={0.7}
        color="white"
        anchorX="center"
        anchorY="top"
        position={[0, 1.8, 0.01]}
      >
        Skills
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, 0.6, 0.01]}>
        • React.js
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, 0.0, 0.01]}>
        • TypeScript
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, -0.6, 0.01]}>
        • Node.js
      </Text>
    </HologramPanel>
  );
};
