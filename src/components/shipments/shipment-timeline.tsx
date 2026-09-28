import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Package, Ship, FileCheck, Truck } from "lucide-react";
import type { ShipmentStatus } from "@/types";

const steps = [
  { key: "CREATED",    label: "Shipment Created",    description: "Order placed & confirmed",      icon: Package   },
  { key: "IN_TRANSIT", label: "In Transit",          description: "Cargo on vessel / in transit",  icon: Ship      },
  { key: "CUSTOMS",    label: "Customs Clearance",   description: "Awaiting customs inspection",   icon: FileCheck },
  { key: "DELIVERED",  label: "Delivered",           description: "Successfully delivered",        icon: Truck     },
] as const;

const statusOrder: Record<ShipmentStatus, number> = {
  PENDING: 0, IN_TRANSIT: 1, CUSTOMS: 2, DELIVERED: 3, CANCELLED: -1,
};

export function ShipmentTimeline({ status }: { status: ShipmentStatus }) {
  const currentStep = statusOrder[status] ?? 0;

  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-bold text-slate-900">Tracking Timeline</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Live shipment journey</p>
      </div>

      <div className="p-5">
        <div className="space-y-0">
          {steps.map((step, i) => {
            const isDone    = i < currentStep;
            const isActive  = i === currentStep;
            const isPending = i > currentStep;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex gap-3">
                {/* Icon + connector line */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0 z-10"
                    style={
                      isDone
                        ? { background: "linear-gradient(135deg,#059669,#10B981)", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }
                        : isActive
                        ? { background: "linear-gradient(135deg,#0F2342,#1a4a8a)", boxShadow: "0 4px 12px rgba(15,35,66,0.3)" }
                        : { background: "#f8fafc", border: "1px solid #e2e8f0" }
                    }
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    ) : isActive ? (
                      <Icon className="h-4 w-4 text-white" />
                    ) : (
                      <Icon className="h-4 w-4 text-slate-300" />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="w-0.5 flex-1 my-1.5 rounded-full"
                      style={{
                        minHeight: 28,
                        background: isDone
                          ? "linear-gradient(180deg,#10B981,#10B981)"
                          : "linear-gradient(180deg,#e2e8f0,#f1f5f9)",
                      }}
                    />
                  )}
                </div>

                {/* Labels */}
                <div className={cn("pb-5 flex-1", i === steps.length - 1 && "pb-0")}>
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "text-[13px] font-bold",
                        isDone   && "text-emerald-700",
                        isActive && "text-slate-900",
                        isPending && "text-slate-400"
                      )}
                    >
                      {step.label}
                    </p>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-navy-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">
                        <Clock className="h-2.5 w-2.5 text-blue-500" />
                        <span className="text-blue-600">Current</span>
                      </span>
                    )}
                    {isDone && (
                      <span className="text-[10px] font-medium text-emerald-600">✓ Done</span>
                    )}
                  </div>
                  <p className={cn("text-[11px] mt-0.5", isDone ? "text-emerald-600/70" : "text-slate-400")}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
