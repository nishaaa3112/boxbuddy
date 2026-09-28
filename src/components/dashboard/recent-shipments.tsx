"use client";

import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import type { ShipmentStatus } from "@/types";
import { format } from "date-fns";

const COUNTRY_FLAGS: Record<string, string> = {
  India: "🇮🇳", USA: "🇺🇸", China: "🇨🇳", Germany: "🇩🇪",
  UAE: "🇦🇪", UK: "🇬🇧", Japan: "🇯🇵", Brazil: "🇧🇷",
  Singapore: "🇸🇬", Australia: "🇦🇺",
};

const mockShipments = [
  { id: "1", shipmentCode: "BB24-100234", clientName: "Apex Textiles Ltd.",  originCountry: "India",   destCountry: "UAE",    carrier: "Maersk",      eta: "2024-07-15", status: "IN_TRANSIT" as ShipmentStatus, value: "USD 48,000"  },
  { id: "2", shipmentCode: "BB24-100198", clientName: "Global Pharma Co.",   originCountry: "China",   destCountry: "USA",    carrier: "MSC",         eta: "2024-07-10", status: "CUSTOMS"    as ShipmentStatus, value: "USD 125,000" },
  { id: "3", shipmentCode: "BB24-100187", clientName: "EcoGoods Inc.",       originCountry: "Germany", destCountry: "India",  carrier: "Hapag-Lloyd", eta: "2024-07-20", status: "PENDING"    as ShipmentStatus, value: "EUR 32,000"  },
  { id: "4", shipmentCode: "BB24-100155", clientName: "TechParts GmbH",      originCountry: "Japan",   destCountry: "Brazil", carrier: "Evergreen",   eta: "2024-06-30", status: "DELIVERED"  as ShipmentStatus, value: "USD 87,500"  },
];

const CARD = { background: "linear-gradient(145deg, #0d1626 0%, #111e30 100%)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" };

export function RecentShipments() {
  return (
    <div className="rounded-2xl overflow-hidden" style={CARD}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <h3 className="text-[14px] font-bold tracking-tight" style={{ color: "#e2e8f0", fontFamily: "var(--font-space-grotesk)" }}>Recent Shipments</h3>
          <p className="text-[11px] mt-0.5" style={{ color: "#475569" }}>Last 4 active movements</p>
        </div>
        <Link
          href="/shipments"
          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
          style={{ color: "#10B981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["Shipment", "Route", "Carrier", "ETA", "Value", "Status"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#334155" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockShipments.map((s, i) => (
              <tr
                key={s.id}
                style={{ borderBottom: i < mockShipments.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td className="px-5 py-3.5">
                  <Link href={`/shipments/${s.id}`} className="font-semibold text-[13px] leading-none hover:underline" style={{ color: "#e2e8f0" }}>
                    {s.shipmentCode}
                  </Link>
                  <p className="text-[11px] mt-0.5" style={{ color: "#475569" }}>{s.clientName}</p>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5 text-[12px]">
                    <span>{COUNTRY_FLAGS[s.originCountry] ?? "🌐"}</span>
                    <span style={{ color: "#94a3b8", fontWeight: 500 }}>{s.originCountry}</span>
                    <MoveRight className="h-3 w-3 shrink-0" style={{ color: "#334155" }} />
                    <span>{COUNTRY_FLAGS[s.destCountry] ?? "🌐"}</span>
                    <span style={{ color: "#94a3b8", fontWeight: 500 }}>{s.destCountry}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[12px]" style={{ color: "#64748b" }}>{s.carrier}</td>
                <td className="px-5 py-3.5 text-[12px] whitespace-nowrap font-medium" style={{ color: "#94a3b8" }}>
                  {format(new Date(s.eta), "MMM d, yyyy")}
                </td>
                <td className="px-5 py-3.5 text-[12px] whitespace-nowrap font-mono" style={{ color: "#64748b" }}>{s.value}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
