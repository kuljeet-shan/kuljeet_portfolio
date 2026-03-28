import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Trophy, 
  Calendar, 
  ChevronDown, 
  Award, 
  Target, 
  Rocket, 
  Quote,
  X
} from "lucide-react";
import { parseAcademicAchievements } from "@/lib/cv";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export const AcademicAchievementsSection = () => {
  const allAchievements = parseAcademicAchievements();
  const initialCount = 10;
  const displayedAchievements = allAchievements.slice(0, initialCount);
  const remainingCount = allAchievements.length - initialCount;

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
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const AchievementCard = ({ achievement, index, isModal = false }: { achievement: any, index: number, isModal?: boolean }) => (
    <motion.div 
      variants={itemVariants}
      className="group"
    >
      <Card className={`glass-strong h-full relative overflow-hidden border-primary/10 group-hover:border-primary/40 transition-all duration-500 ${isModal ? 'rounded-2xl' : 'rounded-[2rem]'} p-0.5`}>
        <div className={`bg-background/40 backdrop-blur-md ${isModal ? 'rounded-[1rem]' : 'rounded-[1.95rem]'} p-4 sm:p-6 h-full flex flex-col relative overflow-hidden`}>
          {/* Decorative Icon Background */}
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
            <Trophy size={120} />
          </div>

          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0 shadow-inner">
              {index % 3 === 0 ? <Award className="w-5 h-5 sm:w-6 sm:h-6" /> : index % 3 === 1 ? <Target className="w-5 h-5 sm:w-6 sm:h-6" /> : <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1 sm:gap-2">
                <h4 className="text-base sm:text-lg font-black leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {achievement.title}
                </h4>
                {achievement.date && (
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase whitespace-nowrap bg-secondary/30 px-2 py-1 rounded-md border border-primary/5 self-start sm:self-auto">
                    <Calendar className="w-3 h-3 text-primary/50" />
                    {achievement.date}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="h-1 w-8 bg-primary/30 rounded-full" />
                 <div className="h-1 w-2 bg-primary/10 rounded-full" />
              </div>
            </div>
          </div>

          <div className="relative pl-6 border-l-2 border-primary/10 group-hover:border-primary/30 transition-colors flex-grow">
            <Quote className="absolute -left-3 -top-1 w-6 h-6 text-primary/5 opacity-20 group-hover:opacity-40 transition-opacity" />
            <p className="text-sm text-muted-foreground font-medium leading-relaxed group-hover:text-foreground transition-colors">
              {achievement.details}
            </p>
          </div>

          {achievement.score && (
            <div className="mt-4 flex justify-end">
              <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/20 font-black text-[10px] px-3 py-1 uppercase tracking-wider">
                Score: {achievement.score}
              </Badge>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );

    return (
      <section id="achievements" className="py-16 sm:py-24 relative overflow-hidden">
        {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 py-1.5 px-5 border-primary/30 bg-primary/5 text-primary uppercase tracking-[0.2em] text-[10px] font-black rounded-full shadow-sm">
              Milestones & Recognition
            </Badge>
          </motion.div>
          
          <AnimatedText 
            text={<>Academic <span className="text-gradient-primary">Achievements</span></>}
            textClassName="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight"
            underlineClassName="text-primary"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-medium"
          >
            A comprehensive record of certifications, professional excellence, and significant academic contributions.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto"
        >
          {displayedAchievements.map((achievement, index) => (
            <AchievementCard key={`achievement-${index}`} achievement={achievement} index={index} />
          ))}
        </motion.div>

        {remainingCount > 0 && (
          <div className="flex justify-center mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="group h-14 px-8 rounded-full border-primary/20 bg-primary/5 hover:bg-primary hover:text-white transition-all duration-500 flex items-center gap-3 font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-primary/20"
                >
                  View More ({remainingCount}+ Achievements)
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </Button>
              </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden border-primary/20 glass-strong w-[95vw] sm:w-full">
                  <DialogHeader className="p-4 sm:p-8 pb-4 border-b border-primary/10">
                    <DialogTitle className="text-xl sm:text-2xl font-black flex items-center gap-2 sm:gap-3">
                      <Trophy className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                      All Achievements
                      <Badge variant="outline" className="ml-1 sm:ml-2 bg-primary/5 text-primary border-primary/20 text-[10px] sm:text-xs">
                        {allAchievements.length} Total
                      </Badge>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <ScrollArea className="h-[calc(95vh-100px)] sm:h-[calc(90vh-120px)] p-4 sm:p-8">
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 pb-8">
                      {allAchievements.map((achievement, index) => (
                        <AchievementCard key={`modal-achievement-${index}`} achievement={achievement} index={index} isModal={true} />
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </section>
  );
};
