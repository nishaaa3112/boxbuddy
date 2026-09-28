"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Clock } from "lucide-react";

const data = [
  { month: "Jan", onTime: 16, delayed: 2 },
  { month: "Feb", onTime: 19, delayed: 3 },
  { month: "Mar", onTime: 17, delayed: 2 },
  { month: "Apr", onTime: 24, delayed: 2 },
  { month: "May", onTime: 28, delayed: 3 },
  { month: "Jun", onTime: 27, delayed: 1 },
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

export function DelayedShipmentsChart() {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-[14px] font-bold text-slate-900">On-Time vs Delayed</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Monthly delivery performance</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)" }}>
          <Clock className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="p-5">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barSize={12} barCategoryGap="40%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="onTime"  name="On Time" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="delayed" name="Delayed"  fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
