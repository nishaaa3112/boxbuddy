"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createShipmentSchema, type CreateShipmentFormValues } from "@/lib/validators/shipment";

const COUNTRIES = [
  "India", "USA", "China", "Germany", "UAE", "UK", "Japan", "Australia",
  "Canada", "Brazil", "Singapore", "South Korea", "France", "Italy",
  "Netherlands", "Spain", "Saudi Arabia", "Turkey", "Indonesia", "Mexico",
];

const CARRIERS = [
  "Maersk", "MSC", "CMA CGM", "Hapag-Lloyd", "Evergreen", "COSCO",
  "ONE", "Yang Ming", "HMM", "PIL", "DHL Freight", "FedEx Freight",
  "UPS Supply Chain", "Kuehne+Nagel", "DB Schenker",
];

const CURRENCIES = ["USD", "EUR", "INR", "GBP", "AED", "SGD", "JPY", "CAD", "AUD"];

const STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_TRANSIT", label: "In Transit" },
  { value: "CUSTOMS", label: "Customs" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

interface ShipmentFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<CreateShipmentFormValues & { status: string }>;
  shipmentId?: string;
}

export function ShipmentForm({ mode, defaultValues, shipmentId }: ShipmentFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createShipmentSchema),
    defaultValues: {
      clientName: defaultValues?.clientName ?? "",
      originCountry: defaultValues?.originCountry ?? "",
      destCountry: defaultValues?.destCountry ?? "",
      carrier: defaultValues?.carrier ?? "",
      containerNumber: defaultValues?.containerNumber ?? "",
      etd: defaultValues?.etd ?? "",
      eta: defaultValues?.eta ?? "",
      description: defaultValues?.description ?? "",
      currency: defaultValues?.currency ?? "USD",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    try {
      const url = mode === "create" ? "/api/shipments" : `/api/shipments/${shipmentId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to save shipment");
      }

      toast.success(mode === "create" ? "Shipment created!" : "Shipment updated!");
      router.push("/shipments");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const currency = watch("currency");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Client & Route */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Client & Route</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="clientName">Client Name <span className="text-red-500">*</span></Label>
            <Input
              id="clientName"
              placeholder="e.g. Apex Textiles Ltd."
              {...register("clientName")}
              className={errors.clientName ? "border-red-400" : ""}
            />
            {errors.clientName && <p className="text-xs text-red-500">{errors.clientName.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Origin Country <span className="text-red-500">*</span></Label>
              <Select
                defaultValue={defaultValues?.originCountry}
                onValueChange={(v) => v && setValue("originCountry", v)}
              >
                <SelectTrigger className={errors.originCountry ? "border-red-400" : ""}>
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.originCountry && <p className="text-xs text-red-500">{errors.originCountry.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Destination Country <span className="text-red-500">*</span></Label>
              <Select
                defaultValue={defaultValues?.destCountry}
                onValueChange={(v) => v && setValue("destCountry", v)}
              >
                <SelectTrigger className={errors.destCountry ? "border-red-400" : ""}>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.destCountry && <p className="text-xs text-red-500">{errors.destCountry.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carrier & Container */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Carrier & Container</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Carrier <span className="text-red-500">*</span></Label>
              <Select
                defaultValue={defaultValues?.carrier}
                onValueChange={(v) => v && setValue("carrier", v)}
              >
                <SelectTrigger className={errors.carrier ? "border-red-400" : ""}>
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  {CARRIERS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.carrier && <p className="text-xs text-red-500">{errors.carrier.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="containerNumber">Container Number</Label>
              <Input
                id="containerNumber"
                placeholder="e.g. MSKU1234567"
                {...register("containerNumber")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="etd">Estimated Departure (ETD) <span className="text-red-500">*</span></Label>
              <Input
                id="etd"
                type="date"
                {...register("etd")}
                className={errors.etd ? "border-red-400" : ""}
              />
              {errors.etd && <p className="text-xs text-red-500">{errors.etd.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="eta">Estimated Arrival (ETA) <span className="text-red-500">*</span></Label>
              <Input
                id="eta"
                type="date"
                {...register("eta")}
                className={errors.eta ? "border-red-400" : ""}
              />
              {errors.eta && <p className="text-xs text-red-500">{errors.eta.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cargo Details */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Cargo Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g. 18000"
                {...register("weight", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="volume">Volume (m³)</Label>
              <Input
                id="volume"
                type="number"
                step="0.1"
                placeholder="e.g. 33.2"
                {...register("volume", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="value">Declared Value</Label>
              <div className="flex gap-2">
                <Select
                  defaultValue={defaultValues?.currency ?? "USD"}
                  onValueChange={(v) => v && setValue("currency", v)}
                >
                  <SelectTrigger className="w-24 shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input
                  id="value"
                  type="number"
                  placeholder="e.g. 48000"
                  {...register("value", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of goods..."
              rows={3}
              {...register("description")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => router.push("/shipments")}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {mode === "create" ? "Create Shipment" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
