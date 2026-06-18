import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Hotels
import HotelList from "./features/hotels/pages/HotelList";
import HotelForm from "./features/hotels/pages/HotelForm";

// Tipos de Habitación
import TipoHabitacionList from "./features/tiposHabitacion/pages/TipoHabitacionList";
import TipoHabitacionForm from "./features/tiposHabitacion/pages/TipoHabitacionForm";

// Acomodaciones
import AcomodacionList from "./features/acomodaciones/pages/AcomodacionList";
import AcomodacionForm from "./features/acomodaciones/pages/AcomodacionForm";
import HabitacionList from "./features/habitaciones/pages/HabitacionList";
import HabitacionForm from "./features/habitaciones/pages/HabitacionForm";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/hoteles" replace />} />

          {/* Hotels */}
          <Route path="/hoteles" element={<HotelList />} />
          <Route path="/hoteles/nuevo" element={<HotelForm />} />
          <Route path="/hoteles/:id" element={<HotelForm />} />

          {/* Habitaciones */}
          <Route path="/hoteles/:hotelId/habitaciones" element={<HabitacionList />} />
          <Route path="/hoteles/:hotelId/habitaciones/nuevo" element={<HabitacionForm />} />
          <Route path="/hoteles/:hotelId/habitaciones/:id" element={<HabitacionForm />} />
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
