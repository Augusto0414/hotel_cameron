import { ArrowLeft, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useHabitacionesStore } from "../store/useHabitacionesStore";
import { useTiposHabitacionStore } from "../../tiposHabitacion/store/useTiposHabitacionStore";
import { useAcomodacionesStore } from "../../acomodaciones/store/useAcomodacionesStore";
const HabitacionForm: React.FC = () => {
  const { hotelId, id } = useParams<{ hotelId: string; id?: string }>();
  const navigate = useNavigate();

  const { createHabitacion, updateHabitacion, habitaciones } = useHabitacionesStore();
  const { tiposHabitacion, fetchTiposHabitacion } = useTiposHabitacionStore();
  const { acomodaciones, fetchAcomodaciones } = useAcomodacionesStore();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    numero: "",
    tipoId: 0,
    precio: 0,
    acomodacionId: 0,
    cantidad: 0,
  });

  // load tipos and acomodaciones
  useEffect(() => {
    fetchTiposHabitacion();
    fetchAcomodaciones();
    // Debug: log fetched data
    console.log('Fetched tiposHabitacion:', tiposHabitacion);
    console.log('Fetched acomodaciones:', acomodaciones);
  }, []);

// Debug: log when data changes
useEffect(() => {
  console.log('tiposHabitacion updated:', tiposHabitacion);
  console.log('acomodaciones updated:', acomodaciones);
}, [tiposHabitacion, acomodaciones]);

  // load room data if editing
  useEffect(() => {
    if (id && hotelId) {
      const habit = habitaciones.find((h) => h.id === Number(id));
      if (habit) {
        setForm({
          numero: habit.numero ?? "",
          tipoId: habit.tipo?.id ?? 0,
          precio: habit.precio ?? 0,
          acomodacionId: habit.acomodacionId ?? 0,
          cantidad: habit.cantidad ?? 0,
        });
      }
    }
  }, [id, hotelId, habitaciones]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "tipoId" || name === "acomodacionId" || name === "cantidad"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        // Simple client‑side validation for `cantidad`
        const maxCapacity = 222; // TODO: fetch real capacity from API if available
        if (form.cantidad <= 0) {
          toast.error('La cantidad debe ser mayor a 0.');
          setIsLoading(false);
          return;
        }
        if (form.cantidad > maxCapacity) {
          toast.error(`La cantidad supera la capacidad disponible (${maxCapacity}).`);
          setIsLoading(false);
          return;
        }

      const payload = {
        numero: form.numero,
        tipo_habitacion_id: form.tipoId,
        precio: form.precio,
        acomodacion_id: form.acomodacionId,
        cantidad: form.cantidad,
      };
      try {
        if (id) {
          await updateHabitacion(Number(hotelId), Number(id), payload);
          toast.success("Habitación actualizada exitosamente");
        } else {
          await createHabitacion(Number(hotelId), payload);
          toast.success("Habitación creada exitosamente");
        }
        navigate(`/hoteles/${hotelId}/habitaciones`);
      } catch (e: any) {
        // Show backend error message if available
        const msg = e?.response?.data?.message || 'Error al guardar la habitación';
        toast.error(msg);
        // Do not navigate on error
        // re‑throw to keep finally block execution if needed
        throw e;
      }
      // navigate after successful save only (removed duplicate)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {id ? "Editar habitación" : "Crear habitación"}
          </h1>
          <p className="text-slate-400 mb-8">
            {id ? "Modifica los datos de la habitación" : "Registra una nueva habitación"}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Número */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Número <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* Tipo */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Tipo <span className="text-red-400">*</span>
              </label>
              <select
                name="tipoId"
                value={form.tipoId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value={0}>Selecciona un tipo</option>
                {tiposHabitacion.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre}
                  </option>
                ))}
              </select>
            </div>
            {/* Acomodación */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Acomodación <span className="text-red-400">*</span>
              </label>
              <select
                name="acomodacionId"
                value={form.acomodacionId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value={0}>Selecciona una acomodación</option>
                {acomodaciones.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nombre}
                  </option>
                ))}
              </select>
            </div>
            {/* Cantidad */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Cantidad <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="cantidad"
                value={form.cantidad}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    {id ? "Actualizar" : "Crear"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HabitacionForm;
