// src/features/audio/components/PlaygroundPage.tsx
export const PlaygroundPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Interaction Playground</h2>
      <p className="text-sm text-slate-400 mb-4">
        This page will be used to prototype audio-reactive visuals and
        interaction experiments that feed into the main 3D room.
      </p>
      <div className="rounded-xl border border-dashed border-slate-700 p-4 text-sm text-slate-200">
        You can show this page in interviews to walk through your thought
        process and evolution of features before integrating them into the main
        scene.
      </div>
    </div>
  );
};
