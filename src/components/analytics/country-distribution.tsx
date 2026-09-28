"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Globe } from "lucide-react";

const data = [
  { name: "India",   value: 32, color: "#10B981" },
  { name: "China",   value: 24, color: "#0F2342" },
  { name: "Germany", value: 18, color: "#1a4a8a" },
  { name: "UAE",     value: 14, color: "#f59e0b" },
  { name: "USA",     value: 12, color: "#0891b2" },
  { name: "Others",  value: 42, color: "#cbd5e1" },
];

const FLAGS: Record<string, string> = {
  India: "🇮🇳", China: "🇨🇳", Germany: "🇩🇪", UAE: "🇦🇪", USA: "🇺🇸", Others: "🌐",
};

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-white px-3 py-2" style={{ border: "1px solid rgba(15,35,66,0.1)", boxShadow: "0 4px 16px rgba(15,35,66,0.1)" }}>
      <p className="text-[13px] font-bold text-slate-900">{FLAGS[payload[0].name]} {payload[0].name}</p>
      <p className="text-[12px] text-slate-500">{payload[0].value} shipments</p>
    </div>
  );
}

export function CountryDistribution() {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-[14px] font-bold text-slate-900">Country Distribution</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Shipments by origin country</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}>
          <Globe className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-4 p-5">
        <div className="shrink-0">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-[12px] text-slate-600">{FLAGS[d.name]} {d.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.value / total) * 100}%`, background: d.color }} />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 w-6 text-right">{d.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
