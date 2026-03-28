import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

export const FloatingBrain = () => {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.2;
      outerRef.current.rotation.z = Math.sin(t * 0.3) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
      innerRef.current.rotation.x = t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
      ringRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group>
        {/* Outer distorted sphere - main brain orb */}
        <Sphere ref={outerRef} args={[1.4, 64, 64]}>
          <MeshDistortMaterial
            color="#0891b2"
            distort={0.4}
            speed={2.5}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.85}
            envMapIntensity={1.5}
          />
        </Sphere>

        {/* Inner wireframe sphere */}
        <Sphere ref={innerRef} args={[1.0, 16, 16]}>
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.3}
          />
        </Sphere>

        {/* Orbital ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.9, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.5}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Second orbital ring at different angle */}
        <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
          <torusGeometry args={[2.1, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={1.2}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Floating satellite nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const r = 2.0;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * r, Math.sin(angle * 0.7) * 0.5, Math.sin(angle) * r]}
            >
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial
                color="#22d3ee"
                emissive="#22d3ee"
                emissiveIntensity={3}
              />
            </mesh>
          );
        })}

        {/* Core inner glow */}
        <Sphere args={[0.5, 32, 32]}>
          <MeshWobbleMaterial
            color="#67e8f9"
            factor={0.4}
            speed={3}
            transparent
            opacity={0.6}
            emissive="#22d3ee"
            emissiveIntensity={1.5}
          />
        </Sphere>

        {/* Point lights for dramatic glow */}
        <pointLight color="#22d3ee" intensity={2} distance={5} decay={2} />
        <pointLight color="#7c3aed" intensity={1} distance={8} decay={2} position={[2, 2, 2]} />
      </group>
    </Float>
  );
};
