import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar"; // Asegúrate de importar BottomBar
import './index.css'; // Importar Tailwind aquí

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]); // Para almacenar los productos completos

  // Cargar carrito y productos completos desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    const productosGuardados = JSON.parse(localStorage.getItem("productos"));

    if (carritoGuardado) {
      // Recuperamos los productos completos de la lista almacenada en localStorage
      const carritoConProductosCompletos = carritoGuardado.map((item) => {
        const productoCompleto = productosGuardados.find(
          (producto) => producto.id === item.id
        );
        return { ...productoCompleto, cantidad: item.cantidad }; // Añadir la cantidad al producto
      });
      setCarrito(carritoConProductosCompletos);
    }

    if (productosGuardados) {
      setProductos(productosGuardados); // Establecer productos completos
    }
  }, []);

  // Calcular el total del carrito en euros
  const total = carrito.reduce((acc, producto) => {
    return acc + producto.price * producto.cantidad;
  }, 0);

  // Manejar el cambio en la cantidad de un producto
  const cambiarCantidad = (productoId, cantidad) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito.map((producto) =>
        producto.id === productoId ? { ...producto, cantidad } : producto
      );
      // Actualizar el carrito en localStorage
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  // Eliminar un producto del carrito
  const eliminarProducto = (productoId) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito.filter((producto) => producto.id !== productoId);
      // Actualizar el carrito en localStorage
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  // Agrupar los productos por ID para evitar mostrar el mismo producto varias veces
  const carritoAgrupado = carrito.reduce((acumulador, producto) => {
    const productoExistente = acumulador.find((p) => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad += producto.cantidad;
    } else {
      acumulador.push({ ...producto });
    }
    return acumulador;
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-cover bg-center text-black" style={{ backgroundImage: "url('/img/wallpaper.webp')" }}>
        <NavBar carritoCount={productos.length} />
        <div className="flex justify-center pt-24 pb-8"> {/* Añadí padding para no tapar el NavBar */}
          <div className="w-full max-w-5xl px-6 py-8 rounded-lg shadow-md bg-white bg-opacity-90">
            <h1 className="text-3xl font-bold text-center mb-6">Carrito de Compras</h1>

            {/* Mostrar los productos en el carrito */}
            <div className="space-y-4">
              {carritoAgrupado.length === 0 ? (
                <p className="text-center text-xl">Tu carrito está vacío</p>
              ) : (
                carritoAgrupado.map((producto) => {
                  return (
                    <div key={producto.id} className="flex items-center justify-between p-4 border-b">
                      <div className="flex items-center">
                        {/* Imagen del producto */}
                        <img
                          src={producto.img}
                          alt={producto.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{producto.name}</h3>
                          <p>Precio: €{producto.price}</p> {/* Cambié el símbolo a euro */}
                          <p className="text-gray-500">Descripción: {producto.description}</p>
                          <p className="text-sm text-gray-500">Tipo: {producto.type}</p> {/* Mostramos el tipo */}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Botones para aumentar o disminuir la cantidad */}
                        <button
                          onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}
                          disabled={producto.cantidad <= 1}
                          className="px-3 py-1 bg-red-500 text-white rounded-md disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="text-lg">{producto.cantidad}</span>
                        <button
                          onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)}
                          className="px-3 py-1 bg-green-500 text-white rounded-md"
                        >
                          +
                        </button>
                      </div>

                      <div>
                        <p className="text-lg font-bold">€{producto.price * producto.cantidad}</p> {/* Cambié el símbolo a euro */}
                      </div>

                      {/* Botón para eliminar el producto */}
                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Total del carrito */}
            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total:</h2>
              <p className="text-xl font-bold">€{total}</p> {/* Cambié el símbolo a euro */}
            </div>

            {/* Botón para finalizar la compra */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500">
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>

        {/* Agregar el BottomBar al final de la página */}
        <BottomBar />
      </div>
    </>
  );
}

export default Carrito;
