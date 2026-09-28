import { ArrowLeft, Edit, Brain, MapPin, Weight, Boxes, DollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/shared/status-badge";
import { ShipmentTimeline } from "@/components/shipments/shipment-timeline";
import { ShipmentDocuments } from "@/components/shipments/shipment-documents";
import { format } from "date-fns";

const mockShipment = {
  id: "1",
  shipmentCode: "BB24-100234",
  clientName: "Apex Textiles Ltd.",
  originCountry: "India",
  destCountry: "UAE",
  carrier: "Maersk",
  containerNumber: "MSKU1234567",
  etd: "2024-06-25",
  eta: "2024-07-15",
  status: "IN_TRANSIT" as const,
  description: "Cotton textile goods, 20ft container",
  weight: 18000,
  volume: 33.2,
  value: 48000,
  currency: "USD",
  createdAt: "2024-06-20",
};

const FLAGS: Record<string, string> = {
  India: "🇮🇳", USA: "🇺🇸", China: "🇨🇳", Germany: "🇩🇪",
  UAE: "🇦🇪", UK: "🇬🇧", Japan: "🇯🇵", Brazil: "🇧🇷",
};

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = mockShipment;

  return (
    <div className="space-y-6">

      {/* ── Hero header ─────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden p-6"
        style={{ background: "linear-gradient(135deg,#0c1e3d 0%,#0f2342 60%,#0a2e1e 100%)", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* decorative glow */}
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle,#10B981,transparent 70%)" }} />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-start gap-3">
            <Button asChild variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl shrink-0 mt-0.5">
              <Link href="/shipments">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-white tracking-tight">{s.shipmentCode}</h1>
                <StatusBadge status={s.status} />
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-slate-400 text-sm">
                <span className="font-medium text-white/80">{s.clientName}</span>
                <span className="text-white/20">·</span>
                <span>{FLAGS[s.originCountry] ?? "🌐"} {s.originCountry}</span>
                <span className="text-white/30">→</span>
                <span>{FLAGS[s.destCountry] ?? "🌐"} {s.destCountry}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">via {s.carrier} · Container {s.containerNumber}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:shrink-0">
            <Button
              asChild
              variant="ghost"
              className="h-9 text-white/70 hover:text-white hover:bg-white/10 border border-white/10 rounded-xl text-xs gap-1.5"
            >
              <Link href={`/ai-risk?shipment=${id}`}>
                <Brain className="h-3.5 w-3.5" />
                AI Risk Check
              </Link>
            </Button>
            <Button
              asChild
              className="h-9 text-white rounded-xl text-xs gap-1.5 shadow-emerald"
              style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}
            >
              <Link href={`/shipments/${id}/edit`}>
                <Edit className="h-3.5 w-3.5" />
                Edit
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Quick metrics ───────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: MapPin,      label: "Route",         value: `${s.originCountry} → ${s.destCountry}`,               gradient: "linear-gradient(135deg,#0F2342,#1a4a8a)" },
          { icon: Weight,      label: "Weight",        value: `${s.weight?.toLocaleString()} kg`,                     gradient: "linear-gradient(135deg,#7c3aed,#8b5cf6)" },
          { icon: Boxes,       label: "Volume",        value: `${s.volume} m³`,                                       gradient: "linear-gradient(135deg,#0891b2,#06b6d4)" },
          { icon: DollarSign,  label: "Declared Value",value: `${s.currency} ${s.value?.toLocaleString()}`,           gradient: "linear-gradient(135deg,#059669,#10B981)" },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-white rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05)" }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: m.gradient }}>
                <Icon className="h-4 w-4 text-white" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">{m.label}</p>
                <p className="text-[13px] font-bold text-slate-900 truncate">{m.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Details + Documents */}
        <div className="xl:col-span-2 space-y-6">
          {/* Details card */}
          <div
            className="rounded-2xl bg-white"
            style={{ border: "1px solid rgba(15,35,66,0.07)", boxShadow: "0 1px 3px rgba(15,35,66,0.05),0 4px 16px rgba(15,35,66,0.05)" }}
          >
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-[14px] font-bold text-slate-900">Shipment Details</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Full cargo and logistics information</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                {[
                  { label: "Origin Country",   value: `${FLAGS[s.originCountry] ?? ""} ${s.originCountry}` },
                  { label: "Destination",      value: `${FLAGS[s.destCountry] ?? ""} ${s.destCountry}` },
                  { label: "Carrier",          value: s.carrier },
                  { label: "Container No.",    value: s.containerNumber },
                  { label: "ETD",              value: format(new Date(s.etd), "MMMM d, yyyy") },
                  { label: "ETA",              value: format(new Date(s.eta), "MMMM d, yyyy") },
                  { label: "Weight",           value: `${s.weight?.toLocaleString()} kg` },
                  { label: "Volume",           value: `${s.volume} m³` },
                  { label: "Declared Value",   value: `${s.currency} ${s.value?.toLocaleString()}` },
                  { label: "Created",          value: format(new Date(s.createdAt), "MMMM d, yyyy") },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{row.label}</p>
                    <p className="text-[13px] font-semibold text-slate-800">{row.value ?? "—"}</p>
                  </div>
                ))}
              </div>
              {s.description && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Description</p>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{s.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Documents */}
          <ShipmentDocuments shipmentId={id} />
        </div>

        {/* Timeline */}
        <div>
          <ShipmentTimeline status={s.status} />
        </div>
      </div>
    </div>
  );
}
