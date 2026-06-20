import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";
import { AiOrb } from "@/components/ai-orb";
import { SalonCard } from "@/components/salon-card";
import { salons } from "@/lib/salons";
import {
  Sparkles, Scan, Wand2, MapPin, Calendar, Shield, ArrowRight,
  Quote, Star, Smartphone, Crown, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mumbai Luxe — India's AI-curated luxury salon marketplace" },
      { name: "description", content: "Discover Mumbai's finest ateliers. Book master stylists. AI Beauty Advisor, AI Matchmaker, and the Luxe Club — designed for the city's most discerning." },
      { property: "og:title", content: "Mumbai Luxe — Luxury beauty, curated by AI" },
      { property: "og:description", content: "Mumbai's most exquisite salons in one beautiful place." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CursorGlow />
      <Nav />
      <Hero />
      <Stats />
      <FeaturedSalons />
      <AiShowcase />
      <HowItWorks />
      <Testimonials />
      <ClubBlock />
      <Brands />
      <DownloadApp />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = "Mumbai's finest ateliers, curated by AI.".split(" ");

  return (
    <section ref={ref} className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden noise">
      {/* Skyline silhouette */}
      <motion.svg
        style={{ y: y1, opacity }}
        viewBox="0 0 1600 300"
        className="absolute -bottom-10 left-0 right-0 w-full opacity-40 pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.22 300)" stopOpacity="0.0" />
            <stop offset="100%" stopColor="oklch(0.82 0.14 85)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          fill="url(#sky)"
          d="M0,300 L0,180 L60,180 L80,140 L100,180 L160,180 L180,120 L220,180 L260,160 L300,80 L340,160 L380,140 L420,140 L460,90 L500,140 L560,140 L600,60 L620,140 L680,140 L720,100 L760,140 L820,140 L860,70 L900,140 L960,140 L1000,110 L1060,140 L1100,160 L1140,90 L1180,160 L1240,160 L1280,120 L1320,180 L1380,180 L1420,140 L1460,180 L1520,160 L1560,140 L1600,180 L1600,300 Z"
        />
        {/* Sea link cables */}
        <path d="M900,300 Q1100,160 1300,300" stroke="oklch(0.82 0.14 85 / 0.6)" strokeWidth="1" fill="none" />
        <path d="M900,300 Q1100,180 1300,300" stroke="oklch(0.82 0.14 85 / 0.3)" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Floating particles */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 90}%`,
            width: 2 + (i % 4),
            height: 2 + (i % 4),
            background: i % 3 === 0 ? "var(--gold)" : "var(--glow)",
            filter: "blur(1px)",
            boxShadow: "0 0 10px currentColor",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-muted-foreground">Live in 47 ateliers across Mumbai</span>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3"
              >
                {i === words.length - 2 ? (
                  <span className="text-gradient-gold italic">{w}</span>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            One membership. Every great salon in the city. A personal AI concierge that knows your hair, your skin, and your calendar — better than you do.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/explore" className="btn-luxe shine">
              Explore ateliers <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ai-advisor" className="btn-ghost-luxe">
              <Sparkles className="h-4 w-4 text-gold" /> Try AI Beauty Advisor
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-12 flex items-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {[
                "https://i.pravatar.cc/40?img=47",
                "https://i.pravatar.cc/40?img=32",
                "https://i.pravatar.cc/40?img=12",
                "https://i.pravatar.cc/40?img=5",
              ].map((s) => (
                <img key={s} src={s} alt="" className="h-8 w-8 rounded-full border-2 border-background" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-foreground">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}
                <span className="ml-1 font-medium">4.94</span>
              </div>
              <div>Loved by 24,000+ Mumbaikars</div>
            </div>
          </motion.div>
        </div>

        {/* Hero visual: floating cards + AI orb */}
        <motion.div style={{ y: y2 }} className="relative h-[520px]">
          <FloatingCard
            image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
            title="Maison Aura"
            sub="Bandra West · 4.9★"
            className="absolute top-0 right-0 w-64 rotate-[6deg]"
            delay={0.4}
          />
          <FloatingCard
            image="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
            title="The Gilded Room"
            sub="Worli · 4.95★"
            className="absolute top-40 left-0 w-72 -rotate-[4deg] z-10"
            delay={0.7}
          />
          <FloatingCard
            image="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80"
            title="The Mews"
            sub="Colaba · 4.9★"
            className="absolute bottom-0 right-8 w-56 rotate-[3deg]"
            delay={1.0}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <AiOrb size={180} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({
  image, title, sub, className, delay = 0,
}: { image: string; title: string; sub: string; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.03 }}
      className={`animate-float glass-strong rounded-2xl p-2 ${className}`}
    >
      <div className="overflow-hidden rounded-xl">
        <img src={image} alt={title} className="aspect-[4/3] w-full object-cover" />
      </div>
      <div className="px-2 py-3">
        <div className="font-display text-lg leading-none">{title}</div>
        <div className="text-xs text-muted-foreground mt-1">{sub}</div>
      </div>
    </motion.div>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const stats = [
    { k: "47", v: "Luxury ateliers" },
    { k: "320+", v: "Master stylists" },
    { k: "24k", v: "Members" },
    { k: "₹18Cr", v: "Booked this year" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.v}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="font-display text-4xl md:text-5xl text-gradient-gold">{s.k}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.v}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FEATURED ---------- */
function FeaturedSalons() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        kicker="The Atelier Index"
        title="Mumbai's most exquisite salons"
        sub="A hand-curated edit of the city's leading houses — refreshed every Monday."
        cta={{ label: "Browse all", to: "/explore" }}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {salons.slice(0, 6).map((s, i) => (
          <SalonCard key={s.id} salon={s} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- AI SHOWCASE ---------- */
function AiShowcase() {
  const features = [
    {
      icon: Scan,
      title: "AI Beauty Advisor",
      sub: "Upload a selfie. Get a clinical-grade skin & hair map in 12 seconds.",
      to: "/ai-advisor",
    },
    {
      icon: Wand2,
      title: "AI Matchmaker",
      sub: "Tell us your mood. We'll find the stylist that thinks like you.",
      to: "/matchmaker",
    },
    {
      icon: Calendar,
      title: "AI Booking Concierge",
      sub: "Just say 'a balayage before Sangeet' — we'll handle the rest.",
      to: "/matchmaker",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        kicker="Luxe Intelligence"
        title="Three AI concierges. One quietly brilliant platform."
        sub="Trained on 1.2M beauty interactions across India's top houses."
      />
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="group relative rounded-3xl bg-gradient-card p-8 border border-border/60 hover:border-gold/40 transition-all hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-2xl bg-gradient-luxe flex items-center justify-center animate-pulse-glow">
              <f.icon className="h-5 w-5 text-ink" />
            </div>
            <div className="mt-6 font-display text-2xl">{f.title}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.sub}</p>
            <Link to={f.to} className="mt-6 inline-flex items-center gap-1 text-sm text-gold opacity-80 group-hover:opacity-100">
              Try it now <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- HOW ---------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Tell us your story", d: "Hair history, skin profile, occasion, mood — in 60 seconds." },
    { n: "02", t: "Meet your concierge", d: "Luxe AI curates 3 ateliers and the exact stylist for you." },
    { n: "03", t: "Book in one tap", d: "Pre-paid, confirmed, with a sparkling water on arrival." },
    { n: "04", t: "Your beauty journey, remembered", d: "Every visit feeds your personal beauty diary." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader kicker="The Ritual" title="How Mumbai Luxe works" />
      <div className="grid md:grid-cols-4 gap-6 mt-12 relative">
        <div className="absolute top-12 left-12 right-12 hairline hidden md:block" />
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <div className="h-12 w-12 rounded-full glass-strong flex items-center justify-center font-display text-sm text-gold">
              {s.n}
            </div>
            <div className="font-display text-xl mt-5">{s.t}</div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const items = [
    { n: "Anaita Shroff", r: "Stylist & Editor, Vogue alum", q: "I have not had to call a salon in 9 months. Luxe just knows." },
    { n: "Karan Mehta", r: "Founder, Lightbox VC", q: "It's the Amex Centurion of beauty in India." },
    { n: "Naina Sethi", r: "Bride, Dec '25", q: "They held my entire wedding-week glam in one calendar." },
    { n: "Riya D'Souza", r: "Architect, BKC", q: "The AI Advisor caught my scalp issue before my derm did." },
    { n: "Aakash Bhalla", r: "Investor", q: "First product in India that treats beauty as luxury, not retail." },
    { n: "Mira Joshi", r: "DJ, Mahalaxmi", q: "Booked a 1AM blow-dry the night of a gig. Showed up. Magic." },
  ];
  const doubled = [...items, ...items];
  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="The Members" title="Loved by the city" />
      </div>
      <div className="mt-12 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-5 animate-marquee w-max">
          {doubled.map((t, i) => (
            <div key={i} className="w-[360px] shrink-0 glass rounded-2xl p-6">
              <Quote className="h-5 w-5 text-gold" />
              <p className="mt-3 text-sm leading-relaxed">{t.q}</p>
              <div className="mt-4 pt-4 border-t border-border/40">
                <div className="text-sm font-medium">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CLUB ---------- */
function ClubBlock() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-gold">The Luxe Club</div>
          <h2 className="font-display text-4xl md:text-6xl mt-3 leading-tight">
            A members-only key to <span className="text-gradient-gold">every great salon</span> in Mumbai.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-md">
            Priority booking across 47 ateliers. A dedicated concierge. Black-card pricing on signature rituals.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/membership" className="btn-luxe shine">
              <Crown className="h-4 w-4" /> View tiers
            </Link>
            <Link to="/about" className="btn-ghost-luxe">Learn more</Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="relative mx-auto w-full max-w-md aspect-[1.586] rounded-3xl p-8 shine overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2a1f10 50%, #1a1a1a 100%)",
            boxShadow: "0 40px 100px -20px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative h-full flex flex-col justify-between text-foreground">
            <div className="flex justify-between items-start">
              <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Mumbai Luxe</div>
              <Crown className="h-6 w-6 text-gold" />
            </div>
            <div>
              <div className="font-display text-3xl text-gradient-gold">Platinum</div>
              <div className="text-xs text-muted-foreground mt-1">No. 0024 / 2026</div>
              <div className="mt-3 text-sm tracking-widest">RIYA · D'SOUZA</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- BRANDS ---------- */
function Brands() {
  const brands = ["Kérastase", "La Mer", "Olaplex", "Augustinus Bader", "Tata Harper", "Charlotte Tilbury", "Davines", "Sisley Paris"];
  const doubled = [...brands, ...brands];
  return (
    <section className="py-16 border-y border-border/40">
      <div className="overflow-hidden">
        <div className="flex gap-16 animate-marquee w-max items-center">
          {doubled.map((b, i) => (
            <div key={i} className="font-display text-2xl text-muted-foreground/60 hover:text-gold transition-colors whitespace-nowrap">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DOWNLOAD ---------- */
function DownloadApp() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-3xl bg-gradient-card border border-border/60 p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center overflow-hidden relative">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-royal/30 blur-3xl" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Luxe on iOS · Android</div>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
            Your concierge, <span className="text-gradient-gold">in your pocket</span>.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md">
            Voice booking, daily rituals, scalp reminders, and a Live AI Stylist — designed natively for iPhone 16.
          </p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <button className="btn-luxe shine"><Smartphone className="h-4 w-4" /> Download for iOS</button>
            <button className="btn-ghost-luxe">Download for Android</button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ rotate: -2, scale: 1.02 }}
          className="relative mx-auto w-[260px] h-[540px] rounded-[3rem] glass-strong p-2 border border-border/60 animate-float"
          style={{ boxShadow: "0 60px 120px -30px rgba(124,58,237,0.5)" }}
        >
          <div className="h-full w-full rounded-[2.5rem] overflow-hidden bg-ink relative">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-ink" />
            <div className="absolute bottom-0 inset-x-0 p-5">
              <div className="text-xs text-gold uppercase tracking-widest">Today</div>
              <div className="font-display text-2xl mt-1">Aura Glow Balayage</div>
              <div className="text-xs text-muted-foreground mt-1">5:30 PM · Maison Aura</div>
              <div className="mt-4 glass rounded-2xl p-3 text-xs">
                <div className="text-gold">Luxe AI</div>
                <div className="mt-1 text-foreground">Rohan suggests a deeper toner today — your last visit lifted to a warm 7.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCta() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-5xl md:text-7xl leading-tight"
      >
        Step into a higher <br /><span className="text-gradient-gold italic">beauty life</span>.
      </motion.h2>
      <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
        Your first ritual is on us. Join 24,000 Mumbaikars who never look for a salon, ever again.
      </p>
      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        <Link to="/membership" className="btn-luxe shine">Join the Club</Link>
        <Link to="/explore" className="btn-ghost-luxe">Browse ateliers</Link>
      </div>
      <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-4 w-4 text-gold" /> 100% pre-paid · Cancellation up to 4 hours prior
      </div>
    </section>
  );
}

/* ---------- shared ---------- */
function SectionHeader({
  kicker, title, sub, cta,
}: { kicker: string; title: string; sub?: string; cta?: { label: string; to: string } }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">{kicker}</div>
        <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">{title}</h2>
        {sub && <p className="text-muted-foreground mt-3 max-w-xl">{sub}</p>}
      </div>
      {cta && (
        <Link to={cta.to} className="btn-ghost-luxe self-start md:self-end">
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
