import { cn } from "@/lib/utils";
import type { ShipmentStatus, RiskLevel } from "@/types";
import { getStatusLabel } from "@/lib/utils/shipment";

interface StatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  className?: string;
}

const STATUS_CONFIG: Record<ShipmentStatus, { dot: string; bg: string; text: string; border: string }> = {
  PENDING:    { dot: "bg-amber-400",   bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200" },
  IN_TRANSIT: { dot: "bg-blue-500",    bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200"  },
  CUSTOMS:    { dot: "bg-purple-500",  bg: "bg-purple-50",  text: "text-purple-700",  border: "border-purple-200" },
  DELIVERED:  { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  CANCELLED:  { dot: "bg-slate-400",   bg: "bg-slate-50",   text: "text-slate-600",   border: "border-slate-200"  },
};

const RISK_CONFIG: Record<RiskLevel, { dot: string; bg: string; text: string; border: string }> = {
  LOW:    { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  MEDIUM: { dot: "bg-amber-400",   bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200"   },
  HIGH:   { dot: "bg-red-500",     bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200"     },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        cfg.bg, cfg.text, cfg.border,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", cfg.dot)} />
      {getStatusLabel(status)}
    </span>
  );
}

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  const cfg = RISK_CONFIG[level] ?? RISK_CONFIG.MEDIUM;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        cfg.bg, cfg.text, cfg.border,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 animate-pulse", cfg.dot)} />
      {level} RISK
      {score !== undefined && (
        <span className="opacity-70 font-medium">· {score}</span>
      )}
    </span>
  );
}
