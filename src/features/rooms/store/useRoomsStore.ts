import { create } from 'zustand';
import api from '../../../api/api';

export interface Habitacion {
  id: number;
  hotel_id: number;
  tipo_habitacion_id: number;
  acomodacion_id: number;
  cantidad: number;
  tipoHabitacion?: { id: number; nombre: string };
  acomodacion?: { id: number; nombre: string };
}

type RoomsState = {
  habitaciones: Habitacion[];
  status: 'idle' | 'loading' | 'error';
  errorMessage: string | null;
  fetchHabitaciones: (hotelId: number) => Promise<void>;
  asignarHabitacion: (
    hotelId: number,
    payload: { tipo_habitacion_id: number; acomodacion_id: number; cantidad: number }
  ) => Promise<void>;
  actualizarCantidad: (
    hotelId: number,
    habitacionId: number,
    cantidad: number
  ) => Promise<void>;
  eliminarHabitacion: (hotelId: number, habitacionId: number) => Promise<void>;
};

export const useRoomsStore = create<RoomsState>((set) => ({
  habitaciones: [],
  status: 'idle',
  errorMessage: null,

  fetchHabitaciones: async (hotelId) => {
    set({ status: 'loading' });
    try {
      const { data } = await api.get(`/hoteles/${hotelId}/habitaciones`);
      console.log('fetchHabitaciones response:', data);
      const possibleArray1 = data?.data?.habitaciones;
      const possibleArray2 = data?.habitaciones;
      const habitacionesArray = Array.isArray(possibleArray1)
        ? possibleArray1
        : Array.isArray(possibleArray2)
          ? possibleArray2
          : [];
      set({ habitaciones: habitacionesArray, status: 'idle', errorMessage: null });
    } catch (e) {
      set({ status: 'error', errorMessage: (e as any).message || 'Error al cargar habitaciones' });
    }
  },

  asignarHabitacion: async (hotelId, payload) => {
    set({ status: 'loading' });
    try {
      await api.post(`/hoteles/${hotelId}/habitaciones`, payload);
      // Refetch after assignment
      const { data } = await api.get(`/hoteles/${hotelId}/habitaciones`);
      console.log('asignarHabitacion response:', data);
      set({ habitaciones: data.habitaciones, status: 'idle', errorMessage: null });
    } catch (e) {
      set({ status: 'error', errorMessage: (e as any).message || 'Error al asignar habitación' });
    }
  },

  actualizarCantidad: async (hotelId, habitacionId, cantidad) => {
    set({ status: 'loading' });
    try {
      await api.put(`/hoteles/${hotelId}/habitaciones/${habitacionId}`, { cantidad });
      const { data } = await api.get(`/hoteles/${hotelId}/habitaciones`);
      console.log('actualizarCantidad response:', data);
      set({ habitaciones: data.habitaciones, status: 'idle', errorMessage: null });
    } catch (e) {
      set({ status: 'error', errorMessage: (e as any).message || 'Error al actualizar cantidad' });
    }
  },

  eliminarHabitacion: async (hotelId, habitacionId) => {
    set({ status: 'loading' });
    try {
      await api.delete(`/hoteles/${hotelId}/habitaciones/${habitacionId}`);
      const { data } = await api.get(`/hoteles/${hotelId}/habitaciones`);
      console.log('eliminarHabitacion response:', data);
      set({ habitaciones: data.habitaciones, status: 'idle', errorMessage: null });
    } catch (e) {
      set({ status: 'error', errorMessage: (e as any).message || 'Error al eliminar habitación' });
    }
  },
}));
