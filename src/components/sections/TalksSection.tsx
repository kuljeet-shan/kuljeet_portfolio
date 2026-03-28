import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic2, 
  Terminal, 
  Users, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  ExternalLink,
  BookOpen,
  GraduationCap,
  Trophy,
  Code,
  CheckCircle2,
  Sparkles,
  Link2
} from "lucide-react";
import { 
  parseInvitedTalks, 
  parseMemberships, 
  parseCoursesTaught, 
  parseAcademicAchievements,
  parseTechnicalSkillsStructured,
} from "@/lib/cv";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export const TalksSection = () => {
  const talks = parseInvitedTalks() || [];
  const memberships = parseMemberships() || [];
  const courses = parseCoursesTaught() || [];
  const achievements = parseAcademicAchievements() || [];
  const techSkills = parseTechnicalSkillsStructured() || [];

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

  return (
    <section id="outreach" className="py-24 sm:py-32 md:py-40 relative overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 neural-pattern opacity-[0.02]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 py-1.5 px-5 border-accent/30 bg-accent/5 text-accent uppercase tracking-[0.2em] text-[10px] font-black rounded-full shadow-sm">
              Impact & Outreach
            </Badge>
          </motion.div>
          
          <AnimatedText 
            text={<>Professional <span className="text-gradient-accent">Recognition</span> Hub</>}
            textClassName="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight"
            underlineClassName="text-accent"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed"
          >
            A comprehensive look at keynote addresses, board memberships, technical expertise, and academic milestones achieved throughout the research journey.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="talks" className="space-y-12">
              <div className="flex justify-center">
                <TabsList className="bg-secondary/30 backdrop-blur-md border border-white/5 p-1 rounded-2xl h-auto shadow-xl">
                  {[
                    { value: "talks", label: "Talks", icon: Mic2 },
                    { value: "achievements", label: "Awards", icon: Trophy },
                    { value: "skills", label: "Skills", icon: Code },
                    { value: "bodies", label: "Boards", icon: Users }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className="rounded-xl px-4 sm:px-8 py-3 data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-500 font-bold flex items-center gap-2 group"
                    >
                      <tab.icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="relative">
                <TabsContent value="talks" className="mt-0 focus-visible:outline-none">
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 gap-8"
                  >
                    {talks.length > 0 ? talks.map((talk, index) => (
                      <motion.div key={`talk-${talk.id || index}`} variants={itemVariants}>
                        <Card className="glass-strong h-full relative overflow-hidden group hover:border-accent/50 transition-all duration-500 flex flex-col rounded-[2.5rem] border-accent/10 p-1">
                          <div className="bg-background/40 backdrop-blur-sm rounded-[2.4rem] p-8 h-full flex flex-col border border-white/5">
                            <div className="flex items-center justify-between mb-8">
                              <div className="p-3 rounded-2xl bg-gradient-accent shadow-lg shadow-accent/20">
                                <Mic2 className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex gap-2">
                                <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent hover:text-white transition-all text-[10px] font-black px-3 py-1 uppercase tracking-tighter">
                                  {talk.role}
                                </Badge>
                                {talk.date && (
                                  <Badge variant="outline" className="text-[10px] bg-muted/30 border-white/10 opacity-70">
                                    {talk.date}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <h4 className="text-xl sm:text-2xl font-black mb-6 leading-tight group-hover:text-accent transition-colors">
                              {talk.topic}
                            </h4>
                            
                            <div className="space-y-4 mb-8 flex-1">
                              <div className="flex items-start gap-4">
                                <div className="mt-1 p-1 rounded-full bg-accent/20">
                                  <Sparkles className="w-3 h-3 text-accent" />
                                </div>
                                <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
                                  {talk.event}
                                </p>
                              </div>
                              
                              {talk.location && (
                                <div className="flex items-center gap-3 pl-8 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                  <MapPin className="w-4 h-4 text-accent/50" />
                                  {talk.location}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6 border-t border-accent/10">
                              {talk.link && talk.link.includes("Website") && (
                                <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:opacity-70 transition-opacity">
                                  <Link2 className="w-4 h-4" /> Official Event
                                </a>
                              )}
                              {talk.link && talk.link.includes("Certificate") && (
                                <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:opacity-70 transition-opacity">
                                  <CheckCircle2 className="w-4 h-4" /> Certification
                                </a>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )) : (
                      <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-accent/20">
                        <p className="text-muted-foreground italic font-medium">Recording outreach data...</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="achievements" className="mt-0 focus-visible:outline-none">
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {achievements.length > 0 ? achievements.map((item, index) => (
                      <motion.div key={`ach-${item.title}-${index}`} variants={itemVariants}>
                        <Card className="glass-strong p-8 h-full flex flex-col hover:border-accent/40 transition-all duration-500 group relative rounded-[2rem] overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700" />
                          
                          <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center border border-white/5 shadow-inner group-hover:bg-accent group-hover:text-white transition-all duration-700">
                              <Trophy className="w-6 h-6 text-accent group-hover:text-white" />
                            </div>
                            {item.date && (
                              <div className="px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-[10px] font-black text-accent uppercase tracking-tighter">
                                {item.date}
                              </div>
                            )}
                          </div>
                          
                          <h4 className="font-black text-lg mb-6 leading-[1.3] group-hover:text-accent transition-colors relative z-10">
                            {item.title}
                          </h4>
                          
                          <div className="mt-auto space-y-5 relative z-10">
                            {item.score && (
                              <div className="flex items-center justify-between bg-accent/5 px-4 py-2.5 rounded-xl border border-accent/10 shadow-sm">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                  <GraduationCap className="w-4 h-4 text-accent" /> Proficiency
                                </span>
                                <span className="text-sm font-black text-accent">{item.score}</span>
                              </div>
                            )}
                            <p className="text-[11px] text-muted-foreground font-bold italic opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">
                              {item.details}
                            </p>
                          </div>
                        </Card>
                      </motion.div>
                    )) : (
                      <p className="text-center text-muted-foreground py-20 italic col-span-full">Awaiting academic milestones...</p>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="skills" className="mt-0 focus-visible:outline-none">
                  <div className="grid md:grid-cols-2 gap-12">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-accent/10 flex items-center justify-center shadow-lg border border-accent/10">
                          <Terminal className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black tracking-tighter">Core Stack</h3>
                          <p className="text-sm font-bold text-accent/60 uppercase tracking-widest">Technological Command</p>
                        </div>
                      </div>

                      <div className="grid gap-6">
                        {techSkills.map((cat, i) => (
                          <motion.div 
                            key={`cat-${cat.category}-${i}`} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2rem] bg-secondary/10 border border-white/5 hover:border-accent/30 transition-all group relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                              <Code className="w-20 h-20 text-accent" />
                            </div>
                            <h4 className="text-[11px] uppercase tracking-[0.4em] text-accent font-black mb-6 flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                              {cat.category}
                            </h4>
                            <div className="flex flex-wrap gap-2.5">
                              {cat.skills.map((s, j) => (
                                <span key={`skill-${i}-${j}`} className="px-4 py-2 rounded-xl bg-background/80 text-[11px] font-black border border-white/10 hover:border-accent hover:text-accent transition-all cursor-default shadow-sm">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center shadow-lg border border-primary/10">
                          <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black tracking-tighter">Academic Focus</h3>
                          <p className="text-sm font-bold text-primary/60 uppercase tracking-widest">Mentorship & Curriculum</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {courses.map((course, i) => (
                          <motion.div
                            key={`course-${i}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ delay: i * 0.03 }}
                            className="glass-strong px-6 py-4 rounded-2xl text-[11px] font-black border-white/5 hover:border-accent/40 transition-all flex items-center gap-4 cursor-default shadow-lg group"
                          >
                            <div className="w-2 h-2 rounded-full bg-accent group-hover:animate-pulse shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" />
                            {course}
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <Card className="glass-strong p-10 relative overflow-hidden group rounded-[2.5rem]">
                          <div className="absolute -bottom-10 -right-10 opacity-[0.05] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                            <GraduationCap className="w-48 h-48" />
                          </div>
                          <div className="relative z-10">
                            <Sparkles className="w-10 h-10 text-accent mb-6" />
                            <p className="text-lg text-muted-foreground leading-relaxed italic font-medium">
                              "Committed to bridge the gap between theoretical computer science and clinical impact, empowering the next generation of researchers with an architectural mindset for AI innovation."
                            </p>
                            <div className="mt-10 flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-accent p-[2px]">
                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-black text-xs">KS</div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Dr. Kuljeet Singh</span>
                                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Academic Philosophy</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </div>
                </TabsContent>

                <TabsContent value="bodies" className="mt-0 focus-visible:outline-none">
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto grid gap-4"
                  >
                    {memberships.length > 0 ? memberships.map((m, i) => (
                      <motion.div key={`mem-${m.organization}-${i}`} variants={itemVariants}>
                        <div className="glass-strong p-6 rounded-[2rem] flex flex-col sm:flex-row items-center gap-8 group hover:bg-accent/5 border-white/5 hover:border-accent/30 transition-all duration-700">
                          <div className="w-20 h-20 rounded-3xl bg-secondary/50 flex items-center justify-center flex-shrink-0 group-hover:rotate-[15deg] transition-all duration-700 shadow-inner border border-white/5">
                            <Users className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h4 className="font-black text-2xl mb-2 group-hover:text-accent transition-colors leading-tight">{m.organization}</h4>
                            {m.details && (
                              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] flex items-center justify-center sm:justify-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                                {m.details}
                              </p>
                            )}
                          </div>
                          {m.id_number && (
                            <div className="px-8 py-3 rounded-2xl bg-accent shadow-xl shadow-accent/20 text-white font-black text-xs uppercase tracking-widest group-hover:scale-105 transition-all">
                              ID: {m.id_number}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )) : (
                      <p className="text-center text-muted-foreground py-20 italic">Maintaining professional board standards...</p>
                    )}
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
        </div>
      </div>
    </section>
  );
};
