import { z } from "zod";

export const createShipmentSchema = z.object({
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  originCountry: z.string().min(2, "Origin country is required"),
  destCountry: z.string().min(2, "Destination country is required"),
  carrier: z.string().min(2, "Carrier is required"),
  containerNumber: z.string().optional(),
  etd: z.string().min(1, "ETD is required"),
  eta: z.string().min(1, "ETA is required"),
  description: z.string().optional(),
  weight: z.coerce.number().positive().optional(),
  volume: z.coerce.number().positive().optional(),
  value: z.coerce.number().positive().optional(),
  currency: z.string().default("USD"),
});

export const updateShipmentSchema = createShipmentSchema.partial().extend({
  status: z
    .enum(["PENDING", "IN_TRANSIT", "CUSTOMS", "DELIVERED", "CANCELLED"])
    .optional(),
});

export type CreateShipmentFormValues = z.infer<typeof createShipmentSchema>;
export type UpdateShipmentFormValues = z.infer<typeof updateShipmentSchema>;
