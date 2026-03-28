import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { BookOpen, Search, Users, Globe, Award, Database } from "lucide-react";
import { parseEditorRolesStructured, parseReviewerActivitiesStructured } from "@/lib/cv";
import { useEffect, useState } from "react";

export const EditorialSection = () => {
  const [editorRoles, setEditorRoles] = useState<any[]>([]);
  const [reviewerActivities, setReviewerActivities] = useState<any[]>([]);

  useEffect(() => {
    setEditorRoles(parseEditorRolesStructured());
    setReviewerActivities(parseReviewerActivitiesStructured());
  }, []);

  if (editorRoles.length === 0 && reviewerActivities.length === 0) return null;

  return (
    <section id="editorial" className="py-24 bg-gradient-to-b from-background to-slate-50/50 dark:to-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary uppercase tracking-widest text-[10px] font-bold">
            Editorial & Reviewer Roles
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Scientific <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Actively contributing to the global research community through editorial board memberships 
            and rigorous peer review for leading journals and conferences.
          </p>
        </div>

        <div className="space-y-16">
          {/* Guest Editor / Special Issues */}
          {editorRoles.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b pb-4 border-primary/10">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Guest Editor / Special Issues</h3>
                  <p className="text-sm text-muted-foreground">Roles in international scientific literature publishers</p>
                </div>
              </div>
              
              <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[80px] text-center">S.No</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Name of the Journal</TableHead>
                      <TableHead className="hidden md:table-cell">ISSN Number</TableHead>
                      <TableHead className="hidden lg:table-cell">Publisher</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editorRoles.map((role, idx) => (
                      <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="text-center font-medium text-muted-foreground">{idx + 1}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-semibold bg-primary/5 text-primary border-primary/10">
                            {role.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{role.journal}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground font-mono text-xs">{role.issn}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{role.publisher}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Peer Reviewing Activities */}
          {reviewerActivities.length > 0 && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4 border-accent/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Search className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">Peer Reviewing Activities</h3>
                    <p className="text-sm text-muted-foreground">Rigorous validation of academic contributions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">ResearcherID:</span>
                  <span className="text-xs font-bold text-primary">AAW-8363-2020</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Journals */}
                <Card className="border-none shadow-md bg-white dark:bg-slate-900/40 overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-primary/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      For International Journals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {reviewerActivities.filter(a => a.type === 'journal').map((activity, idx) => (
                        <div key={idx} className="p-4 hover:bg-muted/30 transition-all group">
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                                {activity.name}
                              </h4>
                              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Badge variant="outline" className="text-[9px] py-0 h-4 border-muted-foreground/20">
                                    {activity.publisher}
                                  </Badge>
                                </span>
                                {activity.issn_isbn && (
                                  <span className="font-mono">ISSN: {activity.issn_isbn}</span>
                                )}
                              </div>
                            </div>
                            <Award className="h-4 w-4 text-primary/20 group-hover:text-primary/40 transition-colors shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Conferences */}
                <Card className="border-none shadow-md bg-white dark:bg-slate-900/40 overflow-hidden">
                  <CardHeader className="bg-accent/5 border-b border-accent/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      For Academic Conferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {reviewerActivities.filter(a => a.type === 'conference').map((activity, idx) => (
                        <div key={idx} className="p-4 hover:bg-muted/30 transition-all group">
                          <div className="space-y-2">
                            <h4 className="font-bold text-sm leading-snug group-hover:text-accent transition-colors">
                              {activity.name}
                            </h4>
                            <div className="space-y-1">
                              <p className="text-[11px] text-muted-foreground italic flex items-center gap-1">
                                <Globe className="h-3 w-3" /> {activity.location}
                              </p>
                              {activity.issn_isbn && (
                                <p className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 w-fit px-1.5 py-0.5 rounded text-muted-foreground">
                                  {activity.issn_isbn}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
