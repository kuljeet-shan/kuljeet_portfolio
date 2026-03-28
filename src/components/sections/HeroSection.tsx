import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Stars } from "@react-three/drei";
import type { Mesh } from "three";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  BookOpen,
  Globe,
  UserCircle2,
} from "lucide-react";
import { useWebGL } from "@/hooks/use-webgl";
import cvPdf from "@/assets/CV_Kuljeet.pdf";

type ParticleProps = {
  count?: number;
};

function NeuralConstellation({ count = 80 }: ParticleProps) {
  const points = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      scale: 0.03 + Math.random() * 0.06,
    }));
  }, [count]);

  return (
    <group>
      {points.map((point, index) => (
        <mesh key={index} position={point.position} scale={point.scale}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#7dd3fc" : index % 3 === 1 ? "#c4b5fd" : "#67e8f9"}
            emissive={index % 3 === 0 ? "#0ea5e9" : index % 3 === 1 ? "#8b5cf6" : "#0891b2"}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitRing({
  radius = 1.8,
  y = 0,
  speed = 0.4,
}: {
  radius?: number;
  y?: number;
  speed?: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.rotation.x = 1.1;
  });

  return (
    <mesh ref={ref} position={[0, y, 0]}>
      <torusGeometry args={[radius, 0.025, 16, 120]} />
      <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={1.1} />
    </mesh>
  );
}

function FloatingResearchCore() {
  const coreRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.x = state.clock.elapsedTime * 0.35;
    coreRef.current.rotation.y = state.clock.elapsedTime * 0.55;
  });

  return (
    <group>
      <Float speed={2.1} rotationIntensity={0.9} floatIntensity={1.2}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#7c3aed"
            emissiveIntensity={1.2}
            metalness={0.85}
            roughness={0.15}
            wireframe={false}
          />
        </mesh>
      </Float>

      <mesh scale={1.45}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.22} />
      </mesh>

      <OrbitRing radius={1.7} speed={0.55} />
      <OrbitRing radius={2.15} y={0.15} speed={-0.35} />
      <OrbitRing radius={2.55} y={-0.15} speed={0.25} />

      <Float speed={1.4} floatIntensity={0.9}>
        <Html position={[0, 2.4, 0]} center>
          <div className="rounded-full border border-accent/30 bg-background/80 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-accent backdrop-blur">
            AI • MEDICAL IMAGING • HEALTHCARE
          </div>
        </Html>
      </Float>
    </group>
  );
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 48 }}>
      <Suspense fallback={null}>
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 7, 14]} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 4, 3]} intensity={1.7} color="#c4b5fd" />
        <pointLight position={[-3, -2, 3]} intensity={1.6} color="#67e8f9" />
        <pointLight position={[3, 2, -2]} intensity={1.2} color="#22d3ee" />

        <Stars radius={55} depth={26} count={1800} factor={3.2} saturation={0} fade speed={0.7} />
        <NeuralConstellation count={90} />
        <FloatingResearchCore />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.9}
          minPolarAngle={Math.PI / 2.2}
        />
      </Suspense>
    </Canvas>
  );
}

const stats = [
  { value: "31+", label: "Publications" },
  { value: "7+", label: "Patents" },
  { value: "4x", label: "UGC NET" },
  { value: "AI", label: "Healthcare Focus" },
];

const socialLinks = [
  {
    icon: BookOpen,
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=SUeFXRIAAAAJ&hl=en",
  },
  {
    icon: UserCircle2,
    label: "Scopus Profile",
    href: "https://www.scopus.com/authid/detail.uri?authorId=57221031051",
  },
  {
    icon: Globe,
    label: "ORCID",
    href: "https://orcid.org/0000-0003-2592-8625",
  },
  {
    icon: UserCircle2,
    label: "VIDWAN",
    href: "https://vidwan.inflibnet.ac.in/profile/554218",
  },
  {
    icon: Globe,
    label: "Web of Science",
    href: "https://www.webofscience.com/wos/author/record/2062334",
  },
  {
    icon: BookOpen,
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Kuljeet-Singh-11",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/kuljeet-shan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kuljeet-singh7/",
  },
];

export const HeroSection = () => {
  const { supported } = useWebGL();

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-border bg-background text-foreground"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_left,rgba(139,92,246,0.10),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(139,92,246,0.18),transparent_28%),linear-gradient(to_bottom,rgba(2,6,23,0.95),rgba(2,6,23,1))]" />
      <div className="absolute inset-0 opacity-20 dark:opacity-30 hero-grid" />

      <div className="container relative z-10 mx-auto px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="border-accent/30 bg-accent/10 text-accent hover:bg-accent/10">
                Assistant Professor • AI Researcher
              </Badge>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
                Dr. Kuljeet Singh
              </h1>

              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                Advancing <span className="text-primary">medical imaging</span>,
                <span className="text-violet-600 dark:text-violet-300"> brain healthcare</span>, and
                <span className="text-accent"> AI-driven diagnostics</span> through research,
                teaching, and real-world academic innovation.
              </p>
            </div>

            <div className="grid max-w-2xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card/60 px-5 py-4 backdrop-blur-sm"
                >
                  <div className="text-2xl font-semibold text-card-foreground">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:opacity-90"
                onClick={() =>
                  document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-border bg-card/50 text-foreground hover:bg-card"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border bg-card/50 text-foreground hover:bg-card"
              >
                <a href={cvPdf} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-foreground transition hover:border-accent/40 hover:bg-card"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="hero-glow absolute inset-0 rounded-[2rem]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/50 shadow-2xl backdrop-blur-md">
              <div className="h-[420px] w-full md:h-[520px]">
                {supported !== false ? (
                  <HeroScene />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_30%)] px-8 text-center">
                    <div className="mb-4 h-28 w-28 rounded-full border border-accent/30 bg-accent/10" />
                    <h3 className="text-2xl font-semibold text-foreground">3D research preview</h3>
                    <p className="mt-3 max-w-md text-muted-foreground">
                      This portfolio includes interactive 3D visuals for AI, healthcare analytics,
                      and academic research themes.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid gap-3 border-t border-border bg-card/70 p-5 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card/70 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-accent">Focus</div>
                  <div className="mt-2 text-sm text-foreground">
                    AI for brain and medical image analysis
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card/70 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
                    Current Role
                  </div>
                  <div className="mt-2 text-sm text-foreground">CHRIST University, Delhi-NCR</div>
                </div>
                <div className="rounded-xl border border-border bg-card/70 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary">Theme</div>
                  <div className="mt-2 text-sm text-foreground">
                    Academic portfolio with premium 3D depth
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
