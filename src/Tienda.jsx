import { useState } from "react";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import Producto from "./Producto";
import "./index.css"; // Importar Tailwind aquí
import productosData from "./json/productos.json";



function Inicio() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const categories = [
    { name: "Drones", subcategories: ["DJI", "Parrot", "Autel"] },
    { name: "Cámaras", subcategories: ["Sony", "Canon", "Nikon"] },
    { name: "Accesorios", subcategories: ["Filtros", "Mochilas", "Gimbals"] },
    { name: "Baterías", subcategories: ["Lipo 3S", "Lipo 4S", "Lipo 6S"] },
    { name: "Ofertas", subcategories: ["Descuentos", "Paquetes", "Liquidaciones"] },
  ];

  const productos = [
    { id: 1, name: "Drone DJI Mavic", price: "$1200", img: "/img/mavic.jpg" },
    { id: 2, name: "Cámara Sony Alpha", price: "$800", img: "/img/sony.jpg" },
    { id: 3, name: "Gimbal Stabilizer", price: "$150", img: "/img/gimbal1.webp" },
    { id: 4, name: "Batería Lipo 4S", price: "$90", img: "/img/bateria1.webp" },
    { id: 5, name: "Drone DJI Phantom", price: "$1000", img: "/img/drone2.webp" },
    { id: 6, name: "Cámara Canon EOS", price: "$700", img: "/img/camara2.webp" },

  ];

  return (
    <>
      <div
        className="w-full min-h-screen bg-cover bg-center text-black"
        style={{ backgroundImage: "url('/img/wallpaper.webp')" }}
      >
        <NavBar />

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
                        <li key={sub} className="p-2 bg-gray-200 rounded hover:text-blue-600 cursor-pointer">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productosData.productos.map((producto) => (
                <Producto key={producto.id} nombre={producto.name} precio={producto.price} imagen={producto.img} />
              ))}
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </>
  );
}

export default Inicio;
