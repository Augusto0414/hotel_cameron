import { create } from 'zustand';
import api from '../../../api/api';
import type { Hotel } from '../types/hotel.interfaces';

type HotelsState = {
  hotels: Hotel[];
  status: 'idle' | 'loading' | 'error';
  errorMessage: string | null;
  fetchHotels: () => Promise<void>;
  createHotel: (payload: Omit<Hotel, 'id'>) => Promise<void>;
  updateHotel: (id: number, payload: Partial<Hotel>) => Promise<void>;
  deleteHotel: (id: number) => Promise<void>;
};

export const useHotelsStore = create<HotelsState>((set) => ({
  hotels: [],
  status: 'idle',
  errorMessage: null,

  fetchHotels: async () => {
    set({ status: 'loading' });
    try {
      const { data } = await api.get<any>('/hoteles');
      const possibleArray1 = data?.data?.data; // e.g., inner "data" array
      const possibleArray2 = data?.data?.hoteles; // fallback if named "hoteles"
      const possibleArray3 = data?.hoteles; // direct top-level fallback
      const hotelsArray = Array.isArray(possibleArray1)
        ? possibleArray1
        : Array.isArray(possibleArray2)
          ? possibleArray2
          : Array.isArray(possibleArray3)
            ? possibleArray3
            : [];
      set({ hotels: hotelsArray, status: 'idle', errorMessage: null });
    } catch (e) {
      set({ status: 'error', errorMessage: (e as any).message || 'Error al cargar hoteles' });
    }
  },

  createHotel: async (payload) => {
    set({ status: 'loading' });
    try {
      const { data } = await api.post<{ hotel: Hotel }>('/hoteles', payload);
      set((state) => ({ hotels: [...state.hotels, data.hotel], status: 'idle', errorMessage: null }));
    } catch (e) {
      set({ status: 'error', errorMessage: (e as any).message || 'Error al crear hotel' });
    }
  },

  updateHotel: async (id, payload) => {
    set({ status: 'loading' });
    try {
      await api.put(`/hoteles/${id}`, payload);
      set((state) => ({
        hotels: state.hotels.map((h) => (h.id === id ? { ...h, ...payload } : h)),
        status: 'idle',
        errorMessage: null,
      }));
    } catch (e) {
      set({ status: 'error', errorMessage: (e as any).message || 'Error al actualizar hotel' });
    }
  },

  deleteHotel: async (id) => {
    set({ status: 'loading' });
    try {
      await api.delete(`/hoteles/${id}`);
      set((state) => ({ hotels: state.hotels.filter((h) => h.id !== id), status: 'idle', errorMessage: null }));
    } catch (e) {
      set({ status: 'error', errorMessage: (e as any).message || 'Error al eliminar hotel' });
    }
  },
}));
