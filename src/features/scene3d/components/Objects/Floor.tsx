import type { JSX } from "react";

export const Floor = (props: JSX.IntrinsicElements["mesh"]) => {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[40, 0.5, 40]} />
      <meshStandardMaterial color="#111" />
    </mesh>
  );
};
