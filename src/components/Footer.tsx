import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { MagneticText } from "./ui/morphing-cursor";

export const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-primary text-primary-foreground py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-accent flex items-center justify-center overflow-hidden">
              <MagneticText 
                text="KS" 
                hoverText="DR.S" 
                className="w-full h-full"
                textClassName="text-base sm:text-lg font-bold text-primary-foreground"
                hoverTextClassName="text-sm sm:text-base font-bold text-black"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold">Dr. Kuljeet Singh</span>
          </div>
          
          <p className="text-sm sm:text-base text-primary-foreground/80 max-w-2xl mx-auto px-4">
            Assistant Professor & AI Researcher specializing in Medical Imaging, 
            Healthcare Analytics, and Deep Learning
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-primary-foreground/60">
            <span>CHRIST University, Delhi-NCR</span>
            <span className="hidden sm:inline">•</span>
            <span>Central University of Jammu</span>
            <span className="hidden sm:inline">•</span>
            <span>IIT Patna</span>
          </div>

          <div className="pt-4 sm:pt-6 border-t border-primary-foreground/20">
            <p className="text-xs sm:text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Dr. Kuljeet Singh. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 rounded-full bg-gradient-accent hover:opacity-90 transition-all shadow-glow animate-scale-in z-50 w-10 h-10 sm:w-12 sm:h-12"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}
    </footer>
  );
};
