import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShipmentForm } from "@/components/shipments/shipment-form";
import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export default async function EditShipmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let shipment = null;
  if (user) {
    shipment = await prisma.shipment.findUnique({ where: { id } });
  }

  if (!shipment) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/shipments/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Edit {shipment.shipmentCode}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Update shipment details for {shipment.clientName}.
          </p>
        </div>
      </div>

      <ShipmentForm
        mode="edit"
        shipmentId={id}
        defaultValues={{
          clientName: shipment.clientName,
          originCountry: shipment.originCountry,
          destCountry: shipment.destCountry,
          carrier: shipment.carrier,
          containerNumber: shipment.containerNumber ?? "",
          etd: format(new Date(shipment.etd), "yyyy-MM-dd"),
          eta: format(new Date(shipment.eta), "yyyy-MM-dd"),
          description: shipment.description ?? "",
          weight: shipment.weight ?? undefined,
          volume: shipment.volume ?? undefined,
          value: shipment.value ?? undefined,
          currency: shipment.currency ?? "USD",
          status: shipment.status,
        }}
      />
    </div>
  );
}
