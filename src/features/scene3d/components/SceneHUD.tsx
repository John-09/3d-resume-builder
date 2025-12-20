// src/features/ui/components/SceneHUD.tsx
import { useAppStore } from "../../../shared/store/useAppStore";
import type { Section } from "../../../shared/store/types";
import { useEffect, useState } from "react";

export const SceneHUD = () => {
  const section = useAppStore((s) => s.activePanel);
  const isListening = useAppStore((s) => s.isListening);
  const setSection = useAppStore((s) => s.setSection);
  const setActivePanel = useAppStore((s) => s.setActivePanel);
  const playEffect = useAppStore((s) => s.playEffect);
  const [showHelp, setShowHelp] = useState(true);

  const goTo = (target: Section | "home") => {
    setShowHelp(false);
    setSection(target as Section);
    setActivePanel(target === "home" ? null : target);
    playEffect("panel_open");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelp(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-20
        flex flex-col items-center
        text-cyan-50
        pointer-events-auto
      "
    >
      {/* Title + mic */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-wide">
          3D Voice Resume
        </h1>

        {/* 🎙 Mic Indicator */}
        <MicIndicator active={isListening} />
      </div>

      {/* Subtitle */}
      <p className="mt-1 text-sm opacity-80 text-center">
        Say <span className="text-cyan-300 font-medium">“Go to skills”</span>,{" "}
        <span className="text-cyan-300 font-medium">“Go to projects”</span>,{" "}
        <span className="text-cyan-300 font-medium">“Go to experience”</span>
      </p>

      {/* Buttons */}
      <div className="mt-3 flex gap-3">
        <HUDButton
          active={section === "projects"}
          onClick={() => goTo("projects")}
        >
          Projects
        </HUDButton>

        <HUDButton
          active={section === "experience"}
          onClick={() => goTo("experience")}
        >
          Experience
        </HUDButton>

        <HUDButton active={section === "skills"} onClick={() => goTo("skills")}>
          Skills
        </HUDButton>
      </div>
      {/* Mini help tooltip */}
      {showHelp && (
        <div
          className="
      mt-2 px-3 py-1.5
      text-xs text-cyan-100
      bg-cyan-500/10
      border border-cyan-400/30
      rounded-md
      backdrop-blur-sm
      animate-fade-in
    "
        >
          💡 Try saying{" "}
          <span className="font-medium text-cyan-300">“Go to skills”</span>
        </div>
      )}
    </div>
  );
};

const HUDButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      relative px-4 py-1.5 text-sm rounded-md
      transition-all duration-200
      backdrop-blur-sm
      ${
        active
          ? `
            bg-cyan-400/30
            text-cyan-50
            border border-cyan-300
            scale-105
            shadow-[0_0_18px_rgba(34,211,238,0.6)]
          `
          : `
            bg-cyan-400/10
            text-cyan-100
            border border-cyan-400/40
            hover:bg-cyan-400/25
            hover:-translate-y-0.5
          `
      }
    `}
  >
    {children}

    {/* Active glow underline */}
    {active && (
      <span
        className="
          absolute left-1/2 -bottom-1
          h-0.5 w-3/4
          -translate-x-1/2
          bg-cyan-300
          blur-sm
        "
      />
    )}
  </button>
);

const MicIndicator = ({ active }: { active: boolean }) => {
  return (
    <div className="relative w-3 h-3">
      {/* Core dot */}
      <div
        className={`
            absolute inset-0 rounded-full
            transition-colors duration-200
            ${active ? "bg-cyan-300" : "bg-cyan-300/40"}
          `}
      />

      {/* Pulse ring */}
      {active && (
        <span
          className="
              absolute inset-0 rounded-full
              bg-cyan-300/40
              animate-ping
            "
        />
      )}
    </div>
  );
};
