import { Text } from "@react-three/drei";
import { HologramPanel } from "./HologramPanel";

export const ProjectsPanel = ({ visible }: { visible: boolean }) => {
  return (
    <HologramPanel
      position={[-1.5, 1.8, -0.2]}
      width={2.2}
      height={1.3}
      visible={visible}
    >
      <Text fontSize={0.12} color="white" anchorX="left" anchorY="top">
        Projects
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.2, 0]}
        anchorX="left"
      >
        • 3D Resume Builder
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.35, 0]}
        anchorX="left"
      >
        • Fleet Management System
      </Text>

      <Text
        fontSize={0.08}
        color="#aaffff"
        position={[0, -0.5, 0]}
        anchorX="left"
      >
        • Reel Management Platform
      </Text>
    </HologramPanel>
  );
};
