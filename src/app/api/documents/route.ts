import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const shipmentId = searchParams.get("shipmentId");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const documents = await prisma.document.findMany({
      where: {
        isLatest: true,
        ...(shipmentId ? { shipmentId } : {}),
        ...(type && type !== "ALL" ? { type: type as never } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        shipment: { select: { shipmentCode: true, clientName: true } },
        uploadedBy: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: documents });
  } catch (error) {
    console.error("[GET /api/documents]", error);
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

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const shipmentId = formData.get("shipmentId") as string;
    const type = formData.get("type") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;

    if (!file || !shipmentId || !type || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload to Supabase Storage
    const fileExt = file.name.split(".").pop();
    const filePath = `documents/${shipmentId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("boxbuddy-documents")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: publicUrl } = supabase.storage
      .from("boxbuddy-documents")
      .getPublicUrl(filePath);

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mark older versions
    await prisma.document.updateMany({
      where: { shipmentId, type: type as never, isLatest: true },
      data: { isLatest: false },
    });

    // Get current version count
    const versionCount = await prisma.document.count({
      where: { shipmentId, type: type as never },
    });

    const document = await prisma.document.create({
      data: {
        name,
        type: type as never,
        fileUrl: publicUrl.publicUrl,
        filePath,
        fileSize: file.size,
        mimeType: file.type,
        version: versionCount + 1,
        isLatest: true,
        description,
        shipmentId,
        uploadedById: dbUser.id,
      },
    });

    return NextResponse.json({ data: document }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/documents]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
