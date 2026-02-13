import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { blogArticles } from "./BlogPost";

const articleList = Object.entries(blogArticles).map(([slug, article]) => ({
  slug,
  ...article,
}));

const Blog = () => {
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

          <div className="max-w-3xl mx-auto space-y-4">
            {articleList.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 100}>
                <Link to={`/blog/${article.slug}`}>
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
                      <p className="text-sm text-muted-foreground mb-3">{article.content.slice(0, 120)}...</p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight size={14} />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
