"use client";

import { motion } from "framer-motion";
import { Brain, MapPin, FileText } from "lucide-react";
import type { CSSProperties } from "react";

const FEATURES = [
  {
    icon: Brain,
    gradient: "linear-gradient(135deg,#991b1b,#ef4444)",
    glow: "rgba(239,68,68,0.25)",
    title: "AI Risk Intelligence",
    desc: "Our model scores every shipment before it leaves port — flagging customs delays, route volatility, and missing compliance docs.",
    items: ["Real-time risk scoring (0–100)", "Missing document alerts", "Suggested mitigation actions"],
  },
  {
    icon: MapPin,
    gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    glow: "rgba(59,130,246,0.25)",
    title: "Live Shipment Tracking",
    desc: "One unified view across all carriers — Maersk, MSC, DHL, and 50+ more. No more tab-switching, no more manual updates.",
    items: ["Multi-carrier integration", "Milestone timeline events", "ETA prediction engine"],
  },
  {
    icon: FileText,
    gradient: "linear-gradient(135deg,#059669,#10B981)",
    glow: "rgba(16,185,129,0.25)",
    title: "Document Vault",
    desc: "Every invoice, bill of lading, and certificate — stored, versioned, and ready to share in one click with customs authorities.",
    items: ["Automatic document parsing", "Version history & rollback", "One-click share & export"],
  },
];

const checkStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  flexShrink: 0,
};

export function FeatureSection() {
  return (
    <section id="features" style={{ background: "#080f1d", padding: "100px 48px", position: "relative" }}>
      {/* Subtle divider glow */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent)" }} />

      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", color: "#10B981", textTransform: "uppercase", marginBottom: "14px" }}>
            What we do
          </div>
          <h2 style={{ fontSize: "clamp(36px, 3.5vw, 54px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, color: "white", margin: 0, fontFamily: "var(--font-space-grotesk)" }}>
            Everything cargo.<br />Nothing extra.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{ background: "linear-gradient(145deg, #0d1626 0%, #111e30 100%)", borderRadius: "20px", padding: "36px 32px", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden", cursor: "default" }}
              >
                {/* Inner glow on hover (CSS-only via :hover pseudoclass not doable inline, use subtle permanent glow) */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: f.gradient, opacity: 0.6 }} />

                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "14px", background: f.gradient, marginBottom: "24px", boxShadow: `0 4px 16px ${f.glow}` }}>
                  <Icon style={{ width: "22px", height: "22px", color: "white" }} strokeWidth={2} />
                </div>

                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#e2e8f0", marginBottom: "12px", letterSpacing: "-0.5px", fontFamily: "var(--font-space-grotesk)" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#64748b", marginBottom: "24px" }}>
                  {f.desc}
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {f.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13px", color: "#94a3b8" }}>
                      <span style={{ ...checkStyle, background: f.gradient }}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
