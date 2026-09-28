"use client";

import { motion } from "framer-motion";

/* ─── Port data in a 900×420 viewBox ─────────────────────
   Mercator approximation: x = (lon+180)*2.5, y = (90-lat)*2.5
──────────────────────────────────────────────────────── */
const PORTS = [
  { id: "mumbai",    name: "Mumbai",    x: 630, y: 178, primary: true  },
  { id: "dubai",     name: "Dubai",     x: 588, y: 162, primary: false },
  { id: "rotterdam", name: "Rotterdam", x: 461, y: 95,  primary: true  },
  { id: "ny",        name: "New York",  x: 265, y: 123, primary: true  },
  { id: "la",        name: "Los Angeles",x:155, y: 140, primary: false },
  { id: "shanghai",  name: "Shanghai",  x: 754, y: 147, primary: true  },
  { id: "singapore", name: "Singapore", x: 710, y: 222, primary: true  },
  { id: "hamburg",   name: "Hamburg",   x: 475, y: 91,  primary: false },
  { id: "sydney",    name: "Sydney",    x: 825, y: 310, primary: false },
];

const ROUTES = [
  { from: [630,178], to: [588,162], label: "India–UAE" },
  { from: [588,162], to: [461,95],  label: "UAE–Rotterdam" },
  { from: [461,95],  to: [265,123], label: "Rotterdam–NY" },
  { from: [630,178], to: [710,222], label: "India–Singapore" },
  { from: [710,222], to: [754,147], label: "Singapore–Shanghai" },
  { from: [754,147], to: [155,140], label: "Shanghai–LA" },
  { from: [265,123], to: [461,95],  label: "NY–Rotterdam" },
  { from: [475,91],  to: [461,95],  label: "Hamburg–Rotterdam" },
  { from: [710,222], to: [825,310], label: "Singapore–Sydney" },
];

function bezierMid(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18 - 20;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

/* Simplified continent fills */
const CONTINENTS = [
  { id: "na",   d: "M75,82 L130,68 L175,72 L210,85 L225,105 L220,140 L205,175 L175,205 L145,215 L120,205 L95,185 L75,155 L65,125 L68,100 Z", fill: "#162d47" },
  { id: "sa",   d: "M190,235 L235,228 L260,245 L268,275 L260,315 L245,355 L220,375 L195,368 L178,345 L172,310 L176,268 L185,248 Z",  fill: "#162d47" },
  { id: "eu",   d: "M415,62 L488,56 L512,68 L508,88 L492,105 L468,112 L440,108 L418,96 L408,78 Z", fill: "#162d47" },
  { id: "af",   d: "M422,140 L492,132 L522,148 L528,180 L520,220 L508,262 L482,298 L458,310 L432,305 L412,285 L402,252 L405,215 L412,172 L415,150 Z", fill: "#162d47" },
  { id: "as",   d: "M510,58 L565,48 L632,52 L685,58 L742,62 L795,70 L838,85 L842,108 L822,132 L788,148 L748,158 L708,162 L668,158 L625,152 L588,148 L550,142 L522,132 L508,118 L505,96 Z", fill: "#162d47" },
  { id: "au",   d: "M718,292 L782,276 L832,286 L852,312 L840,342 L812,356 L778,350 L748,338 L728,318 Z", fill: "#162d47" },
  { id: "uk",   d: "M418,68 L432,62 L440,72 L434,80 L420,76 Z", fill: "#162d47" },
];

export function WorldMapSection() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#06111f 0%,#0a1a32 50%,#060f1e 100%)" }}
    >
      {/* Dot grid bg */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            Live Trade Routes
          </span>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Your shipments, on the{" "}
            <span style={{ background: "linear-gradient(135deg,#10B981,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              world map
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-[15px] max-w-lg mx-auto">
            Monitor active trade lanes across 150+ countries with real-time route tracking.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <svg viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
              <radialGradient id="portGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background */}
            <rect width="900" height="420" fill="#060f1e" />

            {/* Continents */}
            {CONTINENTS.map((c) => (
              <path key={c.id} d={c.d} fill={c.fill} stroke="#1e3a5c" strokeWidth="1" />
            ))}

            {/* Animated route lines */}
            {ROUTES.map((r, i) => (
              <motion.path
                key={i}
                d={bezierMid(r.from[0], r.from[1], r.to[0], r.to[1])}
                stroke="#10B981"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="6 4"
                opacity="0.55"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.55 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}

            {/* Port dots */}
            {PORTS.map((p, i) => (
              <g key={p.id}>
                {/* Pulse ring */}
                <motion.circle
                  cx={p.x} cy={p.y} r={p.primary ? 12 : 9}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="1"
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 2.2 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: i * 0.28 }}
                />
                {/* Inner glow */}
                <circle cx={p.x} cy={p.y} r={p.primary ? 7 : 5} fill="url(#portGlow)" />
                {/* Dot */}
                <circle
                  cx={p.x} cy={p.y}
                  r={p.primary ? 4 : 3}
                  fill={p.primary ? "#10B981" : "#059669"}
                  stroke="#0a2e1e"
                  strokeWidth="1.5"
                />
                {/* Label */}
                {p.primary && (
                  <text
                    x={p.x}
                    y={p.y - 11}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="8"
                    fontWeight="600"
                    letterSpacing="0.5"
                  >
                    {p.name.toUpperCase()}
                  </text>
                )}
              </g>
            ))}

            {/* Route count badge */}
            <rect x="18" y="18" width="130" height="32" rx="8" fill="rgba(15,35,66,0.85)" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
            <circle cx="34" cy="34" r="5" fill="#10B981" />
            <text x="45" y="38" fill="white" fontSize="10" fontWeight="600">9 Active Routes</text>
          </svg>
        </motion.div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { label: "Active Ports",   value: "50+",  color: "#10B981" },
            { label: "Trade Lanes",    value: "200+", color: "#1a4a8a" },
            { label: "Avg Transit",    value: "18 days", color: "#f59e0b" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-xl px-5 py-4 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
