import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });
  const left = useTransform(sx, (v) => `${v}px`);
  const top = useTransform(sy, (v) => `${v}px`);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[420px] w-[420px] rounded-full"
      style={{
        left,
        top,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle at center, color-mix(in oklab, var(--glow) 35%, transparent), transparent 60%)",
        filter: "blur(40px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
