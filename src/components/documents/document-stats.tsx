"use client";

import { FileText, FileCheck, FileWarning, HardDrive } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";

export function DocumentStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        title="Total Documents"
        value={248}
        subtitle="Across all shipments"
        icon={FileText}
        iconGradient="linear-gradient(135deg,#0F2342,#1a4a8a)"
        index={0}
      />
      <KpiCard
        title="Verified"
        value={201}
        subtitle="81% verification rate"
        icon={FileCheck}
        iconGradient="linear-gradient(135deg,#059669,#10B981)"
        trend={{ value: 4, label: "vs last month" }}
        index={1}
      />
      <KpiCard
        title="Pending Review"
        value={32}
        subtitle="Awaiting verification"
        icon={FileWarning}
        iconGradient="linear-gradient(135deg,#d97706,#f59e0b)"
        index={2}
      />
      <KpiCard
        title="Storage Used"
        value="1.4 GB"
        subtitle="of 10 GB limit"
        icon={HardDrive}
        iconGradient="linear-gradient(135deg,#7c3aed,#8b5cf6)"
        progress={14}
        index={3}
      />
    </div>
  );
}
