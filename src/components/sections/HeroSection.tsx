import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "../AnimatedCounter";
import { Mail, Award, FileText, Brain, Github, Linkedin, Download } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { CanvasLoader } from "../canvas/CanvasLoader";
import { ParticleField } from "../canvas/ParticleField";
import { FloatingBrain } from "../canvas/FloatingBrain";
import { useWebGL } from "@/hooks/use-webgl";

const socialLinks = [
  { icon: <Award className="h-4 w-4" />, label: "Google Scholar", href: "#" },
  { icon: <FileText className="h-4 w-4" />, label: "ResearchGate", href: "#" },
  { icon: <Brain className="h-4 w-4" />, label: "ORCID", href: "#" },
  { icon: <Github className="h-4 w-4" />, label: "GitHub", href: "#" },
  { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "#" },
];

const stats = [
  { end: 31, suffix: "+", label: "Publications" },
  { end: 7, suffix: "+", label: "Patents" },
  { end: 5, suffix: "+", label: "Yrs Research" },
  { end: 4, suffix: "x", label: "UGC NET" },
];

export const HeroSection = () => {
  const { supported, isMobile } = useWebGL();
  const show3D = supported !== false;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Particle background */}
      {show3D && (
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.2]} gl={{ antialias: false, powerPreference: "low-power" }}>
            <Suspense fallback={null}>
              <ParticleField count={1800} color="#22d3ee" />
              <Preload all />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-background via-background/90 to-transparent" />
      <div className="absolute inset-0 z-[1] neural-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] z-[1] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] z-[1] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">

          {/* Left - Text */}
          <div className="animate-slide-in-left space-y-5 sm:space-y-7">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 text-xs px-3 py-1">
                Assistant Professor & AI Researcher
              </Badge>
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs px-3 py-1">
                CHRIST University, Delhi-NCR
              </Badge>
            </div>

            <div>
              <AnimatedText
                text="Dr. Kuljeet Singh"
                className="items-start justify-start"
                textClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-left mb-0"
                underlineClassName="text-cyan-400"
              />
              <h2 className="mt-3 text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI · Medical Imaging · Healthcare Analytics
              </h2>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Assistant Professor of Computer Science leveraging deep learning to improve
              diagnosis, prognosis, and risk prediction at the intersection of AI and
              real-world healthcare systems.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 py-2">
              {stats.map((s) => (
                <div key={s.label} className="relative glass rounded-xl p-3 text-center hover:shadow-glow transition-all group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">
                    <AnimatedCounter end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg"
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold shadow-glow w-full sm:w-auto"
                onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}>
                View Research Portfolio
              </Button>
              <Button size="lg" variant="outline"
                className="border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400 w-full sm:w-auto"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                <Mail className="mr-2 h-4 w-4" />Contact Me
              </Button>
              <Button size="lg" variant="ghost"
                className="hover:bg-purple-500/10 w-full sm:w-auto" asChild>
                <a href="/CV_Kuljeet.pdf" download>
                  <Download className="mr-2 h-4 w-4" />CV
                </a>
              </Button>
            </div>

            {/* Social */}
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.href}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:shadow-glow hover:scale-110 hover:text-cyan-400 transition-all"
                  aria-label={link.label}>{link.icon}</a>
              ))}
            </div>
          </div>

          {/* Right - 3D Brain */}
          <div className="animate-slide-in-right flex justify-center items-center h-[380px] sm:h-[460px] lg:h-[560px]">
            {show3D ? (
              <div className="w-full h-full relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
                </div>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, isMobile ? 1 : 2]} gl={{ antialias: !isMobile, alpha: true }}>
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 5, 5]} intensity={0.8} />
                  <Suspense fallback={<CanvasLoader />}>
                    <FloatingBrain />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={isMobile ? 1.5 : 0.5} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
                    <Preload all />
                  </Suspense>
                </Canvas>
              </div>
            ) : (
              <div className="glass-strong rounded-2xl p-8 text-center space-y-4 max-w-sm w-full">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-glow">
                  <span className="text-5xl font-bold text-white">KS</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Dr. Kuljeet Singh</h3>
                  <p className="text-sm text-muted-foreground mt-1">Ph.D. · M.Tech IIT Patna</p>
                </div>
                <Badge className="w-full justify-center bg-cyan-500/20 text-cyan-400 border-cyan-500/30 py-2">CHRIST University, Delhi-NCR</Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-cyan-500/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
