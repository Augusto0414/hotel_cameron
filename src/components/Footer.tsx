import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-white mb-2">Hotel Cameron</h3>
            <p className="text-slate-400 text-sm">
              Plataforma moderna de gestión hotelera para administrar tus propiedades de manera eficiente.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-3">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/hoteles" className="text-slate-400 hover:text-white transition-colors">
                  Hoteles
                </a>
              </li>
              <li>
                <a href="/tipos-habitacion" className="text-slate-400 hover:text-white transition-colors">
                  Tipos de Habitación
                </a>
              </li>
              <li>
                <a href="/acomodaciones" className="text-slate-400 hover:text-white transition-colors">
                  Acomodaciones
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-white mb-2">Contacto</h3>
            <p className="text-slate-400 text-sm">Soporte: augustopelis4@gmail.com</p>
            <p className="text-slate-400 text-sm">Versión 1.0.0</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© AUGUSTO ARAUJO VEGA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
