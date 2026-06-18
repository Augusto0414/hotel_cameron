import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRoomsStore } from '../store/useRoomsStore';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';

// Component to display list of rooms for a specific hotel
const RoomList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const hotelId = Number(id);

  const {
    habitaciones,
    status,
    errorMessage,
    fetchHabitaciones,
    actualizarCantidad,
    eliminarHabitacion,
  } = useRoomsStore();

  useEffect(() => {
    if (!isNaN(hotelId)) {
      fetchHabitaciones(hotelId);
    }
  }, [hotelId, fetchHabitaciones]);

  const handleDelete = async (habitacionId: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      await eliminarHabitacion(hotelId, habitacionId);
    }
  };

  const handleIncrease = async (habitacionId: number, current: number) => {
    await actualizarCantidad(hotelId, habitacionId, current + 1);
  };

  const handleDecrease = async (habitacionId: number, current: number) => {
    if (current > 0) {
      await actualizarCantidad(hotelId, habitacionId, current - 1);
    }
  };

  if (status === 'loading') {
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
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/hoteles"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Volver
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">Habitaciones del Hotel</h1>
              <p className="text-slate-400">Gestiona las habitaciones y sus cantidades</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        {/* Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden">
          {habitaciones.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-400 text-lg mb-4">No hay habitaciones registradas</p>
              <p className="text-slate-500 text-sm">Configura los tipos y acomodaciones primero</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tipo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Acomodación</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Cantidad</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {habitaciones.map((hab) => (
                    <tr key={hab.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{hab.tipoHabitacion?.nombre ?? '—'}</td>
                      <td className="px-6 py-4 text-white">{hab.acomodacion?.nombre ?? '—'}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600/20 text-blue-400 font-semibold rounded">
                          {hab.cantidad}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleDecrease(hab.id, hab.cantidad)}
                            className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                            title="Disminuir"
                          >
                            <Minus size={18} />
                          </button>
                          <button
                            onClick={() => handleIncrease(hab.id, hab.cantidad)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                            title="Aumentar"
                          >
                            <Plus size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(hab.id)}
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

export default RoomList;
