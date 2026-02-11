import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ExternalLink, BarChart3, Smartphone, FileText, Gamepad2 } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const projects = [
  {
    icon: Smartphone,
    title: "Fan Engagement App Prototype",
    description: "Designed and prototyped a mobile app concept aimed at increasing matchday engagement for football supporters through gamification, live polls, and exclusive content.",
    tags: ["UX Design", "Gamification", "Mobile"],
    status: "Completed",
  },
  {
    icon: BarChart3,
    title: "Revenue Model Analysis: La Liga Clubs",
    description: "Comparative financial analysis of La Liga clubs' revenue streams — broadcasting, matchday, commercial — with data visualizations and strategic recommendations.",
    tags: ["Analytics", "Finance", "La Liga"],
    status: "Completed",
  },
  {
    icon: FileText,
    title: "Sports Sponsorship Case Study",
    description: "In-depth case study examining the ROI of a major sportswear brand's sponsorship deal with a Premier League club. Analyzed brand visibility, social media impact, and sales data.",
    tags: ["Sponsorship", "Case Study", "Premier League"],
    status: "In Progress",
  },
  {
    icon: Gamepad2,
    title: "Esports Business Model Canvas",
    description: "Developed a business model canvas for a hypothetical esports organization, covering revenue, partnerships, content strategy, and community building.",
    tags: ["Esports", "Strategy", "Business Model"],
    status: "Completed",
  },
];

const Projects = () => {
  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-0">Portfolio</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
                Projects & <span className="text-primary">Case Studies</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Initiatives, research, and creative work in sports business and innovation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <ScrollReveal key={i} delay={i * 120}>
                  <Card className="bg-card border-border hover:border-primary/40 transition-colors group h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="text-primary" size={24} />
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            project.status === "Completed"
                              ? "border-primary text-primary"
                              : "border-secondary text-secondary"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} className="bg-muted text-muted-foreground border-0 text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary p-0 h-auto font-heading text-sm">
                        View Details <ExternalLink size={14} className="ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
