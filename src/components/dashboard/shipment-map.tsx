"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { Globe2, Zap, Ship } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const activeRoutes = [
  {
    id: "BB24-100234",
    from: { name: "Mumbai",    country: "India",       coords: [72.8777,   19.076 ]  as [number, number] },
    to:   { name: "Dubai",     country: "UAE",         coords: [55.2708,   25.2048]  as [number, number] },
    status: "IN_TRANSIT",
    color: "#10B981",
    dotColor: "#059669",
    label: "India → UAE",
  },
  {
    id: "BB24-100198",
    from: { name: "Shanghai",  country: "China",       coords: [121.4737,  31.2304]  as [number, number] },
    to:   { name: "New York",  country: "USA",         coords: [-74.006,   40.7128]  as [number, number] },
    status: "CUSTOMS",
    color: "#F59E0B",
    dotColor: "#D97706",
    label: "China → USA",
  },
  {
    id: "BB24-100187",
    from: { name: "Hamburg",   country: "Germany",     coords: [9.9937,    53.5511]  as [number, number] },
    to:   { name: "Mumbai",    country: "India",       coords: [72.8777,   19.076 ]  as [number, number] },
    status: "PENDING",
    color: "#6366F1",
    dotColor: "#4F46E5",
    label: "Germany → India",
  },
  {
    id: "BB24-100155",
    from: { name: "Tokyo",     country: "Japan",       coords: [139.6917,  35.6895]  as [number, number] },
    to:   { name: "São Paulo", country: "Brazil",      coords: [-46.6333, -23.5505]  as [number, number] },
    status: "DELIVERED",
    color: "#22D3EE",
    dotColor: "#0891B2",
    label: "Japan → Brazil",
  },
  {
    id: "BB24-100212",
    from: { name: "Singapore", country: "Singapore",   coords: [103.8198,   1.3521]  as [number, number] },
    to:   { name: "Sydney",    country: "Australia",   coords: [151.2093, -33.8688]  as [number, number] },
    status: "IN_TRANSIT",
    color: "#A78BFA",
    dotColor: "#7C3AED",
    label: "Singapore → Sydney",
  },
];

const STATUS_LABEL: Record<string, string> = {
  IN_TRANSIT: "In Transit",
  CUSTOMS:    "In Customs",
  PENDING:    "Pending",
  DELIVERED:  "Delivered",
};

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  IN_TRANSIT: { color: "#10B981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" },
  CUSTOMS:    { color: "#F59E0B", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" },
  PENDING:    { color: "#6366F1", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" },
  DELIVERED:  { color: "#22D3EE", background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.25)" },
};

export function ShipmentMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const inTransit = activeRoutes.filter(r => r.status === "IN_TRANSIT").length;
  const hoveredRoute = activeRoutes.find(r => r.id === hovered);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0d1626 0%, #111e30 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", boxShadow: "0 4px 12px rgba(59,130,246,0.3)" }}
          >
            <Globe2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold tracking-tight" style={{ color: "#e2e8f0", fontFamily: "var(--font-space-grotesk)" }}>
              Active Shipment Routes
            </h3>
            <p className="text-[11px] mt-0.5" style={{ color: "#475569" }}>Real-time cargo movements worldwide</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ color: "#10B981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <Zap className="h-3 w-3" />
            {inTransit} live
          </div>
          <div
            className="text-xs px-3 py-1.5 rounded-full"
            style={{ color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {activeRoutes.length} routes
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative" style={{ height: 360, background: "linear-gradient(180deg, #060d1a 0%, #091422 100%)" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140, center: [20, 20] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#162035"
                  stroke="rgba(30,60,100,0.6)"
                  strokeWidth={0.4}
                  style={{
                    default:  { outline: "none" },
                    hover:    { fill: "#1e3a5f", outline: "none" },
                    pressed:  { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Route lines */}
          {activeRoutes.map((route) => (
            <Line
              key={`line-${route.id}`}
              from={route.from.coords}
              to={route.to.coords}
              stroke={route.color}
              strokeWidth={hovered === route.id ? 2.8 : 1.6}
              strokeLinecap="round"
              strokeDasharray={route.status === "PENDING" ? "6 4" : route.status === "IN_TRANSIT" ? "0" : "3 3"}
              style={{
                transition: "stroke-width 0.2s, opacity 0.2s",
                opacity: hovered && hovered !== route.id ? 0.2 : 0.85,
                filter: hovered === route.id ? `drop-shadow(0 0 4px ${route.color}88)` : "none",
              }}
            />
          ))}

          {/* Port markers */}
          {activeRoutes.map((route) => (
            <g key={`markers-${route.id}`}>
              {/* Origin */}
              <Marker
                coordinates={route.from.coords}
                onMouseEnter={() => setHovered(route.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle
                  r={hovered === route.id ? 6.5 : 4.5}
                  fill={route.dotColor}
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth={1.5}
                  style={{ cursor: "pointer", transition: "r 0.15s", opacity: hovered && hovered !== route.id ? 0.25 : 1 }}
                />
                {route.status === "IN_TRANSIT" && (
                  <circle r={9} fill="none" stroke={route.color} strokeWidth={1.2} opacity={0.5}>
                    <animate attributeName="r"       from="5"  to="13"  dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0"  dur="2.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </Marker>
              {/* Destination */}
              <Marker
                coordinates={route.to.coords}
                onMouseEnter={() => setHovered(route.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle
                  r={hovered === route.id ? 6.5 : 4.5}
                  fill={route.dotColor}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth={1.5}
                  opacity={0.7}
                  style={{ cursor: "pointer", transition: "r 0.15s, opacity 0.2s", opacity: hovered && hovered !== route.id ? 0.15 : 0.7 }}
                />
              </Marker>
            </g>
          ))}
        </ComposableMap>

        {/* Legend pills */}
        <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
          {activeRoutes.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full cursor-pointer transition-opacity"
              style={{
                background: "rgba(8,15,29,0.85)",
                border: `1px solid ${r.color}40`,
                color: r.color,
                opacity: hovered && hovered !== r.id ? 0.35 : 1,
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: r.color }} />
              {r.label}
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hoveredRoute && (
          <div
            className="absolute top-3 right-4 rounded-2xl p-4 min-w-52"
            style={{
              background: "rgba(8,15,29,0.95)",
              border: `1px solid ${hoveredRoute.color}30`,
              backdropFilter: "blur(16px)",
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${hoveredRoute.color}20`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Ship className="h-3.5 w-3.5" style={{ color: hoveredRoute.color }} />
                <span className="text-[12px] font-bold" style={{ color: "#e2e8f0" }}>{hoveredRoute.id}</span>
              </div>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={STATUS_STYLE[hoveredRoute.status] ?? { color: "#94a3b8" }}
              >
                {STATUS_LABEL[hoveredRoute.status]}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[12px]" style={{ color: "#94a3b8" }}>
              <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{hoveredRoute.from.name}</span>
              <span style={{ color: hoveredRoute.color }}>→</span>
              <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{hoveredRoute.to.name}</span>
            </div>
            <div className="text-[10px] mt-1" style={{ color: "#475569" }}>
              {hoveredRoute.from.country} → {hoveredRoute.to.country}
            </div>
            <div className="mt-3 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${hoveredRoute.color}, transparent)` }} />
          </div>
        )}
      </div>
    </div>
  );
}
