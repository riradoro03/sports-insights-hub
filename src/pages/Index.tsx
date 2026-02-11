import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-stadium.jpg";

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
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 animate-fade-in">
            Ricardo <span className="text-primary">Dominguez</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Sports Business | Innovation | Strategy
          </p>
          <p className="text-sm md:text-base text-muted-foreground/70 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Exploring the intersection of sport, business, and technology. Welcome to my digital space.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button asChild size="lg" className="font-heading tracking-wide">
              <Link to="/about">Discover More <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-heading tracking-wide border-primary/50 text-primary hover:bg-primary/10">
              <Link to="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </section>

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

      {/* Newsletter Coming Soon */}
      <ScrollReveal>
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4 border-secondary text-secondary">Coming Soon</Badge>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              Stay in the <span className="text-primary">Game</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              A newsletter on sports business trends, insights, and opportunities. Subscribe when it launches.
            </p>
            <Button disabled className="font-heading tracking-wide opacity-60">
              Notify Me — Coming Soon
            </Button>
          </div>
        </section>
      </ScrollReveal>
    </Layout>
  );
};

export default Index;
