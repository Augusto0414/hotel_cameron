import { create } from 'zustand';
import api from '../../../api/api';

type TipoHabitacion = { id: number; nombre: string };
type Acomodacion = { id: number; nombre: string; descripcion: string };

type CatalogState = {
  status: 'idle' | 'loading' | 'error';
  error: string | null;
  tiposHabitacion: TipoHabitacion[];
  acomodaciones: Acomodacion[];
  fetchCatalogs: () => Promise<void>;
};

export const useCatalogStore = create<CatalogState>((set) => ({
  status: 'idle',
  error: null,
  tiposHabitacion: [],
  acomodaciones: [],
  fetchCatalogs: async () => {
    set({ status: 'loading' });
    try {
      const { data } = await api.get('/catalogos');
      set({
        tiposHabitacion: data.tipos_habitacion,
        acomodaciones: data.acomodaciones,
        status: 'idle',
        error: null,
      });
    } catch (e: any) {
      set({ status: 'error', error: e.message ?? 'Error al cargar catálogos' });
    }
  },
}));
