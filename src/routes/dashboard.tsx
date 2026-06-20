import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Sparkles, Calendar, ArrowUpRight, Bell } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Salon Owner Dashboard — Mumbai Luxe" }] }),
  component: Dashboard,
});

const rev = Array.from({ length: 30 }, (_, i) => ({ d: i + 1, v: 30000 + Math.round(Math.sin(i / 3) * 12000 + i * 800 + Math.random() * 5000) }));
const cust = Array.from({ length: 12 }, (_, i) => ({ m: i, n: 80 + i * 6 + Math.round(Math.random() * 12), r: 60 + i * 5 }));
const mix = [
  { n: "Color", v: 42, c: "#D4AF37" },
  { n: "Cuts", v: 22, c: "#A855F7" },
  { n: "Spa", v: 18, c: "#7C3AED" },
  { n: "Bridal", v: 18, c: "#fff5cc" },
];

function Dashboard() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Maison Aura · Owner</div>
            <h1 className="font-display text-5xl md:text-6xl mt-2">Good evening, Rohan.</h1>
            <p className="text-muted-foreground mt-2">Bandra West · 14 chairs · 18 stylists</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-ghost-luxe text-sm"><Bell className="h-4 w-4" /> 3 alerts</button>
            <button className="btn-luxe shine text-sm"><Sparkles className="h-4 w-4" /> Ask Luxe AI</button>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          <Kpi icon={TrendingUp} label="Revenue · MTD" value="₹38.2L" delta="+22%" />
          <Kpi icon={Calendar} label="Bookings · today" value="74" delta="+9" />
          <Kpi icon={Users} label="New members" value="142" delta="+18%" />
          <Kpi icon={Sparkles} label="Repeat rate" value="68%" delta="+4 pts" />
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <Panel className="lg:col-span-2" title="Revenue · last 30 days" kicker="₹">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={rev}>
                <defs>
                  <linearGradient id="rg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip contentStyle={{ background: "rgba(20,20,30,0.95)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="#A855F7" strokeWidth={2} fill="url(#rg)" />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Service mix" kicker="By revenue">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={mix} dataKey="v" nameKey="n" innerRadius={60} outerRadius={90} paddingAngle={3}>
                  {mix.map((m) => <Cell key={m.n} fill={m.c} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "rgba(20,20,30,0.95)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 px-4 pb-2">
              {mix.map((m) => (
                <div key={m.n} className="flex items-center gap-2 text-xs">
                  <div className="h-2 w-2 rounded-full" style={{ background: m.c }} />
                  {m.n} · <span className="text-muted-foreground">{m.v}%</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="lg:col-span-2" title="Customers" kicker="New vs returning">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={cust}>
                <XAxis dataKey="m" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip contentStyle={{ background: "rgba(20,20,30,0.95)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="n" stroke="#D4AF37" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="r" stroke="#A855F7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Luxe AI · Growth notes">
            <ul className="space-y-3 text-sm">
              {[
                { t: "Open Sunday 11am slot", s: "+₹68k projected · 92% fill prob." },
                { t: "Bundle Glow Protocol + Balayage", s: "Members opt-in at 38%" },
                { t: "Aanya M. has 4 idle hours", s: "Promote bridal trials to past clients" },
                { t: "Reduce no-shows", s: "Switch to ₹500 hold for non-members" },
              ].map((i) => (
                <li key={i.t} className="flex items-start gap-3">
                  <ArrowUpRight className="h-4 w-4 text-gold mt-0.5" />
                  <div>
                    <div className="font-medium">{i.t}</div>
                    <div className="text-xs text-muted-foreground">{i.s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Kpi({ icon: Icon, label, value, delta }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div className="font-display text-3xl mt-2 text-gradient-gold">{value}</div>
      <div className="text-xs text-emerald-400 mt-1">{delta}</div>
    </motion.div>
  );
}

function Panel({ title, kicker, children, className = "" }: any) {
  return (
    <div className={`glass rounded-3xl p-5 ${className}`}>
      <div className="mb-3">
        <div className="font-display text-lg">{title}</div>
        <div className="text-xs text-muted-foreground">{kicker}</div>
      </div>
      {children}
    </div>
  );
}
