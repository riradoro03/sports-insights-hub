import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const articles = [
  {
    type: "analysis",
    title: "The Economics of Club Ownership in 2025",
    excerpt: "An exploration of why billionaires are investing in sports clubs and what it means for the future of football's financial landscape.",
    date: "Jan 15, 2025",
    readTime: "8 min",
  },
  {
    type: "analysis",
    title: "How Data Analytics is Reshaping Player Recruitment",
    excerpt: "From Moneyball to modern football — a breakdown of how clubs use data science to gain a competitive edge in the transfer market.",
    date: "Dec 20, 2024",
    readTime: "6 min",
  },
  {
    type: "blog",
    title: "My First Sports Business Conference Experience",
    excerpt: "Reflections on attending a major sports business conference as a student — what I learned, who I met, and how it shaped my career goals.",
    date: "Nov 5, 2024",
    readTime: "5 min",
  },
  {
    type: "blog",
    title: "Why Every Sports Fan Should Understand the Business Side",
    excerpt: "A personal take on why understanding revenue, sponsorships, and governance makes you a more informed and engaged sports fan.",
    date: "Oct 12, 2024",
    readTime: "4 min",
  },
  {
    type: "analysis",
    title: "Women's Sports: The Untapped Commercial Opportunity",
    excerpt: "Breaking down the growth trajectory of women's sports leagues and the commercial potential that brands are starting to recognize.",
    date: "Sep 28, 2024",
    readTime: "7 min",
  },
  {
    type: "blog",
    title: "Building a Personal Brand in Sports Business",
    excerpt: "Lessons learned from creating this website and developing my professional presence as a student in the sports industry.",
    date: "Feb 1, 2025",
    readTime: "5 min",
  },
];

const Blog = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? articles : articles.filter((a) => a.type === filter);

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-0">Insights</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
                Analysis & <span className="text-primary">Content</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Thoughts, breakdowns, and reflections on the world of sports business.
              </p>
            </div>
          </ScrollReveal>

          <Tabs defaultValue="all" className="max-w-3xl mx-auto">
            <ScrollReveal>
              <TabsList className="mb-8 mx-auto flex w-fit bg-muted">
                <TabsTrigger value="all" onClick={() => setFilter("all")} className="font-heading text-sm">All</TabsTrigger>
                <TabsTrigger value="analysis" onClick={() => setFilter("analysis")} className="font-heading text-sm">Analysis</TabsTrigger>
                <TabsTrigger value="blog" onClick={() => setFilter("blog")} className="font-heading text-sm">Blog Posts</TabsTrigger>
              </TabsList>
            </ScrollReveal>

            <TabsContent value="all" className="space-y-4">
              {filtered.map((article, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </TabsContent>
            <TabsContent value="analysis" className="space-y-4">
              {filtered.map((article, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </TabsContent>
            <TabsContent value="blog" className="space-y-4">
              {filtered.map((article, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
  <Card className="bg-card border-border hover:border-primary/40 transition-colors group cursor-pointer">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <Badge className="bg-primary/10 text-primary border-0 text-xs capitalize">{article.type}</Badge>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
        </div>
      </div>
      <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
      <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
        Read Article <ArrowRight size={14} />
      </span>
    </CardContent>
  </Card>
);

export default Blog;
