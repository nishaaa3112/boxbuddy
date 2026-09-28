"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatFileSize } from "@/lib/utils/shipment";

const DOC_TYPES = [
  { value: "INVOICE", label: "Invoice" },
  { value: "PACKING_LIST", label: "Packing List" },
  { value: "BILL_OF_LADING", label: "Bill of Lading" },
  { value: "CERTIFICATE", label: "Certificate" },
  { value: "OTHER", label: "Other" },
];

interface UploadDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipmentId?: string;
  onSuccess?: () => void;
}

export function UploadDocumentModal({
  open,
  onOpenChange,
  shipmentId,
  onSuccess,
}: UploadDocumentModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("");
  const [docName, setDocName] = useState("");
  const [shipmentIdField, setShipmentIdField] = useState(shipmentId ?? "");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setFile(null);
    setDocType("");
    setDocName("");
    setShipmentIdField(shipmentId ?? "");
    setDescription("");
  };

  const handleClose = () => {
    if (!uploading) {
      resetForm();
      onOpenChange(false);
    }
  };

  const acceptFile = (f: File) => {
    setFile(f);
    if (!docName) setDocName(f.name.replace(/\.[^/.]+$/, ""));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) acceptFile(dropped);
    },
    [docName]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) acceptFile(picked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !docType || !docName || !shipmentIdField) {
      toast.error("Please fill all required fields and attach a file.");
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("shipmentId", shipmentIdField);
      fd.append("type", docType);
      fd.append("name", docName);
      if (description) fd.append("description", description);

      const res = await fetch("/api/documents", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Upload failed");
      }

      toast.success("Document uploaded successfully!");
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Upload className="h-4 w-4 text-violet-600" />
            Upload Document
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Drop zone */}
          <div
            className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors cursor-pointer
              ${dragging ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-slate-50 hover:border-violet-400 hover:bg-violet-50/50"}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              className="sr-only"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              onChange={handleFileInput}
            />
            {file ? (
              <>
                <CheckCircle2 className="h-8 w-8 text-violet-600" />
                <div className="text-center">
                  <p className="font-medium text-slate-800 text-sm">{file.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{formatFileSize(file.size)}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-7 w-7 p-0"
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                  <FileText className="h-6 w-6 text-violet-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700">
                    Drag & drop or <span className="text-violet-600">browse</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PDF, DOC, XLS, PNG — max 20 MB</p>
                </div>
              </>
            )}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="doc-name">Document Name <span className="text-red-500">*</span></Label>
              <Input
                id="doc-name"
                placeholder="e.g. Invoice_BB24-100234"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Document Type <span className="text-red-500">*</span></Label>
              <Select value={docType} onValueChange={(v) => v && setDocType(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {DOC_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="shipment-id">
                Shipment ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="shipment-id"
                placeholder="e.g. cm..."
                value={shipmentIdField}
                onChange={(e) => setShipmentIdField(e.target.value)}
                readOnly={!!shipmentId}
                className={shipmentId ? "bg-slate-50 text-slate-500" : ""}
              />
            </div>

            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="doc-description">Description</Label>
              <Textarea
                id="doc-description"
                placeholder="Optional notes about this document..."
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="outline" onClick={handleClose} disabled={uploading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={uploading || !file}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
