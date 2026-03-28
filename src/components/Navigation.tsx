import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import cvPdf from "@/assets/CV_Kuljeet.pdf";

const navItems = [
  { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
      { label: "Education", href: "#education" },
      { label: "Research", href: "#research" },
      { label: "Editorial", href: "#editorial" },
  
    { label: "Publications", href: "#publications" },
  { label: "Patents", href: "#patents" },
  { label: "Talks", href: "#talks" },
  { label: "Teaching", href: "#teaching" },
    { label: "Awards", href: "#awards" },
    { label: "Achievements", href: "#achievements" },
    { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass shadow-medium py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
                className="flex items-center gap-5 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow shrink-0 transition-transform group-hover:scale-105">
                  KS
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-lg leading-tight">Dr. Kuljeet Singh</span>
                  <span className="text-[11px] sm:text-xs text-accent font-medium leading-normal">
                    Assistant Professor & AI Researcher
                  </span>
                </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                    className={cn(
                      "px-2 py-2 rounded-md text-[13px] font-medium transition-all hover:ring-1 hover:ring-black",
                      activeSection === item.href.slice(1)
                        ? "bg-black text-white dark:bg-transparent dark:text-accent"
                        : "text-foreground"
                    )}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button className="hidden xl:flex gap-2 bg-gradient-accent hover:opacity-90 transition-opacity" asChild>
                <a href={cvPdf} target="_blank" rel="noopener noreferrer" download>
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </a>
              </Button>

              {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="xl:hidden mt-4 glass rounded-lg p-4 animate-slide-up max-h-[80vh] overflow-y-auto">

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-all border border-transparent",
                      activeSection === item.href.slice(1)
                        ? "bg-black text-white dark:bg-accent dark:text-accent-foreground"
                        : "hover:border-black dark:hover:bg-secondary"
                    )}
                >
                  {item.label}
                </a>
              ))}
              <Button className="mt-2 gap-2 bg-gradient-accent hover:opacity-90 transition-opacity" asChild>
                <a href={cvPdf} target="_blank" rel="noopener noreferrer" download>
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
