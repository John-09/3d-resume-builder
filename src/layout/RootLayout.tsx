// src/app/layout/RootLayout.tsx
import { Outlet, NavLink } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
          <h1 className="text-lg font-semibold tracking-tight">
            3D Voice Resume Room
          </h1>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-emerald-300 transition ${
                isActive ? "text-emerald-400 font-medium" : "text-slate-300"
              }`
            }
          >
            Room
          </NavLink>
          <NavLink
            to="/classic"
            className={({ isActive }) =>
              `hover:text-emerald-300 transition ${
                isActive ? "text-emerald-400 font-medium" : "text-slate-300"
              }`
            }
          >
            Classic
          </NavLink>
          <NavLink
            to="/playground"
            className={({ isActive }) =>
              `hover:text-emerald-300 transition ${
                isActive ? "text-emerald-400 font-medium" : "text-slate-300"
              }`
            }
          >
            Playground
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="hidden sm:inline">
            🔊 Voice & 🎵 Audio Enabled Demo
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex">
        {/* Later we can add a collapsible side panel for settings */}
        <section className="flex-1 relative">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
