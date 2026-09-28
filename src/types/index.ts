export type UserRole = "ADMIN" | "OPERATIONS_MANAGER" | "STAFF";

export type ShipmentStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "CUSTOMS"
  | "DELIVERED"
  | "CANCELLED";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type DocumentType =
  | "INVOICE"
  | "PACKING_LIST"
  | "BILL_OF_LADING"
  | "CERTIFICATE"
  | "OTHER";

export type TimelineEventType =
  | "CREATED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "CUSTOMS_CLEARANCE"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "EXCEPTION";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Shipment {
  id: string;
  shipmentCode: string;
  clientName: string;
  originCountry: string;
  destCountry: string;
  carrier: string;
  containerNumber?: string | null;
  etd: string;
  eta: string;
  status: ShipmentStatus;
  description?: string | null;
  weight?: number | null;
  volume?: number | null;
  value?: number | null;
  currency: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy?: User;
  documents?: Document[];
  timelineEvents?: TimelineEvent[];
  riskReports?: RiskReport[];
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  version: number;
  isLatest: boolean;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  shipmentId: string;
  shipment?: Shipment;
  uploadedById: string;
  uploadedBy?: User;
  parentId?: string | null;
  versions?: Document[];
}

export interface TimelineEvent {
  id: string;
  eventType: TimelineEventType;
  title: string;
  description?: string | null;
  location?: string | null;
  occurredAt: string;
  createdAt: string;
  shipmentId: string;
}

export interface RiskReport {
  id: string;
  riskLevel: RiskLevel;
  riskScore: number;
  delayProbability: number;
  customsRisk: number;
  missingDocuments: string[];
  suggestions: string[];
  rawAnalysis?: Record<string, unknown> | null;
  generatedAt: string;
  shipmentId: string;
  shipment?: Shipment;
  generatedById?: string | null;
  generatedBy?: User | null;
}

export interface Activity {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  description?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  userId: string;
  user?: User;
  shipmentId?: string | null;
  shipment?: Shipment | null;
}

// ─── Dashboard KPIs ──────────────────────────────────────────────

export interface DashboardKPIs {
  totalShipments: number;
  activeShipments: number;
  delayedShipments: number;
  deliveredThisMonth: number;
  highRiskShipments: number;
  pendingDocuments: number;
}

// ─── API Response wrapper ─────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Form types ───────────────────────────────────────────────────

export interface CreateShipmentInput {
  clientName: string;
  originCountry: string;
  destCountry: string;
  carrier: string;
  containerNumber?: string;
  etd: string;
  eta: string;
  description?: string;
  weight?: number;
  volume?: number;
  value?: number;
  currency?: string;
}

export interface UpdateShipmentInput extends Partial<CreateShipmentInput> {
  status?: ShipmentStatus;
}

export interface UploadDocumentInput {
  name: string;
  type: DocumentType;
  shipmentId: string;
  description?: string;
  file: File;
}
