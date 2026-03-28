import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import type { Mesh } from "three";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Globe,
  ExternalLink,
  Github,
  Linkedin,
  BookOpen,
  UserCircle2,
} from "lucide-react";
import { useWebGL } from "@/hooks/use-webgl";

function EarthSceneObject() {
  const earthRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!earthRef.current) return;
    earthRef.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <group>
      <Float speed={1.5} floatIntensity={0.7}>
        <mesh ref={earthRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#2563eb"
            emissiveIntensity={0.75}
            metalness={0.55}
            roughness={0.45}
          />
        </mesh>
      </Float>

      <mesh scale={1.16}>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.14} />
      </mesh>

      <mesh rotation={[1.1, 0.5, 0.2]}>
        <torusGeometry args={[2.15, 0.03, 16, 120]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
      </mesh>

      <mesh rotation={[0.2, 1.1, 0.6]}>
        <torusGeometry args={[2.45, 0.025, 16, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function ContactScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 46 }}>
      <Suspense fallback={null}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 2]} intensity={1.8} color="#93c5fd" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#67e8f9" />
        <Stars radius={40} depth={24} count={1400} factor={2.7} fade speed={0.6} />
        <EarthSceneObject />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.65} />
      </Suspense>
    </Canvas>
  );
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "kuljeet@christuniversity.in",
    href: "mailto:kuljeet@christuniversity.in",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "CHRIST University, Delhi-NCR, India",
    href: "https://maps.google.com/?q=CHRIST+University+Delhi+NCR",
  },
  {
    icon: Globe,
    label: "Website",
    value: "kuljeet-six.vercel.app",
    href: "https://kuljeet-six.vercel.app/",
  },
];

const academicLinks = [
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=SUeFXRIAAAAJ&hl=en",
    icon: BookOpen,
  },
  {
    label: "Scopus Profile",
    href: "https://www.scopus.com/authid/detail.uri?authorId=57221031051",
    icon: UserCircle2,
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0000-0003-2592-8625",
    icon: Globe,
  },
  {
    label: "VIDWAN",
    href: "https://vidwan.inflibnet.ac.in/profile/554218",
    icon: UserCircle2,
  },
  {
    label: "Web of Science",
    href: "https://www.webofscience.com/wos/author/record/2062334",
    icon: Globe,
  },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Kuljeet-Singh-11",
    icon: BookOpen,
  },
  {
    label: "GitHub",
    href: "https://github.com/kuljeet-shan",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kuljeet-singh7/",
    icon: Linkedin,
  },
];

export const ContactSection = () => {
  const { supported } = useWebGL();

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-20 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_right,rgba(139,92,246,0.14),transparent_30%)]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <Badge className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/10">
            Collaboration & Contact
          </Badge>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">Get In Touch</h2>
          <p className="mt-4 text-lg text-slate-300">
            Open to collaborations in medical AI, deep learning, academic projects, invited talks,
            and interdisciplinary research partnerships.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
            <div className="h-[430px] w-full">
              {supported !== false ? (
                <ContactScene />
              ) : (
                <div className="flex h-full items-center justify-center bg-[radial-gradient(circle,rgba(34,211,238,0.15),transparent_35%)] text-center">
                  <div>
                    <div className="mx-auto mb-4 h-28 w-28 rounded-full border border-cyan-300/20 bg-cyan-300/10" />
                    <h3 className="text-2xl font-semibold">Global collaboration</h3>
                    <p className="mt-3 max-w-sm text-slate-300">
                      Available for academic, research, and consulting conversations.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-white/10 bg-slate-950/60 px-5 py-4 text-sm text-slate-300">
              Interactive 3D contact panel inspired by a global research network.
            </div>
          </div>

          <div className="space-y-5">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.label}
                  className="rounded-[1.5rem] border-white/10 bg-white/5 p-5 text-slate-50 backdrop-blur-md"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4"
                  >
                    <div className="rounded-2xl bg-cyan-400/10 p-3">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-400">{item.label}</div>
                      <div className="mt-1 break-words text-base font-medium text-white">
                        {item.value}
                      </div>
                    </div>
                    <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
                  </a>
                </Card>
              );
            })}

            <Card className="rounded-[1.75rem] border-white/10 bg-white/5 p-6 text-slate-50 backdrop-blur-md">
              <h3 className="text-xl font-semibold">Academic Profiles</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {academicLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </Card>

            <Card className="rounded-[1.75rem] border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6 text-slate-50 backdrop-blur-md">
              <h3 className="text-xl font-semibold">Open to Collaboration</h3>
              <p className="mt-3 text-slate-300">
                I welcome opportunities in AI-powered diagnostics, brain healthcare analytics,
                publication projects, invited lectures, research mentoring, and interdisciplinary
                academic initiatives.
              </p>

              <div className="mt-5">
                <Button asChild className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                  <a href="mailto:kuljeet@christuniversity.in">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Collaboration Request
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
