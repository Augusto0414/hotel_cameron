import { ArrowLeft, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAcomodacionesStore } from "../store/useAcomodacionesStore";

const AcomodacionForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { acomodaciones, createAcomodacion, updateAcomodacion, fetchAcomodaciones } = useAcomodacionesStore();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    fetchAcomodaciones();
  }, []);

  useEffect(() => {
    if (id) {
      const acomodacion = acomodaciones.find((a) => a.id === Number(id));
      if (acomodacion) {
        setForm({
          nombre: acomodacion.nombre,
          descripcion: acomodacion.descripcion,
        });
      }
    }
  }, [id, acomodaciones]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateAcomodacion(Number(id), form);
      } else {
        await createAcomodacion(form);
      }
      navigate("/acomodaciones");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/acomodaciones")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-2">{id ? "Editar Acomodación" : "Crear Acomodación"}</h1>
          <p className="text-slate-400 mb-8">
            {id ? "Modifica los detalles de la acomodación" : "Añade una nueva acomodación al sistema"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Nombre <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Matrimonial"
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Ej: Cama matrimonial grande"
                rows={4}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
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
                onClick={() => navigate("/acomodaciones")}
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

export default AcomodacionForm;
