import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AiOrb } from "@/components/ai-orb";
import { Upload, Scan, Sparkles, Camera, ArrowRight } from "lucide-react";
import { salons } from "@/lib/salons";

export const Route = createFileRoute("/ai-advisor")({
  head: () => ({ meta: [{ title: "AI Beauty Advisor — Mumbai Luxe" }] }),
  component: Advisor,
});

type Phase = "upload" | "scanning" | "results";

function Advisor() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [img, setImg] = useState<string | null>(null);

  function start(src: string) {
    setImg(src);
    setPhase("scanning");
    setTimeout(() => setPhase("results"), 4200);
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 pb-16 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">AI Beauty Advisor</div>
          <h1 className="font-display text-5xl md:text-7xl mt-3 leading-[0.95]">
            A clinical-grade <span className="text-gradient-gold italic">beauty diagnosis</span> in 12 seconds.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl">
            Upload a selfie. Luxe AI analyses 64 facial micro-zones, 12 skin metrics and 8 hair signals — then matches you with the city's most precise specialists.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="rounded-3xl bg-gradient-card border border-border/60 p-8 min-h-[520px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {phase === "upload" && <UploadPanel key="u" onPick={start} />}
              {phase === "scanning" && img && <ScanPanel key="s" src={img} />}
              {phase === "results" && img && <ResultsPanel key="r" src={img} />}
            </AnimatePresence>
          </div>

          <aside className="space-y-4">
            <div className="glass-strong rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold">Luxe AI</div>
                  <div className="font-display text-xl mt-1">Concierge online</div>
                </div>
                <AiOrb size={90} />
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Trained on 1.2M dermatology-graded faces and 380K stylist case files across India.
              </p>
            </div>
            <div className="glass rounded-3xl p-6 text-xs text-muted-foreground space-y-3">
              <Row label="Engine" v="Luxe Visage v3.2" />
              <Row label="Zones analysed" v="64 facial · 12 hair" />
              <Row label="Privacy" v="On-device · Never stored" />
              <Row label="Avg latency" v="11.4s" />
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Row({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}

function UploadPanel({ onPick }: { onPick: (src: string) => void }) {
  const samples = [
    "https://i.pravatar.cc/300?img=47",
    "https://i.pravatar.cc/300?img=32",
    "https://i.pravatar.cc/300?img=23",
    "https://i.pravatar.cc/300?img=5",
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Step 01</div>
      <div className="font-display text-3xl mt-2">Upload a selfie</div>
      <p className="text-sm text-muted-foreground mt-2">Natural light. No filter. Face only.</p>

      <div className="mt-8 rounded-2xl border border-dashed border-gold/40 p-10 flex flex-col items-center text-center bg-ink/30">
        <div className="h-14 w-14 rounded-2xl bg-gradient-luxe flex items-center justify-center">
          <Upload className="h-6 w-6 text-ink" />
        </div>
        <div className="mt-4 font-medium">Drop a photo, or take one</div>
        <div className="text-xs text-muted-foreground mt-1">JPG, PNG up to 12MB</div>
        <div className="mt-5 flex gap-3">
          <button onClick={() => onPick(samples[0])} className="btn-luxe shine"><Camera className="h-4 w-4" /> Use sample selfie</button>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs text-muted-foreground mb-3">Or try one of these</div>
        <div className="flex gap-3">
          {samples.map((s) => (
            <button key={s} onClick={() => onPick(s)} className="overflow-hidden rounded-xl hover:ring-gold transition-all">
              <img src={s} alt="" className="h-20 w-20 object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ScanPanel({ src }: { src: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center">
      <div className="relative">
        <div className="relative h-72 w-72 rounded-3xl overflow-hidden ring-gold">
          <img src={src} alt="" className="h-full w-full object-cover" />
          <motion.div
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_20px_var(--gold)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* facial grid */}
          <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100">
            {[...Array(12)].map((_, i) => (
              <circle key={i} cx={20 + (i * 7) % 60} cy={20 + (i * 11) % 60} r="2" fill="var(--gold)">
                <animate attributeName="opacity" values="0.2;1;0.2" dur={`${1.5 + (i % 3) * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.1}s`} />
              </circle>
            ))}
          </svg>
        </div>
        <motion.div
          className="absolute -inset-4 rounded-3xl border border-gold/40"
          animate={{ scale: [1, 1.1], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="mt-8 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-gold flex items-center gap-1 justify-center"><Scan className="h-3 w-3" /> Analysing</div>
        <div className="font-display text-2xl mt-2 shimmer-text">Mapping 64 micro-zones…</div>
        <div className="text-xs text-muted-foreground mt-2">Hydration · Pigmentation · Texture · Hairline · Density</div>
      </div>
    </motion.div>
  );
}

function ResultsPanel({ src }: { src: string }) {
  const metrics = [
    { l: "Hydration", v: 78, c: "var(--gold)" },
    { l: "Brightness", v: 64, c: "var(--glow)" },
    { l: "Texture", v: 82, c: "var(--gold)" },
    { l: "Pore clarity", v: 71, c: "var(--royal)" },
    { l: "Hair density", v: 88, c: "var(--gold)" },
    { l: "Scalp health", v: 74, c: "var(--glow)" },
  ];
  const matches = salons.slice(0, 3);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Your Luxe Profile</div>
          <div className="font-display text-3xl mt-2">Radiant — but craving moisture</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Overall Glow Score</div>
          <div className="font-display text-4xl text-gradient-gold">76</div>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-[140px_1fr] gap-6 items-start">
        <img src={src} alt="" className="rounded-2xl h-32 w-32 object-cover ring-gold" />
        <div className="grid grid-cols-2 gap-3 w-full">
          {metrics.map((m, i) => (
            <motion.div
              key={m.l}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-xl p-3"
            >
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{m.l}</span>
                <span className="font-medium">{m.v}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${m.v}%` }} transition={{ duration: 1, delay: i * 0.07 }} className="h-full rounded-full" style={{ background: m.c }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">Curated for you</div>
        <div className="mt-3 space-y-3">
          {matches.map((s, i) => (
            <Link to="/salon/$id" params={{ id: s.id }} key={s.id} className="flex items-center gap-4 p-3 rounded-2xl glass hover:ring-gold transition-all group">
              <img src={s.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{i === 0 ? "Best fit for hydration boost" : i === 1 ? "Pair with AI Skin Map" : "For glow week"}</div>
              </div>
              <div className="text-xs text-gold">{92 - i * 5}% match</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>

      <Link to="/matchmaker" className="mt-8 btn-luxe shine inline-flex"><Sparkles className="h-4 w-4" /> Build my booking plan</Link>
    </motion.div>
  );
}
