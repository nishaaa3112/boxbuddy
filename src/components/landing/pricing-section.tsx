"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    sub: "Forever",
    description: "For small teams getting started with shipment visibility.",
    featured: false,
    cta: "Get started free",
    ctaHref: "/signup",
    gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    features: ["Up to 25 shipments/month", "Basic shipment tracking", "Document vault (1 GB)", "Email notifications", "1 team member"],
  },
  {
    name: "Growth",
    price: "$49",
    sub: "per month",
    description: "For growing freight teams that need AI risk and full analytics.",
    featured: true,
    cta: "Start free trial",
    ctaHref: "/signup",
    gradient: "linear-gradient(135deg,#059669,#10B981)",
    features: ["Unlimited shipments", "AI Risk Intelligence", "Advanced analytics", "Document vault (50 GB)", "Up to 10 team members", "Priority support", "Custom integrations"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "Contact us",
    description: "For large logistics operations needing custom workflows and SLAs.",
    featured: false,
    cta: "Talk to sales",
    ctaHref: "/signup",
    gradient: "linear-gradient(135deg,#6d28d9,#8b5cf6)",
    features: ["Everything in Growth", "Unlimited team members", "Dedicated account manager", "Custom document workflows", "SSO + SAML", "SLA guarantee", "On-premise option"],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" style={{ background: "#080f1d", padding: "100px 48px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)" }} />

      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "56px" }}
        >
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", color: "#10B981", textTransform: "uppercase", marginBottom: "14px" }}>
            Pricing
          </div>
          <h2 style={{ fontSize: "clamp(36px, 3.5vw, 54px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, color: "white", margin: 0, fontFamily: "var(--font-space-grotesk)" }}>
            Simple, honest pricing.
          </h2>
          <p style={{ fontSize: "15px", color: "#475569", marginTop: "12px", maxWidth: "360px" }}>
            No hidden fees. No per-shipment charges. Scale freely.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "start" }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                padding: "32px",
                position: "relative",
                ...(plan.featured
                  ? { background: "linear-gradient(145deg, #0a2018 0%, #0d2d1e 100%)", border: "1px solid rgba(16,185,129,0.25)", boxShadow: "0 8px 40px rgba(16,185,129,0.12), 0 0 0 1px rgba(16,185,129,0.1)" }
                  : { background: "linear-gradient(145deg, #0d1626 0%, #111e30 100%)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }),
              }}
            >
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: plan.gradient }} />

              {plan.featured && (
                <div style={{ position: "absolute", top: "18px", right: "18px", fontSize: "10px", fontWeight: 800, letterSpacing: "1px", padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", background: "linear-gradient(135deg,#059669,#10B981)", color: "white" }}>
                  Popular
                </div>
              )}

              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: plan.featured ? "#10B981" : "#475569", marginBottom: "12px" }}>
                {plan.name}
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "8px" }}>
                <span style={{ fontSize: "42px", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "white", fontFamily: "var(--font-space-grotesk)" }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: "13px", color: "#475569" }}>{plan.sub}</span>
              </div>

              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6, marginBottom: "28px" }}>
                {plan.description}
              </p>

              <Link href={plan.ctaHref}
                style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: "100px", fontSize: "13px", fontWeight: 700, textDecoration: "none", marginBottom: "28px", background: plan.gradient, color: "white", boxShadow: plan.featured ? "0 6px 20px rgba(16,185,129,0.35)" : "none", transition: "opacity 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                {plan.cta}
              </Link>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: plan.featured ? "#94a3b8" : "#64748b" }}>
                    <Check style={{ width: "14px", height: "14px", flexShrink: 0, color: plan.featured ? "#10B981" : "#334155" }} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: "center", fontSize: "13px", color: "#334155", marginTop: "32px" }}
        >
          All plans include a 14-day free trial · No credit card required
        </motion.p>
      </div>
    </section>
  );
}
