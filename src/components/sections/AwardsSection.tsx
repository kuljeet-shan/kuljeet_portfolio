import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award as AwardIcon, Medal, Target, Scroll, Star, ExternalLink } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export const AwardsSection = () => {
  const data = [
    {
      title: "Research",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground text-sm md:text-base font-normal">
            Recognized for significant contributions to the scientific community through high-impact publications and editorial service.
          </p>
          <div className="grid gap-4">
              <div className="glass p-6 rounded-xl border border-border/50 hover:shadow-glow transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0 text-primary-foreground group-hover:scale-110 transition-transform">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">Research Awards / Recognitions</h4>
                    <p className="text-muted-foreground text-sm">
                      Our work published in ‘International Journal of Imaging Systems and Technology’ Wiley, (ISSN: 1098-1098, Scopus, SCIE, IF = 3.3, Quartile-Q2 journal) has received maximum downloads to rank within the top 10% of papers published in 2022.
                    </p>
                  </div>
                </div>
              </div>
            <div className="glass p-6 rounded-xl border border-border/50 hover:shadow-glow transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0 text-primary-foreground group-hover:scale-110 transition-transform">
                  <AwardIcon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">Active Editorial & Reviewer Recognition</h4>
                  <p className="text-muted-foreground text-sm">
                    Extensive experience as an active reviewer and editor for prestigious international journals (IEEE, Springer, Elsevier) and conferences.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="bg-accent/10 border-accent/20">Scientific Reports</Badge>
                    <Badge variant="outline" className="bg-accent/10 border-accent/20">IEEE Communications</Badge>
                    <Badge variant="outline" className="bg-accent/10 border-accent/20">BMC Informatics</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Sports",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground text-sm md:text-base font-normal">
            A competitive international chess player and national athlete, balancing academic rigor with athletic excellence.
          </p>
          <div className="grid gap-4">
            <div className="glass p-6 rounded-xl border border-border/50 hover:shadow-glow transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">International Chess Player</h4>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> FIDE ID: 537061690
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Appreciation Medal in the “1st Maharathi Open International FIDE Rapid Chess Tournament 2025” organised by “All India Chess Federation” in Delhi-NCR on 12-13 April 2025.
                    </p>
                  </div>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass p-5 rounded-xl border border-border/50">
                <Medal className="h-6 w-6 text-accent mb-3" />
                <h5 className="font-bold text-sm mb-1">1st Maharathi Open International</h5>
                <p className="text-xs text-muted-foreground">Appreciation Medal from All India Chess Federation, Delhi-NCR (2025)</p>
              </div>
              <div className="glass p-5 rounded-xl border border-border/50">
                <Medal className="h-6 w-6 text-accent mb-3" />
                <h5 className="font-bold text-sm mb-1">National Kho-Kho Player</h5>
                <p className="text-xs text-muted-foreground">1st position in J&K State School Games 2010-11 Inter District Championship</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Service",
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="glass p-6 rounded-xl border border-border/50 hover:shadow-glow transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:scale-110 transition-transform">
                  <Scroll className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">National Cadet Corps (NCC)</h4>
                  <Badge className="mb-2">Senior Under Officer</Badge>
                  <p className="text-muted-foreground text-sm">
                    Awarded 'B' and 'C' National Certificates, demonstrating discipline, leadership, and commitment to national service.
                  </p>
                </div>
              </div>
            </div>
            <div className="glass p-6 rounded-xl border border-border/50 hover:shadow-glow transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:scale-110 transition-transform">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">Chenab Valley Youth Festival</h4>
                  <p className="text-muted-foreground text-sm">
                    Second position in Javelin Throw at SANGAM-2015, Bhaderwah Campus.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 via-background to-primary/10 border border-border text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy className="h-24 w-24" />
            </div>
            <h3 className="text-xl font-bold mb-3 relative z-10">Excellence in Multiple Domains</h3>
            <p className="text-muted-foreground relative z-10 max-w-2xl mx-auto">
              Demonstrating excellence not only in research and academics but also in sports and leadership, 
              showcasing a well-rounded personality committed to continuous growth.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="awards" className="relative py-20 overflow-hidden bg-white dark:bg-background">
      <div className="absolute inset-0 neural-pattern opacity-10 pointer-events-none" />
      
        <div className="container relative z-10 mx-auto px-4 mb-16 text-center">
            <AnimatedText 
              text={<>Journey of <span className="text-gradient-accent">Excellence</span></>}
              textClassName="text-3xl md:text-5xl font-bold mb-4"
              underlineClassName="text-accent"
            />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            A track record of achievements spanning across cutting-edge research, international sports, and leadership.
          </p>
        </div>

      <div className="relative">
        <Timeline data={data} />
      </div>
    </section>
  );
};

