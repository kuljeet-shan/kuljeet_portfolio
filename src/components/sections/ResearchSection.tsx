import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, TrendingUp, Network, Shield, Microscope } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { DNAHelix } from "../canvas/DNAHelix";
import { useWebGL } from "@/hooks/use-webgl";

const researchAreas = [
  {
    icon: <Brain className="h-7 w-7" />,
    title: "Medical Image Analysis",
    description: "AI-driven diagnosis of neurodegenerative disorders, glioblastoma, Alzheimer's, Parkinson's, ASD, and schizophrenia using MRI/CT modalities.",
    color: "from-cyan-500/20 to-transparent",
    accent: "text-cyan-400",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: <Activity className="h-7 w-7" />,
    title: "Deep Learning for Healthcare",
    description: "CNN, RNN, and meta-learning architectures for early disease detection, rare disorders, and clinical decision support systems.",
    color: "from-purple-500/20 to-transparent",
    accent: "text-purple-400",
    border: "hover:border-purple-500/40",
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    title: "Time-Series & Epidemics",
    description: "Modeling COVID-19 spread and healthcare time-series using LSTM, ensemble frameworks, and public health indicators.",
    color: "from-blue-500/20 to-transparent",
    accent: "text-blue-400",
    border: "hover:border-blue-500/40",
  },
  {
    icon: <Network className="h-7 w-7" />,
    title: "Ensemble & Meta-Learning",
    description: "Nested ensembles, stacked classifiers, and learning-to-learn paradigms for robust prediction in noisy, imbalanced domains.",
    color: "from-emerald-500/20 to-transparent",
    accent: "text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
  {
    icon: <Shield className="h-7 w-7" />,
    title: "IoT, Security & Smart Systems",
    description: "AI-enabled IoT applications, cybersecurity, smart logistics, and intelligent automation systems.",
    color: "from-orange-500/20 to-transparent",
    accent: "text-orange-400",
    border: "hover:border-orange-500/40",
  },
  {
    icon: <Microscope className="h-7 w-7" />,
    title: "Rare Disease Detection",
    description: "Meta-learning approaches for early detection of rare medical disorders with limited training data availability.",
    color: "from-rose-500/20 to-transparent",
    accent: "text-rose-400",
    border: "hover:border-rose-500/40",
  },
];

export const ResearchSection = () => {
  const { supported, isMobile } = useWebGL();

  return (
    <section id="research" className="py-20 sm:py-28 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 neural-pattern opacity-20" />

      {/* DNA helix 3D accent — right side */}
      {supported && !isMobile && (
        <div className="absolute right-0 top-0 bottom-0 w-56 z-0 opacity-40">
          <Canvas
            camera={{ position: [3, 0, 5], fov: 50 }}
            dpr={[1, 1]}
            gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <DNAHelix turns={4} pointsPerTurn={18} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Mirror left side */}
      {supported && !isMobile && (
        <div className="absolute left-0 top-0 bottom-0 w-56 z-0 opacity-25">
          <Canvas
            camera={{ position: [-3, 0, 5], fov: 50 }}
            dpr={[1, 1]}
            gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <DNAHelix turns={3} pointsPerTurn={14} />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
          <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/30">
            Research Interests
          </Badge>
          <AnimatedText
            text={<>Research <span className="text-gradient-accent">Focus</span></>}
            textClassName="text-3xl sm:text-4xl md:text-5xl font-bold mb-0"
            underlineClassName="text-accent"
          />
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
            Developing intelligent systems that bridge AI theory with real-world biomedical
            and healthcare applications — from bench to bedside.
          </p>
        </div>

        {/* Research grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {researchAreas.map((area, i) => (
            <Card
              key={i}
              className={`relative glass p-5 sm:p-6 border border-border/50 ${area.border} hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group overflow-hidden`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center mb-4 ${area.accent} group-hover:scale-110 group-hover:shadow-glow transition-all`}>
                  {area.icon}
                </div>
                <h3 className={`text-base sm:text-lg font-bold mb-2 group-hover:${area.accent} transition-colors`}>
                  {area.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Philosophy card */}
        <Card className="relative glass p-6 sm:p-8 mt-10 max-w-4xl mx-auto border border-cyan-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent" />
          <div className="relative z-10 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Research Philosophy</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I believe in <span className="text-cyan-400 font-medium">translational research</span> that creates real-world impact.
              My work focuses on developing AI solutions that are not only theoretically sound but also
              practically deployable in clinical settings — bridging the gap between AI research and clinical practice
              through cutting-edge deep learning and domain expertise in medical imaging.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
