import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import Producto from "./Producto";
import Categorias from "./Categorias";
import "./index.css";

function Tienda() {
  const [carrito, setCarrito] = useState([]); // Estado para el carrito
  const [filtros, setFiltros] = useState([]); // Estado para los filtros seleccionados
  const [productos, setProductos] = useState([]); // Estado para los productos
  const [openCategory, setOpenCategory] = useState(null);

  // Definir las categorías
  const categories = [
    { name: "Profesional", subcategories: ["DJI Inspire", "DJI Dock", "DJI Matrice"] },
    { name: "Amateur", subcategories: ["DJI Mavic", "Canon", "Nikon"] },
    { name: "Iniciación", subcategories: ["Filtros", "Mochilas", "Gimbals"] },
    { name: "Baterías", subcategories: ["Lipo 3S", "Lipo 4S", "Lipo 6S"] },
    { name: "Ofertas", subcategories: ["Descuentos", "Paquetes", "Liquidaciones"] },
  ];

  // Cargar carrito y productos desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
      // Recuperamos los productos completos de `localStorage`
      const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
      
      // Mapear los productos del carrito a los productos completos
      const carritoConProductosCompletos = carritoGuardado.map((item) => {
        const productoCompleto = productosGuardados.find((producto) => producto.id === item.id);
        return { ...productoCompleto, cantidad: item.cantidad }; // Añadir la cantidad al producto
      });

      setCarrito(carritoConProductosCompletos);
    }

    const productosGuardados = JSON.parse(localStorage.getItem("productos"));
    if (productosGuardados) {
      setProductos(productosGuardados);
    }

    const filtrosGuardados = JSON.parse(localStorage.getItem("filtros"));
    if (filtrosGuardados) {
      setFiltros(filtrosGuardados);
    }
  }, []);

  // Guardar carrito en localStorage (solo con ID y cantidad)
  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Comprobar si el producto ya existe en el carrito
    const productoExistente = carritoActual.find((p) => p.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad += 1; // Si el producto ya está en el carrito, aumentamos la cantidad
    } else {
      carritoActual.push({ id: producto.id, cantidad: 1 }); // Solo guardamos la ID y cantidad
    }

    // Guardamos el carrito actualizado con solo las IDs
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
  };

  // Manejar selección de subcategoría
  const handleCategoriaSeleccionada = (subcategoria) => {
    setFiltros((prevFiltros) => {
      // Si la subcategoría no está en los filtros, la agregamos
      if (!prevFiltros.includes(subcategoria)) {
        const nuevosFiltros = [...prevFiltros, subcategoria];
        localStorage.setItem("filtros", JSON.stringify(nuevosFiltros));
        return nuevosFiltros;
      }
      return prevFiltros; // Si ya está, no la agregamos de nuevo
    });
  };

  // Eliminar filtro
  const eliminarFiltro = (filtro) => {
    setFiltros((prevFiltros) => {
      const nuevosFiltros = prevFiltros.filter((item) => item !== filtro);
      localStorage.setItem("filtros", JSON.stringify(nuevosFiltros));
      return nuevosFiltros;
    });
  };

  // Alternar visibilidad de categorías
  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Filtrar productos por los filtros seleccionados
  const productosFiltrados = filtros.length
    ? productos.filter((producto) => filtros.includes(producto.type)) // Filtrar por el campo 'type' del producto
    : productos;

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center text-black"
      style={{ backgroundImage: "url('/img/wallpaper.webp')" }}
    >
      <NavBar carritoCount={carrito.length} />

      <div className="flex">
        {/* Sidebar de Categorías */}
        <Categorias
          categories={categories} // Pasar las categorías definidas aquí
          toggleCategory={toggleCategory}
          openCategory={openCategory}
          seleccionarCategoria={handleCategoriaSeleccionada} // Ahora se agrega al filtro
        />

        {/* Contenido Principal */}
        <div className="w-4/5 m-8">
          <h2 className="text-2xl font-bold mb-4">Productos</h2>

          {/* Filtros activos */}
          <div className="mb-4 flex flex-wrap gap-2">
            {filtros.map((filtro, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white py-1 px-3 rounded-full flex items-center space-x-2 shadow-lg hover:bg-blue-600 cursor-pointer"
              >
                <span>{filtro}</span>
                <XMarkIcon
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => eliminarFiltro(filtro)} // Eliminar filtro específico
                />
              </span>
            ))}
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => (
              <Producto
                key={producto.id}
                id={producto.id}
                nombre={producto.name}
                precio={producto.price}
                descripcion={producto.description} // Agregar descripción
                tipo={producto.type} // Agregar tipo
                imagen={producto.img}
                agregarAlCarrito={() => agregarAlCarrito(producto)} // Pasar el producto completo
              />
            ))}
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default Tienda;
