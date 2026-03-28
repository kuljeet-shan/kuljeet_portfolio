import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Quote, 
  GraduationCap, 
  Cpu, 
  Database, 
  Brain, 
  Code2, 
  Wifi, 
  BarChart3, 
  Binary, 
  Network,
  Users,
  Lightbulb,
  FlaskConical,
  Library,
  ChevronRight
} from "lucide-react";
import { extractSectionLines } from "@/lib/cv";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { motion } from "framer-motion";

export const TeachingSection = () => {
  const courses = [
    { name: "Operating Systems", icon: Cpu, color: "text-blue-500" },
    { name: "Data Structures", icon: Network, color: "text-emerald-500" },
    { name: "Software Engineering", icon: Code2, color: "text-purple-500" },
    { name: "Internet of Things", icon: Wifi, color: "text-orange-500" },
    { name: "Theory of Computation", icon: Binary, color: "text-pink-500" },
    { name: "Data Science", icon: BarChart3, color: "text-cyan-500" },
    { name: "Artificial Intelligence", icon: Brain, color: "text-rose-500" },
    { name: "Database Management Systems", icon: Database, color: "text-amber-500" },
  ];

  const methodologies = [
    { title: "Project-Based Learning", description: "Real-world implementation through hands-on development.", icon: FlaskConical },
    { title: "Interactive Sessions", description: "Encouraging critical thinking and active student participation.", icon: Users },
    { title: "Research Integration", description: "Connecting classroom concepts with latest research trends.", icon: Lightbulb },
  ];

  return (
    <section id="teaching" className="py-24 sm:py-32 md:py-40 bg-muted/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full neural-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-40 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4"
          >
            <GraduationCap className="w-3 h-3" />
            <span>ACADEMIC EXCELLENCE</span>
          </motion.div>
          <AnimatedText 
            text={<>Teaching & <span className="text-gradient-accent">Mentorship</span></>}
            textClassName="text-3xl sm:text-4xl md:text-5xl font-bold mb-0"
            underlineClassName="text-accent"
          />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Inspiring the next generation of computer scientists through a blend of theory, 
            innovation, and practical engineering excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Main Courses Grid */}
          <div className="lg:col-span-8 space-y-6 sm:gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass h-full p-5 sm:p-6 hover:border-accent/50 transition-all duration-300 group cursor-default shadow-sm hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors duration-300`}>
                        <course.icon className={`w-6 h-6 ${course.color}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">
                          {course.name}
                        </h4>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Library className="w-3 h-3 mr-1" />
                          <span>Core Curriculum</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Teaching Philosophy - The "Chalkboard" Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900 border-slate-800 p-6 sm:p-10 shadow-xl relative overflow-hidden group">
                {/* Notebook line effect */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '100% 24px' }} 
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                      <Quote className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Academic Philosophy</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed italic font-medium">
                      "I believe in fostering <span className="text-accent underline underline-offset-4 decoration-accent/30">critical thinking</span>, 
                      <span className="text-accent italic"> ethical awareness</span>, and 
                      <span className="text-accent"> hands-on experimentation</span>."
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      My approach blends foundational theory with real-world applications and research exposure. 
                      I aim to inspire students to become lifelong learners who can adapt to the rapidly evolving 
                      landscape of technology.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Methodology */}
            <Card className="glass p-6 sm:p-8 border-accent/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Library className="w-5 h-5 text-accent" />
                <span>Methodology</span>
              </h3>
              <div className="space-y-6">
                {methodologies.map((method, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{method.title}</h4>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Professional Development */}
            <Card className="glass p-6 border-accent/10">
              <h3 className="text-lg font-bold mb-4">Development</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 group hover:bg-accent/10 transition-all">
                  <p className="text-xs font-bold text-accent mb-2 tracking-wider">LATEST TRAINING</p>
                  <p className="text-sm font-semibold leading-tight mb-2">NEP 2020 Orientation Program</p>
                  <div className="flex items-center text-[10px] text-muted-foreground">
                    <Library className="w-3 h-3 mr-1" />
                    <span>UGC MM-TTP (2024-2025)</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 border border-transparent group hover:border-accent/10 transition-all">
                  <p className="text-xs font-bold text-muted-foreground mb-2 tracking-wider">FDP SPECIALIZATIONS</p>
                  <ul className="text-xs space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-accent" />
                      <span>AI/ML & Medical Imaging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-accent" />
                      <span>Blockchain & Cyber Security</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* CV Extract Container */}
            <Card className="glass p-6 border-accent/10 max-h-[300px] flex flex-col">
              <h3 className="text-sm font-bold mb-3 uppercase tracking-widest text-muted-foreground">CV Transcript</h3>
              <div className="flex-1 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-accent/20">
                <div className="text-[10px] sm:text-xs font-mono text-muted-foreground space-y-1 opacity-70">
                  {extractSectionLines(/COURSES\s+TAUGHT/i).map((line, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-accent opacity-50">{String(idx + 1).padStart(2, '0')}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

