import { Plus, Package, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { ShipmentTable } from "@/components/shipments/shipment-table";
import { ShipmentFilters } from "@/components/shipments/shipment-filters";
import Link from "next/link";

const stats = [
  { label: "Active",   value: "24", icon: Package,       gradient: "linear-gradient(135deg,#0F2342,#1a4a8a)", glow: "rgba(15,35,66,0.25)"  },
  { label: "Delayed",  value: "3",  icon: Clock,         gradient: "linear-gradient(135deg,#d97706,#f59e0b)", glow: "rgba(217,119,6,0.25)" },
  { label: "Delivered",value: "18", icon: CheckCircle2,  gradient: "linear-gradient(135deg,#059669,#10B981)", glow: "rgba(16,185,129,0.25)"},
  { label: "High Risk",value: "5",  icon: AlertTriangle, gradient: "linear-gradient(135deg,#dc2626,#ef4444)", glow: "rgba(220,38,38,0.25)" },
];

export default function ShipmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipments"
        description="Manage and track all import/export shipments globally"
        tag="Operations"
      >
        <Button
          asChild
          className="h-10 gap-2 px-4 text-white rounded-xl text-[13px] font-semibold shadow-emerald"
          style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}
        >
          <Link href="/shipments/new">
            <Plus className="h-4 w-4" />
            New Shipment
          </Link>
        </Button>
      </PageHeader>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 bg-white rounded-xl px-4 py-3"
              style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05)" }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: s.gradient, boxShadow: `0 4px 12px ${s.glow}` }}
              >
                <Icon className="h-4 w-4 text-white" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 leading-none">{s.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <ShipmentFilters />
      <ShipmentTable />
    </div>
  );
}
