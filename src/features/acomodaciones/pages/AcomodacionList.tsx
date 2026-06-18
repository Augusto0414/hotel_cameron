import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAcomodacionesStore } from "../store/useAcomodacionesStore";

const AcomodacionList: React.FC = () => {
  const { acomodaciones, status, errorMessage, fetchAcomodaciones, deleteAcomodacion } = useAcomodacionesStore();

  useEffect(() => {
    fetchAcomodaciones();
  }, [fetchAcomodaciones]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta acomodación?")) {
      await deleteAcomodacion(id);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Acomodaciones</h1>
            <p className="text-slate-400">Gestiona los tipos de acomodaciones disponibles</p>
          </div>
          <Link
            to="/acomodaciones/nuevo"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Nueva Acomodación
          </Link>
        </div>

        {/* Error Message */}
        {status === "error" && (
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        {/* Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden">
          {acomodaciones.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-400 text-lg">No hay acomodaciones registradas</p>
              <Link
                to="/acomodaciones/nuevo"
                className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold"
              >
                Crear la primera →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Descripción</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {acomodaciones.filter(Boolean).map((acomodacion) => (
                    <tr
                      key={acomodacion.id}
                      className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">{acomodacion.nombre ?? '-'}</td>
                      <td className="px-6 py-4 text-slate-300">{acomodacion.descripcion ?? '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/acomodaciones/${acomodacion.id}`}
                            className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(acomodacion.id)}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcomodacionList;
