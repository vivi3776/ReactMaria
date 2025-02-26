import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import "./index.css"; // Importar Tailwind aquí

function NavBar({ carritoCount }) {
  return (
    <>
      <div className="w-full text-black py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img src="/img/icon.png" alt="HoverX" className="h-10" />

          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="relative inline-block group hover:text-gray-600">
                  Contacto
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative inline-block group hover:text-gray-600">
                  Comparador
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="relative inline-block group hover:text-gray-600">
                  Tienda
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </nav>

          <nav className="flex-1 flex justify-end">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-600 flex items-center">
                  <UserIcon className="h-6 w-6" />
                </a>
              </li>
              <li className="relative">
                <a href="#" className="hover:text-gray-600 flex items-center">
                  <ShoppingCartIcon className="h-6 w-6" />
                  {/* Mostrar número solo si hay productos */}
                  {carritoCount > 0 && carritoCount < 10 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {carritoCount}
                    </span>
                  )}
                  {carritoCount > 9 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      9+
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default NavBar;
