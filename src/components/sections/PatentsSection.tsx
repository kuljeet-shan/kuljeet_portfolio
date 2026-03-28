"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    parsePatentsStructured, 
    parseEditorRolesStructured, 
    parseReviewerActivitiesStructured,
    parseNewspaperArticles,
    StructuredPatent,
    StructuredEditorRole,
    StructuredReviewerActivity,
    StructuredNewspaperArticle
  } from "@/lib/cv";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  Award, 
  CheckCircle, 
  Clock, 
  Search, 
  Users, 
  Globe, 
  ShieldCheck,
  Zap,
  BookOpen,
  FileText,
  ExternalLink,
  MapPin,
  Building2
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export function PatentsSection() {
  const [activeTab, setActiveTab] = useState("patents");
    const patents = parsePatentsStructured();
    const editorRoles = parseEditorRolesStructured();
    const reviewerActivities = parseReviewerActivitiesStructured();
    const newspaperArticles = parseNewspaperArticles();


  const getStatusIcon = (status: string = "") => {
    if (status.toLowerCase().includes("with grant")) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <Clock className="h-4 w-4 text-accent" />;
  };

  const patentsByYear = patents.reduce((acc, patent) => {
    const year = patent.number.match(/20\d{2}/)?.[0] || "Other";
    if (!acc[year]) acc[year] = [];
    acc[year].push(patent);
    return acc;
  }, {} as Record<string, StructuredPatent[]>);

    const sortedYears = Object.keys(patentsByYear).sort((a, b) => {
      if (a === "Other") return 1;
      if (b === "Other") return -1;
      return b.localeCompare(a);
    });

    const stats = [
      { label: "Total Patents", value: patents.length, icon: Lightbulb, color: "text-amber-500" },
      { label: "Granted", value: patents.filter(p => p.status.toLowerCase().includes("with grant")).length, icon: Award, color: "text-green-500" },
      { label: "Editorial Roles", value: editorRoles.length, icon: BookOpen, color: "text-blue-500" },
      { label: "Reviewer Activities", value: reviewerActivities.length, icon: ShieldCheck, color: "text-purple-500" },
    ];

    return (
      <section id="patents" className="py-24 bg-background relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-4">
                <Zap className="w-3 h-3" />
                Innovation & Academic Leadership
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                Patents & <span className="text-accent">Editorial</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
                A showcase of intellectual property contributions and academic leadership in the global scientific community.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card border border-border/50 shadow-sm"
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-1`} />
                    <span className="text-2xl font-black">{stat.value}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold text-center leading-tight">
                      {stat.label.split(" ").map(s => <div key={s}>{s}</div>)}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <Tabs defaultValue="patents" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-xl h-12">
                  <TabsTrigger value="patents" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 font-bold">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Patents
                  </TabsTrigger>
                  <TabsTrigger value="editorial" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 font-bold">
                    <Users className="w-4 h-4 mr-2" />
                    Editorial
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "patents" ? (
              <motion.div
                key="patents-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {patents.map((patent, index) => (
                  <motion.div
                    key={patent.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <Card className="h-full group relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card hover:border-accent/30 transition-all duration-500 shadow-xl hover:shadow-accent/5">
                      {/* Status Indicator Bar */}
                      <div className={`absolute top-0 left-0 w-1 h-full ${
                        patent.status.toLowerCase().includes("with grant") ? "bg-green-500" : "bg-accent/40"
                      }`} />
                      
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-background/50 border-accent/20 text-accent font-bold">
                              {patent.country}
                            </Badge>
                            <Badge variant="secondary" className="bg-muted/50 text-[10px] uppercase tracking-tighter">
                              {patent.type}
                            </Badge>
                          </div>
                          <div className={`p-2 rounded-xl ${
                            patent.status.toLowerCase().includes("with grant") ? "bg-green-500/10" : "bg-accent/10"
                          }`}>
                            {getStatusIcon(patent.status)}
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold leading-snug group-hover:text-accent transition-colors">
                          {patent.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 group-hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Application Number</span>
                            <code className="text-xs font-mono text-accent bg-accent/5 px-2 py-0.5 rounded">#{patent.id}</code>
                          </div>
                          <p className="text-lg font-mono font-bold tracking-tight text-foreground/90">
                            {patent.number}
                          </p>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0 flex justify-between items-center text-xs text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5" />
                          <span>International IP Record</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-background/50 border border-border/30">
                          {patent.status.toLowerCase().includes("with grant") ? (
                            <span className="text-green-500 font-bold">Granted</span>
                          ) : (
                            <span className="text-accent font-bold">Published</span>
                          )}
                        </div>
                      </CardFooter>

                      {/* Subtle Pattern Background */}
                      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                        <ShieldCheck className="w-32 h-32 -mr-8 -mt-8 rotate-12" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="editorial-visual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {/* Guest Editor Spotlight */}
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-accent/20 via-border/10 to-transparent">
                  <div className="bg-card rounded-2xl p-8 border border-border/50">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="shrink-0 p-6 rounded-3xl bg-accent/5 border border-accent/10 relative overflow-hidden group">
                        <BookOpen className="w-16 h-16 text-accent relative z-10" />
                        <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-accent text-accent-foreground font-black uppercase text-[10px]">Active Role</Badge>
                          <span className="text-xs text-muted-foreground font-bold">ISSN: 2640-5547</span>
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter mb-2">Guest Editor</h3>
                        <p className="text-2xl font-bold text-accent/80 mb-4 italic">Journal of Research in Diabetes & Metabolism</p>
                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-medium">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-accent" />
                            SciRes Literature
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-accent" />
                            International Scientific Board
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-auto self-stretch flex items-center justify-center p-6 border-l border-border/50">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-center gap-1 cursor-help"
                        >
                          <Award className="w-12 h-12 text-amber-500" />
                          <span className="text-[10px] font-black uppercase text-center text-muted-foreground tracking-widest leading-none">Peer Leadership<br/>Award</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid for Journals and Conferences */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                  {/* Journal Peer Review */}
                  <div className="xl:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-500" />
                        </div>
                        Journal Reviews
                      </h3>
                      <Badge variant="outline" className="font-bold border-blue-500/20 text-blue-500">
                        {reviewerActivities.filter(a => a.type === "journal").length} Publications
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {reviewerActivities.filter(a => a.type === "journal").map((activity, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 5 }}
                          className="p-4 rounded-xl bg-card border border-border/50 hover:border-blue-500/30 hover:bg-muted/30 transition-all flex items-center gap-4 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm leading-none mb-1">{activity.name}</h4>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{activity.publisher || "Global Publisher"}</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Conference Peer Review */}
                  <div className="xl:col-span-3">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        Conference Panels
                      </h3>
                      <Badge variant="outline" className="font-bold border-purple-500/20 text-purple-500">
                        {reviewerActivities.filter(a => a.type === "conference").length} Events
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {reviewerActivities.filter(a => a.type === "conference").map((activity, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-5 rounded-2xl bg-card border border-border/50 hover:border-purple-500/30 transition-all relative overflow-hidden group"
                        >
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-purple-500/10 text-purple-500 border-none text-[9px] font-black uppercase tracking-widest">
                                {activity.issn_isbn?.split(" ")[0] || "IEEE"} Conf
                              </Badge>
                              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                            </div>
                            <h4 className="font-black text-sm mb-4 leading-tight group-hover:text-purple-500 transition-colors">
                              {activity.name}
                            </h4>
                            <div className="flex flex-col gap-1.5 border-t border-border/50 pt-3">
                              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                <Building2 className="w-3.5 h-3.5" />
                                {activity.location}
                              </div>
                              {activity.issn_isbn && (
                                <div className="text-[10px] font-mono text-muted-foreground/60">
                                  {activity.issn_isbn}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Decorative Background Icon */}
                          <Users className="absolute bottom-[-10px] right-[-10px] w-16 h-16 text-purple-500/5 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  </div>

                  {/* Media Coverage / Newspaper Articles */}
                  <div className="mt-12">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-amber-500" />
                        </div>
                        Media Coverage
                      </h3>
                      <Badge variant="outline" className="font-bold border-amber-500/20 text-amber-500">
                        {newspaperArticles.length} Articles
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {newspaperArticles.map((article, idx) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group relative"
                        >
                          <Card className="h-full border-border/50 bg-card/50 hover:bg-card hover:border-amber-500/30 transition-all duration-300 overflow-hidden">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none text-[9px] font-black uppercase tracking-widest">
                                  {article.newspaper}
                                </Badge>
                                <span className="text-[10px] font-bold text-muted-foreground">{article.date}</span>
                              </div>
                              <CardTitle className="text-sm font-bold leading-snug group-hover:text-amber-500 transition-colors line-clamp-3">
                                {article.title}
                              </CardTitle>
                            </CardHeader>
                            <CardFooter className="pt-2">
                              <a 
                                href={article.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-amber-500 transition-colors"
                              >
                                Read Article <ExternalLink className="w-3 h-3" />
                              </a>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

          </AnimatePresence>
        </div>
      </section>
    );
  }
