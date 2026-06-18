import { create } from "zustand";
import api from "../../../api/api";
import type { TipoHabitacion } from "../types/tipoHabitacion.interfaces";

type TiposHabitacionState = {
  tiposHabitacion: TipoHabitacion[];
  status: "idle" | "loading" | "error";
  errorMessage: string | null;
  fetchTiposHabitacion: () => Promise<void>;
  createTipoHabitacion: (payload: Omit<TipoHabitacion, "id">) => Promise<void>;
  updateTipoHabitacion: (id: number, payload: Partial<TipoHabitacion>) => Promise<void>;
  deleteTipoHabitacion: (id: number) => Promise<void>;
};

export const useTiposHabitacionStore = create<TiposHabitacionState>((set) => ({
  tiposHabitacion: [],
  status: "idle",
  errorMessage: null,

  fetchTiposHabitacion: async () => {
    set({ status: "loading" });
    try {
      const response = await api.get<any>("/tipos-habitacion");
      const tiposArray: TipoHabitacion[] = response.data?.data?.data ?? [];
      set({ tiposHabitacion: tiposArray, status: "idle", errorMessage: null });
    } catch (e) {
      set({ status: "error", errorMessage: (e as any).message || "Error al cargar tipos de habitación" });
    }
  },

  createTipoHabitacion: async (payload) => {
    set({ status: "loading" });
    try {
      const { data } = await api.post<{ tipoHabitacion: TipoHabitacion }>("/tipos-habitacion", payload);
      set((state) => ({
        tiposHabitacion: [...state.tiposHabitacion, data.tipoHabitacion],
        status: "idle",
        errorMessage: null,
      }));
    } catch (e) {
      set({ status: "error", errorMessage: (e as any).message || "Error al crear tipo de habitación" });
    }
  },

  updateTipoHabitacion: async (id, payload) => {
    set({ status: "loading" });
    try {
      await api.put(`/tipos-habitacion/${id}`, payload);
      set((state) => ({
        tiposHabitacion: state.tiposHabitacion.map((t) => (t.id === id ? { ...t, ...payload } : t)),
        status: "idle",
        errorMessage: null,
      }));
    } catch (e) {
      set({ status: "error", errorMessage: (e as any).message || "Error al actualizar tipo de habitación" });
    }
  },

  deleteTipoHabitacion: async (id) => {
    set({ status: "loading" });
    try {
      await api.delete(`/tipos-habitacion/${id}`);
      set((state) => ({
        tiposHabitacion: state.tiposHabitacion.filter((t) => t.id !== id),
        status: "idle",
        errorMessage: null,
      }));
    } catch (e) {
      set({ status: "error", errorMessage: (e as any).message || "Error al eliminar tipo de habitación" });
    }
  },
}));
