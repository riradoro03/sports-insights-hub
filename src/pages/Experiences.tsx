import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Briefcase, GraduationCap, Heart } from "lucide-react";

const experiences = [
  {
    type: "Professional",
    icon: Briefcase,
    title: "Sports Marketing Intern",
    org: "FC United Marketing Dept.",
    period: "Summer 2024",
    description: "Assisted in planning and executing digital marketing campaigns for matchday promotions. Gained hands-on experience with social media strategy, content creation, and fan engagement analytics.",
    tags: ["Marketing", "Digital Strategy", "Social Media"],
  },
  {
    type: "Academic",
    icon: GraduationCap,
    title: "Sports Business Research Project",
    org: "University — MBT Program",
    period: "2024",
    description: "Conducted a comprehensive study on revenue diversification strategies in European football clubs. Analyzed financial reports and interviewed club executives.",
    tags: ["Research", "Finance", "Football"],
  },
  {
    type: "Personal",
    icon: Heart,
    title: "Community Sports Event Organizer",
    org: "Local Sports Association",
    period: "2023 – Present",
    description: "Co-organized grassroots sports events for youth in the local community. Managed logistics, sponsorships, and volunteer coordination for tournaments.",
    tags: ["Leadership", "Community", "Events"],
  },
  {
    type: "Academic",
    icon: GraduationCap,
    title: "Content & Personal Branding Course",
    org: "University — MBT Program",
    period: "2025",
    description: "Developed this portfolio website as part of a course on content strategy and personal branding. Applied principles of digital storytelling and audience engagement.",
    tags: ["Branding", "Content", "Web Development"],
  },
];

const Experiences = () => {
  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-0">My Journey</Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
              Experiences & <span className="text-primary">Growth</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Academic, professional, and personal milestones that shape my path in sports business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {experiences.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <Card key={i} className="bg-card border-border hover:border-primary/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs">{exp.type}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-sm text-secondary font-medium mb-3">{exp.org}</p>
                    <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} className="bg-muted text-muted-foreground border-0 text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experiences;
