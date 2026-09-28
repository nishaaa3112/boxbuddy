import type { ShipmentStatus, RiskLevel } from "@/types";

export function generateShipmentCode(): string {
  const prefix = "BB";
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${year}-${random}`;
}

export function getStatusColor(status: ShipmentStatus): string {
  const map: Record<ShipmentStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    IN_TRANSIT: "bg-blue-100 text-blue-800 border-blue-200",
    CUSTOMS: "bg-purple-100 text-purple-800 border-purple-200",
    DELIVERED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
  };
  return map[status];
}

export function getStatusLabel(status: ShipmentStatus): string {
  const map: Record<ShipmentStatus, string> = {
    PENDING: "Pending",
    IN_TRANSIT: "In Transit",
    CUSTOMS: "Customs",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  return map[status];
}

export function getRiskColor(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    LOW: "bg-green-100 text-green-800 border-green-200",
    MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200",
    HIGH: "bg-red-100 text-red-800 border-red-200",
  };
  return map[level];
}

export function getRiskBadgeVariant(
  level: RiskLevel
): "default" | "secondary" | "destructive" | "outline" {
  const map: Record<RiskLevel, "default" | "secondary" | "destructive" | "outline"> = {
    LOW: "secondary",
    MEDIUM: "outline",
    HIGH: "destructive",
  };
  return map[level];
}

export function isDelayed(eta: string, status: ShipmentStatus): boolean {
  if (status === "DELIVERED" || status === "CANCELLED") return false;
  return new Date(eta) < new Date();
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
