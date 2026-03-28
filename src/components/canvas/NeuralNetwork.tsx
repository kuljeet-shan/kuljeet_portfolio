import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  connections: number[];
}

interface NeuralNetworkProps {
  nodeCount?: number;
}

export const NeuralNetwork = ({ nodeCount = 40 }: NeuralNetworkProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const { nodes, linePositions, nodePositions } = useMemo(() => {
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.003
        ),
        connections: [],
      });
    }

    // Connect nearby nodes
    const threshold = 2.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < threshold) {
          nodes[i].connections.push(j);
        }
      }
    }

    const linePositions: number[] = [];
    nodes.forEach((node) => {
      node.connections.forEach((j) => {
        linePositions.push(
          node.position.x, node.position.y, node.position.z,
          nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
        );
      });
    });

    const nodePositions = new Float32Array(nodes.flatMap((n) => [n.position.x, n.position.y, n.position.z]));

    return { nodes, linePositions, nodePositions };
  }, [nodeCount]);

  const linePosArray = useMemo(() => new Float32Array(linePositions), [linePositions]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePosArray, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </lineSegments>

      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#22d3ee"
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
};
