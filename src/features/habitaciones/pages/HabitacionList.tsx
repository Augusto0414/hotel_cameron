import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useHabitacionesStore } from "../store/useHabitacionesStore";

const HabitacionList: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const { habitaciones, status, errorMessage, fetchHabitaciones, deleteHabitacion } = useHabitacionesStore();

  useEffect(() => {
    if (hotelId) {
      console.log('Fetching habitaciones for hotelId:', hotelId);
      fetchHabitaciones(Number(hotelId));
    }
  }, [hotelId, fetchHabitaciones]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar esta habitación?")) {
      await deleteHabitacion(Number(hotelId), id);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/hoteles')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          <Link
            to={`/hoteles/${hotelId}/habitaciones/nuevo`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            <Plus size={18} />
            Añadir habitación
          </Link>
          <button onClick={() => fetchHabitaciones(Number(hotelId))} className="ml-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition">Recargar</button>
        </div>

        {/* Error banner */}
        {status === "error" && (
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
            {errorMessage}
          </div>
        )}

        {/* Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden">
          {habitaciones.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No hay habitaciones registradas.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Número</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Cantidad</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {habitaciones.filter(Boolean).map((h) => (
                    <tr
                      key={h.id}
                      className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-3 text-white">{h.numero ?? "-"}</td>
                      <td className="px-6 py-3 text-slate-300">{h.tipo?.nombre ?? "-"}</td>
                      <td className="px-6 py-3 text-slate-300">{h.cantidad ?? 0}</td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/hoteles/${hotelId}/habitaciones/${h.id}`}
                            className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(h.id)}
                            className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitacionList;
