import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SalonCard } from "@/components/salon-card";
import { salons, getLiveSalons, type Salon } from "@/lib/salons";
import { Search, SlidersHorizontal, Map as MapIcon, Grid3x3, Sparkles } from "lucide-react";

const areas = ["All", "Bandra West", "Worli", "Juhu", "Lower Parel", "Powai", "Colaba"];
const tags = ["All", "Balayage", "Bridal", "Spa", "Editorial", "AI Diagnostics", "Clean Beauty"];

export default function Explore() {
  const [salonsList, setSalonsList] = useState<Salon[]>(salons);
  const [area, setArea] = useState("All");
  const [tag, setTag] = useState("All");
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "map">("grid");

  useEffect(() => {
    getLiveSalons().then((list) => {
      setSalonsList(list);
    });
  }, []);

  const filtered = useMemo(() => {
    return salonsList.filter((s) => {
      if (area !== "All" && s.area !== area) return false;
      if (tag !== "All" && !s.tags.includes(tag)) return false;
      if (q && !`${s.name} ${s.tagline} ${s.area}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [salonsList, area, tag, q]);

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="pt-32 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">The Atelier Index</div>
            <h1 className="font-display text-5xl md:text-6xl mt-3">Find your house.</h1>
            <p className="text-muted-foreground mt-3 max-w-lg">A live edit of every salon worth your time in Mumbai.</p>
          </div>
          <Link to="/matchmaker" className="btn-luxe shine self-start md:self-end">
            <Sparkles className="h-4 w-4" /> Let AI choose for me
          </Link>
        </motion.div>

        {/* Filters */}
        <div className="mt-10 glass-strong rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search salons, stylists, services…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
            <div className="flex items-center gap-1 rounded-full bg-secondary/60 p-1">
              <button onClick={() => setView("grid")} className={`p-1.5 rounded-full ${view === "grid" ? "bg-gold text-ink" : "text-muted-foreground"}`}>
                <Grid3x3 className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setView("map")} className={`p-1.5 rounded-full ${view === "map" ? "bg-gold text-ink" : "text-muted-foreground"}`}>
                <MapIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="border-t border-border/40 pt-3 grid sm:grid-cols-2 gap-3">
            <FilterRow label="Area" items={areas} value={area} onChange={setArea} />
            <FilterRow label="Vibe" items={tags} value={tag} onChange={setTag} />
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {filtered.length} {filtered.length === 1 ? "atelier" : "ateliers"} matched
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-8">
        {view === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, i) => <SalonCard key={s.id} salon={s} index={i} />)}
          </div>
        ) : (
          <MapView salonsList={filtered} />
        )}
      </div>

      <Footer />
    </div>
  );
}

function FilterRow({ label, items, value, onChange }: { label: string; items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs uppercase tracking-widest text-muted-foreground w-12 shrink-0">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              value === i ? "bg-gold text-ink" : "glass hover:ring-gold"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}

function MapView({ salonsList }: { salonsList: Salon[] }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-border/60 aspect-[16/9] glass-strong">
      <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full opacity-60">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="800" height="450" fill="url(#grid)" />
        {/* coastline */}
        <path d="M0,300 Q200,200 350,260 T700,250 L800,450 L0,450 Z" fill="oklch(0.55 0.22 300 / 0.15)" />
      </svg>
      {salonsList.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="absolute"
          style={{ left: `${20 + i * 12}%`, top: `${30 + (i % 3) * 18}%` }}
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gold/30 blur-md animate-pulse" />
            <div className="relative h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap glass-strong rounded-lg px-2.5 py-1 text-xs">
              {s.name}
            </div>
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-2xl p-4 text-xs text-muted-foreground">
        A stylized live map. Powered by Mapbox in production.
      </div>
    </div>
  );
}
