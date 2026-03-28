import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SkillOrbProps {
  label: string;
  position: [number, number, number];
  color?: string;
  speed?: number;
}

export const SkillOrb = ({
  label,
  position,
  color = "#22d3ee",
  speed = 1,
}: SkillOrbProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.25 : 1.0, 0.08)
      );
    }
  });

  return (
    <Float speed={speed} floatIntensity={0.5} rotationIntensity={0.3} position={position}>
      <group
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <Sphere ref={meshRef} args={[0.38, 32, 32]}>
          <MeshDistortMaterial
            color={hovered ? "#67e8f9" : color}
            distort={hovered ? 0.5 : 0.25}
            speed={3}
            roughness={0.1}
            metalness={0.7}
            transparent
            opacity={0.9}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
          />
        </Sphere>

        {/* Orbital ring */}
        <mesh rotation={[Math.PI / 2 + 0.4, 0, 0]}>
          <torusGeometry args={[0.5, 0.012, 8, 60]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        <Text
          position={[0, -0.62, 0]}
          fontSize={0.13}
          color={hovered ? "#ffffff" : "#94a3b8"}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};
