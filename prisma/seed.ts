import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding BoxBuddy database…");

  /* ── 1. Users ─────────────────────────────────────────────── */
  const admin = await prisma.user.upsert({
    where: { email: "admin@boxbuddy.trade" },
    update: {},
    create: {
      email:  "admin@boxbuddy.trade",
      name:   "Neelu Suthar",
      role:   "ADMIN",
    },
  });

  const ops = await prisma.user.upsert({
    where: { email: "ops@boxbuddy.trade" },
    update: {},
    create: {
      email: "ops@boxbuddy.trade",
      name:  "Ravi Mehta",
      role:  "OPERATIONS_MANAGER",
    },
  });

  console.log("✅ Users created:", admin.name, ops.name);

  /* ── 2. Shipments ─────────────────────────────────────────── */
  const shipments = [
    {
      shipmentCode:    "SH-2847",
      clientName:      "Tata Steel Ltd",
      originCountry:   "India",
      destCountry:     "United Arab Emirates",
      carrier:         "Maersk",
      containerNumber: "MSKU4820934",
      etd:             new Date("2025-07-03"),
      eta:             new Date("2025-07-15"),
      status:          "IN_TRANSIT" as const,
      description:     "Steel coils and structural sections",
      weight:          24500,
      volume:          86.4,
      value:           480000,
      currency:        "USD",
      createdById:     admin.id,
    },
    {
      shipmentCode:    "SH-2846",
      clientName:      "Reliance Exports",
      originCountry:   "China",
      destCountry:     "India",
      carrier:         "MSC",
      containerNumber: "MSCU8341092",
      etd:             new Date("2025-07-01"),
      eta:             new Date("2025-07-18"),
      status:          "CUSTOMS" as const,
      description:     "Polyester textile machinery components",
      weight:          8200,
      volume:          32.5,
      value:           220000,
      currency:        "USD",
      createdById:     ops.id,
    },
    {
      shipmentCode:    "SH-2845",
      clientName:      "Adani Logistics",
      originCountry:   "India",
      destCountry:     "Germany",
      carrier:         "Hapag-Lloyd",
      containerNumber: "HLXU3029847",
      etd:             new Date("2025-06-20"),
      eta:             new Date("2025-07-08"),
      status:          "DELIVERED" as const,
      description:     "Pharmaceutical API bulk chemicals",
      weight:          3400,
      volume:          12.8,
      value:           950000,
      currency:        "USD",
      createdById:     admin.id,
    },
    {
      shipmentCode:    "SH-2844",
      clientName:      "JSW Steel",
      originCountry:   "India",
      destCountry:     "United States",
      carrier:         "CMA CGM",
      containerNumber: "CMAU5512038",
      etd:             new Date("2025-07-10"),
      eta:             new Date("2025-08-02"),
      status:          "PENDING" as const,
      description:     "Hot-rolled steel coils",
      weight:          18700,
      volume:          64.2,
      value:           310000,
      currency:        "USD",
      createdById:     ops.id,
    },
    {
      shipmentCode:    "SH-2843",
      clientName:      "Infosys BPO",
      originCountry:   "Singapore",
      destCountry:     "Australia",
      carrier:         "Evergreen",
      containerNumber: "EGLV4290183",
      etd:             new Date("2025-07-05"),
      eta:             new Date("2025-07-20"),
      status:          "IN_TRANSIT" as const,
      description:     "Server hardware and networking equipment",
      weight:          1280,
      volume:          8.6,
      value:           680000,
      currency:        "USD",
      createdById:     admin.id,
    },
    {
      shipmentCode:    "SH-2842",
      clientName:      "Bajaj Auto",
      originCountry:   "India",
      destCountry:     "Nigeria",
      carrier:         "COSCO",
      containerNumber: "COSU8401729",
      etd:             new Date("2025-06-28"),
      eta:             new Date("2025-07-22"),
      status:          "IN_TRANSIT" as const,
      description:     "Motorcycles and spare parts",
      weight:          9800,
      volume:          68.4,
      value:           560000,
      currency:        "USD",
      createdById:     ops.id,
    },
  ];

  for (const s of shipments) {
    const created = await prisma.shipment.upsert({
      where:  { shipmentCode: s.shipmentCode },
      update: { status: s.status },
      create: s,
    });

    /* ── timeline events ──────────────────────────────────── */
    if (s.status !== "PENDING") {
      await prisma.timelineEvent.upsert({
        where:  { id: `te-${s.shipmentCode}-created` },
        update: {},
        create: {
          id:          `te-${s.shipmentCode}-created`,
          shipmentId:  created.id,
          eventType:   "CREATED",
          title:       "Shipment Created",
          description: `Shipment ${s.shipmentCode} created and registered in BoxBuddy`,
          occurredAt:  new Date(s.etd.getTime() - 2 * 24 * 60 * 60 * 1000),
        },
      });

      await prisma.timelineEvent.upsert({
        where:  { id: `te-${s.shipmentCode}-pickup` },
        update: {},
        create: {
          id:          `te-${s.shipmentCode}-pickup`,
          shipmentId:  created.id,
          eventType:   "PICKED_UP",
          title:       "Cargo Picked Up",
          description: `Cargo collected from ${s.originCountry} warehouse`,
          location:    s.originCountry,
          occurredAt:  new Date(s.etd.getTime() - 1 * 24 * 60 * 60 * 1000),
        },
      });

      await prisma.timelineEvent.upsert({
        where:  { id: `te-${s.shipmentCode}-transit` },
        update: {},
        create: {
          id:          `te-${s.shipmentCode}-transit`,
          shipmentId:  created.id,
          eventType:   "IN_TRANSIT",
          title:       "Departed Port",
          description: `Vessel departed port of origin`,
          location:    `Port of ${s.originCountry}`,
          occurredAt:  s.etd,
        },
      });
    }

    if (s.status === "DELIVERED") {
      await prisma.timelineEvent.upsert({
        where:  { id: `te-${s.shipmentCode}-delivered` },
        update: {},
        create: {
          id:          `te-${s.shipmentCode}-delivered`,
          shipmentId:  created.id,
          eventType:   "DELIVERED",
          title:       "Delivered",
          description: `Cargo successfully delivered to ${s.destCountry}`,
          location:    s.destCountry,
          occurredAt:  s.eta,
        },
      });
    }

    if (s.status === "CUSTOMS") {
      await prisma.timelineEvent.upsert({
        where:  { id: `te-${s.shipmentCode}-customs` },
        update: {},
        create: {
          id:          `te-${s.shipmentCode}-customs`,
          shipmentId:  created.id,
          eventType:   "CUSTOMS_CLEARANCE",
          title:       "Customs Clearance",
          description: "Shipment under customs inspection at destination port",
          location:    `Port of ${s.destCountry}`,
          occurredAt:  new Date(),
        },
      });
    }

    /* ── AI risk reports ──────────────────────────────────── */
    const riskScores: Record<string, { score: number; level: "LOW"|"MEDIUM"|"HIGH"; delay: number; customs: number; missing: string[]; suggestions: string[] }> = {
      "SH-2847": { score: 82, level: "HIGH",   delay: 0.78, customs: 0.71, missing: ["Bill of Lading"], suggestions: ["Upload Bill of Lading immediately","Consider routing insurance for high-value cargo","Verify UAE customs HS codes for steel coils"] },
      "SH-2846": { score: 45, level: "MEDIUM", delay: 0.42, customs: 0.38, missing: [],                 suggestions: ["Ensure CE marking documentation for machinery","Monitor customs queue at JNPT"] },
      "SH-2845": { score: 12, level: "LOW",    delay: 0.10, customs: 0.08, missing: [],                 suggestions: ["All documents in order — maintain records for 7 years"] },
      "SH-2844": { score: 38, level: "MEDIUM", delay: 0.35, customs: 0.29, missing: ["Certificate of Origin"], suggestions: ["Upload certificate of origin before ETD","US Section 232 tariff applies — verify duty rate"] },
      "SH-2843": { score: 22, level: "LOW",    delay: 0.18, customs: 0.15, missing: [],                 suggestions: ["Dual-use export license check recommended for server hardware"] },
      "SH-2842": { score: 64, level: "HIGH",   delay: 0.61, customs: 0.58, missing: ["Packing List"],  suggestions: ["Nigeria requires NAFDAC clearance for certain parts","Ensure NEPC export certificate is ready"] },
    };

    const rs = riskScores[s.shipmentCode];
    if (rs) {
      await prisma.riskReport.upsert({
        where:  { id: `rr-${s.shipmentCode}` },
        update: {},
        create: {
          id:               `rr-${s.shipmentCode}`,
          shipmentId:       created.id,
          generatedById:    admin.id,
          riskLevel:        rs.level,
          riskScore:        rs.score,
          delayProbability: rs.delay,
          customsRisk:      rs.customs,
          missingDocuments: rs.missing,
          suggestions:      rs.suggestions,
        },
      });
    }
  }

  console.log(`✅ Seeded ${shipments.length} shipments with timeline events and risk reports`);

  /* ── 3. Activities ────────────────────────────────────────── */
  const allShipments = await prisma.shipment.findMany({ take: 3 });
  for (const s of allShipments) {
    await prisma.activity.create({
      data: {
        userId:      admin.id,
        shipmentId:  s.id,
        action:      "CREATED",
        entityType:  "SHIPMENT",
        entityId:    s.id,
        description: `Created shipment ${s.shipmentCode}`,
      },
    });
  }

  console.log("✅ Activities logged");
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
