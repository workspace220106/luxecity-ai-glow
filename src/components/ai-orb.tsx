import { motion } from "framer-motion";

export function AiOrb({ size = 160 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--gold), var(--royal), var(--glow), var(--gold))",
          filter: "blur(8px)",
          opacity: 0.7,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 rounded-full glass-strong animate-pulse-glow flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Luxe AI</div>
          <div className="font-display text-2xl text-gradient-gold mt-1">Live</div>
        </div>
      </motion.div>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-gold/30"
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}
    </div>
  );
}
