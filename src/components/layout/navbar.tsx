"use client";

import { Bell, Search, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth.store";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    clearUser();
    router.push("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "BB";

  const roleLabel: Record<string, string> = {
    ADMIN: "Administrator",
    OPERATIONS_MANAGER: "Ops Manager",
    STAFF: "Staff",
  };

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-4 px-6"
      style={{
        background: "rgba(8,15,29,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <Input
            placeholder="Search shipments, documents..."
            className="pl-9 h-9 text-sm placeholder:text-slate-600 transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl transition-colors"
            style={{ color: "#64748b" }}
          >
            <Bell className="h-[18px] w-[18px]" />
          </Button>
          <span
            className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}
          >
            3
          </span>
        </div>

        <div className="h-6 w-px mx-1" style={{ background: "rgba(255,255,255,0.07)" }} />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 h-10 px-2.5 rounded-xl outline-none transition-colors cursor-pointer"
            style={{ background: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src={user?.avatarUrl ?? undefined} />
              <AvatarFallback
                className="text-white text-[11px] font-bold"
                style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-[13px] font-semibold leading-none" style={{ color: "#e2e8f0" }}>
                {user?.name ?? "User"}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "#64748b" }}>
                {roleLabel[user?.role ?? "STAFF"] ?? "Staff"}
              </p>
            </div>
            <ChevronDown className="hidden md:block h-3.5 w-3.5" style={{ color: "#475569" }} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-60"
            style={{ background: "#0d1626", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
          >
            <div className="px-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{user?.name}</p>
                  <p className="text-xs truncate max-w-[160px]" style={{ color: "#64748b" }}>{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="py-1">
              <DropdownMenuItem className="cursor-pointer" style={{ color: "#94a3b8" }}>
                <User className="h-4 w-4 mr-2" style={{ color: "#64748b" }} />
                Profile settings
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="py-1">
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer"
                style={{ color: "#f87171" }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
