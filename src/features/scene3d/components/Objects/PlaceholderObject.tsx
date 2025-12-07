// import { Text } from "@react-three/drei";
// import type { JSX } from "react";

// export const PlaceholderObject = ({
//   text,
//   ...props
// }: JSX.IntrinsicElements["group"] & { text: string }) => {
//   return (
//     <group {...props}>
//       <mesh castShadow>
//         <boxGeometry args={[4, 4, 4]} />
//         <meshStandardMaterial color="#333" />
//       </mesh>

//       <Text
//         position={[0, 3, 0]}
//         fontSize={0.8}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         {text}
//       </Text>
//     </group>
//   );
// };

import { useState, useRef, type JSX } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type GroupProps = JSX.IntrinsicElements["group"];

type Props = GroupProps & {
  text: string;
  onSelect?: () => void;
};

export const PlaceholderObject = ({ text, onSelect, ...props }: Props) => {
  const groupRef = useRef<THREE.Group>(null); // POSITION + FLOATING HERE
  const meshRef = useRef<THREE.Mesh>(null); // SCALE + ROTATION ONLY

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const time = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    time.current += delta;

    // ------------------------------------------
    // 🎈 FLOATING IDLE ANIMATION (UP/DOWN)
    // ------------------------------------------
    const idleY = Math.sin(time.current * 1.2) * 0.12;
    const baseY = (props.position as any)[1];

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      baseY + idleY,
      4 * delta
    );

    // ------------------------------------------
    // 🔥 SCALE ANIMATION (hover/click bounce)
    // ------------------------------------------
    const hoverScale = hovered ? 1.2 : 1.0;
    const clickScale = clicked ? 1.35 : hoverScale;

    meshRef.current.scale.x = THREE.MathUtils.lerp(
      meshRef.current.scale.x,
      clickScale,
      10 * delta
    );
    meshRef.current.scale.y = THREE.MathUtils.lerp(
      meshRef.current.scale.y,
      clickScale,
      10 * delta
    );
    meshRef.current.scale.z = THREE.MathUtils.lerp(
      meshRef.current.scale.z,
      clickScale,
      10 * delta
    );

    if (clicked) {
      setTimeout(() => setClicked(false), 120);
    }

    // ------------------------------------------
    // 🔄 ROTATION ANIMATION (idle + hover tilt)
    // ------------------------------------------
    const idleRot = Math.sin(time.current * 0.8) * 0.05;
    const targetRotX = hovered ? THREE.MathUtils.degToRad(8) : idleRot;
    const targetRotY = hovered ? THREE.MathUtils.degToRad(8) : idleRot;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotX,
      6 * delta
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotY,
      6 * delta
    );
  });

  const handleClick = () => {
    setClicked(true);
    onSelect?.();
  };

  return (
    <group ref={groupRef} position={props.position}>
      {/* CUBE */}
      <mesh
        ref={meshRef}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial
          color="#222"
          emissive={clicked ? "#00ffff" : hovered ? "#00ffff" : "#000"}
          emissiveIntensity={clicked ? 1.3 : hovered ? 0.6 : 0.15}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* LABEL TEXT */}
      <Text
        position={[0, 0.9, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};
