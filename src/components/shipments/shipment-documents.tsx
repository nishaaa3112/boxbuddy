"use client";

import { useState } from "react";
import { Upload, FileText, Download, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatFileSize } from "@/lib/utils/shipment";
import type { DocumentType } from "@/types";

const mockDocuments = [
  {
    id: "d1",
    name: "Invoice_BB24-100234.pdf",
    type: "INVOICE" as DocumentType,
    fileSize: 245760,
    version: 2,
    isLatest: true,
    createdAt: "2024-06-25",
  },
  {
    id: "d2",
    name: "PackingList_BB24-100234.pdf",
    type: "PACKING_LIST" as DocumentType,
    fileSize: 102400,
    version: 1,
    isLatest: true,
    createdAt: "2024-06-25",
  },
  {
    id: "d3",
    name: "BillOfLading_BB24-100234.pdf",
    type: "BILL_OF_LADING" as DocumentType,
    fileSize: 512000,
    version: 1,
    isLatest: true,
    createdAt: "2024-06-26",
  },
];

const typeColors: Record<DocumentType, string> = {
  INVOICE: "bg-blue-100 text-blue-700",
  PACKING_LIST: "bg-purple-100 text-purple-700",
  BILL_OF_LADING: "bg-green-100 text-green-700",
  CERTIFICATE: "bg-yellow-100 text-yellow-700",
  OTHER: "bg-slate-100 text-slate-700",
};

const typeLabels: Record<DocumentType, string> = {
  INVOICE: "Invoice",
  PACKING_LIST: "Packing List",
  BILL_OF_LADING: "Bill of Lading",
  CERTIFICATE: "Certificate",
  OTHER: "Other",
};

interface ShipmentDocumentsProps {
  shipmentId: string;
}

export function ShipmentDocuments({ shipmentId }: ShipmentDocumentsProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Documents</CardTitle>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-1" />
          Upload
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 shrink-0">
              <FileText className="h-5 w-5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {doc.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${typeColors[doc.type]}`}
                >
                  {typeLabels[doc.type]}
                </span>
                <span className="text-xs text-slate-400">
                  {formatFileSize(doc.fileSize)}
                </span>
                {doc.version > 1 && (
                  <span className="text-xs text-slate-400">v{doc.version}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4 text-slate-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {mockDocuments.length === 0 && (
          <div className="flex flex-col items-center py-8 text-center">
            <Upload className="h-10 w-10 text-slate-300 mb-2" />
            <p className="text-sm text-slate-500">No documents uploaded yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
