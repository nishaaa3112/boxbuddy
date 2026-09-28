"use client";

import { motion } from "framer-motion";
import { Ship, Brain, FileText, BarChart3, Shield, Globe, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Ship,
    gradient: "linear-gradient(135deg,#0F2342,#1a4a8a)",
    glow: "rgba(15,35,66,0.3)",
    title: "Shipment Management",
    description: "Track every shipment from origin to destination with real-time carrier updates, ETD/ETA monitoring, and container-level visibility.",
    tag: "Core",
  },
  {
    icon: Brain,
    gradient: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
    glow: "rgba(124,58,237,0.3)",
    title: "AI Risk Intelligence",
    description: "ML models predict delays, flag customs risks, and surface missing documents before they become costly problems.",
    tag: "AI Powered",
  },
  {
    icon: FileText,
    gradient: "linear-gradient(135deg,#059669,#10B981)",
    glow: "rgba(16,185,129,0.3)",
    title: "Document Vault",
    description: "Secure, centralized repository for invoices, bills of lading, certificates and packing lists — with full version history.",
    tag: "Compliance",
  },
  {
    icon: BarChart3,
    gradient: "linear-gradient(135deg,#d97706,#f59e0b)",
    glow: "rgba(217,119,6,0.3)",
    title: "Analytics Dashboard",
    description: "Visual insights into shipment volumes, delay trends, country distribution, and risk percentages — in real time.",
    tag: "Insights",
  },
  {
    icon: Shield,
    gradient: "linear-gradient(135deg,#dc2626,#ef4444)",
    glow: "rgba(220,38,38,0.3)",
    title: "Role-Based Access",
    description: "Granular permissions for Admins, Operations Managers, and Staff — right access for every team member, no over-sharing.",
    tag: "Security",
  },
  {
    icon: Globe,
    gradient: "linear-gradient(135deg,#0891b2,#06b6d4)",
    glow: "rgba(8,145,178,0.3)",
    title: "Global Coverage",
    description: "Manage trade lanes across 150+ countries with multi-currency support and localized compliance guidance built-in.",
    tag: "Global",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25,0.46,0.45,0.94] as [number,number,number,number] } },
};

export function FeatureCards() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: "rgba(16,185,129,0.1)", color: "#059669", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            Platform Features
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to manage
            <br className="hidden sm:block" />
            <span style={{ background: "linear-gradient(135deg,#0F2342,#1a4a8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {" "}global trade
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-[16px] leading-relaxed">
            Purpose-built for logistics teams who need speed, visibility, and compliance in one platform.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl bg-white p-6 cursor-default"
                style={{
                  border: "1px solid rgba(15,35,66,0.07)",
                  boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(15,35,66,0.12),0 4px 12px rgba(15,35,66,0.06)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)";
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: f.gradient }}
                />

                <div className="flex items-start justify-between mb-4">
                  {/* Icon */}
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl shrink-0"
                    style={{ background: f.gradient, boxShadow: `0 6px 20px ${f.glow}` }}
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  {/* Tag */}
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">{f.tag}</span>
                </div>

                <h3 className="text-[15px] font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{f.description}</p>

                <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
