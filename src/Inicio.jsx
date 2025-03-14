import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Importar Link para las rutas
import NavBar from './NavBar';
import BottomBar from './BottomBar';
import './index.css'; // Importar Tailwind aquí

function Inicio() {
  const [carrito, setCarrito] = useState([]);
  
  // Cargar el carrito desde el localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
      setCarrito(carritoGuardado);
    }
  }, []);

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/img/wallpaper.webp')" }}
      >
        <NavBar carritoCount={carrito.length} /> {/* Pasa el número de items en el carrito */}

        {/* Contenido principal centrado en un div con un ancho limitado */}
        <div className="flex justify-center pt-24 mb-12">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center text-black mb-6">¡Bienvenido a tu tienda de fotografía y drones!</h1>
            <p className="text-xl text-black text-center mb-6">
              Encuentra los mejores drones para capturar tus momentos más especiales. ¡Explora nuestra amplia gama de productos y consigue el equipo perfecto para ti!
            </p>
            <div className="text-center">
              <Link
                to="/tienda"
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500"
              >
                ¡Explorar la tienda!
              </Link>
            </div>
          </div>
        </div>

      

        <BottomBar /> {/* Barra inferior */}
      </div>
    </>
  );
}

export default Inicio;
