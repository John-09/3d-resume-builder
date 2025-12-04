// src/features/scene3d/components/RoomScene.tsx
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
      {/* Big Floor */}
      <Floor position={[0, 0, 0]} />

      {/* Big Walls */}
      <Wall position={[0, 5, -20]} scale={[1, 5, 1]} />
      <Wall
        position={[-20, 5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 5, 1]}
      />
      <Wall
        position={[20, 5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1, 5, 1]}
      />

      {/* Cubes placed far apart */}
      <PlaceholderObject position={[0, 1.2, -5]} text="" />

      <PlaceholderObject position={[10, 1.2, 0]} text="Skills" />

      <PlaceholderObject position={[-10, 1.2, 0]} text="Projects" />

      {/* Hologram Panels positioned above cubes */}
      <ProjectsPanel visible={activePanel === "projects"} />
      <ExperiencePanel visible={activePanel === "experience"} />
      <SkillsPanel visible={activePanel === "skills"} />
    </>
  );
};
