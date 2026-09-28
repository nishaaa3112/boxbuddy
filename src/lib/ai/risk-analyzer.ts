import type { RiskLevel } from "@/types";

interface ShipmentForAnalysis {
  id: string;
  shipmentCode: string;
  originCountry: string;
  destCountry: string;
  carrier: string;
  eta: Date;
  etd: Date;
  status: string;
  value?: number | null;
  documents: Array<{ type: string; name: string }>;
  timelineEvents: Array<{ eventType: string; occurredAt: Date }>;
}

interface RiskAnalysis {
  riskLevel: RiskLevel;
  riskScore: number;
  delayProbability: number;
  customsRisk: number;
  missingDocuments: string[];
  suggestions: string[];
  rawAnalysis: Record<string, unknown>;
}

const REQUIRED_DOCUMENTS: Record<string, string[]> = {
  default: ["INVOICE", "PACKING_LIST", "BILL_OF_LADING"],
  pharma: ["INVOICE", "PACKING_LIST", "BILL_OF_LADING", "CERTIFICATE"],
  food: ["INVOICE", "PACKING_LIST", "BILL_OF_LADING", "CERTIFICATE"],
};

const HIGH_RISK_ROUTES = [
  { origin: "China", dest: "USA" },
  { origin: "India", dest: "USA" },
  { origin: "Iran", dest: "*" },
];

const CONGESTED_PORTS: Record<string, number> = {
  UAE: 0.35,
  USA: 0.25,
  India: 0.2,
  Germany: 0.1,
};

export async function analyzeShipmentRisk(
  shipment: ShipmentForAnalysis
): Promise<RiskAnalysis> {
  let riskScore = 0;
  const factors: Record<string, unknown> = {};

  // 1. Missing documents check
  const requiredDocs = REQUIRED_DOCUMENTS.default;
  const uploadedTypes = shipment.documents.map((d) => d.type);
  const missingDocuments = requiredDocs
    .filter((req) => !uploadedTypes.includes(req))
    .map((doc) =>
      doc
        .split("_")
        .map((w) => w[0] + w.slice(1).toLowerCase())
        .join(" ")
    );

  if (missingDocuments.length > 0) {
    riskScore += missingDocuments.length * 15;
    factors.missingDocuments = missingDocuments.length;
  }

  // 2. ETA overdue check
  const now = new Date();
  const daysUntilETA = Math.ceil(
    (shipment.eta.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilETA < 0) {
    riskScore += Math.min(30, Math.abs(daysUntilETA) * 3);
    factors.overdueDays = Math.abs(daysUntilETA);
  } else if (daysUntilETA <= 3) {
    riskScore += 10;
  }

  // 3. High-risk route check
  const isHighRiskRoute = HIGH_RISK_ROUTES.some(
    (r) =>
      r.origin === shipment.originCountry &&
      (r.dest === "*" || r.dest === shipment.destCountry)
  );
  if (isHighRiskRoute) {
    riskScore += 20;
    factors.highRiskRoute = true;
  }

  // 4. Port congestion
  const congestionScore =
    (CONGESTED_PORTS[shipment.destCountry] ?? 0) * 100;
  riskScore += congestionScore * 0.2;
  factors.portCongestion = congestionScore;

  // 5. High cargo value
  if (shipment.value && shipment.value > 100000) {
    riskScore += 10;
    factors.highValue = true;
  }

  // Cap at 100
  riskScore = Math.min(100, Math.round(riskScore));

  // Determine risk level
  const riskLevel: RiskLevel =
    riskScore >= 70 ? "HIGH" : riskScore >= 40 ? "MEDIUM" : "LOW";

  // Delay probability
  const delayProbability = Math.min(
    0.95,
    (riskScore / 100) * 0.9 +
      (CONGESTED_PORTS[shipment.destCountry] ?? 0) * 0.1
  );

  // Customs risk
  const customsRisk = isHighRiskRoute
    ? Math.min(0.85, (riskScore / 100) * 0.8)
    : Math.min(0.5, (riskScore / 100) * 0.5);

  // Suggestions
  const suggestions: string[] = [];
  if (missingDocuments.length > 0) {
    suggestions.push(
      `Upload missing documents: ${missingDocuments.join(", ")}`
    );
  }
  if (daysUntilETA < 0) {
    suggestions.push("Coordinate with carrier to resolve overdue delivery");
  }
  if (isHighRiskRoute) {
    suggestions.push(
      "Pre-file customs documentation for expedited clearance"
    );
  }
  if (congestionScore > 20) {
    suggestions.push(
      `Port congestion detected at ${shipment.destCountry} — consider alternative routing`
    );
  }
  if (suggestions.length === 0) {
    suggestions.push("Shipment is on track — no immediate action required");
  }

  return {
    riskLevel,
    riskScore,
    delayProbability: Math.round(delayProbability * 100) / 100,
    customsRisk: Math.round(customsRisk * 100) / 100,
    missingDocuments,
    suggestions,
    rawAnalysis: factors,
  };
}
