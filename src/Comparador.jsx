import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from './NavBar';
import BottomBar from './BottomBar';
import './index.css';

function Comparador() {
  const [carrito, setCarrito] = useState([]);

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
        <NavBar carritoCount={carrito.length} />

        <div className="flex justify-center pt-24 mb-12">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center text-black mb-6">Página en Construcción</h1>
            <p className="text-xl text-black text-center mb-6">
              Estamos trabajando en la sección de comparador. ¡Vuelve pronto para explorar nuestras herramientas de comparación de productos!
            </p>
            <div className="text-center">
              <Link
                to="/tienda"
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500"
              >
                Volver a la tienda
              </Link>
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </>
  );
}

export default Comparador;
