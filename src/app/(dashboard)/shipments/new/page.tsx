import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShipmentForm } from "@/components/shipments/shipment-form";

export default function NewShipmentPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/shipments">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">New Shipment</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fill in the details below to create a new shipment record.
          </p>
        </div>
      </div>

      <ShipmentForm mode="create" />
    </div>
  );
}
