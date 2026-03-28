import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import EducationSection from "@/components/sections/EducationSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { PatentsSection } from "@/components/sections/PatentsSection";
import { TalksSection } from "@/components/sections/TalksSection";
import { TeachingSection } from "@/components/sections/TeachingSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { AcademicAchievementsSection } from "@/components/sections/AcademicAchievementsSection";
import { ProfessionalDevelopmentSection } from "@/components/sections/ProfessionalDevelopmentSection";
// 3D-enhanced sections replace originals
import { SkillsSection } from "@/components/sections/SkillsSection3D";
import { ContactSection } from "@/components/sections/ContactSection3D";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ResearchSection />
        <PublicationsSection />
        <PatentsSection />
        <TalksSection />
        <TeachingSection />
        <ProfessionalDevelopmentSection />
        <AwardsSection />
        <AcademicAchievementsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
