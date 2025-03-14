import { useEffect, useState } from "react";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"; // Importar Tailwind aquí

function NavBar() {
  const [carrito, setCarrito] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para saber si el usuario es admin
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar el menú desplegable
  const navigate = useNavigate(); // Usamos navigate para redirigir al usuario

  // Cargar el carrito desde localStorage cuando el componente se monta
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);

    // Verificar si el usuario está logueado y si es admin desde localStorage
    const userType = localStorage.getItem("username");
    if (userType === "admin") {
      setIsAdmin(true);
    }

    const userLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userLoggedIn === "true");
  }, []); // Solo se ejecuta al montar el componente

  // Calcular el total de productos en el carrito
  const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setDropdownOpen(false); // Cerrar el menú desplegable

    // Recargar la página para actualizar la vista
    window.location.reload(); // Esto forzará una actualización de la página
  };

  // Función para manejar el clic en el ícono de usuario (para abrir/cerrar el desplegable)
  const handleUserClick = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <div className="w-full text-black py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="h-10">
          <img src="/img/icon.png" alt="HoverX" className="h-10" />
        </Link>

        {/* Navegación principal */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <Link to="/contact" className="relative inline-block group hover:text-gray-600">
                Contacto
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/comparador" className="relative inline-block group hover:text-gray-600">
                Comparador
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/tienda" className="relative inline-block group hover:text-gray-600">
                Tienda
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            {/* Mostrar "Productos" solo si el usuario es admin */}
            {isAdmin && (
              <li>
                <Link to="/agregar" className="relative inline-block group hover:text-gray-600">
                  Productos
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Navegación derecha */}
        <nav className="flex-1 flex justify-end">
          <ul className="flex space-x-4">
            {isLoggedIn ? (
              <>
                {/* Menú de usuario desplegable */}
                <li className="relative">
                  <button onClick={handleUserClick} className="flex items-center">
                    <UserIcon className="h-6 w-6" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg border">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="hover:text-gray-600 flex items-center">
                  <UserIcon className="h-6 w-6" />
                </Link>
              </li>
            )}
            <li className="relative">
              <Link to="/carrito" className="hover:text-gray-600 flex items-center">
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && totalItems < 10 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
                {totalItems >= 10 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    9+
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
