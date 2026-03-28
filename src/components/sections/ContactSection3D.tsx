import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Globe, ExternalLink } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { RotatingEarth } from "../canvas/RotatingEarth";
import { CanvasLoader } from "../canvas/CanvasLoader";
import { useWebGL } from "@/hooks/use-webgl";

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "kuljeet@christuniversity.in",
    href: "mailto:kuljeet@christuniversity.in",
    color: "text-cyan-400",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    value: "CHRIST University, Delhi-NCR, India",
    href: "https://maps.google.com/?q=CHRIST+University+Delhi+NCR",
    color: "text-purple-400",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    label: "Institution",
    value: "christuniversity.in",
    href: "https://christuniversity.in",
    color: "text-blue-400",
  },
];

const academicLinks = [
  { label: "Google Scholar", href: "#", color: "border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400" },
  { label: "ResearchGate", href: "#", color: "border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400" },
  { label: "ORCID", href: "#", color: "border-green-500/30 hover:bg-green-500/10 hover:text-green-400" },
  { label: "LinkedIn", href: "#", color: "border-blue-600/30 hover:bg-blue-600/10 hover:text-blue-400" },
  { label: "GitHub", href: "#", color: "border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400" },
];

export const ContactSection = () => {
  const { supported, isMobile } = useWebGL();

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background blob */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Get In Touch</Badge>
          <AnimatedText
            text="Contact & Collaborate"
            className="items-center justify-center"
            textClassName="text-3xl sm:text-4xl md:text-5xl font-bold"
            underlineClassName="text-cyan-400"
          />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Open to research collaborations, academic partnerships, speaking invitations,
            and industry consulting in AI and medical imaging.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Earth Canvas */}
          <div className="flex justify-center">
            {supported !== false ? (
              <div className="relative w-full max-w-md h-[380px] sm:h-[440px]">
                <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-3xl" />
                <Canvas
                  camera={{ position: [0, 0, 3.5], fov: 45 }}
                  dpr={[1, isMobile ? 1 : 1.5]}
                  gl={{ antialias: !isMobile, alpha: true }}
                >
                  <Suspense fallback={<CanvasLoader />}>
                    <RotatingEarth />
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      autoRotate={false}
                      maxPolarAngle={Math.PI}
                      minPolarAngle={0}
                    />
                    <Preload all />
                  </Suspense>
                </Canvas>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Drag to rotate · Available globally for collaboration
                </p>
              </div>
            ) : (
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-glow">
                <Globe className="w-20 h-20 text-white/80" />
              </div>
            )}
          </div>

          {/* Right — Contact info */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="space-y-3">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="p-4 glass border-border/50 hover:border-cyan-500/30 hover:shadow-glow transition-all group flex items-center gap-4">
                    <span className={`${info.color} group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-medium truncate">{info.value}</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Card>
                </a>
              ))}
            </div>

            {/* Academic profiles */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Academic Profiles
              </h3>
              <div className="flex flex-wrap gap-2">
                {academicLinks.map((link) => (
                  <Button
                    key={link.label}
                    size="sm"
                    variant="outline"
                    className={`text-xs ${link.color} transition-all`}
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Collaboration note */}
            <Card className="p-5 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
              <h3 className="font-semibold text-sm mb-2 text-cyan-400">Open to Collaboration</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Actively seeking partnerships in AI-driven medical diagnostics, federated learning,
                and healthcare analytics. Industry collaborations and PhD co-supervision welcome.
              </p>
              <Button
                size="sm"
                className="mt-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold"
                asChild
              >
                <a href="mailto:kuljeet@christuniversity.in">
                  <Mail className="mr-2 h-3.5 w-3.5" />
                  Send Collaboration Request
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
