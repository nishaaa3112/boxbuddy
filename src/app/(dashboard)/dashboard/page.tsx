"use client";

import {
  Package, AlertTriangle, CheckCircle2, Clock, TrendingUp, FileWarning, Anchor, ArrowRight, Globe2,
} from "lucide-react";
import { motion } from "framer-motion";
import { KpiCard } from "@/components/shared/kpi-card";
import { RecentShipments } from "@/components/dashboard/recent-shipments";
import { RiskAlerts } from "@/components/dashboard/risk-alerts";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ShipmentStatusChart } from "@/components/dashboard/shipment-status-chart";
import { ShipmentMap } from "@/components/dashboard/shipment-map";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function DashboardPage() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">

      {/* ── Hero banner ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #080f1d 0%, #0c1e3d 30%, #0d3d2e 80%, #091a2c 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Radial glows */}
        <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)" }} />
        <div className="absolute right-48 bottom-0 h-48 w-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(180deg, rgba(16,185,129,0), rgba(16,185,129,0.5) 50%, rgba(16,185,129,0))" }} />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Live Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#f1f5f9", letterSpacing: "-0.03em" }}>
              {greeting} 👋
            </h1>
            <p className="text-sm mt-1" style={{ color: "#475569" }}>
              {dateStr} · {timeStr} IST
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { val: "24",  label: "Active",  color: "#f1f5f9" },
              { val: "94%", label: "On-time", color: "#10B981" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center justify-center px-5 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-2xl font-black" style={{ color: s.color, fontFamily: "var(--font-space-grotesk)", letterSpacing: "-1px" }}>{s.val}</span>
                <span className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "#475569" }}>{s.label}</span>
              </div>
            ))}
            <Link href="/shipments/new">
              <div className="flex flex-col items-center justify-center px-5 py-3 rounded-xl cursor-pointer transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #059669, #10B981)", boxShadow: "0 4px 16px rgba(16,185,129,0.35)" }}>
                <Anchor className="h-5 w-5 text-white mb-1" />
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">New Shipment</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-between px-6 sm:px-8 py-3" style={{ background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-4 text-xs" style={{ color: "#475569" }}>
            <span className="flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5 text-emerald-400" /> 12 countries active</span>
            <span className="flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> 5 risk alerts</span>
          </div>
          <Link href="/shipments" className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* ── KPI cards ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <KpiCard index={0} title="Active Shipments"    value={24}  subtitle="Across 12 countries"       icon={Package}       iconGradient="linear-gradient(135deg,#1d4ed8,#3b82f6)"  glowColor="rgba(59,130,246,0.3)"   trend={{ value: 8,   label: "vs last month", positive: true  }} progress={68} />
        <KpiCard index={1} title="Delayed Shipments"   value={3}   subtitle="Require attention"         icon={Clock}         iconGradient="linear-gradient(135deg,#b45309,#f59e0b)"  glowColor="rgba(245,158,11,0.3)"   trend={{ value: 2,   label: "vs last month", positive: false }} progress={12} />
        <KpiCard index={2} title="Delivered This Month" value={18}  subtitle="On-time rate: 94%"         icon={CheckCircle2}  iconGradient="linear-gradient(135deg,#059669,#10B981)"  glowColor="rgba(16,185,129,0.3)"   trend={{ value: 12,  label: "vs last month", positive: true  }} progress={94} />
        <KpiCard index={3} title="High Risk Alerts"    value={5}   subtitle="AI-predicted risks"        icon={AlertTriangle}  iconGradient="linear-gradient(135deg,#991b1b,#ef4444)"  glowColor="rgba(239,68,68,0.3)"    trend={{ value: -3,  label: "vs last month", positive: true  }} progress={20} />
        <KpiCard index={4} title="Total Shipments"     value={142} subtitle="Year-to-date 2024"         icon={TrendingUp}    iconGradient="linear-gradient(135deg,#6d28d9,#8b5cf6)"  glowColor="rgba(139,92,246,0.3)"   trend={{ value: 22,  label: "vs last year",  positive: true  }} progress={55} />
        <KpiCard index={5} title="Pending Documents"   value={7}   subtitle="Missing or expired"        icon={FileWarning}   iconGradient="linear-gradient(135deg,#c2410c,#f97316)"  glowColor="rgba(249,115,22,0.3)"   progress={28} />
      </div>

      {/* ── World map ───────────────────────────────────── */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
        <ShipmentMap />
      </motion.div>

      {/* ── Charts + feed grid ──────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div className="xl:col-span-2 space-y-6" custom={2} variants={fadeUp} initial="hidden" animate="show">
          <RecentShipments />
          <ShipmentStatusChart />
        </motion.div>
        <motion.div className="space-y-6" custom={3} variants={fadeUp} initial="hidden" animate="show">
          <RiskAlerts />
          <ActivityFeed />
        </motion.div>
      </div>
    </div>
  );
}
