import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Mail, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-5xl px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Made in Mumbai</div>
          <h1 className="font-display text-6xl md:text-8xl mt-3 leading-none">
            Beauty deserves a <span className="text-gradient-gold italic">higher standard</span>.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Mumbai has the world's best stylists, hidden behind a thousand WhatsApp threads. We built Luxe to bring them out — into a single, beautifully designed marketplace, powered by quietly brilliant AI.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 mt-24 grid md:grid-cols-3 gap-6">
        {[
          { n: "Anaita Khanna", r: "Co-founder & CEO", b: "Ex-Nykaa, ex-Goldman. Built Nykaa Luxe.", img: "https://i.pravatar.cc/200?img=49" },
          { n: "Rohan Sethi", r: "Co-founder & Creative", b: "16 yrs at L'Oréal Paris & Toni&Guy.", img: "https://i.pravatar.cc/200?img=12" },
          { n: "Dr. Naina Iyer", r: "Head of AI", b: "PhD, IIT Bombay. Computer Vision.", img: "https://i.pravatar.cc/200?img=32" },
        ].map((p, i) => (
          <motion.div key={p.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-3xl p-6 text-center">
            <img src={p.img} alt="" className="h-28 w-28 rounded-full mx-auto ring-gold" />
            <div className="font-display text-xl mt-4">{p.n}</div>
            <div className="text-xs text-gold">{p.r}</div>
            <p className="text-sm text-muted-foreground mt-2">{p.b}</p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-6 mt-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">The thesis</div>
            <h2 className="font-display text-4xl mt-3 leading-tight">Luxury, but for everyone who has earned it.</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            India's beauty industry is ₹2.4 lakh crore. The luxury sliver is fragmented, opaque, and rude to the modern customer. We're rebuilding it from the booking up — with a private-club soul and an AI brain.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 mt-24 text-center">
        <Mail className="h-6 w-6 text-gold mx-auto" />
        <div className="font-display text-3xl mt-3">Want to work with us?</div>
        <Link to="/contact" className="btn-luxe shine mt-6 inline-flex">Get in touch <ArrowRight className="h-4 w-4" /></Link>
      </section>
      <Footer />
    </div>
  );
}
