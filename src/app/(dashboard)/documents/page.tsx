import { PageHeader } from "@/components/shared/page-header";
import { DocumentVault } from "@/components/documents/document-vault";
import { DocumentStats } from "@/components/documents/document-stats";
import { UploadButton } from "@/components/documents/upload-button";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Vault"
        description="Centralized repository for all shipment documents"
        tag="Compliance"
      >
        <UploadButton />
      </PageHeader>

      <DocumentStats />
      <DocumentVault />
    </div>
  );
}
