import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  count?: number;
  radius?: number;
  color?: string;
};

export const FloatingHologramParticles: React.FC<Props> = ({
  count = 40,
  radius = 2.2,
  color = "#00ffff",
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate random positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = radius * (0.6 + Math.random() * 0.4);
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * radius * 0.6;

      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }

    return arr;
  }, [count, radius]);

  const particleSize = 0.035;

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: particleSize,
      color,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Animation
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15; // slow orbit

      const time = state.clock.getElapsedTime();
      const arr = pointsRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(time * 0.5 + i) * 0.0004; // vertical float
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive attach="material" object={material} />
    </points>
  );
};
