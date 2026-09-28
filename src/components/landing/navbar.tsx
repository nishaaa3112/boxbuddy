"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Anchor } from "lucide-react";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? { background: "rgba(6,10,20,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }
          : { background: "transparent" }
      }
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #059669, #10B981)", boxShadow: "0 4px 14px rgba(16,185,129,0.4)" }}>
            <Anchor style={{ width: "17px", height: "17px", color: "white" }} strokeWidth={2.2} />
          </div>
          <span style={{ fontSize: "17px", fontWeight: 800, color: "white", letterSpacing: "-0.5px", fontFamily: "var(--font-space-grotesk)" }}>BoxBuddy</span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {[{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }].map(n => (
            <a key={n.label} href={n.href}
              style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link href="/login"
            style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "7px 16px", transition: "color 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
          >
            Sign in
          </Link>
          <Link href="/signup"
            style={{ fontSize: "13px", fontWeight: 700, color: "white", background: "linear-gradient(135deg, #059669, #10B981)", padding: "9px 22px", borderRadius: "100px", textDecoration: "none", boxShadow: "0 4px 16px rgba(16,185,129,0.35)", transition: "transform 0.15s, box-shadow 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(16,185,129,0.45)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(16,185,129,0.35)"; }}
          >
            Get started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
