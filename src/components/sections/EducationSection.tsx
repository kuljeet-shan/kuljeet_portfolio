"use client";

import { GraduationCap, Briefcase, Award, BookOpen } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

const timelineData = [
  {
    id: 1,
    title: "Ph.D.",
    date: "2022 - 2026",
    content: "Ph.D. at Central University of Jammu",
    category: "Education",
    icon: GraduationCap,
    relatedIds: [2, 6],
    status: "Completed" as const,
    proficiency: 95,
  },
  {
    id: 2,
    title: "M. Tech. (CSE)",
    date: "2025 - 2027",
    content: "M. Tech. in Computer Science & Engineering at IIT Patna.",
    category: "Education",
    icon: BookOpen,
    relatedIds: [1],
    status: "in-progress" as const,
    proficiency: 90,
  },
  {
    id: 3,
    title: "Assistant Professor",
    date: "July 2024 - Present",
    content: "Assistant Professor at CHRIST (Deemed to be University), Delhi-NCR.",
    category: "Experience",
    icon: Briefcase,
    relatedIds: [1],
    status: "completed" as const,
    proficiency: 100,
  },
  {
    id: 4,
    title: "Lecturer & Head",
    date: "2019 - 2022",
    content: "Lecturer & In-charge Head, Dept of CS & IT, Kishtwar Campus, University of Jammu.",
    category: "Experience",
    icon: Briefcase,
    relatedIds: [5],
    status: "completed" as const,
    proficiency: 85,
  },
  {
    id: 5,
    title: "MCA",
    date: "2015 - 2018",
    content: "Master of Computer Applications from University of Jammu with 7.70 CGPA.",
    category: "Education",
    icon: GraduationCap,
    relatedIds: [4, 7],
    status: "completed" as const,
    proficiency: 80,
  },
  {
    id: 6,
    title: "UGC NET Qualified",
    date: "2019 - 2021",
    content: "Qualified NTA UGC NET multiple times (Dec 2019, June 2020, Dec 2020 & June 2021).",
    category: "Achievement",
    icon: Award,
    relatedIds: [1, 3],
    status: "completed" as const,
    proficiency: 100,
  },
  {
    id: 7,
    title: "B.Sc.",
    date: "2012 - 2015",
    content: "Bachelor in Mathematics from University of Jammu.",
    category: "Education",
    icon: GraduationCap,
    relatedIds: [5],
    status: "completed" as const,
    proficiency: 70,
  },
];

export default function EducationSection() {
  return (
    <section
      id="education"
      className="pt-32 pb-24 bg-background text-foreground relative overflow-hidden transition-colors duration-500"
    >
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="text-center mb-0">
          <AnimatedText
            text={
              <>
                Academic & Professional <span className="text-primary">Trajectory</span>
              </>
            }
            textClassName="text-4xl md:text-5xl font-bold text-foreground mb-0 tracking-tight"
            underlineClassName="text-primary"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium mt-8">
            An interactive orbital journey through my educational milestones, professional experiences, and research certifications.
          </p>
        </div>
      </div>

      <div className="relative w-full h-[400px] sm:h-[550px] mt-4">
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>

      <div className="container mx-auto px-4 mt-8 relative z-10 text-center">
        <p className="text-[10px] text-muted-foreground/80 uppercase tracking-[0.3em] font-bold">
          Explore interactive nodes • Optimized for Research Insight
        </p>
      </div>
    </section>
  );
}
