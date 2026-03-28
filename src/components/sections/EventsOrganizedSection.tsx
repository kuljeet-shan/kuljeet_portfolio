import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, FileText, Award, Presentation } from "lucide-react";
import { parseOrganizedEvents } from "@/lib/cv";
import { motion } from "framer-motion";

export function EventsOrganizedSection() {
  const events = parseOrganizedEvents();

  if (events.length === 0) return null;

  return (
    <section id="organized-events" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Seminars & Workshops Organized</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A track record of leadership in organizing impactful academic events, webinars, and professional development programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1">
                      {event.type || "Academic Event"}
                    </Badge>
                    <div className="flex gap-2">
                      {event.report && (
                        <Badge variant="outline" className="text-xs flex gap-1 items-center border-blue-200 text-blue-600 bg-blue-50">
                          <FileText size={12} /> Report
                        </Badge>
                      )}
                      {event.certificate && (
                        <Badge variant="outline" className="text-xs flex gap-1 items-center border-amber-200 text-amber-600 bg-amber-50">
                          <Award size={12} /> Certificate
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <div className="p-2 rounded-full bg-primary/5 text-primary">
                      <User size={16} />
                    </div>
                    <span>{event.role}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-primary/60" />
                      <span className="leading-snug">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar size={16} className="shrink-0 text-primary/60" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
