import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Monitor, Globe, Brain, Users } from "lucide-react";
import { parseTechnicalSkills, parseDomainExpertise, parseProfessionalSkills } from "@/lib/cv";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export const SkillsSection = () => {
  const parsedTech = parseTechnicalSkills();
  const technicalSkills = [
    {
      category: "Programming Languages",
      icon: <Code2 className="h-6 w-6" />,
      skills: parsedTech.find((c) => c.category === "Programming")?.skills.length
        ? parsedTech.find((c) => c.category === "Programming")!.skills
        : ["C", "C++", "Java", "C#", "Python"],
    },
    {
      category: "Databases",
      icon: <Database className="h-6 w-6" />,
      skills: parsedTech.find((c) => c.category === "Databases")?.skills.length
        ? parsedTech.find((c) => c.category === "Databases")!.skills
        : ["Oracle", "SQL Server", "MS Access"],
    },
    {
      category: "Operating Systems",
      icon: <Monitor className="h-6 w-6" />,
      skills: parsedTech.find((c) => c.category === "Operating Systems")?.skills.length
        ? parsedTech.find((c) => c.category === "Operating Systems")!.skills
        : ["Windows", "Ubuntu", "Linux (Fedora)"],
    },
    {
      category: "Web Technologies",
      icon: <Globe className="h-6 w-6" />,
      skills: parsedTech.find((c) => c.category === "Web Technologies")?.skills.length
        ? parsedTech.find((c) => c.category === "Web Technologies")!.skills
        : ["HTML", "JavaScript"],
    },
  ];

  const domainExpertise = parseDomainExpertise().length
    ? parseDomainExpertise()
    : [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Medical Image Analysis",
        "Healthcare Analytics",
        "Time-Series Forecasting",
        "Internet of Things (IoT)",
        "Blockchain Technology",
        "Cybersecurity",
        "Meta-Learning",
        "Ensemble Methods",
        "Neural Networks",
      ];

  const professionalSkills = (parseProfessionalSkills().length
    ? parseProfessionalSkills()
    : [
        "Research Methodology",
        "Academic Writing",
        "Peer Review & Editorial",
        "Conference Organization",
        "Public Speaking",
        "Student Mentoring",
      ]
  ).map((skill) => ({ skill, icon: <Brain className="h-5 w-5" /> }));

    return (
      <section id="skills" className="py-24 sm:py-32 md:py-40 bg-muted/30 relative">
      <div className="absolute inset-0 neural-pattern opacity-20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center animate-fade-in">
          <AnimatedText 
            text={<>Technical <span className="text-gradient-accent">Skills</span></>}
            textClassName="text-3xl sm:text-4xl md:text-5xl font-bold mb-0"
            underlineClassName="text-accent"
          />
        </div>

        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          {/* Technical Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-slide-up">
            {technicalSkills.map((category, index) => (
              <Card
                key={index}
                className="glass p-4 sm:p-6 hover:shadow-glow transition-all group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-accent flex items-center justify-center mb-3 sm:mb-4 text-primary-foreground group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 group-hover:text-accent transition-colors">
                  {category.category}
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {category.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      • {skill}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Domain Expertise */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="glass p-6 sm:p-8 shadow-medium">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                  <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Domain Expertise</h3>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {domainExpertise.map((domain, index) => (
                    <Badge
                      key={index}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-black text-white dark:bg-accent/20 dark:text-accent border-black dark:border-accent/30 hover:bg-white hover:text-black transition-all cursor-default"
                    >
                    {domain}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Professional Skills */}
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Card className="glass p-6 sm:p-8 shadow-medium">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Professional & Soft Skills</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {professionalSkills.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-black dark:border-transparent bg-white dark:bg-secondary/50 hover:bg-black hover:text-white dark:hover:bg-secondary transition-all"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black dark:bg-accent/20 flex items-center justify-center text-white dark:text-accent flex-shrink-0">
                        {item.icon}
                      </div>
                    <span className="font-medium text-xs sm:text-sm">{item.skill}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
