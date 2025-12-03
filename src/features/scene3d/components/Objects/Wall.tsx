import type { JSX } from "react";

type MeshProps = JSX.IntrinsicElements["mesh"];

export const Wall = (props: MeshProps) => {
  return (
    <mesh {...props} receiveShadow castShadow>
      <boxGeometry args={[6, 2, 0.2]} />
      <meshStandardMaterial color="#222" />
    </mesh>
  );
};
