import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

export const RotatingEarth = () => {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const atmRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = t * 0.12;
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.14;
    if (atmRef.current) {
      atmRef.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <>
      <Stars radius={80} depth={50} count={2000} factor={4} saturation={0} fade />

      {/* Atmosphere glow */}
      <Sphere ref={atmRef} args={[1.15, 32, 32]}>
        <meshStandardMaterial
          color="#22d3ee"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Earth body */}
      <Sphere ref={earthRef} args={[1.0, 64, 64]}>
        <meshStandardMaterial
          color="#1a4fa0"
          roughness={0.7}
          metalness={0.1}
          emissive="#0a1a40"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Continent patches (simplified) */}
      {[
        { pos: [0.6, 0.4, 0.7] as [number,number,number], scale: 0.28 },
        { pos: [-0.7, 0.1, 0.7] as [number,number,number], scale: 0.22 },
        { pos: [0.2, -0.5, 0.85] as [number,number,number], scale: 0.18 },
        { pos: [-0.3, 0.7, 0.6] as [number,number,number], scale: 0.15 },
        { pos: [0.85, -0.3, 0.4] as [number,number,number], scale: 0.2 },
      ].map((c, i) => (
        <mesh key={i} position={c.pos}>
          <sphereGeometry args={[c.scale, 16, 16]} />
          <meshStandardMaterial
            color="#2d6a2d"
            roughness={0.9}
            emissive="#1a3a1a"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.03, 32, 32]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
          roughness={1}
        />
      </Sphere>

      {/* City light dots on night side */}
      {Array.from({ length: 30 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 30);
        const theta = Math.sqrt(30 * Math.PI) * phi;
        return (
          <mesh
            key={i}
            position={[
              Math.sin(phi) * Math.cos(theta) * 1.02,
              Math.sin(phi) * Math.sin(theta) * 1.02,
              Math.cos(phi) * 1.02,
            ]}
          >
            <sphereGeometry args={[0.008, 4, 4]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={4}
            />
          </mesh>
        );
      })}

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -2, -3]} intensity={0.3} color="#22d3ee" />
    </>
  );
};
