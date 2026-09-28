import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { analyzeShipmentRisk } from "@/lib/ai/risk-analyzer";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { shipmentId } = await request.json();
    if (!shipmentId) {
      return NextResponse.json({ error: "shipmentId is required" }, { status: 400 });
    }

    const shipment = await prisma.shipment.findUnique({
      where: { id: shipmentId },
      include: {
        documents: { where: { isLatest: true } },
        timelineEvents: { orderBy: { occurredAt: "asc" } },
      },
    });

    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    const analysis = await analyzeShipmentRisk(shipment);

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });

    const report = await prisma.riskReport.create({
      data: {
        shipmentId: shipment.id,
        riskLevel: analysis.riskLevel,
        riskScore: analysis.riskScore,
        delayProbability: analysis.delayProbability,
        customsRisk: analysis.customsRisk,
        missingDocuments: analysis.missingDocuments,
        suggestions: analysis.suggestions,
        rawAnalysis: analysis.rawAnalysis as never,
        generatedById: dbUser?.id,
      },
    });

    return NextResponse.json({ data: report });
  } catch (error) {
    console.error("[POST /api/ai-risk]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const shipmentId = searchParams.get("shipmentId");

    const reports = await prisma.riskReport.findMany({
      where: shipmentId ? { shipmentId } : {},
      include: {
        shipment: {
          select: {
            shipmentCode: true,
            clientName: true,
            status: true,
            eta: true,
          },
        },
      },
      orderBy: { generatedAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ data: reports });
  } catch (error) {
    console.error("[GET /api/ai-risk]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
