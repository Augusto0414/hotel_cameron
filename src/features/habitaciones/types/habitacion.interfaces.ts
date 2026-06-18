export interface Habitacion {
  id: number;
  numero: string;
  tipo?: { id: number; nombre: string };
  precio?: number;
  acomodacionId?: number;
  cantidad?: number;
  created_at?: string;
  updated_at?: string;
}
