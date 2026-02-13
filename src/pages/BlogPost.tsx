import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { ArrowLeft, Calendar, Clock, ThumbsUp, MessageSquare, Share2 } from "lucide-react";

export const blogArticles: Record<string, {
  title: string;
  type: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "prueba": {
    title: "Prueba",
    type: "blog",
    date: "Feb 13, 2025",
    readTime: "1 min",
    content: "prueba",
  },
};

interface Comment {
  id: number;
  name: string;
  date: string;
  text: string;
  likes: number;
}

const BlogPost = () => {
  const { slug } = useParams();
  const article = slug ? blogArticles[slug] : null;

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "María García",
      date: "Feb 13, 2025",
      text: "¡Excelente artículo! Muy interesante la perspectiva.",
      likes: 3,
    },
    {
      id: 2,
      name: "Carlos López",
      date: "Feb 13, 2025",
      text: "Buen contenido, esperando más publicaciones como esta.",
      likes: 1,
    },
  ]);

  const [newComment, setNewComment] = useState({ name: "", text: "" });

  if (!article) {
    return (
      <Layout>
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft size={16} /> Back to Blog
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.text.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        name: newComment.name,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        text: newComment.text,
        likes: 0,
      },
      ...prev,
    ]);
    setNewComment({ name: "", text: "" });
  };

  const handleLike = (id: number) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <Layout>
      <article className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back link */}
          <ScrollReveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal>
            <header className="mb-10">
              <Badge className="mb-4 bg-primary/10 text-primary border-0 text-xs capitalize">
                {article.type}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {article.readTime}
                </span>
              </div>
            </header>
          </ScrollReveal>

          {/* Divider */}
          <ScrollReveal>
            <div className="h-px bg-border mb-10" />
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-16 text-foreground/90 leading-relaxed text-base md:text-lg">
              <p>{article.content}</p>
            </div>
          </ScrollReveal>

          {/* Share bar */}
          <ScrollReveal>
            <div className="flex items-center justify-between border-y border-border py-5 mb-16">
              <span className="text-sm font-medium text-muted-foreground">Did you enjoy this article?</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 size={14} /> Share
              </Button>
            </div>
          </ScrollReveal>

          {/* Comments Section */}
          <ScrollReveal>
            <section>
              <div className="flex items-center gap-2 mb-8">
                <MessageSquare size={20} className="text-primary" />
                <h2 className="text-2xl font-heading font-bold">
                  Comments <span className="text-muted-foreground text-lg font-normal">({comments.length})</span>
                </h2>
              </div>

              {/* New comment form */}
              <Card className="bg-card border-border mb-8">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Name</label>
                      <Input
                        placeholder="Your name"
                        value={newComment.name}
                        onChange={(e) => setNewComment((p) => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Comment</label>
                      <Textarea
                        placeholder="Share your thoughts..."
                        rows={3}
                        value={newComment.text}
                        onChange={(e) => setNewComment((p) => ({ ...p, text: e.target.value }))}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" size="sm">Post Comment</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Comment list */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="bg-card border-border">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9 mt-0.5">
                          <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                            {comment.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm text-foreground/80 leading-relaxed">{comment.text}</p>
                          <button
                            onClick={() => handleLike(comment.id)}
                            className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ThumbsUp size={12} /> {comment.likes}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
