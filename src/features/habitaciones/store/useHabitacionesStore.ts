import { create } from "zustand";
import api from "../../../api/api";
import type { Habitacion } from "../types/habitacion.interfaces";

type HabitacionesState = {
  habitaciones: Habitacion[];
  status: "idle" | "loading" | "error";
  errorMessage: string | null;
  fetchHabitaciones: (hotelId: number) => Promise<void>;
  createHabitacion: (hotelId: number, payload: Omit<Habitacion, "id">) => Promise<void>;
  updateHabitacion: (hotelId: number, id: number, payload: Partial<Habitacion>) => Promise<void>;
  deleteHabitacion: (hotelId: number, id: number) => Promise<void>;
};

export const useHabitacionesStore = create<HabitacionesState>((set) => ({
  habitaciones: [],
  status: "idle",
  errorMessage: null,

  // GET /hoteles/:hotelId/habitaciones
fetchHabitaciones: async (hotelId) => {
    set({ status: "loading" });
    try {
      const { data } = await api.get<any>(`/hoteles/${hotelId}/habitaciones`);
      const rawArr: any[] = data?.data?.data ?? [];
      const arr: Habitacion[] = rawArr.map(item => ({
        id: item.id,
        numero: item.numero ?? `${item.id}`,
        tipo: item.tipo_habitacion ? { id: item.tipo_habitacion.id, nombre: item.tipo_habitacion.nombre } : undefined,
        precio: item.precio,
        acomodacionId: item.acomodacion_id,
        cantidad: item.cantidad,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
      set({ habitaciones: arr, status: "idle", errorMessage: null });
      console.log('Fetched habitaciones:', arr);
    } catch (e) {
      console.error('API error fetching habitaciones:', e);
      set({
        status: "error",
        errorMessage: (e as any).message || "Error al cargar habitaciones",
      });
    }
  },

  // POST /hoteles/:hotelId/habitaciones
  createHabitacion: async (hotelId, payload) => {
    set({ status: "loading" });
    try {
      console.log('Creating habitacion payload:', payload);
      const { data } = await api.post<{ habitacion: Habitacion }>(`/hoteles/${hotelId}/habitaciones`, payload);
      if (data && data.habitacion) {
        set((s) => ({
          habitaciones: [...s.habitaciones, data.habitacion],
          status: "idle",
          errorMessage: null,
        }));
      } else {
        // Fallback: do not modify state if response is malformed
        set({ status: "idle", errorMessage: "Respuesta del servidor sin habitacion" });
      }
    } catch (e) {
      console.error('API error creating habitacion:', e);
      console.error('Status code:', (e as any)?.response?.status);
      console.error('Response data:', (e as any)?.response?.data);
      console.error('Validation errors:', (e as any)?.response?.data?.errors);
      set({
        status: "error",
        errorMessage: (e as any).message || "Error al crear habitación",
      });
    }
  },

  // PUT /hoteles/:hotelId/habitaciones/:habitacionId
  updateHabitacion: async (hotelId, id, payload) => {
    set({ status: "loading" });
    try {
      await api.put(`/hoteles/${hotelId}/habitaciones/${id}`, payload);
      set((s) => ({
        habitaciones: s.habitaciones.map((h) => (h.id === id ? { ...h, ...payload } : h)),
        status: "idle",
        errorMessage: null,
      }));
    } catch (e) {
      console.error('API error updating habitacion:', e);
      set({
        status: "error",
        errorMessage: (e as any).message || "Error al actualizar habitación",
      });
    }
  },

  // DELETE /hoteles/:hotelId/habitaciones/:habitacionId
  deleteHabitacion: async (hotelId, id) => {
    set({ status: "loading" });
    try {
      await api.delete(`/hoteles/${hotelId}/habitaciones/${id}`);
      set((s) => ({
        habitaciones: s.habitaciones.filter((h) => h.id !== id),
        status: "idle",
        errorMessage: null,
      }));
    } catch (e) {
      console.error('API error deleting habitacion:', e);
      set({
        status: "error",
        errorMessage: (e as any).message || "Error al eliminar habitación",
      });
    }
  },
}));
