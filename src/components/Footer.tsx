import { Link } from "react-router-dom";
import { Linkedin, Instagram, Mail, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl font-bold mb-3">
              <span className="text-primary">RD</span> Digital
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sports Business | Innovation | Strategy
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-primary">Navigate</h4>
            <div className="flex flex-col gap-2">
              {["About", "Experiences", "Projects", "Blog", "Contact"].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Coming Soon */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-primary">Coming Soon</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Newsletter</span>
                <Badge variant="outline" className="text-xs border-secondary text-secondary">Soon</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Podcast</span>
                <Badge variant="outline" className="text-xs border-secondary text-secondary">WIP</Badge>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-primary">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Mail, href: "mailto:ricardo@example.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ricardo Dominguez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
