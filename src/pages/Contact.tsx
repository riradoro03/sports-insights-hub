import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Mail, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-0">Contact</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
                Let's <span className="text-primary">Connect</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Have a question, collaboration idea, or just want to talk sports? Reach out!
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal direction="right">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Name</label>
                      <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-muted border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-muted border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Message</label>
                      <Textarea placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="bg-muted border-border" />
                    </div>
                    <Button type="submit" className="w-full font-heading tracking-wide">
                      <Send size={16} className="mr-2" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-bold mb-3">Email</h3>
                    <a href="mailto:riradoro03@gmail.com" className="text-primary text-sm flex items-center gap-2 hover:underline">
                      <Mail size={16} /> riradoro03@gmail.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-bold mb-4">Follow Me</h3>
                    <div className="flex gap-3">
                      <a href="https://www.linkedin.com/in/ricardo-ramon-dominguez-rodriguez/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors text-sm">
                        <Linkedin size={16} /> LinkedIn
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border border-primary/30">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Open to</p>
                    <p className="font-heading text-lg font-bold text-primary">
                      Collaborations, Internships & Conversations
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
