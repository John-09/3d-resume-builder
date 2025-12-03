import type { JSX } from "react";

type MeshProps = JSX.IntrinsicElements["mesh"];

export const Floor = (props: MeshProps) => {
  return (
    <mesh {...props} receiveShadow position={[0, 0, 0]}>
      <boxGeometry args={[10, 0.1, 10]} />
      <meshStandardMaterial color="#111" />
    </mesh>
  );
};
