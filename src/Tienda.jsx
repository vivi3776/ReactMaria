import { useState, useEffect } from "react";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Importa el ícono
import Producto from "./Producto";
import Categorias from "./Categorias";
import "./index.css";
import productosData from "./json/productos.json";


function Tienda() {
  const [carrito, setCarrito] = useState([]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const nuevoCarrito = [...prev, producto.id];
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito)); // Guarda en localStorage
      return nuevoCarrito;
    });
  };
  
  // Recuperar el carrito al cargar la tienda
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
      setCarrito(carritoGuardado);
    }
  }, []);

  useEffect(() => {
    if (carrito.length > 0) {
      console.log(JSON.stringify(carrito));
    }
  }, [carrito]);

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const categories = [
    { name: "Profesional", subcategories: ["DJI Inspire", "DJI Dock", "DJI Matrice"] },
    { name: "Amateur", subcategories: ["DJI Mavic", "Canon", "Nikon"] },
    { name: "Iniciación", subcategories: ["Filtros", "Mochilas", "Gimbals"] },
    { name: "Baterías", subcategories: ["Lipo 3S", "Lipo 4S", "Lipo 6S"] },
    { name: "Ofertas", subcategories: ["Descuentos", "Paquetes", "Liquidaciones"] },
  ];

  return (
    <>
      <div
        className="w-full min-h-screen bg-cover bg-center text-black"
        style={{ backgroundImage: "url('/img/wallpaper.webp')" }}
      >
        <NavBar carritoCount={carrito.length} />

        <div className="flex">
          {/* Sidebar de Categorías */}
          <Categorias categories={categories} toggleCategory={toggleCategory} openCategory={openCategory} />

          {/* Contenido Principal con Tarjetas */}
          <div className="w-4/5 m-8">
            <h2 className="text-2xl font-bold mb-4">Productos</h2>
            <div>
            <h3 className="text-2xl mb-4 flex items-center">
  Filtros: {categoriaSeleccionada}
  {categoriaSeleccionada && (
    <XMarkIcon
      className="ml-2 h-8 w-8 cursor-pointer text-gray-500 hover:text-gray-700"
      onClick={() => setCategoriaSeleccionada(null)}
    />
  )}
</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productosData.productos
                .filter((producto) => !categoriaSeleccionada || producto.type === categoriaSeleccionada) // ✅ Filtra por categoría seleccionada
                .map((producto) => (
                  <Producto
                    key={producto.id}
                    id={producto.id}
                    nombre={producto.name}
                    precio={producto.price}
                    imagen={producto.img}
                    agregarAlCarrito={() => agregarAlCarrito(producto)}
                  />
                ))}
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </>
  );
}

export default Tienda;
