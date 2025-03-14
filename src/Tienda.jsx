import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import Producto from "./Producto";
import Categorias from "./Categorias";
import "./index.css";

function Tienda() {
  const [carrito, setCarrito] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [productos, setProductos] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    { name: "Profesional", subcategories: ["DJI Inspire", "DJI Dock", "DJI Matrice"] },
    { name: "Amateur", subcategories: ["DJI Mavic", "Canon", "Nikon"] },
    { name: "Iniciación", subcategories: ["Filtros", "Mochilas", "Gimbals"] },
    { name: "Baterías", subcategories: ["Lipo 3S", "Lipo 4S", "Lipo 6S"] },
    { name: "Ofertas", subcategories: ["Descuentos", "Paquetes", "Liquidaciones"] },
  ];

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
      const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
      const carritoConProductosCompletos = carritoGuardado.map((item) => {
        const productoCompleto = productosGuardados.find((producto) => producto.id === item.id);
        return { ...productoCompleto, cantidad: item.cantidad };
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

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carritoActual.find((p) => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoActual.push({ id: producto.id, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
  };

  const handleCategoriaSeleccionada = (subcategoria) => {
    setFiltros((prevFiltros) => {
      if (!prevFiltros.includes(subcategoria)) {
        const nuevosFiltros = [...prevFiltros, subcategoria];
        localStorage.setItem("filtros", JSON.stringify(nuevosFiltros));
        return nuevosFiltros;
      }
      return prevFiltros;
    });
  };

  const eliminarFiltro = (filtro) => {
    setFiltros((prevFiltros) => {
      const nuevosFiltros = prevFiltros.filter((item) => item !== filtro);
      localStorage.setItem("filtros", JSON.stringify(nuevosFiltros));
      return nuevosFiltros;
    });
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const productosFiltrados = filtros.length
    ? productos.filter((producto) => filtros.includes(producto.type))
    : productos;

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center text-black"
      style={{ backgroundImage: "url('/img/wallpaper.webp')" }}
    >
      <NavBar carritoCount={carrito.length} />

      <div className="flex">
        <Categorias
          categories={categories}
          toggleCategory={toggleCategory}
          openCategory={openCategory}
          seleccionarCategoria={handleCategoriaSeleccionada}
        />

        <div className="w-4/5 m-8">
          <h2 className="text-2xl font-bold mb-4">Productos</h2>

          <div className="mb-4 flex flex-wrap gap-2">
            {filtros.map((filtro, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white py-1 px-3 rounded-full flex items-center space-x-2 shadow-lg hover:bg-blue-600 cursor-pointer"
              >
                <span>{filtro}</span>
                <XMarkIcon
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => eliminarFiltro(filtro)}
                />
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => (
              <Producto
                key={producto.id}
                id={producto.id}
                nombre={producto.name}
                precio={producto.price}
                descripcion={producto.description}
                tipo={producto.type}
                imagen={producto.img}
                agregarAlCarrito={() => agregarAlCarrito(producto)}
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
