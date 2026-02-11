import { User, BookOpen, Award, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const milestones = [
  { year: "2022", title: "Started MBT Degree", description: "Began studies in Management, Business & Technology." },
  { year: "2023", title: "First Sports Internship", description: "Worked with a local sports club on digital strategy." },
  { year: "2024", title: "Sports Analytics Project", description: "Led a university project on fan engagement data." },
  { year: "2025", title: "Personal Brand Launch", description: "Launched this digital portfolio and content platform." },
];

const facts = [
  { icon: User, label: "3rd Year MBT Student" },
  { icon: BookOpen, label: "Sports Business Focus" },
  { icon: Award, label: "Innovation Enthusiast" },
  { icon: MapPin, label: "Based in Europe" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="right">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-0">About Me</Badge>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                  The Story Behind <span className="text-primary">the Brand</span>
                </h1>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm Ricardo Dominguez, a 3rd-year MBT student with an unwavering passion for the sports industry. My journey in sports business started as a fan and evolved into a deep interest in how clubs, organizations, and athletes build sustainable ventures.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I believe that the sports industry is one of the most dynamic sectors in the world — where innovation, strategy, and human emotion converge. My goal is to contribute to this industry through data-driven insights, creative strategies, and a relentless pursuit of excellence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This website serves as my digital portfolio — a space to share my experiences, projects, and analysis with fellow sports enthusiasts and professionals.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={200}>
              <div className="flex justify-center">
                <div className="w-72 h-80 rounded-lg bg-muted border border-border flex items-center justify-center">
                  <div className="text-center">
                    <User className="mx-auto text-muted-foreground mb-2" size={48} />
                    <p className="text-sm text-muted-foreground">Your Photo Here</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <ScrollReveal>
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {facts.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-3 justify-center">
                  <Icon className="text-primary" size={20} />
                  <span className="font-heading text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <ScrollReveal>
            <h2 className="text-3xl font-heading font-bold text-center mb-12">
              My <span className="text-primary">Journey</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 150} direction="left">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{m.year}</span>
                    </div>
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <Card className="flex-1 bg-card border-border">
                    <CardContent className="p-4">
                      <h3 className="font-heading text-lg font-bold mb-1">{m.title}</h3>
                      <p className="text-sm text-muted-foreground">{m.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
