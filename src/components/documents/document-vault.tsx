"use client";

import { useState } from "react";
import { Search, Download, Trash2, Eye, FileText, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { formatFileSize } from "@/lib/utils/shipment";
import { format } from "date-fns";
import type { DocumentType } from "@/types";

const TYPE_CONFIG: Record<DocumentType, { label: string; bg: string; text: string; border: string; icon: string }> = {
  INVOICE:        { label: "Invoice",       bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   icon: "💰" },
  PACKING_LIST:   { label: "Packing List",  bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200", icon: "📦" },
  BILL_OF_LADING: { label: "Bill of Lading",bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",icon: "🚢" },
  CERTIFICATE:    { label: "Certificate",   bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",  icon: "📋" },
  OTHER:          { label: "Other",         bg: "bg-slate-50",   text: "text-slate-600",   border: "border-slate-200",  icon: "📄" },
};

const mockDocuments = [
  { id: "d1", name: "Invoice_BB24-100234.pdf",          type: "INVOICE"        as DocumentType, fileSize: 245760, version: 2, shipmentCode: "BB24-100234", clientName: "Apex Textiles Ltd.",  createdAt: "2024-06-25T10:30:00Z", uploadedBy: "Riya Shah"    },
  { id: "d2", name: "BillOfLading_BB24-100198.pdf",     type: "BILL_OF_LADING" as DocumentType, fileSize: 512000, version: 1, shipmentCode: "BB24-100198", clientName: "Global Pharma Co.",   createdAt: "2024-06-26T09:15:00Z", uploadedBy: "Amit Patel"   },
  { id: "d3", name: "PackingList_BB24-100187.pdf",      type: "PACKING_LIST"   as DocumentType, fileSize: 102400, version: 1, shipmentCode: "BB24-100187", clientName: "EcoGoods Inc.",        createdAt: "2024-07-01T14:00:00Z", uploadedBy: "Neelu Suthar" },
  { id: "d4", name: "Certificate_Origin_BB24-100155.pdf",type: "CERTIFICATE"   as DocumentType, fileSize: 180000, version: 3, shipmentCode: "BB24-100155", clientName: "TechParts GmbH",       createdAt: "2024-06-15T11:45:00Z", uploadedBy: "Riya Shah"    },
  { id: "d5", name: "Invoice_BB24-100143.pdf",          type: "INVOICE"        as DocumentType, fileSize: 310000, version: 1, shipmentCode: "BB24-100143", clientName: "FreshFoods Export",    createdAt: "2024-06-18T08:20:00Z", uploadedBy: "Amit Patel"   },
];

export function DocumentVault() {
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filtered = mockDocuments.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.shipmentCode.toLowerCase().includes(search.toLowerCase()) ||
      d.clientName.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "ALL" || d.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      {/* Filters header */}
      <div className="flex flex-col sm:flex-row gap-3 p-5 border-b border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search documents, shipments, clients..."
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-400 rounded-xl text-[13px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "ALL")}>
          <SelectTrigger className="w-full sm:w-48 h-10 bg-slate-50 border-slate-200 rounded-xl text-[13px]">
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-xl">
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="INVOICE">Invoice</SelectItem>
            <SelectItem value="PACKING_LIST">Packing List</SelectItem>
            <SelectItem value="BILL_OF_LADING">Bill of Lading</SelectItem>
            <SelectItem value="CERTIFICATE">Certificate</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
              {["Document", "Type", "Shipment", "Version", "Uploaded", "By", ""].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc, i) => {
              const cfg = TYPE_CONFIG[doc.type];
              return (
                <tr
                  key={doc.id}
                  className="group hover:bg-slate-50/80 transition-colors"
                  style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f8fafc" : "none" }}
                >
                  {/* Document name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                        style={{ background: "linear-gradient(135deg,#f0f4ff,#e8f0fe)", border: "1px solid #e2e8f0" }}
                      >
                        <FileText className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800 leading-none">{doc.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{formatFileSize(doc.fileSize)}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type badge */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </td>

                  {/* Shipment */}
                  <td className="px-5 py-4">
                    <p className="text-[12px] font-bold text-slate-800">{doc.shipmentCode}</p>
                    <p className="text-[11px] text-slate-400">{doc.clientName}</p>
                  </td>

                  {/* Version */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                      {doc.version > 1 && <History className="h-3 w-3" />}
                      v{doc.version}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-[12px] text-slate-600">{format(new Date(doc.createdAt), "MMM d, yyyy")}</p>
                    <p className="text-[10px] text-slate-400">{format(new Date(doc.createdAt), "h:mm a")}</p>
                  </td>

                  {/* By */}
                  <td className="px-5 py-4 text-[12px] text-slate-500">{doc.uploadedBy}</td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-emerald-50 hover:text-emerald-600">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: "1px solid #f1f5f9", background: "#fafbfc" }}>
        <p className="text-[12px] text-slate-500">
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of <span className="font-semibold text-slate-700">248</span> documents
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled className="h-8 text-xs rounded-lg border-slate-200">Previous</Button>
          <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg border-slate-200 hover:border-emerald-400 hover:text-emerald-700">Next</Button>
        </div>
      </div>
    </div>
  );
}
