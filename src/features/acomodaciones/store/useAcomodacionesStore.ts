import { create } from "zustand";
import api from "../../../api/api";
import type { Acomodacion } from "../types/acomodacion.interfaces";

type AcomodacionesState = {
  acomodaciones: Acomodacion[];
  status: "idle" | "loading" | "error";
  errorMessage: string | null;
  fetchAcomodaciones: () => Promise<void>;
  createAcomodacion: (payload: Omit<Acomodacion, "id">) => Promise<void>;
  updateAcomodacion: (id: number, payload: Partial<Acomodacion>) => Promise<void>;
  deleteAcomodacion: (id: number) => Promise<void>;
};

export const useAcomodacionesStore = create<AcomodacionesState>((set) => ({
  acomodaciones: [],
  status: "idle",
  errorMessage: null,

  fetchAcomodaciones: async () => {
    set({ status: "loading" });
    try {
      const { data } = await api.get<any>("/acomodaciones");
      const acomodacionesArray = Array.isArray(data?.data?.data) ? data?.data?.data : (Array.isArray(data?.data) ? data?.data : []);
      set({ acomodaciones: acomodacionesArray, status: "idle", errorMessage: null });
    } catch (e) {
      set({
        status: "error",
        errorMessage: (e as any).message || "Error al cargar acomodaciones",
      });
    }
  },

  createAcomodacion: async (payload) => {
    set({ status: "loading" });
    try {
      const { data } = await api.post<{ acomodacion: Acomodacion }>("/acomodaciones", payload);
      set((state) => ({
        acomodaciones: [...state.acomodaciones, data.acomodacion],
        status: "idle",
        errorMessage: null,
      }));
    } catch (e) {
      set({
        status: "error",
        errorMessage: (e as any).message || "Error al crear acomodación",
      });
    }
  },

  // UPDATE
  updateAcomodacion: async (id, payload) => {
    set({ status: "loading" });
    try {
      await api.put(`/acomodaciones/${id}`, payload);
      set((state) => ({
        acomodaciones: state.acomodaciones.map((a) => (a.id === id ? { ...a, ...payload } : a)),
        status: "idle",
        errorMessage: null,
      }));
    } catch (e) {
      set({
        status: "error",
        errorMessage: (e as any).message || "Error al actualizar acomodación",
      });
    }
  },

  // DELETE
  deleteAcomodacion: async (id) => {
    set({ status: "loading" });
    try {
      await api.delete(`/acomodaciones/${id}`);
      console.log("deleteAcomodacion completed");
      set((state) => ({
        acomodaciones: state.acomodaciones.filter((a) => a.id !== id),
        status: "idle",
        errorMessage: null,
      }));
    } catch (e) {
      set({
        status: "error",
        errorMessage: (e as any).message || "Error al eliminar acomodación",
      });
    }
  },
}));
