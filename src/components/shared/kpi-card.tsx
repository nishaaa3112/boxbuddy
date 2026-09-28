"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconGradient?: string;
  glowColor?: string;
  trend?: { value: number; label: string; positive?: boolean };
  progress?: number;
  className?: string;
  index?: number;
}

const SPARKLINE_DATA = [4, 7, 5, 10, 8, 13, 11, 16, 14, 19];

function sparkPoints(values: number[], w: number, h: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  return values
    .map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`)
    .join(" ");
}

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconGradient = "linear-gradient(135deg,#059669,#10B981)",
  glowColor = "rgba(16,185,129,0.25)",
  trend,
  progress,
  className = "",
  index = 0,
}: KpiCardProps) {
  const isPositive = trend ? trend.positive !== false : null;

  /* ── 3D mouse-tilt effect ── */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 260, damping: 22 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);
  const rotateY = useTransform(sx, [-80, 80], [-8, 8]);
  const rotateX = useTransform(sy, [-80, 80], [7, -7]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: "800px" }}
      className={className}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.2 } }}
        className="relative rounded-2xl overflow-hidden cursor-default"
        css-data-card=""
      >
        {/* Card body */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #0d1626 0%, #111e30 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
          }}
        >
          {/* Top accent gradient line */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: iconGradient }} />

          {/* Subtle inner glow on hover — via CSS shimmer element */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 65%)` }}
            data-glow="true"
          />

          <div className="p-5 relative z-10">
            <div className="flex items-start justify-between gap-3">
              {/* Left */}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#475569" }}>
                  {title}
                </p>
                <p className="text-3xl font-black tracking-tight leading-none" style={{
                  fontFamily: "var(--font-space-grotesk), system-ui",
                  color: "#f1f5f9",
                  letterSpacing: "-1.5px",
                }}>
                  {value}
                </p>
                {subtitle && (
                  <p className="text-xs mt-1.5 leading-snug" style={{ color: "#475569" }}>{subtitle}</p>
                )}
              </div>

              {/* Icon */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: iconGradient, boxShadow: `0 4px 16px ${glowColor}` }}
              >
                <Icon className="h-5 w-5 text-white" strokeWidth={2.2} />
              </div>
            </div>

            {/* Sparkline */}
            <div className="mt-4 mb-2">
              <svg width="100%" height="28" viewBox="0 0 120 28" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`spark-grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isPositive === false ? "#ef4444" : "#10B981"} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={isPositive === false ? "#ef4444" : "#10B981"} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  points={sparkPoints(SPARKLINE_DATA, 120, 28)}
                  fill="none"
                  stroke={isPositive === false ? "#ef4444" : "#10B981"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polygon
                  points={`0,28 ${sparkPoints(SPARKLINE_DATA, 120, 28)} 120,28`}
                  fill={`url(#spark-grad-${index})`}
                />
              </svg>
            </div>

            {/* Trend */}
            <div className="flex items-center justify-between gap-2">
              {trend ? (
                <div
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-md"
                  style={
                    isPositive
                      ? { color: "#10B981", background: "rgba(16,185,129,0.12)" }
                      : { color: "#ef4444", background: "rgba(239,68,68,0.12)" }
                  }
                >
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[11px]" style={{ color: "#334155" }}>
                  <Minus className="h-3 w-3" /> No change
                </div>
              )}
            </div>

            {/* Progress bar */}
            {progress !== undefined && (
              <div className="mt-3">
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: iconGradient }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.07 + 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
