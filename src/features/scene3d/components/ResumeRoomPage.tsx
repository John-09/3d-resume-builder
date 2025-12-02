// src/features/scene3d/components/ResumeRoomPage.tsx
export const ResumeRoomPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="text-center space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
          Welcome
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold">
          3D Resume Room (Coming Next)
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          This area will host the interactive 3D scene, voice commands, and
          audio-reactive visuals. For now, it&apos;s just a placeholder layout.
        </p>
      </div>
    </div>
  );
};
