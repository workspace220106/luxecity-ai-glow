import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/40 noise">
      <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-luxe flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-ink" />
            </div>
            <span className="font-display text-xl">Mumbai <span className="text-gradient-gold">Luxe</span></span>
          </div>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            India's first AI-curated luxury beauty marketplace. Discover ateliers, book master stylists, and live a higher beauty life — across Mumbai's most exquisite addresses.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full glass flex items-center justify-center hover:ring-gold transition-all">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-4 text-gradient-gold">Platform</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/explore" className="hover:text-foreground">Explore Salons</Link></li>
            <li><Link to="/ai-advisor" className="hover:text-foreground">AI Beauty Advisor</Link></li>
            <li><Link to="/matchmaker" className="hover:text-foreground">AI Matchmaker</Link></li>
            <li><Link to="/membership" className="hover:text-foreground">Luxe Club</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium mb-4 text-gradient-gold">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/partners" className="hover:text-foreground">For Salons</Link></li>
            <li><Link to="/investors" className="hover:text-foreground">Investors</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 Mumbai Luxe Atelier Pvt. Ltd. Crafted in Bombay.</div>
          <div className="flex items-center gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Press</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
