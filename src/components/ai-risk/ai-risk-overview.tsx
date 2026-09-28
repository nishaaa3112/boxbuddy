"use client";

import { AlertTriangle, ShieldCheck, ShieldAlert, TrendingUp } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";

export function AIRiskOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        title="High Risk"
        value={5}
        subtitle="Immediate action needed"
        icon={AlertTriangle}
        iconGradient="linear-gradient(135deg,#dc2626,#ef4444)"
        index={0}
      />
      <KpiCard
        title="Medium Risk"
        value={8}
        subtitle="Monitor closely"
        icon={ShieldAlert}
        iconGradient="linear-gradient(135deg,#d97706,#f59e0b)"
        index={1}
      />
      <KpiCard
        title="Low Risk"
        value={11}
        subtitle="On track"
        icon={ShieldCheck}
        iconGradient="linear-gradient(135deg,#059669,#10B981)"
        index={2}
      />
      <KpiCard
        title="Avg Risk Score"
        value="48 / 100"
        subtitle="Across active shipments"
        icon={TrendingUp}
        iconGradient="linear-gradient(135deg,#0F2342,#1a4a8a)"
        progress={48}
        index={3}
      />
    </div>
  );
}
