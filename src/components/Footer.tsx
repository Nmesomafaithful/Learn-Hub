import { Link } from "react-router-dom";
import { BookOpen, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t neon-border mt-20 glass">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground mb-4 group">
              <BookOpen className="h-6 w-6 text-primary glow group-hover:glow-strong transition-all duration-300" />
              <span className="text-glow">LearnHub</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering learners worldwide with quality education and expert-led courses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} LearnHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
