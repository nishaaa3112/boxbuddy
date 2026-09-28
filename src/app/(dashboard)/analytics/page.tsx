import { PageHeader } from "@/components/shared/page-header";
import { AnalyticsKPIs } from "@/components/analytics/analytics-kpis";
import { ShipmentsPerMonth } from "@/components/analytics/shipments-per-month";
import { CountryDistribution } from "@/components/analytics/country-distribution";
import { RiskTrendChart } from "@/components/analytics/risk-trend-chart";
import { DelayedShipmentsChart } from "@/components/analytics/delayed-shipments-chart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Operational insights and performance metrics"
        tag="Insights"
      />

      <AnalyticsKPIs />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ShipmentsPerMonth />
        <DelayedShipmentsChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CountryDistribution />
        <RiskTrendChart />
      </div>
    </div>
  );
}
