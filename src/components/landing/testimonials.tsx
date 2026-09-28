"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "BoxBuddy cut our customs hold rate by 40%. The AI risk engine flags missing certificates before the shipment even leaves the port.",
    name: "Priya Mehta",
    role: "Head of Logistics",
    company: "Apex Textiles Ltd.",
    initials: "PM",
    gradient: "linear-gradient(135deg,#059669,#10B981)",
    stars: 5,
  },
  {
    quote: "We manage 200+ shipments a month across 15 countries. BoxBuddy's document vault alone saved us 2 hours every day — I can't imagine going back.",
    name: "David Chen",
    role: "Operations Director",
    company: "Global Pharma Co.",
    initials: "DC",
    gradient: "linear-gradient(135deg,#0F2342,#1a4a8a)",
    stars: 5,
  },
  {
    quote: "The dashboard preview is exactly what our MD wanted — a one-screen view of everything. Setup took less than 10 minutes. Genuinely impressed.",
    name: "Lena Fischer",
    role: "Freight Manager",
    company: "TechParts GmbH",
    initials: "LF",
    gradient: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ background: "#f8fafc" }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: "rgba(16,185,129,0.1)", color: "#059669", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            Customer Stories
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by logistics teams{" "}
            <span style={{ background: "linear-gradient(135deg,#0F2342,#1a4a8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              worldwide
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl bg-white p-7"
              style={{
                border: "1px solid rgba(15,35,66,0.07)",
                boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              {/* Quote mark */}
              <div className="absolute top-5 right-6 text-5xl font-serif leading-none" style={{ color: "rgba(15,35,66,0.06)" }}>"</div>

              <blockquote className="text-[14px] text-slate-600 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-[13px] font-bold"
                  style={{ background: t.gradient }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-slate-500">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
