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
    setCarrito((prev) => [...prev, producto.id]);
  };

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
          <div className="w-1/5 m-8 bg-white p-4 rounded shadow-lg">
            <h1 className="text-center text-2xl font-bold mb-4">Tienda</h1>

            <h2 className="text-xl font-bold mb-4">Categorías</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <div
                    className="hover:bg-gray-700 p-2 rounded cursor-pointer flex justify-between items-center"
                    onClick={() => toggleCategory(category.name)}
                  >
                    {category.name}
                    <span>{openCategory === category.name ? "▲" : "▼"}</span>
                  </div>
                  {openCategory === category.name && (
                    <ul className="pl-4 mt-2 space-y-1">
                      {category.subcategories.map((sub) => (
                        <li
                          key={sub}
                          className="p-2 bg-gray-200 rounded hover:text-blue-600 cursor-pointer"
                          onClick={() => setCategoriaSeleccionada(sub)} // ✅ Selecciona la subcategoría
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

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
