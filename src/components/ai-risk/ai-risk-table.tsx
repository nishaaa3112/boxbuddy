"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/shared/status-badge";
import type { RiskLevel } from "@/types";
import { RefreshCw, MoveRight } from "lucide-react";

const mockRisks = [
  {
    id: "1",
    shipmentCode: "BB24-100234",
    clientName: "Apex Textiles Ltd.",
    originCountry: "India",
    destCountry: "UAE",
    riskLevel: "HIGH" as RiskLevel,
    riskScore: 82,
    delayProbability: 0.78,
    customsRisk: 0.45,
    missingDocuments: ["Certificate of Origin", "Phytosanitary Certificate"],
    lastAnalyzed: "2 hours ago",
  },
  {
    id: "2",
    shipmentCode: "BB24-100198",
    clientName: "Global Pharma Co.",
    originCountry: "China",
    destCountry: "USA",
    riskLevel: "HIGH" as RiskLevel,
    riskScore: 75,
    delayProbability: 0.65,
    customsRisk: 0.72,
    missingDocuments: ["FDA Import Certificate"],
    lastAnalyzed: "4 hours ago",
  },
  {
    id: "3",
    shipmentCode: "BB24-100212",
    clientName: "AutoParts Korea",
    originCountry: "Korea",
    destCountry: "Germany",
    riskLevel: "MEDIUM" as RiskLevel,
    riskScore: 55,
    delayProbability: 0.42,
    customsRisk: 0.28,
    missingDocuments: [],
    lastAnalyzed: "6 hours ago",
  },
  {
    id: "4",
    shipmentCode: "BB24-100187",
    clientName: "EcoGoods Inc.",
    originCountry: "Germany",
    destCountry: "India",
    riskLevel: "LOW" as RiskLevel,
    riskScore: 22,
    delayProbability: 0.15,
    customsRisk: 0.18,
    missingDocuments: [],
    lastAnalyzed: "1 hour ago",
  },
];

const FLAGS: Record<string, string> = {
  India: "🇮🇳", USA: "🇺🇸", China: "🇨🇳", Germany: "🇩🇪",
  UAE: "🇦🇪", Korea: "🇰🇷",
};

function RiskBar({ label, value }: { label: string; value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 65 ? "#ef4444" : pct >= 40 ? "#f59e0b" : "#10B981";
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export function AIRiskTable() {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-[14px] font-bold text-slate-900">Risk Analysis — Active Shipments</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">AI-powered delay & compliance scoring</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs border-slate-200 hover:border-emerald-400 hover:text-emerald-700 rounded-lg"
        >
          <RefreshCw className="h-3 w-3" />
          Re-analyze All
        </Button>
      </div>

      <div className="p-4 space-y-3">
        {mockRisks.map((risk) => {
          const scoreGrad = risk.riskScore >= 70 ? "linear-gradient(135deg,#dc2626,#ef4444)"
            : risk.riskScore >= 45 ? "linear-gradient(135deg,#d97706,#f59e0b)"
            : "linear-gradient(135deg,#059669,#10B981)";
          const scoreGlow = risk.riskScore >= 70 ? "rgba(239,68,68,0.3)"
            : risk.riskScore >= 45 ? "rgba(245,158,11,0.3)"
            : "rgba(16,185,129,0.3)";

          return (
            <div
              key={risk.id}
              className="relative rounded-xl p-4 hover:bg-slate-50/80 transition-colors overflow-hidden"
              style={{ border: "1px solid #f1f5f9" }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-0.5 rounded-r-full"
                style={{ background: scoreGrad }}
              />
              <div className="pl-3">
                {/* Header row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/shipments/${risk.id}`} className="text-[13px] font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                        {risk.shipmentCode}
                      </Link>
                      <RiskBadge level={risk.riskLevel} score={risk.riskScore} />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                      <span>{risk.clientName}</span>
                      <span className="text-slate-300">·</span>
                      <span>{FLAGS[risk.originCountry] ?? "🌐"} {risk.originCountry}</span>
                      <MoveRight className="h-2.5 w-2.5 text-slate-300" />
                      <span>{FLAGS[risk.destCountry] ?? "🌐"} {risk.destCountry}</span>
                    </div>
                  </div>
                  {/* Score ring */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ background: scoreGrad, boxShadow: `0 4px 12px ${scoreGlow}` }}
                    >
                      <span className="text-[13px] font-bold text-white">{risk.riskScore}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5">score</span>
                  </div>
                </div>

                {/* Risk bars */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <RiskBar label="Delay Probability" value={risk.delayProbability} />
                  <RiskBar label="Customs Risk" value={risk.customsRisk} />
                </div>

                {/* Missing docs */}
                {risk.missingDocuments.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {risk.missingDocuments.map((doc) => (
                      <span
                        key={doc}
                        className="inline-flex items-center rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-semibold text-red-600"
                      >
                        ⚠ Missing: {doc}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-[10px] text-slate-400 mt-2">Analyzed {risk.lastAnalyzed}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
