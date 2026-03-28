import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DNAHelixProps {
  turns?: number;
  pointsPerTurn?: number;
}

export const DNAHelix = ({ turns = 5, pointsPerTurn = 20 }: DNAHelixProps) => {
  const group = useRef<THREE.Group>(null!);
  const totalPoints = turns * pointsPerTurn;

  const { strand1, strand2, rungs, glowSpheres } = useMemo(() => {
    const strand1Pos: number[] = [];
    const strand2Pos: number[] = [];
    const rungPos: number[] = [];
    const glowSpheres: Array<{ pos: [number, number, number]; color: string }> = [];

    for (let i = 0; i < totalPoints; i++) {
      const t = (i / totalPoints) * turns * Math.PI * 2;
      const y = (i / totalPoints) * 8 - 4;
      const r = 0.8;

      // Strand 1
      strand1Pos.push(Math.cos(t) * r, y, Math.sin(t) * r);
      // Strand 2
      strand2Pos.push(Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r);

      // Rungs every few points
      if (i % 4 === 0) {
        const x1 = Math.cos(t) * r;
        const z1 = Math.sin(t) * r;
        const x2 = Math.cos(t + Math.PI) * r;
        const z2 = Math.sin(t + Math.PI) * r;
        rungPos.push(x1, y, z1, x2, y, z2);

        if (i % 8 === 0) {
          glowSpheres.push({
            pos: [x1, y, z1],
            color: i % 16 === 0 ? "#22d3ee" : "#a78bfa",
          });
          glowSpheres.push({
            pos: [x2, y, z2],
            color: i % 16 === 0 ? "#a78bfa" : "#22d3ee",
          });
        }
      }
    }

    return {
      strand1: new Float32Array(strand1Pos),
      strand2: new Float32Array(strand2Pos),
      rungs: new Float32Array(rungPos),
      glowSpheres,
    };
  }, [turns, totalPoints]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <group ref={group}>
      {/* Strand 1 */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[strand1, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.8} linewidth={2} />
      </line>

      {/* Strand 2 */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[strand2, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a78bfa" transparent opacity={0.8} linewidth={2} />
      </line>

      {/* Rungs */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rungs, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.35} />
      </lineSegments>

      {/* Glow nodes */}
      {glowSpheres.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={2.5}
          />
        </mesh>
      ))}

      <pointLight color="#22d3ee" intensity={1.5} distance={6} position={[0, 0, 0]} />
    </group>
  );
};
