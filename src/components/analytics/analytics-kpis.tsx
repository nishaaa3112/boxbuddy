"use client";

import { TrendingUp, Package, Clock, Target } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";

export function AnalyticsKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        title="Total Shipments YTD"
        value={142}
        icon={Package}
        iconGradient="linear-gradient(135deg,#0F2342,#1a4a8a)"
        trend={{ value: 22, label: "vs last year", positive: true }}
        index={0}
      />
      <KpiCard
        title="On-Time Delivery"
        value="94%"
        subtitle="6% improvement"
        icon={Target}
        iconGradient="linear-gradient(135deg,#059669,#10B981)"
        trend={{ value: 6, label: "vs last quarter", positive: true }}
        progress={94}
        index={1}
      />
      <KpiCard
        title="Avg Transit Days"
        value="18.4"
        subtitle="Days per shipment"
        icon={Clock}
        iconGradient="linear-gradient(135deg,#d97706,#f59e0b)"
        trend={{ value: -1.2, label: "vs last quarter", positive: true }}
        index={2}
      />
      <KpiCard
        title="Revenue Tracked"
        value="$4.2M"
        subtitle="Total cargo value"
        icon={TrendingUp}
        iconGradient="linear-gradient(135deg,#7c3aed,#8b5cf6)"
        trend={{ value: 34, label: "vs last year", positive: true }}
        index={3}
      />
    </div>
  );
}
