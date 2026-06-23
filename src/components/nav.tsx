import { Link, NavLink } from "react-router-dom";
import { Sparkles, User } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";

const links = [
  { to: "/explore", label: "Explore" },
  { to: "/ai-advisor", label: "AI Advisor" },
  { to: "/matchmaker", label: "Matchmaker" },
  { to: "/membership", label: "Club" },
];

export function Nav() {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <header className="absolute top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 rounded-full bg-gradient-luxe animate-pulse-glow flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-ink" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg tracking-tight">
                Mumbai <span className="text-gradient-gold">Luxe</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm transition-colors relative group ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {l.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 group">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "Profile"}
                    className="h-8 w-8 rounded-full border border-gold/40 group-hover:border-gold transition-colors object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full border border-gold/40 flex items-center justify-center bg-secondary">
                    <User className="h-4 w-4 text-gold" />
                  </div>
                )}
                <span className="hidden lg:inline text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[100px]">
                  {user.displayName?.split(" ")[0]}
                </span>
              </Link>
            ) : (
              <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2">
                Sign in
              </Link>
            )}
            <Link to="/explore" className="btn-luxe shine text-sm">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
