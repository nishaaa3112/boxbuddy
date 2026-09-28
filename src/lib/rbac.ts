import type { UserRole } from "@/types";

type Permission =
  | "shipments:create"
  | "shipments:update"
  | "shipments:delete"
  | "shipments:view"
  | "documents:upload"
  | "documents:delete"
  | "documents:view"
  | "analytics:view"
  | "ai-risk:view"
  | "settings:manage"
  | "users:manage";

const rolePermissions: Record<UserRole, Permission[]> = {
  ADMIN: [
    "shipments:create",
    "shipments:update",
    "shipments:delete",
    "shipments:view",
    "documents:upload",
    "documents:delete",
    "documents:view",
    "analytics:view",
    "ai-risk:view",
    "settings:manage",
    "users:manage",
  ],
  OPERATIONS_MANAGER: [
    "shipments:create",
    "shipments:update",
    "shipments:view",
    "documents:upload",
    "documents:view",
    "analytics:view",
    "ai-risk:view",
  ],
  STAFF: ["shipments:view", "documents:upload", "documents:view"],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function canManageShipments(role: UserRole): boolean {
  return hasPermission(role, "shipments:create");
}

export function canViewAnalytics(role: UserRole): boolean {
  return hasPermission(role, "analytics:view");
}

export function canAccessAIRisk(role: UserRole): boolean {
  return hasPermission(role, "ai-risk:view");
}

export function canManageSettings(role: UserRole): boolean {
  return hasPermission(role, "settings:manage");
}

export function canDeleteDocuments(role: UserRole): boolean {
  return hasPermission(role, "documents:delete");
}
