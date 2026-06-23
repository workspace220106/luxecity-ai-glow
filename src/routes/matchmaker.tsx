import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AiOrb } from "@/components/ai-orb";
import { salons } from "@/lib/salons";
import { Sparkles, Send, ArrowRight } from "lucide-react";

const occasions = ["Bridal week", "Date night", "Boardroom", "Weekend reset", "Sangeet", "Anniversary"];
const areas = ["Bandra", "Worli", "Juhu", "Lower Parel", "Colaba", "Powai"];
const budgets = ["Under ₹5k", "₹5k – ₹12k", "₹12k – ₹25k", "₹25k+"];

export default function Matchmaker() {
  const [occ, setOcc] = useState("Sangeet");
  const [area, setArea] = useState("Bandra");
  const [budget, setBudget] = useState("₹12k – ₹25k");
  const [prompt, setPrompt] = useState("Subtle balayage, glassy skin, before Friday.");
  const [phase, setPhase] = useState<"form" | "thinking" | "result">("form");

  function run() {
    setPhase("thinking");
    setTimeout(() => setPhase("result"), 3200);
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">AI Matchmaker</div>
            <h1 className="font-display text-5xl md:text-6xl mt-3 leading-tight">
              Tell us your <span className="text-gradient-gold italic">mood</span>. <br />
              We'll find the stylist that thinks like you.
            </h1>
            <p className="mt-5 text-muted-foreground max-w-md">
              The Luxe AI talks to every salon's live calendar, weighs your beauty journey, and proposes a plan.
            </p>

            <div className="mt-10 glass-strong rounded-3xl p-6 space-y-5">
              <Group label="Occasion" value={occ} options={occasions} onChange={setOcc} />
              <Group label="Area" value={area} options={areas} onChange={setArea} />
              <Group label="Budget" value={budget} options={budgets} onChange={setBudget} />

              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">In your words</div>
                <div className="flex items-end gap-2 glass rounded-2xl p-3">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={2}
                    className="flex-1 bg-transparent outline-none text-sm resize-none"
                  />
                  <button onClick={run} className="btn-luxe shine">
                    <Send className="h-4 w-4" /> Match
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl bg-gradient-card border border-border/60 p-8 min-h-[600px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {phase === "form" && <FormState key="f" />}
                {phase === "thinking" && <ThinkingState key="t" />}
                {phase === "result" && <ResultState key="r" />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Group({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${value === o ? "bg-gold text-ink" : "glass hover:ring-gold"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function FormState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center">
      <AiOrb size={180} />
      <div className="mt-8 font-display text-2xl">Ready when you are.</div>
      <p className="text-sm text-muted-foreground mt-2 max-w-xs">
        Pick a mood, an area, a budget — or just describe the version of yourself you want to walk out as.
      </p>
    </motion.div>
  );
}

function ThinkingState() {
  const steps = [
    "Scanning live calendars across 47 salons…",
    "Cross-referencing your beauty journey…",
    "Consulting 12 master stylists…",
    "Optimising for your Friday window…",
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center">
      <AiOrb size={140} />
      <div className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">Composing your plan</div>
      <div className="mt-6 space-y-3 w-full max-w-sm">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.7 }}
            className="flex items-center gap-3 text-sm"
          >
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-gold"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.7 }}
            />
            <span className="shimmer-text">{s}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ResultState() {
  const picks = salons.slice(0, 3);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="text-xs uppercase tracking-[0.3em] text-gold flex items-center gap-1"><Sparkles className="h-3 w-3" /> Your Luxe Plan</div>
      <div className="font-display text-3xl mt-2 leading-tight">
        A 3-stop ritual for your <span className="text-gradient-gold">Sangeet week</span>.
      </div>
      <p className="text-sm text-muted-foreground mt-2">Designed in 2.4 seconds. Holds your calendar across Tue–Fri.</p>

      <div className="mt-8 space-y-3">
        {picks.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="font-display text-2xl text-gold w-8">{`0${i + 1}`}</div>
            <img src={s.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-muted-foreground truncate">{["Tue · AI Skin Map", "Wed · Aura Balayage", "Fri · Sangeet Glam"][i]}</div>
            </div>
            <div className="text-xs text-gold whitespace-nowrap">{96 - i * 4}% fit</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between glass-strong rounded-2xl p-4">
        <div>
          <div className="text-xs text-muted-foreground">Total · 3 services</div>
          <div className="font-display text-2xl text-gradient-gold">₹38,400</div>
        </div>
        <Link to="/explore" className="btn-luxe shine">Hold this plan <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </motion.div>
  );
}
