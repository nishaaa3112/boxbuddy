"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section style={{ background: "#060d1a", padding: "100px 48px", position: "relative", overflow: "hidden" }}>
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "20%", width: "400px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Top divider */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent)" }} />

      <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", color: "#10B981", textTransform: "uppercase", marginBottom: "20px" }}>
            Get started today
          </div>

          <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 900, letterSpacing: "-3px", lineHeight: 1.0, color: "white", marginBottom: "20px", fontFamily: "var(--font-space-grotesk)" }}>
            Your shipments.<br />
            <span style={{ background: "linear-gradient(135deg, #059669, #10B981, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Under control.
            </span>
          </h2>

          <p style={{ fontSize: "16px", color: "#475569", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 44px" }}>
            Join 1,000+ freight teams who cut delays, reduce compliance risk, and get real-time visibility — all in one platform.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/signup"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #059669, #10B981)", color: "white", fontSize: "15px", fontWeight: 700, padding: "16px 36px", borderRadius: "100px", textDecoration: "none", boxShadow: "0 8px 32px rgba(16,185,129,0.4)", transition: "transform 0.15s, box-shadow 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(16,185,129,0.55)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(16,185,129,0.4)"; }}
            >
              Start for free <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
            <Link
              href="/login"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.75)", fontSize: "15px", fontWeight: 600, padding: "15px 30px", borderRadius: "100px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", transition: "background 0.15s, border-color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              Sign in to existing account
            </Link>
          </div>

          <p style={{ fontSize: "12px", color: "#1e3a5f", marginTop: "24px" }}>
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
