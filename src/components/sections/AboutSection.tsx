import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, CheckCircle2, Sparkles } from "lucide-react";
import { parseEducation, parseHighlights } from "@/lib/cv";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export const AboutSection = () => {
  const highlights = parseHighlights().length
    ? parseHighlights()
    : [
        "Assistant Professor, CHRIST University, Delhi-NCR (July 2024 - Present)",
        "PhD, Central University of Jammu",
        "M.Tech (CSE), IIT Patna and MCA at University of Jammu",
        "NET & HP-SET Qualified (UGC-NET cleared four times)",
      ];

  const educationParsed = parseEducation();
  const education = educationParsed.length
    ? educationParsed
    : [
        { degree: "Ph.D.", institution: "Central University of Jammu", status: "Completed", year: "2022 - 2026" },
        { degree: "M.Tech (CSE)", institution: "IIT Patna", status: "Completed", year: "2025 - 2027" },
        { degree: "MCA", institution: "University of Jammu", grade: "7.70 CGPA", year: "2015 - 2018" },
        { degree: "B.Sc.", institution: "University of Jammu", grade: "61.39%", year: "2012 - 2015" },
      ];

  return (
    <section id="about" className="py-24 sm:py-32 md:py-40 relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 neural-pattern opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            <AnimatedText 
              text={<>About <span className="text-gradient-accent">Me</span></>}
              textClassName="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
              underlineClassName="text-accent"
            />
          </div>

          {/* Bio Card */}
          <Card className="w-full min-h-[500px] bg-card border-border relative overflow-hidden mb-12 shadow-strong">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="currentColor" />
            
            <div className="flex flex-col lg:flex-row h-full">

              {/* LEFT */}
              <div className="flex-1 p-6 sm:p-8 md:p-10 relative z-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Academic Profile
                  </h3>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Dr. Kuljeet Singh
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  Assistant Professor at CHRIST (Deemed to be University), Delhi-NCR, holding a PhD from Central University of Jammu and M.Tech from IIT Patna. 
                  My research focuses on Computational Neuroscience, Bio-inspired Computing, Cognitive Neuroscience, and Image Processing, with an emphasis on developing intelligent systems inspired by the human brain.
                </p>

                {/* Highlights */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.slice(0, 4).map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-lg border border-border bg-card/60 hover:bg-accent hover:text-accent-foreground transition-all"
                    >
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT (3D) */}
              <div className="flex-1 min-h-[300px] lg:min-h-full relative overflow-hidden bg-card border-t lg:border-t-0 lg:border-l border-border">
                <div className="absolute inset-0 z-0">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-transparent hidden lg:block" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-transparent lg:hidden" />
              </div>
            </div>
          </Card>

          {/* EDUCATION */}
          <Card className="p-6 sm:p-8 md:p-10 border-border bg-card shadow-medium">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-accent-foreground" />
              </div>
              <span>Educational Background</span>
            </h3>

            <div className="space-y-4">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-6 border-l-2 border-accent/30 last:pb-0 hover:border-accent transition-colors"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-accent -translate-x-[9px]" />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-lg">{item.degree}</h4>
                      <Badge variant="outline" className="border-accent/50 text-accent text-xs">
                        {item.status || item.grade}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground">{item.institution}</p>
                    <p className="text-sm text-muted-foreground/80">{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};
