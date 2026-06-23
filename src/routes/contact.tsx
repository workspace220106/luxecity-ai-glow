import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Contact</div>
          <h1 className="font-display text-5xl md:text-6xl mt-3 leading-tight">Talk to <span className="text-gradient-gold">a human</span>.</h1>
          <p className="text-muted-foreground mt-4">Members, partners, press — we read everything. Most messages get answered the same evening.</p>

          <div className="mt-10 space-y-4 text-sm">
            <Row icon={Mail} k="Email" v="concierge@mumbailuxe.com" />
            <Row icon={Phone} k="Phone" v="+91 22 6234 8888" />
            <Row icon={MapPin} k="Studio" v="One BKC, 19th Floor, Mumbai" />
          </div>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={(e) => e.preventDefault()} className="glass-strong rounded-3xl p-8 space-y-4">
          <Field label="Your name" placeholder="Riya D'Souza" />
          <Field label="Email" placeholder="you@example.com" />
          <Field label="Subject" placeholder="Press · Partnership · Members" />
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Message</div>
            <textarea rows={5} className="w-full bg-transparent border border-border/60 rounded-2xl p-3 outline-none focus:border-gold/60 text-sm" placeholder="A note from you…" />
          </div>
          <button className="btn-luxe shine"><Send className="h-4 w-4" /> Send message</button>
        </motion.form>
      </section>
      <Footer />
    </div>
  );
}

function Row({ icon: Icon, k, v }: any) {
  return (
    <div className="flex items-center gap-4 glass rounded-2xl p-4">
      <Icon className="h-4 w-4 text-gold" />
      <div>
        <div className="text-xs text-muted-foreground">{k}</div>
        <div>{v}</div>
      </div>
    </div>
  );
}
function Field({ label, placeholder }: any) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      <input placeholder={placeholder} className="w-full bg-transparent border border-border/60 rounded-2xl p-3 outline-none focus:border-gold/60 text-sm" />
    </div>
  );
}
