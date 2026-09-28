"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ShipmentFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search by code, client, carrier..."
          className="pl-10 h-10 bg-white border-slate-200 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-400 rounded-xl shadow-sm text-[13px] placeholder:text-slate-400"
        />
      </div>

      {/* Status filter */}
      <Select defaultValue="ALL">
        <SelectTrigger className="w-full sm:w-44 h-10 bg-white border-slate-200 rounded-xl shadow-sm text-[13px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="rounded-xl shadow-xl">
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
          <SelectItem value="CUSTOMS">Customs</SelectItem>
          <SelectItem value="DELIVERED">Delivered</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Date range */}
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-44 h-10 bg-white border-slate-200 rounded-xl shadow-sm text-[13px]">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent className="rounded-xl shadow-xl">
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
        </SelectContent>
      </Select>

      {/* Advanced filters */}
      <Button variant="outline" className="h-10 gap-2 bg-white border-slate-200 rounded-xl shadow-sm text-[13px] text-slate-600 hover:bg-slate-50 hover:border-slate-300">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </Button>
    </div>
  );
}
