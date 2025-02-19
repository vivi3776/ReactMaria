import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import './index.css' // Importar Tailwind aquí

function BottomBar() {
  return (
    <>
      {/* Cambiamos el padding y ajustamos la altura */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 text-black py-2 ">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">HoverX</h1>

          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="relative inline-block group hover:text-gray-600"
                >
                  Contacto
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative inline-block group hover:text-gray-600"
                >
                  Comparador
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative inline-block group hover:text-gray-600"
                >
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
              <li>
                <a href="#" className="hover:text-gray-600 flex items-center">
                  <ShoppingCartIcon className="h-6 w-6" />
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
