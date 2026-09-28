"use client";

import { motion } from "framer-motion";

const LOGOS = [
  { name: "Maersk",       style: { fontSize: "15px", letterSpacing: "3px", fontWeight: 800 } },
  { name: "MSC",          style: { fontSize: "22px", letterSpacing: "4px", fontWeight: 900 } },
  { name: "DHL",          style: { fontSize: "20px", letterSpacing: "3px", fontWeight: 900 } },
  { name: "HAPAG·LLOYD",  style: { fontSize: "13px", letterSpacing: "2px", fontWeight: 800 } },
  { name: "FedEx",        style: { fontSize: "18px", letterSpacing: "1px", fontWeight: 800 } },
  { name: "CMA CGM",      style: { fontSize: "13px", letterSpacing: "2px", fontWeight: 900 } },
  { name: "Evergreen",    style: { fontSize: "14px", letterSpacing: "2px", fontWeight: 700 } },
  { name: "COSCO",        style: { fontSize: "16px", letterSpacing: "4px", fontWeight: 800 } },
];

export function LogosBar() {
  return (
    <section className="py-14 bg-white border-y" style={{ borderColor: "#f1f5f9" }}>
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-center mb-8 text-slate-400">
          Trusted by teams shipping with the world's top carriers
        </p>
        <div className="flex items-center justify-between flex-wrap gap-6">
          {LOGOS.map((logo, i) => (
            <motion.span
              key={logo.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="text-slate-300 select-none"
              style={{ fontFamily: "system-ui, sans-serif", ...logo.style }}
            >
              {logo.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
