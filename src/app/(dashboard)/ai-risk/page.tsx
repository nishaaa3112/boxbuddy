import { PageHeader } from "@/components/shared/page-header";
import { AIRiskOverview } from "@/components/ai-risk/ai-risk-overview";
import { AIRiskTable } from "@/components/ai-risk/ai-risk-table";
import { AIRiskInsights } from "@/components/ai-risk/ai-risk-insights";

export default function AIRiskPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Risk Intelligence"
        description="Predictive risk analysis for your active shipments"
        tag="AI Powered"
      />

      <AIRiskOverview />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AIRiskTable />
        </div>
        <div>
          <AIRiskInsights />
        </div>
      </div>
    </div>
  );
}
