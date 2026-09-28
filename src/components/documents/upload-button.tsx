"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadDocumentModal } from "./upload-document-modal";

export function UploadButton({ shipmentId }: { shipmentId?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
        onClick={() => setOpen(true)}
      >
        <Upload className="h-4 w-4" />
        Upload Document
      </Button>
      <UploadDocumentModal
        open={open}
        onOpenChange={setOpen}
        shipmentId={shipmentId}
      />
    </>
  );
}
