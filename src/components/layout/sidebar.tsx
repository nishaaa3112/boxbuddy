"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  BarChart3,
  Brain,
  Settings,
  Anchor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { canViewAnalytics, canAccessAIRisk, canManageSettings } from "@/lib/rbac";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard, permission: null },
  { href: "/shipments",  label: "Shipments",  icon: Package,          permission: null },
  { href: "/documents",  label: "Documents",  icon: FileText,         permission: null },
  { href: "/analytics",  label: "Analytics",  icon: BarChart3,        permission: "analytics" },
  { href: "/ai-risk",    label: "AI Risk",    icon: Brain,            permission: "ai-risk" },
  { href: "/settings",   label: "Settings",   icon: Settings,         permission: "settings" },
];

export function Sidebar() {
  const pathname  = usePathname();
  const { user }  = useAuthStore();

  const isVisible = (permission: string | null) => {
    if (!permission || !user) return true;
    if (permission === "analytics") return canViewAnalytics(user.role);
    if (permission === "ai-risk")   return canAccessAIRisk(user.role);
    if (permission === "settings")  return canManageSettings(user.role);
    return true;
  };

  return (
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-16 flex flex-col"
      style={{ background: "linear-gradient(180deg, #0c1e3d 0%, #0f2342 60%, #0a1e38 100%)" }}
    >
      {/* subtle glow border on right */}
      <div
        className="absolute inset-y-0 right-0 w-px"
        style={{ background: "linear-gradient(180deg, transparent 10%, rgba(16,185,129,0.35) 50%, transparent 90%)" }}
      />

      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-white/5">
        <Tooltip>
          <TooltipTrigger>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl cursor-pointer"
              style={{ background: "linear-gradient(135deg, #059669 0%, #10B981 100%)", boxShadow: "0 4px 14px rgba(16,185,129,0.4)" }}
            >
              <Anchor className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-bold text-sm">BoxBuddy</TooltipContent>
        </Tooltip>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2.5 flex flex-col gap-1">
        {navItems.map((item) => {
          if (!isVisible(item.permission)) return null;

          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger className="w-full">
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center justify-center h-10 w-10 mx-auto rounded-xl transition-all duration-200",
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/80 hover:bg-white/6"
                  )}
                  style={
                    isActive
                      ? { background: "linear-gradient(135deg, #059669 0%, #10B981 100%)", boxShadow: "0 4px 12px rgba(16,185,129,0.35)" }
                      : {}
                  }
                >
                  {/* active indicator bar */}
                  {isActive && (
                    <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-emerald-400" />
                  )}
                  <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.2 : 1.8} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* separator */}
      <div className="mx-3 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* User avatar */}
      {user && (
        <div className="p-2.5">
          <Tooltip>
            <TooltipTrigger className="w-full">
              <div
                className="flex h-10 w-10 mx-auto items-center justify-center rounded-xl border border-white/10 transition-colors cursor-pointer"
                style={{ background: "rgba(255,255,255,0.06)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              >
                <span className="text-[11px] font-bold text-emerald-400 tracking-wide">
                  {user.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "BB"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="space-y-0.5">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.role?.toLowerCase().replace(/_/g, " ")}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </aside>
  );
}
