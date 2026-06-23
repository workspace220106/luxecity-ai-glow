import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Sparkles, Calendar, Heart, Settings, LogOut, ShieldCheck, Mail } from "lucide-react";
import { auth, logInWithGoogle, logOut } from "@/lib/firebase";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";

const bookings = [
  { d: "Fri, 12 Jul · 5:30 PM", s: "French Gloss Balayage", n: "Jean-Claude Biguine", a: "Bandra West", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80", status: "Confirmed" },
  { d: "Sat, 27 Jul · 11:00 AM", s: "Invisible Haircut", n: "Metodo Rossano Ferretti", a: "Worli", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80", status: "Confirmed" },
  { d: "Thu, 15 Aug · 3:00 PM", s: "Prestige Blonde Highlights", n: "Dessange Paris", a: "Kemps Corner", img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=400&q=80", status: "Hold" },
];

export default function Profile() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await logInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.section 
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-40 pb-20 mx-auto max-w-7xl px-6 flex flex-col items-center justify-center min-h-[70vh]"
          >
            <div className="w-full max-w-md glass-strong rounded-3xl p-8 border border-gold/20 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
              
              <div className="relative">
                <div className="mx-auto h-12 w-12 rounded-full bg-gradient-luxe flex items-center justify-center animate-pulse-glow">
                  <Sparkles className="h-5 w-5 text-ink" />
                </div>
                
                <h1 className="font-display text-3xl mt-6">Welcome to Mumbai Luxe</h1>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                  Unlock access to Mumbai's most exclusive ateliers and manage your AI-guided beauty journey.
                </p>

                <button 
                  onClick={handleSignIn}
                  className="mt-8 w-full btn-luxe shine py-3 flex items-center justify-center gap-3 text-sm font-medium"
                >
                  {/* Google SVG Icon */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                  Secure OAuth by Google Identity Services
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section 
            key="profile-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pt-32 mx-auto max-w-7xl px-6"
          >
            {/* Header / Meta Profile */}
            <div className="glass-strong rounded-3xl p-8 flex flex-wrap items-center gap-6 border border-gold/20 shadow-xl">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="h-20 w-20 rounded-full ring-2 ring-gold object-cover" />
              ) : (
                <div className="h-20 w-20 rounded-full ring-2 ring-gold bg-secondary flex items-center justify-center">
                  <User className="h-10 w-10 text-gold" />
                </div>
              )}
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.3em] text-gold">Luxe Member · No. 0471</div>
                <h1 className="font-display text-4xl mt-1">{user.displayName || "Luxe Guest"}</h1>
                <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-gold" /> {user.email}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleSignOut} className="btn-ghost-luxe text-sm flex items-center gap-1.5">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
                <button className="btn-luxe shine text-sm flex items-center gap-1.5">
                  <Settings className="h-4 w-4" /> Preferences
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl">Upcoming rituals</h2>
                  <Link to="/explore" className="text-xs text-gold inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Book another
                  </Link>
                </div>
                <div className="space-y-3">
                  {bookings.map((b, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: i * 0.08 }} 
                      className="glass rounded-2xl p-4 flex items-center gap-4"
                    >
                      <img src={b.img} alt="" className="h-16 w-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gold">{b.d}</div>
                        <div className="font-medium truncate">{b.s}</div>
                        <div className="text-xs text-muted-foreground truncate">{b.n} · {b.a}</div>
                      </div>
                      <div className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${b.status === "Confirmed" ? "bg-gold/15 text-gold" : "glass"}`}>{b.status}</div>
                    </motion.div>
                  ))}
                </div>

                <h2 className="font-display text-2xl mt-12 mb-4">Saved ateliers</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {bookings.map((b, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden glass hover:ring-1 hover:ring-gold transition-all duration-300">
                      <img src={b.img} alt="" className="aspect-[4/3] object-cover w-full" />
                      <div className="p-3">
                        <div className="text-sm font-medium">{b.n}</div>
                        <div className="text-xs text-muted-foreground">{b.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar stats */}
              <aside className="space-y-4">
                <div className="glass-strong rounded-3xl p-6 border border-gold/10">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold"><Heart className="h-3 w-3" /> Rewards</div>
                  <div className="font-display text-5xl mt-3 text-gradient-gold">2,400</div>
                  <div className="text-xs text-muted-foreground">Luxe Points · ₹2,400 redeemable</div>
                  <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-gradient-luxe" style={{ width: "24%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">7,600 pts to Onyx Tier</div>
                </div>
                
                <div className="glass rounded-3xl p-6 border border-border/60">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold"><Sparkles className="h-3 w-3" /> Luxe AI suggests</div>
                  <div className="font-display text-lg mt-2">Book your next French Gloss treatment</div>
                  <p className="text-xs text-muted-foreground mt-1">Based on standard hair refresh intervals, booking before August 10th keeps your highlights looking pristine.</p>
                  <Link to="/explore" className="mt-4 btn-luxe shine text-xs inline-block">Explore open slots</Link>
                </div>
              </aside>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
