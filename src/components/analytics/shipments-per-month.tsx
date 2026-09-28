"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", shipments: 18 },
  { month: "Feb", shipments: 22 },
  { month: "Mar", shipments: 19 },
  { month: "Apr", shipments: 26 },
  { month: "May", shipments: 31 },
  { month: "Jun", shipments: 28 },
  { month: "Jul", shipments: 24 },
  { month: "Aug", shipments: 35 },
  { month: "Sep", shipments: 29 },
  { month: "Oct", shipments: 38 },
  { month: "Nov", shipments: 32 },
  { month: "Dec", shipments: 41 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-white px-3 py-2" style={{ border: "1px solid rgba(15,35,66,0.1)", boxShadow: "0 4px 16px rgba(15,35,66,0.1)" }}>
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-[14px] font-bold text-slate-900">{payload[0].value} <span className="text-[11px] font-normal text-slate-500">shipments</span></p>
    </div>
  );
}

export function ShipmentsPerMonth() {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-[14px] font-bold text-slate-900">Shipments per Month</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Full-year volume trend</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg,#0F2342,#1a4a8a)" }}>
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="p-5">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gradShipments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10B981" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="shipments"
              name="Shipments"
              stroke="#10B981"
              strokeWidth={2.5}
              fill="url(#gradShipments)"
              dot={{ fill: "#10B981", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#059669" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
