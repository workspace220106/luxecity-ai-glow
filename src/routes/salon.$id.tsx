import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getSalon } from "@/lib/salons";
import { Star, MapPin, Clock, Heart, Share2, Calendar, Sparkles, ChevronRight, Check } from "lucide-react";

export const Route = createFileRoute("/salon/$id")({
  loader: ({ params }) => {
    const salon = getSalon(params.id);
    if (!salon) throw notFound();
    return { salon };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.salon.name ?? "Salon"} — Mumbai Luxe` },
      { name: "description", content: loaderData?.salon.tagline ?? "" },
      { property: "og:image", content: loaderData?.salon.image ?? "" },
    ],
  }),
  component: SalonPage,
});

function SalonPage() {
  const { salon } = Route.useLoaderData();
  const [serviceIdx, setServiceIdx] = useState(0);
  const [stylistIdx, setStylistIdx] = useState(0);
  const [date, setDate] = useState(2);
  const [time, setTime] = useState("5:30 PM");

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
  const times = ["11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:30 PM", "7:00 PM"];

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero gallery */}
      <section className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/explore" className="text-xs text-muted-foreground hover:text-foreground">← Back to atelier index</Link>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  {salon.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full glass">{t}</span>
                  ))}
                </div>
                <h1 className="font-display text-5xl md:text-7xl mt-4 leading-none">{salon.name}</h1>
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {salon.area}, Mumbai</span>
                  <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {salon.rating} · {salon.reviews.toLocaleString("en-IN")} reviews</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Open until 9:00 PM</span>
                </div>
                <p className="mt-3 text-lg italic text-muted-foreground font-display">"{salon.tagline}"</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-10 w-10 rounded-full glass flex items-center justify-center hover:ring-gold"><Heart className="h-4 w-4" /></button>
                <button className="h-10 w-10 rounded-full glass flex items-center justify-center hover:ring-gold"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-4 grid-rows-2 gap-3 h-[520px]">
            <motion.img layoutId="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={salon.image} alt="" className="col-span-2 row-span-2 rounded-3xl object-cover h-full w-full" />
            {[
              "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80",
              "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
              "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
            ].map((src, i) => (
              <motion.img key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} src={src} alt="" className="rounded-2xl object-cover h-full w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-6 mt-16 grid lg:grid-cols-[1.6fr_1fr] gap-12">
        <div className="space-y-16">
          {/* Signature */}
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Signature</div>
            <h2 className="font-display text-3xl mt-2">{salon.signature}</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed max-w-2xl">
              A 2.5-hour ritual blending Parisian color theory with hand-painted Indian
              tradition. Begins with a scalp diagnostic, finishes with a 24k gold-infused gloss.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-2xl">Services</h3>
            <div className="mt-5 divide-y divide-border/40 glass rounded-2xl">
              {salon.services.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setServiceIdx(i)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors ${serviceIdx === i ? "bg-gold/5" : ""}`}
                >
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {serviceIdx === i && <Check className="h-4 w-4 text-gold" />}
                      {s.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{s.duration} · Master stylist included</div>
                  </div>
                  <div className="font-display text-lg text-gradient-gold">₹{s.price.toLocaleString("en-IN")}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stylists */}
          <div>
            <h3 className="font-display text-2xl">The team</h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {salon.stylists.map((st, i) => (
                <button
                  key={st.name}
                  onClick={() => setStylistIdx(i)}
                  className={`rounded-2xl p-5 text-left border transition-all ${
                    stylistIdx === i ? "border-gold/60 ring-gold bg-gradient-card" : "border-border/60 glass"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img src={`https://i.pravatar.cc/80?img=${20 + i + serviceIdx}`} alt="" className="h-14 w-14 rounded-full" />
                    <div>
                      <div className="font-medium">{st.name}</div>
                      <div className="text-xs text-muted-foreground">{st.role} · {st.years} yrs</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-display text-2xl">What members say</h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {[
                { n: "Tanya R.", q: "The toner alone is worth the membership.", r: 5 },
                { n: "Ananya K.", q: "Rohan understood my hair in one consultation.", r: 5 },
                { n: "Meher J.", q: "Felt like a Parisian salon — in BKC traffic.", r: 5 },
                { n: "Saif H.", q: "Cleanest, calmest hour of my month.", r: 5 },
              ].map((r) => (
                <div key={r.n} className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(r.r)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                  <p className="text-sm mt-2">{r.q}</p>
                  <div className="text-xs text-muted-foreground mt-3">— {r.n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky booking widget */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="glass-strong rounded-3xl p-6 border border-gold/30 ring-gold"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-gold flex items-center gap-1"><Sparkles className="h-3 w-3" /> Reserve</div>
            <div className="mt-2 font-display text-2xl">{salon.services[serviceIdx].name}</div>
            <div className="text-xs text-muted-foreground">with {salon.stylists[stylistIdx].name}</div>

            <div className="mt-5">
              <div className="text-xs text-muted-foreground mb-2">Select date</div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {dates.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setDate(i)}
                    className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 shrink-0 transition-all ${
                      date === i ? "bg-gold text-ink" : "glass hover:ring-gold"
                    }`}
                  >
                    <span className="text-[10px] uppercase">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                    <span className="text-base font-display">{d.getDate()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs text-muted-foreground mb-2">Select time</div>
              <div className="grid grid-cols-3 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`text-xs rounded-lg py-2 transition-all ${
                      time === t ? "bg-gold text-ink" : "glass hover:ring-gold"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="font-display text-2xl text-gradient-gold">₹{salon.services[serviceIdx].price.toLocaleString("en-IN")}</div>
              </div>
              <button className="btn-luxe shine"><Calendar className="h-4 w-4" /> Confirm</button>
            </div>

            <div className="mt-4 text-[11px] text-muted-foreground flex items-center gap-1">
              <Check className="h-3 w-3 text-gold" /> Free cancellation up to 4 hours prior
            </div>
          </motion.div>

          <Link to="/ai-advisor" className="mt-4 block glass rounded-2xl p-4 group hover:ring-gold transition-all">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gold">Luxe AI suggests</div>
                <div className="text-sm mt-0.5">Pair with a Glow Protocol facial — save 15%</div>
              </div>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </aside>
      </section>

      <Footer />
    </div>
  );
}
