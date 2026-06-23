import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import type { Salon } from "@/lib/salons";

export function SalonCard({ salon, index = 0 }: { salon: Salon; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link
        to={`/salon/${salon.id}`}
        className="block rounded-3xl bg-gradient-card overflow-hidden border border-border/60 hover:border-gold/40 transition-all hover:ring-gold"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={salon.image}
            alt={salon.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            {salon.tags.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full glass-strong">{t}</span>
            ))}
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full glass-strong px-2.5 py-1">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="text-xs font-medium">{salon.rating}</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="font-display text-2xl tracking-tight">{salon.name}</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" /> {salon.area}
            </div>
          </div>
        </div>
        <div className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Signature</div>
            <div className="text-sm font-medium">{salon.signature}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">From</div>
            <div className="font-display text-lg text-gradient-gold">₹{salon.priceFrom.toLocaleString("en-IN")}</div>
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between text-sm border-t border-border/50 pt-4 text-muted-foreground group-hover:text-foreground transition-colors">
            <span>{salon.reviews.toLocaleString("en-IN")} reviews</span>
            <span className="inline-flex items-center gap-1">View atelier <ArrowUpRight className="h-4 w-4" /></span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
