"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/* ─── Stylised dashboard mockup SVG ─────────────────────── */
function DashboardMockup() {
  return (
    <svg viewBox="0 0 880 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto rounded-2xl">
      <defs>
        <linearGradient id="barG1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="barG2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a4a8a" />
          <stop offset="100%" stopColor="#1a4a8a" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer browser frame */}
      <rect width="880" height="540" rx="14" fill="#0d2038" />
      {/* Browser tab bar */}
      <rect width="880" height="38" rx="14" fill="#0a1628" />
      <rect x="0" y="24" width="880" height="14" fill="#0a1628" />
      {/* Traffic lights */}
      <circle cx="22" cy="19" r="6" fill="#ef4444" />
      <circle cx="42" cy="19" r="6" fill="#f59e0b" />
      <circle cx="62" cy="19" r="6" fill="#10B981" />
      {/* URL bar */}
      <rect x="140" y="10" width="400" height="18" rx="4" fill="#162d47" />
      <text x="340" y="23" textAnchor="middle" fill="#64748b" fontSize="9">app.boxbuddy.com/dashboard</text>

      {/* Sidebar */}
      <rect x="0" y="38" width="56" height="502" fill="#0c1e3d" />
      {/* Sidebar icons */}
      {[0,1,2,3,4].map((i) => (
        <rect key={i} x="16" y={62 + i*44} width="24" height="24" rx="6"
          fill={i === 0 ? "#10B981" : "rgba(255,255,255,0.06)"} />
      ))}

      {/* Main content area */}
      <rect x="56" y="38" width="824" height="502" fill="#f0f4fa" />

      {/* Navbar */}
      <rect x="56" y="38" width="824" height="40" fill="rgba(255,255,255,0.9)" />
      <text x="80" y="63" fill="#0f2342" fontSize="13" fontWeight="700">Dashboard</text>
      <rect x="692" y="48" width="60" height="20" rx="10" fill="#10B981" />
      <text x="722" y="62" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">Operations</text>

      {/* KPI Cards row */}
      {[
        { x: 72,  label: "Active",   value: "24", color: "#0F2342", grad: "#1a4a8a" },
        { x: 255, label: "In Transit","value": "18", color: "#0891b2", grad: "#06b6d4" },
        { x: 438, label: "Customs",  value: "3",  color: "#d97706", grad: "#f59e0b" },
        { x: 621, label: "Delivered","value": "142",color: "#059669", grad: "#10B981" },
      ].map((k) => (
        <g key={k.label}>
          <rect x={k.x} y="94" width="168" height="70" rx="12" fill="white" />
          <rect x={k.x} y="94" width="168" height="3" rx="2" fill={k.grad} />
          <rect x={k.x + 12} y="107" width="28" height="28" rx="8"
            fill={k.color} opacity="0.15" />
          <rect x={k.x + 16} y="111" width="20" height="20" rx="4" fill={k.color} />
          <text x={k.x + 62} y="121" fill="#0f2342" fontSize="10" fontWeight="600" opacity="0.5">{k.label}</text>
          <text x={k.x + 62} y="138" fill="#0f2342" fontSize="18" fontWeight="800">{k.value}</text>
        </g>
      ))}

      {/* Chart area left */}
      <rect x="72" y="180" width="440" height="190" rx="12" fill="white" />
      <text x="92" y="204" fill="#0f2342" fontSize="11" fontWeight="700">Shipments per Month</text>
      {/* Bar chart */}
      {[55, 72, 60, 85, 95, 78, 65, 105, 88, 115, 98, 125].map((h, i) => (
        <g key={i}>
          <rect
            x={92 + i * 33}
            y={320 - h}
            width="18"
            height={h}
            rx="4"
            fill={i % 2 === 0 ? "url(#barG1)" : "url(#barG2)"}
          />
        </g>
      ))}
      {/* X-axis labels */}
      {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
        <text key={m + i} x={101 + i * 33} y="340" textAnchor="middle" fill="#94a3b8" fontSize="8">{m}</text>
      ))}

      {/* Area chart right */}
      <rect x="528" y="180" width="330" height="190" rx="12" fill="white" />
      <text x="548" y="204" fill="#0f2342" fontSize="11" fontWeight="700">Risk Trend</text>
      <path
        d="M548 330 L580 300 L612 315 L644 285 L676 295 L708 270 L740 280 L772 255 L804 265 L836 245 L836 350 L548 350 Z"
        fill="url(#areaG)"
      />
      <path
        d="M548 330 L580 300 L612 315 L644 285 L676 295 L708 270 L740 280 L772 255 L804 265 L836 245"
        stroke="#10B981"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dots on line */}
      {[[580,300],[644,285],[708,270],[772,255],[836,245]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#10B981" stroke="white" strokeWidth="1.5" />
      ))}

      {/* Table section */}
      <rect x="72" y="386" width="786" height="138" rx="12" fill="white" />
      <text x="92" y="410" fill="#0f2342" fontSize="11" fontWeight="700">Recent Shipments</text>
      {/* Table header */}
      <rect x="72" y="416" width="786" height="22" fill="#f8fafc" />
      {["Shipment", "Client", "Route", "Status", "Value"].map((h, i) => (
        <text key={h} x={92 + i * 155} y="431" fill="#94a3b8" fontSize="8" fontWeight="700" textAnchor={i === 0 ? "start" : "start"}>{h.toUpperCase()}</text>
      ))}
      {/* Table rows */}
      {[
        { code: "BB24-100234", client: "Apex Textiles",   route: "India → UAE",    status: "IN TRANSIT", statusC: "#0891b2", value: "$48,000" },
        { code: "BB24-100198", client: "Global Pharma",   route: "China → USA",    status: "CUSTOMS",    statusC: "#7c3aed", value: "$125K"  },
        { code: "BB24-100187", client: "EcoGoods Inc.",   route: "Germany → India", status: "PENDING",   statusC: "#d97706", value: "$32,000" },
        { code: "BB24-100155", client: "TechParts GmbH",  route: "Japan → Brazil", status: "DELIVERED",  statusC: "#059669", value: "$87,500" },
      ].map((r, i) => (
        <g key={r.code}>
          <rect x="72" y={438 + i * 22} width="786" height="22" fill={i % 2 === 0 ? "transparent" : "#fafbfc"} />
          <text x="92"  y={453 + i*22} fill="#0f2342" fontSize="9" fontWeight="700">{r.code}</text>
          <text x="247" y={453 + i*22} fill="#475569" fontSize="9">{r.client}</text>
          <text x="402" y={453 + i*22} fill="#475569" fontSize="9">{r.route}</text>
          <rect x="557" y={441 + i*22} width="62" height="14" rx="7" fill={r.statusC} opacity="0.12" />
          <text x="588" y={452 + i*22} textAnchor="middle" fill={r.statusC} fontSize="7" fontWeight="700">{r.status}</text>
          <text x="712" y={453 + i*22} fill="#0f2342" fontSize="9" fontFamily="monospace">{r.value}</text>
        </g>
      ))}
    </svg>
  );
}

export function DashboardPreview() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(15,35,66,0.06)", color: "#0F2342", border: "1px solid rgba(15,35,66,0.12)" }}
            >
              Platform Preview
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              An enterprise dashboard <br />
              <span style={{ background: "linear-gradient(135deg,#059669,#10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                designed for speed
              </span>
            </h2>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Everything your operations team needs — KPI cards, live charts, a global shipment table, and AI risk scores — all in one view.
            </p>
            <ul className="space-y-3">
              {[
                "Real-time shipment status updates",
                "AI-powered risk scoring per shipment",
                "Document compliance tracker",
                "Animated analytics charts",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-slate-700">
                  <span className="h-5 w-5 flex items-center justify-center rounded-full bg-emerald-50 shrink-0" style={{ border: "1px solid rgba(16,185,129,0.3)" }}>
                    <span className="text-emerald-600 text-[10px] font-bold">✓</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg"
              style={{ background: "linear-gradient(135deg,#059669,#10B981)", boxShadow: "0 6px 20px rgba(16,185,129,0.3)" }}
            >
              Try for free <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* Right mockup */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ boxShadow: "0 32px 80px rgba(15,35,66,0.18),0 8px 24px rgba(15,35,66,0.12)" }}
            >
              <DashboardMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
