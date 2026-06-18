import { Edit, Home, Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHotelsStore } from "../store/useHotelsStore";

const HotelList: React.FC = () => {
  const { hotels, status, errorMessage, fetchHotels, deleteHotel } = useHotelsStore();

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este hotel?")) {
      await deleteHotel(id);
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Hoteles</h1>
            <p className="text-slate-400">Gestiona todos tus hoteles y propiedades</p>
          </div>
          <Link
            to="/hoteles/nuevo"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Nuevo Hotel
          </Link>
        </div>

        {/* Error Message */}
        {status === "error" && (
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        {/* Hotels Grid */}
        {hotels.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-12 text-center">
            <Home size={48} className="mx-auto text-slate-500 mb-4" />
            <p className="text-slate-400 text-lg mb-4">No hay hoteles registrados</p>
            <Link to="/hoteles/nuevo" className="inline-block text-blue-400 hover:text-blue-300 font-semibold">
              Crear el primer hotel →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.filter(h => h && h.nombre).map((hotel) => (
              <div
                key={hotel.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-all hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <h2 className="text-xl font-bold text-white">{hotel.nombre}</h2>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">
                      <span className="font-semibold">Ubicación:</span>
                    </p>
                    <p className="text-white">{hotel.direccion}</p>
                    <p className="text-slate-300">{hotel.ciudad}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700">
                    <div>
                      <p className="text-sm text-slate-400 font-semibold">NIT</p>
                      <p className="text-white">{hotel.nit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-semibold">Habitaciones</p>
                      <p className="text-white">{hotel.numero_habitaciones}</p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 flex gap-2">
                  <Link
                    to={`/hoteles/${hotel.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                  >
                    <Edit size={18} />
                    Editar
                  </Link>
                  <Link
                    to={`/hoteles/${hotel.id}/habitaciones`}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                  >
                    <Home size={18} />
                    Habitaciones
                  </Link>
                  <button
                    onClick={() => handleDelete(hotel.id)}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelList;
