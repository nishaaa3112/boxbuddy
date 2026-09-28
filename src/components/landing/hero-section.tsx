"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MARQUEE_CSS = `
@keyframes marqueeLeft {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-strip { animation: marqueeLeft 24s linear infinite; display: flex; white-space: nowrap; width: max-content; }
@keyframes liveDot { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.live-dot { animation: liveDot 2s ease-in-out infinite; }
`;

/* ── Shipping container stack ─────────────────────────────── */
function ContainerStack() {
  const CANS = [
    { main: "#E63946", dark: "#C1121F", label: "MAERSK" },
    { main: "#2979FF", dark: "#1565C0", label: "MSC" },
    { main: "#FFCC00", dark: "#CC9900", label: "COSCO" },
    { main: "#43A047", dark: "#2E7D32", label: "EVERGREEN" },
  ];
  return (
    <svg viewBox="0 0 240 310" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "320px" }}>
      {/* Dark translucent circle backdrop */}
      <circle cx="120" cy="155" r="142" fill="rgba(13,26,48,0.6)" />
      <circle cx="120" cy="155" r="142" stroke="rgba(16,185,129,0.08)" strokeWidth="1" />

      {CANS.map((c, i) => {
        const y = 14 + i * 70;
        const W = 192, H = 58, x = 24;
        return (
          <g key={i}>
            <rect x={x} y={y} width={W} height={H} rx="4" fill={c.main} />
            <rect x={x} y={y} width={W} height={6} rx="4" fill="white" opacity="0.15" />
            <rect x={x} y={y + H - 5} width={W} height={5} rx="2" fill={c.dark} opacity="0.4" />
            {[30, 54, 78, 126, 150, 174].map(dx => (
              <line key={dx} x1={x + dx} y1={y + 2} x2={x + dx} y2={y + H - 3} stroke={c.dark} strokeWidth="1.5" opacity="0.22" />
            ))}
            <line x1={x + W / 2} y1={y + 4} x2={x + W / 2} y2={y + H - 4} stroke={c.dark} strokeWidth="2.5" opacity="0.5" />
            <circle cx={x + W / 2 - 12} cy={y + H / 2} r="4" fill={c.dark} opacity="0.4" />
            <circle cx={x + W / 2 + 12} cy={y + H / 2} r="4" fill={c.dark} opacity="0.4" />
            {/* 3D top face */}
            <path d={`M${x} ${y} L${x + 14} ${y - 7} L${x + W + 14} ${y - 7} L${x + W} ${y} Z`} fill="white" opacity="0.07" />
            {/* 3D right face */}
            <path d={`M${x + W} ${y} L${x + W + 14} ${y - 7} L${x + W + 14} ${y + H - 7} L${x + W} ${y + H} Z`} fill={c.dark} opacity="0.35" />
            <text x={x + W / 2} y={y + H / 2 + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="800" opacity="0.55" letterSpacing="3" fontFamily="system-ui,Helvetica,Arial">{c.label}</text>
          </g>
        );
      })}
      <ellipse cx="120" cy="304" rx="95" ry="6" fill="#000" opacity="0.3" />
    </svg>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
export function HeroSection() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  const TICKER = "TRACK · PREDICT · ANALYZE · DOCUMENT · AUTOMATE · EXPORT · IMPORT · SECURE · ";

  return (
    <section style={{ background: "#080f1d", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <style>{MARQUEE_CSS}</style>

      {/* Background glows */}
      <div style={{ position: "absolute", top: "-100px", right: "10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      {/* Main split */}
      <div style={{ flex: 1, maxWidth: "1240px", margin: "0 auto", padding: "0 48px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", paddingTop: "120px", paddingBottom: "56px", position: "relative" }}>

        {/* LEFT */}
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(36px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.1)", color: "#10B981", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(16,185,129,0.2)", marginBottom: "28px" }}>
            <span className="live-dot" style={{ display: "block", width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
            AI Logistics Platform
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(52px, 5.2vw, 84px)", fontWeight: 900, letterSpacing: "-3.5px", lineHeight: 0.9, color: "white", marginBottom: "28px", fontFamily: "var(--font-space-grotesk), system-ui" }}>
            Ship<br />
            smarter.<br />
            <span style={{ background: "linear-gradient(135deg, #059669, #10B981, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Trade bolder.
            </span>
          </h1>

          {/* Sub */}
          <p style={{ fontSize: "17px", lineHeight: 1.65, color: "#64748b", maxWidth: "400px", marginBottom: "40px" }}>
            BoxBuddy gives exporters one command centre — AI risk scoring, compliance documents, and live shipment tracking across 150+ countries.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginBottom: "48px" }}>
            <Link href="/signup"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #059669, #10B981)", color: "white", fontSize: "15px", fontWeight: 700, padding: "14px 30px", borderRadius: "100px", textDecoration: "none", boxShadow: "0 8px 24px rgba(16,185,129,0.35)", transition: "transform 0.15s, box-shadow 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(16,185,129,0.48)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(16,185,129,0.35)"; }}
            >
              Start for free <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
            <Link href="/login"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", fontSize: "15px", fontWeight: 600, padding: "13px 28px", borderRadius: "100px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", transition: "background 0.15s, border-color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              Sign in
            </Link>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: "32px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[["10K+", "Shipments"], ["150+", "Countries"], ["98%", "On-time"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "white", letterSpacing: "-1px", lineHeight: 1, fontFamily: "var(--font-space-grotesk)" }}>{v}</div>
                <div style={{ fontSize: "11px", color: "#475569", marginTop: "3px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(36px)", transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease", position: "relative" }}>
          <div style={{ position: "relative", width: "340px", maxWidth: "100%" }}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <ContainerStack />
            </motion.div>

            {/* Floating badge — AI Risk */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut", delay: 0.6 }}
              style={{ position: "absolute", top: "6%", right: "-16px", borderRadius: "16px", padding: "12px 16px", zIndex: 2, minWidth: "130px", background: "rgba(8,15,29,0.92)", border: "1px solid rgba(16,185,129,0.2)", backdropFilter: "blur(16px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <div style={{ fontSize: "10px", color: "#475569", marginBottom: "4px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>AI Risk</div>
              <div style={{ fontSize: "17px", fontWeight: 900, color: "#10B981", letterSpacing: "-0.5px", fontFamily: "var(--font-space-grotesk)" }}>LOW ✓</div>
              <div style={{ fontSize: "9px", color: "#334155", marginTop: "3px" }}>SH-2847 · India → UAE</div>
            </motion.div>

            {/* Floating badge — Active */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.8 }}
              style={{ position: "absolute", bottom: "18%", left: "-16px", borderRadius: "16px", padding: "12px 16px", zIndex: 2, background: "rgba(8,15,29,0.92)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="live-dot" style={{ display: "block", width: "7px", height: "7px", borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#e2e8f0", fontFamily: "var(--font-space-grotesk)" }}>234 active</span>
              </div>
              <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px" }}>shipments live</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", padding: "14px 0" }}>
        <div className="marquee-strip">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#1e3a5f" }}>
              {TICKER}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
