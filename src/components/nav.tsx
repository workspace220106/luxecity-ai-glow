import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/explore", label: "Explore" },
  { to: "/ai-advisor", label: "AI Advisor" },
  { to: "/matchmaker", label: "Matchmaker" },
  { to: "/membership", label: "Club" },
  { to: "/journey", label: "Journey" },
  { to: "/partners", label: "For Salons" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-4`}>
        <div className={`flex items-center justify-between rounded-full px-4 md:px-6 py-3 transition-all ${scrolled ? "glass-strong" : ""}`}>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 rounded-full bg-gradient-luxe animate-pulse-glow flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-ink" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg tracking-tight">Mumbai <span className="text-gradient-gold">Luxe</span></div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                activeProps={{ className: "px-4 py-2 text-sm text-foreground relative" }}
              >
                {l.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/profile" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 py-2">
              Sign in
            </Link>
            <Link to="/explore" className="btn-luxe shine text-sm">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
