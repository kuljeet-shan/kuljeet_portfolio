import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Monitor, Globe, Brain, Users } from "lucide-react";
import { parseTechnicalSkills, parseDomainExpertise } from "@/lib/cv";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { SkillOrb } from "../canvas/SkillOrb";
import { NeuralNetwork } from "../canvas/NeuralNetwork";
import { CanvasLoader } from "../canvas/CanvasLoader";
import { useWebGL } from "@/hooks/use-webgl";

// Skills for 3D orbs
const orbSkills = [
  { label: "Python", color: "#22d3ee", position: [-2.5, 1.2, 0] as [number,number,number], speed: 1.2 },
  { label: "Deep Learning", color: "#a78bfa", position: [2.5, 0.8, 0] as [number,number,number], speed: 0.9 },
  { label: "TensorFlow", color: "#fb923c", position: [0, 2.0, 0] as [number,number,number], speed: 1.5 },
  { label: "PyTorch", color: "#f43f5e", position: [-2.2, -1.2, 0] as [number,number,number], speed: 1.1 },
  { label: "Medical AI", color: "#22d3ee", position: [2.2, -1.0, 0] as [number,number,number], speed: 1.3 },
  { label: "IoT", color: "#34d399", position: [0.2, -2.0, 0] as [number,number,number], speed: 0.8 },
];

export const SkillsSection = () => {
  const { supported, isMobile } = useWebGL();
  const parsedTech = parseTechnicalSkills();

  const technicalSkills = [
    {
      category: "Programming Languages",
      icon: <Code2 className="h-5 w-5" />,
      skills: parsedTech.find((c) => c.category === "Programming")?.skills ?? ["C", "C++", "Java", "C#", "Python"],
      color: "from-cyan-500/20 to-cyan-600/5",
      accent: "text-cyan-400",
    },
    {
      category: "Databases",
      icon: <Database className="h-5 w-5" />,
      skills: parsedTech.find((c) => c.category === "Databases")?.skills ?? ["Oracle", "SQL Server", "MS Access"],
      color: "from-purple-500/20 to-purple-600/5",
      accent: "text-purple-400",
    },
    {
      category: "Operating Systems",
      icon: <Monitor className="h-5 w-5" />,
      skills: parsedTech.find((c) => c.category === "Operating Systems")?.skills ?? ["Windows", "Ubuntu", "Linux"],
      color: "from-blue-500/20 to-blue-600/5",
      accent: "text-blue-400",
    },
    {
      category: "Web Technologies",
      icon: <Globe className="h-5 w-5" />,
      skills: parsedTech.find((c) => c.category === "Web Technologies")?.skills ?? ["HTML", "JavaScript"],
      color: "from-orange-500/20 to-orange-600/5",
      accent: "text-orange-400",
    },
  ];

  const domainExpertise = parseDomainExpertise().length
    ? parseDomainExpertise()
    : [
        "Artificial Intelligence", "Machine Learning", "Deep Learning",
        "Medical Image Analysis", "Healthcare Analytics", "Time-Series Forecasting",
        "Internet of Things (IoT)", "Blockchain Technology", "Cybersecurity",
        "Meta-Learning", "Ensemble Methods", "Neural Networks", "Federated Learning",
      ];

  return (
    <section id="skills" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Neural network background */}
      {supported && !isMobile && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Canvas camera={{ position: [0, 0, 12], fov: 55 }} dpr={[1, 1]} gl={{ antialias: false }}>
            <Suspense fallback={null}>
              <NeuralNetwork nodeCount={35} />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Technical Expertise</Badge>
          <AnimatedText
            text="Skills & Expertise"
            className="items-center justify-center"
            textClassName="text-3xl sm:text-4xl md:text-5xl font-bold"
            underlineClassName="text-cyan-400"
          />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A blend of technical programming skills, AI research domains, and professional competencies
            built over years of academic and applied work.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — 3D Skill Orbs */}
          <div className="order-2 lg:order-1">
            {supported !== false ? (
              <div className="h-[380px] sm:h-[440px] w-full rounded-2xl overflow-hidden glass border border-cyan-500/10">
                <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, isMobile ? 1 : 1.5]} gl={{ antialias: !isMobile, alpha: true }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
                  <pointLight position={[-5, -3, -3]} intensity={0.6} color="#a78bfa" />
                  <Suspense fallback={<CanvasLoader />}>
                    {orbSkills.map((orb) => (
                      <SkillOrb key={orb.label} {...orb} />
                    ))}
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
                    <Preload all />
                  </Suspense>
                </Canvas>
                <p className="text-center text-xs text-muted-foreground pb-3 -mt-8 relative z-10">
                  Drag to explore · Hover to highlight
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                {orbSkills.map((s) => (
                  <Badge key={s.label} style={{ borderColor: s.color, color: s.color }} variant="outline" className="text-sm px-4 py-2">
                    {s.label}
                  </Badge>
                ))}
              </div>
            )}

            {/* Domain Expertise tags */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-cyan-400" />Research Domains
              </h3>
              <div className="flex flex-wrap gap-2">
                {domainExpertise.map((domain) => (
                  <Badge
                    key={domain}
                    variant="outline"
                    className="border-muted-foreground/20 hover:border-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all text-xs"
                  >
                    {domain}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Technical skill cards */}
          <div className="order-1 lg:order-2 space-y-4">
            {technicalSkills.map((cat) => (
              <Card
                key={cat.category}
                className={`p-5 bg-gradient-to-br ${cat.color} border border-border/50 hover:border-cyan-500/30 transition-all group`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={cat.accent}>{cat.icon}</span>
                  <h3 className="font-semibold text-sm">{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}

            {/* Professional skills */}
            <Card className="p-5 border border-border/50 hover:border-purple-500/30 transition-all bg-gradient-to-br from-purple-500/10 to-purple-600/5">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-sm">Professional Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Research Methodology", "Academic Writing", "Mentoring", "Critical Thinking", "Problem Solving", "Communication"].map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs hover:bg-purple-500/20 hover:text-purple-400 transition-colors cursor-default">{s}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
