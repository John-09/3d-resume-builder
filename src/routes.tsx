// src/app/routes.tsx
import type { RouteObject } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { ResumeRoomPage } from "./features/scene3d/components/ResumeRoomPage";
import { ClassicResumePage } from "./features/resume/components/ClassicResumePage";
import { PlaygroundPage } from "./features/audio/components/PlaygroundPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ResumeRoomPage />,
      },
      {
        path: "classic",
        element: <ClassicResumePage />,
      },
      {
        path: "playground",
        element: <PlaygroundPage />,
      },
    ],
  },
];
