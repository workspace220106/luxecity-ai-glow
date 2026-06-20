import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { TrendingUp, Sparkles, Heart, Coins, Calendar } from "lucide-react";

export const Route = createFileRoute("/journey")({
  head: () => ({ meta: [{ title: "Beauty Journey — Mumbai Luxe" }] }),
  component: Journey,
});

const spendData = Array.from({ length: 12 }, (_, i) => ({ m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], v: 4000 + Math.round(Math.sin(i/2)*3000 + i*400 + Math.random()*1500) }));
const glowData = Array.from({ length: 12 }, (_, i) => ({ m: i, v: 60 + i*1.4 + Math.sin(i)*4 }));
const visitData = ["Bandra","Worli","Juhu","Lower Parel","Colaba"].map((n, i) => ({ n, v: [12, 8, 6, 4, 3][i] }));

function Journey() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Beauty Journey</div>
          <h1 className="font-display text-5xl md:text-6xl mt-3">Your year, rendered beautifully.</h1>
          <p className="text-muted-foreground mt-3 max-w-xl">A private diary of every ritual, every ₹, every glow shift across your atelier visits.</p>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          <Kpi icon={Coins} label="Lifetime spend" value="₹2,84,500" sub="+18% vs last year" />
          <Kpi icon={Calendar} label="Rituals" value="38" sub="Across 7 ateliers" />
          <Kpi icon={Heart} label="Loyalty rewards" value="14,200" sub="₹14,200 redeemable" />
          <Kpi icon={TrendingUp} label="Glow Score" value="84 / 100" sub="+9 since Jan" />
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <Panel title="Monthly spend" kicker="₹ across all bookings">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={spendData}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip contentStyle={{ background: "rgba(20,20,30,0.95)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="#D4AF37" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Glow Score trajectory" kicker="AI-measured, monthly">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={glowData}>
                <XAxis dataKey="m" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} domain={[50, 100]} />
                <Tooltip contentStyle={{ background: "rgba(20,20,30,0.95)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="v" stroke="#A855F7" strokeWidth={2.5} dot={{ r: 3, fill: "#A855F7" }} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Favourite neighbourhoods" kicker="Visits by area">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={visitData}>
                <XAxis dataKey="n" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip contentStyle={{ background: "rgba(20,20,30,0.95)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="v" fill="#D4AF37" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Hair & skin journey" kicker="Last 12 months">
            <div className="grid grid-cols-2 gap-3 p-2">
              {[
                { l: "Color tone", from: "Cool 6", to: "Warm 7" },
                { l: "Length", from: "Shoulder", to: "Mid-back" },
                { l: "Density", from: "78%", to: "88%" },
                { l: "Hydration", from: "62", to: "78" },
                { l: "Brightness", from: "55", to: "64" },
                { l: "Pore clarity", from: "60", to: "71" },
              ].map((r) => (
                <div key={r.l} className="glass rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.l}</div>
                  <div className="mt-1 text-xs flex items-center justify-between">
                    <span className="text-muted-foreground">{r.from}</span>
                    <span className="text-gold">→</span>
                    <span className="text-foreground">{r.to}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-6 glass-strong rounded-3xl p-6 flex items-start gap-4">
          <Sparkles className="h-5 w-5 text-gold mt-1" />
          <div>
            <div className="font-display text-lg">Luxe AI · Weekly note</div>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Your hydration recovered beautifully after the Glow Protocol in October. We'd recommend pulling forward your next Aura Balayage to early Feb — you trend warmer in winter.
            </p>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}

function Kpi({ icon: Icon, label, value, sub }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div className="font-display text-3xl mt-2 text-gradient-gold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </motion.div>
  );
}

function Panel({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-display text-lg">{title}</div>
          <div className="text-xs text-muted-foreground">{kicker}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
