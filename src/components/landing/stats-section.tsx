"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { value: 10000, suffix: "+", label: "Shipments tracked",   gradient: "linear-gradient(135deg,#059669,#10B981)" },
  { value: 150,   suffix: "+", label: "Countries covered",   gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)" },
  { value: 98,    suffix: "%", label: "On-time delivery",    gradient: "linear-gradient(135deg,#b45309,#f59e0b)" },
  { value: 60,    suffix: "%", label: "Less manual work",    gradient: "linear-gradient(135deg,#6d28d9,#8b5cf6)" },
];

function CountUp({ to, suffix, gradient }: { to: number; suffix: string; gradient: string }) {
  const ref  = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const ctrl = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        el.textContent = (to > 999 ? Math.round(v).toLocaleString() : Math.round(v)) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix]);

  return (
    <span ref={ref} style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      0{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section id="stats" style={{ background: "#060d1a", padding: "100px 48px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)" }} />

      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", color: "#10B981", textTransform: "uppercase", marginBottom: "56px" }}
        >
          By the numbers
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                paddingRight: i < STATS.length - 1 ? "48px" : "0",
                paddingLeft: i > 0 ? "48px" : "0",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div style={{ fontSize: "clamp(52px, 5vw, 80px)", fontWeight: 900, letterSpacing: "-3px", lineHeight: 1, marginBottom: "12px", fontFamily: "var(--font-space-grotesk)" }}>
                <CountUp to={s.value} suffix={s.suffix} gradient={s.gradient} />
              </div>
              <div style={{ fontSize: "14px", color: "#334155", letterSpacing: "0.2px" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
