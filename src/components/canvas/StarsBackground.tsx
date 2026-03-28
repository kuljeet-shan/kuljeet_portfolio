import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

export const StarsBackground = () => {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.005;
      ref.current.rotation.y = clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <group ref={ref}>
      <Stars
        radius={80}
        depth={50}
        count={4000}
        factor={3}
        saturation={0.2}
        fade
        speed={0.5}
      />
    </group>
  );
};
