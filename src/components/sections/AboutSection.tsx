import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, CheckCircle2, Sparkles } from "lucide-react";
import { parseEducation, parseHighlights } from "@/lib/cv";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export const AboutSection = () => {
  const highlights = parseHighlights().length
    ? parseHighlights()
    : [
        "Assistant Professor, CHRIST University, Delhi-NCR (July 2024 - Present)",
        "Doctoral Research Scholar, Central University of Jammu",
        "M.Tech (CSE), IIT Patna - Pursuing",
        "NET & HP-SET Qualified (Multiple UGC-NET cleared)",
      ];

  const educationParsed = parseEducation();
    const education = educationParsed.length
      ? educationParsed
      : [
            { degree: "Ph.D.", institution: "Central University of Jammu", status: "Pursuing", year: "2022 - till date" },
          { degree: "M.Tech (CSE)", institution: "IIT Patna", status: "Pursuing", year: "2025 - Present" },
          { degree: "MCA", institution: "University of Jammu", grade: "7.70 CGPA", year: "2015 - 2018" },
          { degree: "B.Sc.", institution: "University of Jammu", grade: "61.39%", year: "2012 - 2015" },
        ];

    return (
      <section id="about" className="py-24 sm:py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 neural-pattern opacity-30" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in flex flex-col items-center">
            <AnimatedText 
              text={<>About <span className="text-gradient-accent">Me</span></>}
              textClassName="text-3xl sm:text-4xl md:text-5xl font-bold mb-0"
              underlineClassName="text-accent"
            />
          </div>

          {/* Interactive Bio Card */}
          <Card className="w-full min-h-[500px] bg-white dark:bg-black border border-black dark:border-white/10 relative overflow-hidden mb-12 shadow-strong group animate-slide-up">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="currentColor"
            />
            
            <div className="flex flex-col lg:flex-row h-full">
              {/* Left content */}
              <div className="flex-1 p-6 sm:p-8 md:p-10 relative z-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                    <Sparkles className="h-5 w-5 text-white dark:text-black" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Academic Profile</h3>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-black/70 dark:from-white dark:to-white/70 mb-6">
                  Dr. Kuljeet Singh
                </h1>
                
                <p className="text-base sm:text-lg text-black dark:text-white/90 leading-relaxed mb-8 max-w-2xl">
                  Assistant Professor at CHRIST (Deemed to be University), Delhi-NCR. Currently advancing the frontiers of AI 
                  through doctoral research at Central University of Jammu and M.Tech at IIT Patna. Passionate about 
                  transforming healthcare through deep learning and data science.
                </p>

                {/* Key Highlights Grid */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.slice(0, 4).map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-lg border border-black dark:border-white/20 bg-white/50 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group/item"
                    >
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5 group-hover/item:text-current" />
                      <span className="text-xs sm:text-sm font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right content - 3D Scene */}
              <div className="flex-1 min-h-[300px] lg:min-h-full relative overflow-hidden bg-black/5 dark:bg-white/5 border-t lg:border-t-0 lg:border-l border-black dark:border-white/10">
                <div className="absolute inset-0 z-0">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
                {/* Overlay gradient for better blending */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white dark:from-black via-transparent to-transparent hidden lg:block" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white dark:from-black via-transparent to-transparent lg:hidden" />
              </div>
            </div>
          </Card>

          {/* Education Timeline */}
          <Card className="p-6 sm:p-8 md:p-10 border border-black dark:border-white/10 bg-white dark:bg-black/50 shadow-medium animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-2xl">Educational Background</span>
            </h3>
            
            <div className="space-y-4">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-6 sm:pl-8 pb-4 sm:pb-6 border-l-2 border-accent/30 last:pb-0 hover:border-accent transition-colors group"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent -translate-x-[7px] sm:-translate-x-[9px] group-hover:scale-125 transition-transform" />
                  <div className="space-y-1">
                    <div className="flex items-start sm:items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-base sm:text-lg">{item.degree}</h4>
                      <Badge variant="outline" className="border-accent/50 text-accent text-xs">
                        {item.status || item.grade}
                      </Badge>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">{item.institution}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground/80">{item.year}</p>
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
