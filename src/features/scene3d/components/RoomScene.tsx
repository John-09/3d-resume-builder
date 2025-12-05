import { PlaceholderObject } from "./Objects/PlaceholderObject";
import { Floor } from "./Objects/Floor";
import { Wall } from "./Objects/Wall";
import { SkillsPanel } from "./holograms/SkillsPanel";
import { ExperiencePanel } from "./holograms/ExperiencePanel";
import { ProjectsPanel } from "./holograms/ProjectsPanel";
import { useAppStore } from "../../../shared/store/useAppStore";

export const RoomScene = () => {
  const activePanel = useAppStore((s) => s.activePanel);

  return (
    <>
      {/* Floor */}
      <Floor position={[0, 0, 0]} />

      {/* Walls */}
      <Wall position={[0, 10, -20]} />
      <Wall position={[-20, 10, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Wall position={[20, 10, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Cubes (Spaced Properly) */}
      <PlaceholderObject position={[-12, 2, 0]} text="" />
      <PlaceholderObject position={[0, 2, -5]} text="" />
      <PlaceholderObject position={[12, 2, 0]} text="" />

      {/* Panels floating above cubes */}
      <ProjectsPanel
        visible={activePanel === "projects"}
        position={[-12, 5.5, 0]}
      />

      <ExperiencePanel
        visible={activePanel === "experience"}
        position={[0, 5, -5]}
      />

      <SkillsPanel visible={activePanel === "skills"} position={[12, 5.5, 0]} />
    </>
  );
};
