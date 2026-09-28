import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { updateShipmentSchema } from "@/lib/validators/shipment";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const shipment = await prisma.shipment.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        documents: { where: { isLatest: true }, orderBy: { createdAt: "desc" } },
        timelineEvents: { orderBy: { occurredAt: "asc" } },
        riskReports: { orderBy: { generatedAt: "desc" }, take: 1 },
      },
    });

    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    return NextResponse.json({ data: shipment });
  } catch (error) {
    console.error("[GET /api/shipments/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateShipmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = { ...parsed.data };
    if (parsed.data.etd) updateData.etd = new Date(parsed.data.etd);
    if (parsed.data.eta) updateData.eta = new Date(parsed.data.eta);

    const shipment = await prisma.shipment.update({
      where: { id },
      data: updateData,
    });

    await prisma.activity.create({
      data: {
        action: "updated",
        entityType: "shipment",
        entityId: shipment.id,
        description: `Updated shipment ${shipment.shipmentCode}`,
        userId: dbUser.id,
        shipmentId: shipment.id,
      },
    });

    return NextResponse.json({ data: shipment });
  } catch (error) {
    console.error("[PATCH /api/shipments/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser || dbUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.shipment.delete({ where: { id } });

    return NextResponse.json({ message: "Shipment deleted" });
  } catch (error) {
    console.error("[DELETE /api/shipments/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
