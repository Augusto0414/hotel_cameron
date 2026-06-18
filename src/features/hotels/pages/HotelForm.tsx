import { ArrowLeft, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHotelsStore } from "../store/useHotelsStore";

const HotelForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotels, createHotel, updateHotel, fetchHotels } = useHotelsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    nit: "",
    numero_habitaciones: 0,
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (id) {
      const hotel = hotels.find((h) => h.id === Number(id));
      if (hotel) {
        setForm({
          nombre: hotel.nombre,
          direccion: hotel.direccion,
          ciudad: hotel.ciudad,
          nit: hotel.nit,
          numero_habitaciones: hotel.numero_habitaciones,
        });
      }
    }
  }, [id, hotels]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "numero_habitaciones" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateHotel(Number(id), form);
      } else {
        await createHotel(form);
      }
      navigate("/hoteles");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/hoteles")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-2">{id ? "Editar Hotel" : "Crear Hotel"}</h1>
          <p className="text-slate-400 mb-8">
            {id ? "Modifica los detalles de tu hotel" : "Añade un nuevo hotel al sistema"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Nombre del Hotel <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Hotel Cameron"
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Dirección <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Ej: Calle Principal 123"
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Ciudad <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                placeholder="Ej: Bogotá"
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* NIT */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                NIT <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="nit"
                value={form.nit}
                onChange={handleChange}
                placeholder="Ej: 123456789"
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Número de Habitaciones */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Número de Habitaciones <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="numero_habitaciones"
                value={form.numero_habitaciones}
                onChange={handleChange}
                placeholder="Ej: 50"
                required
                min="1"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                onClick={() => navigate("/hoteles")}
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

export default HotelForm;
