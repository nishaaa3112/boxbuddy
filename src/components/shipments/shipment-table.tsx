"use client";

import { MoreHorizontal, Eye, Edit, Trash2, Package, MoveRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import type { ShipmentStatus } from "@/types";
import { format } from "date-fns";
import { isDelayed } from "@/lib/utils/shipment";
import { motion } from "framer-motion";

const FLAGS: Record<string, string> = {
  India: "🇮🇳", USA: "🇺🇸", China: "🇨🇳", Germany: "🇩🇪",
  UAE: "🇦🇪", UK: "🇬🇧", Japan: "🇯🇵", Brazil: "🇧🇷",
  Singapore: "🇸🇬", Australia: "🇦🇺", France: "🇫🇷", Spain: "🇪🇸",
};

const mockShipments = [
  { id: "1", shipmentCode: "BB24-100234", clientName: "Apex Textiles Ltd.",  originCountry: "India",   destCountry: "UAE",    carrier: "Maersk",      containerNumber: "MSKU1234567", etd: "2024-06-25", eta: "2024-07-15", status: "IN_TRANSIT" as ShipmentStatus, value: 48000,  currency: "USD" },
  { id: "2", shipmentCode: "BB24-100198", clientName: "Global Pharma Co.",   originCountry: "China",   destCountry: "USA",    carrier: "MSC",         containerNumber: "MSCU9876543", etd: "2024-06-20", eta: "2024-07-10", status: "CUSTOMS"    as ShipmentStatus, value: 125000, currency: "USD" },
  { id: "3", shipmentCode: "BB24-100187", clientName: "EcoGoods Inc.",       originCountry: "Germany", destCountry: "India",  carrier: "Hapag-Lloyd", containerNumber: null,          etd: "2024-07-01", eta: "2024-07-20", status: "PENDING"    as ShipmentStatus, value: 32000,  currency: "EUR" },
  { id: "4", shipmentCode: "BB24-100155", clientName: "TechParts GmbH",      originCountry: "Japan",   destCountry: "Brazil", carrier: "Evergreen",   containerNumber: "EGHU4567890", etd: "2024-06-01", eta: "2024-06-30", status: "DELIVERED"  as ShipmentStatus, value: 87500,  currency: "USD" },
  { id: "5", shipmentCode: "BB24-100143", clientName: "FreshFoods Export",   originCountry: "Spain",   destCountry: "UK",     carrier: "CMA CGM",     containerNumber: "CMAU3456789", etd: "2024-06-18", eta: "2024-07-02", status: "IN_TRANSIT" as ShipmentStatus, value: 21000,  currency: "EUR" },
];

const COLS = ["Shipment", "Client", "Route", "Carrier", "ETD / ETA", "Value", "Status", ""];

export function ShipmentTable() {
  if (mockShipments.length === 0) {
    return (
      <div className="rounded-2xl bg-white" style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05)" }}>
        <EmptyState
          icon={Package}
          title="No shipments yet"
          description="Create your first shipment to start tracking global cargo movements."
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05), 0 4px 16px rgba(15,35,66,0.05)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
              {COLS.map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockShipments.map((s, i) => {
              const delayed = isDelayed(s.eta, s.status);
              return (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group hover:bg-slate-50/80 transition-colors"
                  style={{ borderBottom: i < mockShipments.length - 1 ? "1px solid #f8fafc" : "none" }}
                >
                  {/* Shipment ID */}
                  <td className="px-5 py-4">
                    <a href={`/shipments/${s.id}`} className="font-bold text-[13px] text-slate-900 hover:text-emerald-700 transition-colors">
                      {s.shipmentCode}
                    </a>
                    {s.containerNumber && (
                      <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{s.containerNumber}</p>
                    )}
                  </td>

                  {/* Client */}
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-medium text-slate-700">{s.clientName}</p>
                  </td>

                  {/* Route */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-[12px]">
                      <span className="text-base leading-none">{FLAGS[s.originCountry] ?? "🌐"}</span>
                      <span className="font-medium text-slate-600">{s.originCountry}</span>
                      <MoveRight className="h-3 w-3 text-slate-300 shrink-0" />
                      <span className="text-base leading-none">{FLAGS[s.destCountry] ?? "🌐"}</span>
                      <span className="font-medium text-slate-600">{s.destCountry}</span>
                    </div>
                  </td>

                  {/* Carrier */}
                  <td className="px-5 py-4 text-[12px] text-slate-500">{s.carrier}</td>

                  {/* ETD / ETA */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-[11px] text-slate-400">ETD {format(new Date(s.etd), "MMM d")}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {delayed && <AlertCircle className="h-3 w-3 text-red-400 shrink-0" />}
                      <p className={`text-[12px] font-semibold ${delayed ? "text-red-500" : "text-slate-700"}`}>
                        {format(new Date(s.eta), "MMM d, yyyy")}
                      </p>
                    </div>
                    {delayed && <p className="text-[10px] text-red-400">Delayed</p>}
                  </td>

                  {/* Value */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-[12px] font-semibold text-slate-700 font-mono">
                      {s.currency} {s.value?.toLocaleString()}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={s.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl">
                        <DropdownMenuItem onClick={() => { window.location.href = `/shipments/${s.id}`; }} className="cursor-pointer">
                          <Eye className="h-3.5 w-3.5 mr-2 text-slate-400" /> View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { window.location.href = `/shipments/${s.id}/edit`; }} className="cursor-pointer">
                          <Edit className="h-3.5 w-3.5 mr-2 text-slate-400" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid #f1f5f9", background: "#fafbfc" }}
      >
        <p className="text-[12px] text-slate-500">
          Showing <span className="font-semibold text-slate-700">5</span> of <span className="font-semibold text-slate-700">142</span> shipments
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled className="h-8 text-xs rounded-lg border-slate-200">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg border-slate-200 hover:border-emerald-400 hover:text-emerald-700">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
