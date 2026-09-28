"use client";

import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { RiskBadge } from "@/components/shared/status-badge";
import type { RiskLevel } from "@/types";

const mockAlerts = [
  { id: "1", shipmentCode: "BB24-100234", riskLevel: "HIGH"   as RiskLevel, riskScore: 82, reason: "Customs documentation incomplete — 2 missing certificates.", carrier: "Maersk" },
  { id: "2", shipmentCode: "BB24-100198", riskLevel: "HIGH"   as RiskLevel, riskScore: 75, reason: "Port congestion at destination. 4-day delay predicted.",         carrier: "MSC"    },
  { id: "3", shipmentCode: "BB24-100212", riskLevel: "MEDIUM" as RiskLevel, riskScore: 55, reason: "Carrier transit time variance detected.",                         carrier: "Evergreen" },
];

const CARD = { background: "linear-gradient(145deg, #0d1626 0%, #111e30 100%)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" };

export function RiskAlerts() {
  return (
    <div className="rounded-2xl overflow-hidden" style={CARD}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "rgba(239,68,68,0.12)" }}>
            <ShieldAlert className="h-4 w-4" style={{ color: "#ef4444" }} />
          </div>
          <div>
            <h3 className="text-[14px] font-bold tracking-tight" style={{ color: "#e2e8f0", fontFamily: "var(--font-space-grotesk)" }}>Risk Alerts</h3>
            <p className="text-[11px]" style={{ color: "#475569" }}>AI-flagged anomalies</p>
          </div>
        </div>
        <Link
          href="/ai-risk"
          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
          style={{ color: "#10B981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div>
        {mockAlerts.map((alert, i) => (
          <div
            key={alert.id}
            className="relative flex gap-3 px-5 py-3.5 transition-colors"
            style={{ borderBottom: i < mockAlerts.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full"
              style={{ background: alert.riskLevel === "HIGH" ? "#ef4444" : "#f59e0b" }}
            />

            {/* Score circle */}
            <div className="shrink-0 mt-0.5">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-black text-white"
                style={{
                  background: alert.riskLevel === "HIGH"
                    ? "linear-gradient(135deg,#991b1b,#ef4444)"
                    : "linear-gradient(135deg,#b45309,#f59e0b)",
                  boxShadow: alert.riskLevel === "HIGH"
                    ? "0 2px 12px rgba(239,68,68,0.35)"
                    : "0 2px 12px rgba(245,158,11,0.35)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {alert.riskScore}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <Link
                  href={`/shipments/${alert.id}`}
                  className="text-[13px] font-bold leading-none hover:underline"
                  style={{ color: "#e2e8f0" }}
                >
                  {alert.shipmentCode}
                </Link>
                <RiskBadge level={alert.riskLevel} />
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "#64748b" }}>{alert.reason}</p>
              <p className="text-[10px] mt-1" style={{ color: "#334155" }}>via {alert.carrier}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
