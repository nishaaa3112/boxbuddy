"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart3 } from "lucide-react";

const data = [
  { month: "Jan", delivered: 12, inTransit: 5,  delayed: 1 },
  { month: "Feb", delivered: 15, inTransit: 6,  delayed: 2 },
  { month: "Mar", delivered: 10, inTransit: 8,  delayed: 3 },
  { month: "Apr", delivered: 18, inTransit: 4,  delayed: 1 },
  { month: "May", delivered: 22, inTransit: 7,  delayed: 2 },
  { month: "Jun", delivered: 18, inTransit: 9,  delayed: 3 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs" style={{ background: "#0d1626", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <p className="font-bold mb-2" style={{ color: "#e2e8f0", fontFamily: "var(--font-space-grotesk)" }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: "#64748b" }}>{p.name}</span>
          </span>
          <span className="font-semibold" style={{ color: "#e2e8f0" }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

const CARD = { background: "linear-gradient(145deg, #0d1626 0%, #111e30 100%)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" };

export function ShipmentStatusChart() {
  return (
    <div className="rounded-2xl overflow-hidden" style={CARD}>
      <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", boxShadow: "0 4px 12px rgba(59,130,246,0.3)" }}
        >
          <BarChart3 className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-[14px] font-bold tracking-tight" style={{ color: "#e2e8f0", fontFamily: "var(--font-space-grotesk)" }}>Shipment Volume</h3>
          <p className="text-[11px]" style={{ color: "#475569" }}>6-month breakdown by status</p>
        </div>
      </div>

      <div className="p-5">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barSize={9} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#334155", fontWeight: 500 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#334155" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)", radius: 4 }} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12, color: "#64748b" }} iconType="circle" iconSize={7} />
            <Bar dataKey="delivered"  name="Delivered"  fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inTransit"  name="In Transit" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="delayed"    name="Delayed"    fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
