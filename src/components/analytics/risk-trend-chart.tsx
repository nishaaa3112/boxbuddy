"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { ShieldAlert } from "lucide-react";

const data = [
  { month: "Jan", high: 8,  medium: 12, low: 14 },
  { month: "Feb", high: 6,  medium: 14, low: 18 },
  { month: "Mar", high: 9,  medium: 11, low: 16 },
  { month: "Apr", high: 5,  medium: 15, low: 22 },
  { month: "May", high: 7,  medium: 13, low: 25 },
  { month: "Jun", high: 5,  medium: 8,  low: 18 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-white px-3 py-2.5" style={{ border: "1px solid rgba(15,35,66,0.1)", boxShadow: "0 4px 16px rgba(15,35,66,0.1)" }}>
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[12px] text-slate-600">{p.name}:</span>
          <span className="text-[12px] font-bold text-slate-900">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function RiskTrendChart() {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-[14px] font-bold text-slate-900">Risk Level Trend</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">H / M / L risk shipments per month</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg,#dc2626,#ef4444)" }}>
          <ShieldAlert className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="p-5">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Line type="monotone" dataKey="high"   name="High"   stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: "#ef4444", strokeWidth: 0 }} />
            <Line type="monotone" dataKey="medium" name="Medium" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: "#f59e0b", strokeWidth: 0 }} />
            <Line type="monotone" dataKey="low"    name="Low"    stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: "#10B981", strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
