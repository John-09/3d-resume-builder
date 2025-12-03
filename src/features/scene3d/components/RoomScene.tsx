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
      {/* Floor */}
      <Floor />

      {/* Back Wall */}
      <Wall position={[0, 1, -3]} />

      {/* Left Wall */}
      <Wall position={[-3, 1, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Right Wall */}
      <Wall position={[3, 1, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Placeholder interactive objects */}
      <PlaceholderObject position={[0, 1, -1.5]} text="Experience" />
      <PlaceholderObject position={[1.5, 1, 0]} text="Skills" />
      <PlaceholderObject position={[-1.5, 1, 0]} text="Projects" />

      {/* ------------------------------------------------------
          HOLOGRAM PANELS (Appear based on activePanel)
         ------------------------------------------------------ */}

      <SkillsPanel visible={activePanel === "skills"} />

      <ExperiencePanel visible={activePanel === "experience"} />

      <ProjectsPanel visible={activePanel === "projects"} />
    </>
  );
};
