import type { JSX } from "react";

export const Wall = (props: JSX.IntrinsicElements["mesh"]) => {
  return (
    <mesh {...props} receiveShadow castShadow>
      <boxGeometry args={[40, 20, 0.5]} />
      <meshStandardMaterial color="#222" />
    </mesh>
  );
};
