import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Sparkles, Calendar, Heart, Settings } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — Mumbai Luxe" }] }),
  component: Profile,
});

const bookings = [
  { d: "Fri, 12 Jul · 5:30 PM", s: "Aura Glow Balayage", n: "Maison Aura", a: "Bandra West", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80", status: "Confirmed" },
  { d: "Sat, 27 Jul · 11:00 AM", s: "Gold Leaf Ritual", n: "The Gilded Room", a: "Worli", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80", status: "Confirmed" },
  { d: "Thu, 15 Aug · 3:00 PM", s: "Sangeet Glam", n: "The Mews", a: "Colaba", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80", status: "Hold" },
];

function Profile() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-8 flex flex-wrap items-center gap-6">
          <img src="https://i.pravatar.cc/120?img=47" alt="" className="h-20 w-20 rounded-full ring-gold" />
          <div className="flex-1">
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Platinum Member · No. 0024</div>
            <h1 className="font-display text-4xl mt-1">Riya D'Souza</h1>
            <div className="text-sm text-muted-foreground mt-1">Member since Jan 2025 · 38 visits · ₹2.84L lifetime</div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/journey" className="btn-ghost-luxe text-sm">View journey</Link>
            <button className="btn-luxe shine text-sm"><Settings className="h-4 w-4" /> Preferences</button>
          </div>
        </motion.div>

        <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl">Upcoming rituals</h2>
              <Link to="/explore" className="text-xs text-gold inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> Book another</Link>
            </div>
            <div className="space-y-3">
              {bookings.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-4 flex items-center gap-4">
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
                <div key={i} className="rounded-2xl overflow-hidden glass">
                  <img src={b.img} alt="" className="aspect-[4/3] object-cover w-full" />
                  <div className="p-3">
                    <div className="text-sm font-medium">{b.n}</div>
                    <div className="text-xs text-muted-foreground">{b.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="glass-strong rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold"><Heart className="h-3 w-3" /> Rewards</div>
              <div className="font-display text-5xl mt-3 text-gradient-gold">14,200</div>
              <div className="text-xs text-muted-foreground">Luxe Points · ₹14,200 redeemable</div>
              <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-luxe" style={{ width: "68%" }} />
              </div>
              <div className="text-xs text-muted-foreground mt-2">6,800 pts to Onyx Tier</div>
            </div>
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold"><Sparkles className="h-3 w-3" /> Luxe AI suggests</div>
              <div className="font-display text-lg mt-2">Re-book Aanya before 25 Jul</div>
              <p className="text-xs text-muted-foreground mt-1">Your color cycle is at week 9 — ideal window starts Friday.</p>
              <button className="mt-4 btn-luxe shine text-xs">Hold a slot</button>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}
