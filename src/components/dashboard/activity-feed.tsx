"use client";

import { Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const mockActivities = [
  { id: "1", action: "Status updated",       description: "BB24-100234 moved to Customs",         user: "Riya Shah",    time: new Date(Date.now() - 1000*60*15),  gradient: "linear-gradient(135deg,#7c3aed,#8b5cf6)", glow: "rgba(124,58,237,0.35)", initials: "RS" },
  { id: "2", action: "Document uploaded",    description: "Bill of Lading added to BB24-100198",  user: "Amit Patel",   time: new Date(Date.now() - 1000*60*42),  gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)", glow: "rgba(59,130,246,0.35)", initials: "AP" },
  { id: "3", action: "New shipment created", description: "BB24-100250 created for EcoGoods",     user: "Neelu Suthar", time: new Date(Date.now() - 1000*60*90),  gradient: "linear-gradient(135deg,#059669,#10B981)", glow: "rgba(16,185,129,0.35)", initials: "NS" },
  { id: "4", action: "Risk detected",        description: "High risk flagged on BB24-100212",     user: "AI System",    time: new Date(Date.now() - 1000*60*180), gradient: "linear-gradient(135deg,#991b1b,#ef4444)", glow: "rgba(239,68,68,0.35)",  initials: "AI" },
];

const CARD = { background: "linear-gradient(145deg, #0d1626 0%, #111e30 100%)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" };

export function ActivityFeed() {
  return (
    <div className="rounded-2xl overflow-hidden" style={CARD}>
      <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
          <Activity className="h-4 w-4" style={{ color: "#64748b" }} />
        </div>
        <div>
          <h3 className="text-[14px] font-bold tracking-tight" style={{ color: "#e2e8f0", fontFamily: "var(--font-space-grotesk)" }}>Recent Activity</h3>
          <p className="text-[11px]" style={{ color: "#475569" }}>Live team actions</p>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[17px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 80%, transparent 100%)" }} />

          <div className="space-y-4">
            {mockActivities.map(a => (
              <div key={a.id} className="flex gap-3">
                <div
                  className="relative shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-[10px] font-black text-white z-10"
                  style={{ background: a.gradient, boxShadow: `0 2px 12px ${a.glow}`, fontFamily: "var(--font-space-grotesk)" }}
                >
                  {a.initials}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-[12px] font-semibold leading-none" style={{ color: "#cbd5e1" }}>{a.action}</p>
                  <p className="text-[11px] mt-0.5 truncate" style={{ color: "#64748b" }}>{a.description}</p>
                  <p className="text-[10px] mt-1" style={{ color: "#334155" }}>
                    <span style={{ color: "#475569", fontWeight: 600 }}>{a.user}</span>
                    {" · "}
                    {formatDistanceToNow(a.time, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
