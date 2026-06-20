import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArrowRight, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/investors")({
  head: () => ({ meta: [{ title: "Investor Pitch — Mumbai Luxe" }] }),
  component: Investors,
});

function Investors() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Series A · Q4 2026</div>
          <h1 className="font-display text-6xl md:text-8xl mt-3 leading-[0.95]">
            Building India's <span className="text-gradient-gold italic">first luxury beauty OS</span>.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
            ₹2.4L Cr market. 0% software penetration in the luxury tier. A 24,000-strong waitlist of India's highest-earning beauty spenders. We're raising to take Luxe to Delhi, Bangalore and Dubai.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-4 gap-4">
          {[
            { k: "₹18 Cr", v: "GMV in 2026" },
            { k: "24,000", v: "Active members" },
            { k: "+28%", v: "MoM revenue growth" },
            { k: "92%", v: "Member retention" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-6 text-center">
              <div className="font-display text-4xl text-gradient-gold">{s.k}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="glass-strong rounded-3xl p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-gold flex items-center gap-1"><TrendingUp className="h-3 w-3" /> The opportunity</div>
            <h2 className="font-display text-3xl mt-3">A market hiding in plain sight.</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Indian luxury beauty: ₹38,000 Cr by 2028 (Bain & Co.)",
                "Top 4% of customers drive 41% of category revenue",
                "Zero verticalised software for luxury salons in India",
                "Mumbai alone: ₹3,200 Cr addressable",
              ].map((l) => <li key={l} className="flex items-start gap-2"><span className="text-gold mt-0.5">→</span> {l}</li>)}
            </ul>
          </div>
          <div className="glass-strong rounded-3xl p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Why us</div>
            <h2 className="font-display text-3xl mt-3">Founders who actually live here.</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Operator-founders with 30+ years combined in beauty",
                "Proprietary Luxe Visage AI · trained on 1.2M Indian faces",
                "47 ateliers in 11 months · 0 sales team",
                "Backed by angels from Nykaa, Lenskart, BlueStone",
              ].map((l) => <li key={l} className="flex items-start gap-2"><span className="text-gold mt-0.5">→</span> {l}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-gradient-card border border-gold/40 ring-gold p-10 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Now raising</div>
          <div className="font-display text-5xl md:text-6xl mt-3 text-gradient-gold">$12M Series A</div>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Lead investor TBD. 30% allocated. Deck on request.</p>
          <Link to="/contact" className="btn-luxe shine mt-6 inline-flex">Request the deck <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
