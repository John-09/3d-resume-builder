import { Text } from "@react-three/drei";
import { HologramPanel } from "./HologramPanel";

export const ProjectsPanel = ({ visible, position }) => {
  return (
    <HologramPanel position={position} width={8} height={3.5} visible={visible}>
      <Text
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="top"
        position={[0, 1.8, 0.01]}
      >
        Projects
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, 0.6, 0.01]}>
        • 3D Resume Builder
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, 0.0, 0.01]}>
        • Fleet Management System
      </Text>

      <Text fontSize={0.4} color="#aaffff" position={[0, -0.6, 0.01]}>
        • Reel Management Platform
      </Text>
    </HologramPanel>
  );
};
