import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Hotels
import HotelList from "./features/hotels/pages/HotelList";
import HotelForm from "./features/hotels/pages/HotelForm";

// Rooms
import RoomList from "./features/rooms/pages/RoomList";

// Tipos de Habitación
import TipoHabitacionList from "./features/tiposHabitacion/pages/TipoHabitacionList";
import TipoHabitacionForm from "./features/tiposHabitacion/pages/TipoHabitacionForm";

// Acomodaciones
import AcomodacionList from "./features/acomodaciones/pages/AcomodacionList";
import AcomodacionForm from "./features/acomodaciones/pages/AcomodacionForm";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/hoteles" replace />} />

          {/* Hotels */}
          <Route path="/hoteles" element={<HotelList />} />
          <Route path="/hoteles/nuevo" element={<HotelForm />} />
          <Route path="/hoteles/:id" element={<HotelForm />} />
          <Route path="/hoteles/:id/habitaciones" element={<RoomList />} />

          {/* Tipos de Habitación */}
          <Route path="/tipos-habitacion" element={<TipoHabitacionList />} />
          <Route path="/tipos-habitacion/nuevo" element={<TipoHabitacionForm />} />
          <Route path="/tipos-habitacion/:id" element={<TipoHabitacionForm />} />

          {/* Acomodaciones */}
          <Route path="/acomodaciones" element={<AcomodacionList />} />
          <Route path="/acomodaciones/nuevo" element={<AcomodacionForm />} />
          <Route path="/acomodaciones/:id" element={<AcomodacionForm />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
