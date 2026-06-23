import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Crown, Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Silver",
    price: 999,
    color: "linear-gradient(135deg, #b8b8b8, #6c6c6c)",
    desc: "For the regulars.",
    perks: ["10% off all services", "Priority Sunday slots", "Quarterly Glow Audit", "Birthday ritual"],
  },
  {
    name: "Gold",
    price: 2999,
    color: "linear-gradient(135deg, #f3d27e, #b8881f)",
    desc: "Most loved.",
    perks: ["15% off all services", "Dedicated AI concierge", "Monthly Glow Audit", "Free blow-dry, twice a month", "Early access to new ateliers"],
    featured: true,
  },
  {
    name: "Platinum",
    price: 7999,
    color: "linear-gradient(135deg, #f8f3e3, #b9a78a 60%, #1a1a1a)",
    desc: "Members-only key to the city.",
    perks: ["25% off all services", "On-call house stylist", "Unlimited blow-dries", "After-hours bookings", "Wedding week concierge", "Hotel & airport pickup"],
  },
];

export default function Membership() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-7xl px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs uppercase tracking-[0.3em] text-gold flex items-center justify-center gap-1"><Crown className="h-3 w-3" /> The Luxe Club</div>
          <h1 className="font-display text-6xl md:text-7xl mt-3 leading-none">
            One key. <span className="text-gradient-gold italic">Every great salon.</span>
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
            A private membership that opens the doors of Mumbai's most exquisite ateliers — at a fraction of the public price.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 border ${t.featured ? "border-gold/60 ring-gold" : "border-border/60"} bg-gradient-card overflow-hidden shine`}
            >
              {t.featured && (
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest bg-gold text-ink rounded-full px-2 py-0.5">Most loved</div>
              )}
              {/* shimmery card surface */}
              <div className="aspect-[1.586] rounded-2xl mb-6 relative overflow-hidden shine" style={{ background: t.color }}>
                <div className="absolute inset-0 noise opacity-30" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between text-ink">
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.3em]">
                    <span>Mumbai Luxe</span>
                    <Crown className="h-3 w-3" />
                  </div>
                  <div className="font-display text-2xl">{t.name}</div>
                </div>
              </div>
              <div className="font-display text-3xl">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.desc}</div>
              <div className="mt-4 flex items-end gap-1">
                <div className="font-display text-5xl text-gradient-gold">₹{t.price.toLocaleString("en-IN")}</div>
                <div className="text-xs text-muted-foreground pb-2">/ month</div>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <Link to="/explore" className={`mt-8 w-full inline-flex justify-center ${t.featured ? "btn-luxe shine" : "btn-ghost-luxe"}`}>
                Join {t.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 glass rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <Sparkles className="h-6 w-6 text-gold" />
            <div>
              <div className="font-display text-xl">Corporate Suite</div>
              <div className="text-sm text-muted-foreground">For founders and brands. Membership for your whole team.</div>
            </div>
          </div>
          <Link to="/contact" className="btn-ghost-luxe">Talk to us</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
