import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TrendingUp, Users, Sparkles, Calendar, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "Partner With Us — Mumbai Luxe" }] }),
  component: Partners,
});

function Partners() {
  const benefits = [
    { icon: Users, t: "Members who tip well", d: "Our 24,000 members spend 3.1× the city average." },
    { icon: Calendar, t: "Fill your empty chairs", d: "Smart calendar AI auto-fills idle hours." },
    { icon: TrendingUp, t: "Real revenue, real fast", d: "Avg partner sees +28% MoM revenue in 90 days." },
    { icon: Sparkles, t: "AI you can actually use", d: "Pricing, staffing, demand — all explained in plain English." },
  ];
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">For Salon Owners</div>
            <h1 className="font-display text-5xl md:text-7xl mt-3 leading-[0.95]">
              The luxury OS for <span className="text-gradient-gold italic">modern ateliers</span>.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md">
              Booking, payments, retention, AI staffing, and the city's most loyal members — in one beautifully simple platform.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/contact" className="btn-luxe shine">Apply to join <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/dashboard" className="btn-ghost-luxe">Tour the dashboard</Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <Stat n="47" l="ateliers live" />
              <Stat n="₹18Cr" l="processed in '26" />
              <Stat n="+28%" l="avg revenue lift" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl bg-gradient-card border border-border/60 p-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-royal/30 blur-3xl" />
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=900&q=80" alt="" className="rounded-2xl aspect-[4/3] object-cover" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {["+22% MTD", "74 bookings today", "68% repeat"].map((s) => (
                  <div key={s} className="glass rounded-xl p-3 text-xs text-center">{s}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div key={b.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass rounded-2xl p-6">
              <b.icon className="h-5 w-5 text-gold" />
              <div className="font-display text-xl mt-3">{b.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-6">
          {[
            { t: "Starter", p: "8%", d: "Per booking. No setup. Cancel anytime.", perks: ["Live calendar", "AI matchmaker traffic", "Card payouts T+2"] },
            { t: "Atelier", p: "5% + ₹9,999/mo", d: "Most popular.", perks: ["Everything in Starter", "Luxe AI Growth notes", "Membership co-branding", "Featured discovery"], featured: true },
            { t: "Maison", p: "Custom", d: "For multi-location houses.", perks: ["Dedicated success manager", "White-label app", "Inventory + payroll APIs", "Quarterly strategy review"] },
          ].map((p) => (
            <div key={p.t} className={`rounded-3xl p-8 border ${p.featured ? "border-gold/60 ring-gold" : "border-border/60"} bg-gradient-card`}>
              <div className="font-display text-2xl">{p.t}</div>
              <div className="font-display text-4xl text-gradient-gold mt-2">{p.p}</div>
              <div className="text-sm text-muted-foreground mt-1">{p.d}</div>
              <ul className="mt-5 space-y-2 text-sm">
                {p.perks.map((x) => <li key={x} className="flex items-start gap-2"><Check className="h-4 w-4 text-gold mt-0.5" /> {x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-gradient-gold">{n}</div>
      <div>{l}</div>
    </div>
  );
}
