import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Presentation, 
  Users, 
  ClipboardList,
  ChevronRight
} from "lucide-react";
import { parseDevelopmentEvents, StructuredEvent } from "@/lib/cv";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { motion } from "framer-motion";

export const ProfessionalDevelopmentSection = () => {
  const allEvents = parseDevelopmentEvents() || [];
  const events = allEvents.filter(e => ["1", "2", "3"].includes(e.id));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const getTypeIcon = (type: StructuredEvent["type"]) => {
    switch (type) {
      case "fdp": return <GraduationCap className="w-5 h-5" />;
      case "conference": return <Presentation className="w-5 h-5" />;
      case "workshop": return <Users className="w-5 h-5" />;
      case "project": return <ClipboardList className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: StructuredEvent["type"]) => {
    switch (type) {
      case "fdp": return "bg-blue-500";
      case "conference": return "bg-purple-500";
      case "workshop": return "bg-orange-500";
      case "project": return "bg-emerald-500";
      default: return "bg-accent";
    }
  };

  return (
    <section id="development" className="py-24 relative overflow-hidden bg-secondary/5">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 py-1.5 px-5 border-primary/30 bg-primary/5 text-primary uppercase tracking-[0.2em] text-[10px] font-black rounded-full shadow-sm">
              Professional Development
            </Badge>
          </motion.div>
          
          <AnimatedText 
            text={<>Events & <span className="text-gradient-primary">Training</span> Journey</>}
            textClassName="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight"
            underlineClassName="text-primary"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-medium"
          >
            A chronicle of conferences, specialized workshops, Faculty Development Programs (FDPs), and research projects attended.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {events.map((event, index) => (
              <motion.div key={`event-${event.id || index}`} variants={itemVariants}>
                <Card className="glass-strong h-full relative overflow-hidden group hover:border-primary/50 transition-all duration-500 flex flex-col rounded-[2rem] border-primary/10 p-1">
                  <div className="bg-background/40 backdrop-blur-sm rounded-[1.9rem] p-6 h-full flex flex-col border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-2xl ${getTypeColor(event.type)} shadow-lg opacity-80 group-hover:opacity-100 transition-opacity text-white`}>
                        {getTypeIcon(event.type)}
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white transition-all text-[9px] font-black px-3 py-1 uppercase">
                          {event.type}
                        </Badge>
                        {event.certificate && (
                          <Badge variant="outline" className="text-[9px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-1 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Certified
                          </Badge>
                        )}
                      </div>
                    </div>

                        <div className="flex-grow">
                          <h4 className="text-base font-black mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {event.title}
                          </h4>
                          
                          {event.subtitle && (
                            <p className="text-[10px] text-primary/70 font-bold uppercase tracking-wider mb-3 line-clamp-1">
                              {event.subtitle}
                            </p>
                          )}
                          
                          {(event.organizer || event.location) && (
                            <div className="space-y-1.5 mb-4">
                              {event.organizer && (
                                <div className="flex items-start gap-2 text-[11px] text-muted-foreground font-medium leading-snug">
                                  <Users className="w-3.5 h-3.5 mt-0.5 text-primary/40 shrink-0" />
                                  <span className="line-clamp-2">{event.organizer}</span>
                                </div>
                              )}
                              {event.location && (
                                <div className="flex items-start gap-2 text-[11px] text-muted-foreground font-medium leading-snug">
                                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-primary/40 shrink-0" />
                                  <span className="line-clamp-1">{event.location}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                      
                      <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                        {event.date && (
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5 text-primary/50" />
                            {event.date}
                          </div>
                        )}
                        <div className="p-1.5 rounded-full bg-primary/5 text-primary/30 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
};
