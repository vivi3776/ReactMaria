import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import './index.css'; // Importar Tailwind aquí

function BottomBar() {
  return (
    <>
      {/* Cambiamos el fondo a blanco y ajustamos el estilo */}
      <div className="fixed bottom-0 left-0 w-full bg-white text-black py-2 border-t border-gray-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* Enlaces centrales */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-4 text-sm">
              <li>
                <a
                  href="#"
                  className="relative inline-block group hover:text-gray-600"
                >
                  Términos y condiciones
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative inline-block group hover:text-gray-600"
                >
                  Política de privacidad
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative inline-block group hover:text-gray-600"
                >
                  Envíos
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative inline-block group hover:text-gray-600"
                >
                  Todos los derechos reservados
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </nav>

          
        </div>
      </div>
    </>
  );
}

export default BottomBar;
