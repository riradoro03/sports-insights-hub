import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { StadiumHero } from "@/components/ui/stadium-hero";

const featuredCards = [
  {
    tag: "Experience",
    title: "Sports Marketing Internship",
    description: "Assisted in developing digital campaigns for a professional football club.",
    link: "/experiences",
  },
  {
    tag: "Project",
    title: "Fan Engagement Platform",
    description: "Designed a prototype app to boost matchday engagement for sports clubs.",
    link: "/projects",
  },
  {
    tag: "Analysis",
    title: "The Economics of Club Ownership",
    description: "Breaking down revenue models and investment strategies in modern football.",
    link: "/blog",
  },
];

const stats = [
  { icon: TrendingUp, value: "Sports Business", label: "Focus Area" },
  { icon: Users, value: "3rd Year", label: "MBT Student" },
  { icon: Target, value: "Innovation", label: "Driven" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero — cinematic 3D stadium fly-in */}
      <StadiumHero />

      {/* Stats Bar */}
      <ScrollReveal>
        <section className="bg-card border-y border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <div key={i} className="flex items-center gap-4 justify-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                Featured <span className="text-primary">Content</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                A snapshot of my latest work, experiences, and insights in sports business.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCards.map((card, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <Card className="bg-card border-border hover:border-primary/40 transition-colors group h-full">
                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-primary/10 text-primary border-0">{card.tag}</Badge>
                    <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                    <Link
                      to={card.link}
                      className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight size={14} />
                    </Link>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Waitlist */}
      <ScrollReveal>
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-secondary/60 text-secondary font-heading tracking-widest text-[10px] uppercase px-4 py-1">
                Work in Progress
              </Badge>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight">
                Get the <span className="text-primary">Inside Track</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-3">
                Exclusive insights on sports business, club strategy, and industry trends — delivered straight to your inbox.
              </p>
              <p className="text-muted-foreground/60 text-sm mb-10">
                Be the first to know when we launch. No spam, ever.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  disabled
                  className="flex-1 h-12 bg-card border-border text-base placeholder:text-muted-foreground/40"
                />
                <Button disabled className="h-12 px-8 font-heading tracking-wide text-sm opacity-70">
                  Join Waitlist
                </Button>
              </div>
              <p className="text-muted-foreground/40 text-xs mt-4">
                Launching soon — join 0 others on the waitlist
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </Layout>
  );
};

export default Index;
