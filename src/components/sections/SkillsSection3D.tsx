import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import type { Mesh } from "three";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code2, Database, Globe, Monitor } from "lucide-react";
import { parseTechnicalSkills, parseDomainExpertise } from "@/lib/cv";
import { useWebGL } from "@/hooks/use-webgl";

type OrbData = {
  label: string;
  color: string;
  position: [number, number, number];
  speed: number;
};

function SkillOrb({
  label,
  color,
  position,
  speed,
}: OrbData) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.12;
  });

  return (
    <group position={position}>
      <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.6}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.62, 48, 48]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.45}
            roughness={0.25}
            metalness={0.75}
          />
        </mesh>
        <Text
          position={[0, 0, 0.72]}
          fontSize={0.16}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}

function SkillScene({ skills }: { skills: OrbData[] }) {
  const lines = useMemo(() => {
    return [
      [-2.2, 1.2, -1.6],
      [2.2, 1.0, -1.2],
      [0, 2.2, -1.8],
      [-2.0, -1.4, -1.2],
      [2.1, -1.2, -1.4],
      [0, -2.1, -1.7],
    ] as [number, number, number][];
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 46 }}>
      <Suspense fallback={null}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={1} />
        <directionalLight position={[3, 4, 2]} intensity={1.4} color="#93c5fd" />
        <pointLight position={[-3, -2, 3]} intensity={1.5} color="#c4b5fd" />

        {skills.map((skill) => (
          <SkillOrb key={skill.label} {...skill} />
        ))}

        {lines.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        ))}

        <mesh position={[0, 0, -2.2]} rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[3.3, 0.025, 16, 120]} />
          <meshBasicMaterial color="#1d4ed8" transparent opacity={0.35} />
        </mesh>

        <mesh position={[0, 0, -2.7]} rotation={[1, 0.2, 0.2]}>
          <torusGeometry args={[2.5, 0.02, 16, 120]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.25} />
        </mesh>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Suspense>
    </Canvas>
  );
}

export const SkillsSection = () => {
  const { supported } = useWebGL();

  const parsedTech = parseTechnicalSkills();
  const domainExpertise = parseDomainExpertise().length
    ? parseDomainExpertise()
    : [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Medical Image Analysis",
        "Healthcare Analytics",
        "Federated Learning",
        "Meta-Learning",
        "IoT",
        "Cybersecurity",
      ];

  const technicalSkills = [
    {
      category: "Programming Languages",
      icon: Code2,
      skills:
        parsedTech.find((item) => item.category === "Programming")?.skills ?? [
          "C",
          "C++",
          "Java",
          "C#",
          "Python",
        ],
    },
    {
      category: "Databases",
      icon: Database,
      skills:
        parsedTech.find((item) => item.category === "Databases")?.skills ?? [
          "Oracle",
          "SQL Server",
          "MS Access",
        ],
    },
    {
      category: "Operating Systems",
      icon: Monitor,
      skills:
        parsedTech.find((item) => item.category === "Operating Systems")?.skills ?? [
          "Windows",
          "Ubuntu",
          "Linux",
        ],
    },
    {
      category: "Web Technologies",
      icon: Globe,
      skills:
        parsedTech.find((item) => item.category === "Web Technologies")?.skills ?? [
          "HTML",
          "JavaScript",
        ],
    },
  ];

  const orbSkills: OrbData[] = [
    { label: "Python", color: "#22d3ee", position: [-2.2, 1.2, 0], speed: 1.2 },
    { label: "Deep Learning", color: "#8b5cf6", position: [2.2, 1.0, 0], speed: 0.95 },
    { label: "TensorFlow", color: "#f97316", position: [0, 2.05, 0], speed: 1.05 },
    { label: "PyTorch", color: "#f43f5e", position: [-2.0, -1.35, 0], speed: 0.85 },
    { label: "Medical AI", color: "#14b8a6", position: [2.15, -1.15, 0], speed: 1.15 },
    { label: "IoT", color: "#60a5fa", position: [0, -2.05, 0], speed: 0.78 },
  ];

  return (
    <section id="skills" className="relative overflow-hidden bg-slate-950 py-20 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_25%)]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <Badge className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/10">
            3D Skills & Research Domains
          </Badge>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">Technical Expertise</h2>
          <p className="mt-4 text-lg text-slate-300">
            A 3D representation of the tools, platforms, and research areas that define my academic
            and applied AI work.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
            <div className="h-[460px] w-full">
              {supported !== false ? (
                <SkillScene skills={orbSkills} />
              ) : (
                <div className="flex h-full flex-wrap content-center justify-center gap-3 p-10">
                  {orbSkills.map((skill) => (
                    <span
                      key={skill.label}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-white/10 bg-slate-950/60 px-5 py-4 text-sm text-slate-300">
              Drag and explore the orbiting skills cluster.
            </div>
          </div>

          <div className="space-y-6">
            <Card className="rounded-[1.75rem] border-white/10 bg-white/5 p-6 text-slate-50 backdrop-blur-md">
              <div className="mb-4 flex items-center gap-3">
                <Brain className="h-5 w-5 text-cyan-300" />
                <h3 className="text-xl font-semibold">Research Domains</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {domainExpertise.map((domain) => (
                  <span
                    key={domain}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </Card>

            <div className="grid gap-5 sm:grid-cols-2">
              {technicalSkills.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.category}
                    className="rounded-[1.5rem] border-white/10 bg-white/5 p-5 text-slate-50 backdrop-blur-md"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-xl bg-white/10 p-2">
                        <Icon className="h-5 w-5 text-violet-300" />
                      </div>
                      <h4 className="font-semibold">{item.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="rounded-[1.75rem] border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6 text-slate-50 backdrop-blur-md">
              <h3 className="text-xl font-semibold">Professional Strengths</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  "Research Methodology",
                  "Academic Writing",
                  "Mentoring",
                  "Problem Solving",
                  "Curriculum Delivery",
                  "Communication",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-sm text-violet-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
