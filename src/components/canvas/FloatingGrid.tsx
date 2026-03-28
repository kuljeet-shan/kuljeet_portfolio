import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGridProps {
  color?: string;
  size?: number;
  divisions?: number;
}

export const FloatingGrid = ({
  color = "#22d3ee",
  size = 20,
  divisions = 20,
}: FloatingGridProps) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slowly scroll the grid forward
      groupRef.current.position.z = (clock.getElapsedTime() * 0.3) % (size / divisions);
      groupRef.current.rotation.x = Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <gridHelper
        args={[size, divisions, color, color]}
        material-transparent
        material-opacity={0.12}
      />
      {/* Second grid offset */}
      <gridHelper
        args={[size, divisions, color, color]}
        position={[0, 0, size]}
        material-transparent
        material-opacity={0.12}
      />
    </group>
  );
};
