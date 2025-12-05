import { Floor } from "./Objects/Floor";
import { Wall } from "./Objects/Wall";
import { PlaceholderObject } from "./Objects/PlaceholderObject";

import { ProjectsPanel } from "./holograms/ProjectsPanel";
import { ExperiencePanel } from "./holograms/ExperiencePanel";
import { SkillsPanel } from "./holograms/SkillsPanel";

import { useAppStore } from "../../../shared/store/useAppStore";

export const RoomScene = () => {
  const activePanel = useAppStore((s) => s.activePanel);

  return (
    <>
      {/* Room Structure */}
      <Floor />
      <Wall position={[0, 1, -10]} /> {/* Back Wall */}
      <Wall position={[-15, 1, 0]} rotation={[0, Math.PI / 2, 0]} />{" "}
      {/* Left Wall */}
      <Wall position={[15, 1, 0]} rotation={[0, -Math.PI / 2, 0]} />{" "}
      {/* Right Wall */}
      {/* Cubes */}
      <PlaceholderObject position={[-12, 2, 0]} text="" />
      <PlaceholderObject position={[0, 2, -5]} text="" />
      <PlaceholderObject position={[12, 2, 0]} text="" />
      {/* Panels (Float Above Cubes) */}
      <ProjectsPanel
        visible={activePanel === "projects"}
        position={[-12, 5, 1]}
      />
      <ExperiencePanel
        visible={activePanel === "experience"}
        position={[0, 5, -4]}
      />
      <SkillsPanel visible={activePanel === "skills"} position={[12, 5, 1]} />
    </>
  );
};
