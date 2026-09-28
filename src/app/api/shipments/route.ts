import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { createShipmentSchema } from "@/lib/validators/shipment";
import { generateShipmentCode } from "@/lib/utils/shipment";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? "10");

    const where = {
      ...(status && status !== "ALL" ? { status: status as never } : {}),
      ...(search
        ? {
            OR: [
              { shipmentCode: { contains: search, mode: "insensitive" as const } },
              { clientName: { contains: search, mode: "insensitive" as const } },
              { carrier: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [shipments, total] = await Promise.all([
      prisma.shipment.findMany({
        where,
        include: { createdBy: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.shipment.count({ where }),
    ]);

    return NextResponse.json({
      data: shipments,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("[GET /api/shipments]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createShipmentSchema.safeParse(body);
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

    const shipment = await prisma.shipment.create({
      data: {
        ...parsed.data,
        shipmentCode: generateShipmentCode(),
        etd: new Date(parsed.data.etd),
        eta: new Date(parsed.data.eta),
        createdById: dbUser.id,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        action: "created",
        entityType: "shipment",
        entityId: shipment.id,
        description: `Created shipment ${shipment.shipmentCode}`,
        userId: dbUser.id,
        shipmentId: shipment.id,
      },
    });

    return NextResponse.json({ data: shipment }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/shipments]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
