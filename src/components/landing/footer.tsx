"use client";

import Link from "next/link";
import { Anchor } from "lucide-react";

const LINKS = {
  Product: [
    { label: "Tracking",  href: "/dashboard" },
    { label: "AI Risk",   href: "/ai-risk" },
    { label: "Documents", href: "/documents" },
    { label: "Analytics", href: "/analytics" },
    { label: "Pricing",   href: "/#pricing" },
  ],
  Company: [
    { label: "About",   href: "#" },
    { label: "Blog",    href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms",   href: "#" },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: "#060d1a", padding: "80px 48px 40px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "56px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg, #059669, #10B981)", boxShadow: "0 4px 14px rgba(16,185,129,0.35)" }}>
                <Anchor style={{ width: "15px", height: "15px", color: "white" }} strokeWidth={2.2} />
              </div>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "white", letterSpacing: "-0.5px", fontFamily: "var(--font-space-grotesk)" }}>BoxBuddy</span>
            </div>
            <p style={{ fontSize: "13px", color: "#334155", lineHeight: 1.7, maxWidth: "260px" }}>
              AI-powered logistics platform for modern exporters and freight forwarders.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([cat, items]) => (
            <div key={cat}>
              <h4 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#334155", textTransform: "uppercase", marginBottom: "18px" }}>{cat}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      style={{ fontSize: "13px", color: "#475569", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "32px" }}>
          <p style={{ fontSize: "12px", color: "#334155" }}>
            © {new Date().getFullYear()} BoxBuddy. Built for modern trade.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ display: "block", width: "7px", height: "7px", borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: "12px", color: "#334155" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
