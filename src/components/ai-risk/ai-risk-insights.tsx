import { Lightbulb, TrendingDown, Globe, FileX } from "lucide-react";

const insights = [
  {
    icon: TrendingDown,
    gradient: "linear-gradient(135deg,#dc2626,#ef4444)",
    glow: "rgba(239,68,68,0.2)",
    title: "Port Congestion Alert",
    description: "Jebel Ali port reporting 3–5 day delays affecting UAE-bound shipments.",
    tag: "High Impact",
    tagColor: "text-red-600 bg-red-50 border-red-200",
  },
  {
    icon: FileX,
    gradient: "linear-gradient(135deg,#d97706,#f59e0b)",
    glow: "rgba(245,158,11,0.2)",
    title: "Document Gaps",
    description: "3 active shipments missing certificates of origin. Customs holds possible.",
    tag: "Action Needed",
    tagColor: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    icon: Globe,
    gradient: "linear-gradient(135deg,#0F2342,#1a4a8a)",
    glow: "rgba(15,35,66,0.2)",
    title: "Regulatory Update",
    description: "USA FDA updated import rules for pharmaceutical shipments from China.",
    tag: "Regulatory",
    tagColor: "text-blue-700 bg-blue-50 border-blue-200",
  },
  {
    icon: Lightbulb,
    gradient: "linear-gradient(135deg,#059669,#10B981)",
    glow: "rgba(16,185,129,0.2)",
    title: "Optimization Opportunity",
    description: "Consolidating 2 India→UAE shipments could save est. 12% on freight.",
    tag: "Save 12%",
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
];

export function AIRiskInsights() {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)" }}>
            <Lightbulb className="h-3.5 w-3.5 text-white" />
          </div>
          <h3 className="text-[14px] font-bold text-slate-900">AI Insights</h3>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">Live intelligence from market signals</p>
      </div>

      <div className="p-4 space-y-3">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.title}
              className="flex gap-3 rounded-xl p-3 hover:bg-slate-50/80 transition-colors"
              style={{ border: "1px solid #f8fafc" }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: insight.gradient, boxShadow: `0 4px 12px ${insight.glow}` }}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                  <p className="text-[12px] font-bold text-slate-900">{insight.title}</p>
                  <span className={`inline-flex items-center rounded-full border px-1.5 py-0 text-[9px] font-semibold ${insight.tagColor}`}>
                    {insight.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
