import { create } from "zustand";
import type { Shipment, ShipmentStatus } from "@/types";

interface ShipmentFilters {
  status?: ShipmentStatus | "ALL";
  search?: string;
  page: number;
  pageSize: number;
}

interface ShipmentState {
  shipments: Shipment[];
  selectedShipment: Shipment | null;
  filters: ShipmentFilters;
  total: number;
  isLoading: boolean;

  setShipments: (shipments: Shipment[], total: number) => void;
  setSelectedShipment: (shipment: Shipment | null) => void;
  updateFilter: (filters: Partial<ShipmentFilters>) => void;
  setLoading: (loading: boolean) => void;
  addShipment: (shipment: Shipment) => void;
  updateShipment: (id: string, data: Partial<Shipment>) => void;
  removeShipment: (id: string) => void;
}

export const useShipmentStore = create<ShipmentState>((set) => ({
  shipments: [],
  selectedShipment: null,
  total: 0,
  isLoading: false,
  filters: {
    status: "ALL",
    search: "",
    page: 1,
    pageSize: 10,
  },

  setShipments: (shipments, total) => set({ shipments, total }),
  setSelectedShipment: (selectedShipment) => set({ selectedShipment }),
  updateFilter: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters, page: 1 } })),
  setLoading: (isLoading) => set({ isLoading }),
  addShipment: (shipment) =>
    set((state) => ({
      shipments: [shipment, ...state.shipments],
      total: state.total + 1,
    })),
  updateShipment: (id, data) =>
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.id === id ? { ...s, ...data } : s
      ),
      selectedShipment:
        state.selectedShipment?.id === id
          ? { ...state.selectedShipment, ...data }
          : state.selectedShipment,
    })),
  removeShipment: (id) =>
    set((state) => ({
      shipments: state.shipments.filter((s) => s.id !== id),
      total: state.total - 1,
    })),
}));
