import { useState, useEffect} from 'react';

import NavBar from './NavBar';

function Carrito() {

  const [carrito, setCarrito] = useState([]);
    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
        if (carritoGuardado) {
          setCarrito(carritoGuardado);
        }
      }, []);

  // Aquí simula un carrito con productos
  const [productosCarrito, setProductosCarrito] = useState([
    { id: 1, nombre: 'Drone A', cantidad: 1, precio: 300 },
    { id: 2, nombre: 'Drone B', cantidad: 2, precio: 150 },
  ]);

  // Calcular el total
  const total = productosCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

  return (
    <>
    <NavBar carritoCount={carrito.length}/>
    <div className="w-full min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Carrito de Compras</h1>

        {/* Mostrar los productos en el carrito */}
        <div className="space-y-4">
          {productosCarrito.length === 0 ? (
            <p className="text-center text-xl">Tu carrito está vacío</p>
          ) : (
            productosCarrito.map((producto) => (
              <div key={producto.id} className="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                  <p>Cantidad: {producto.cantidad}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">${producto.precio * producto.cantidad}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total del carrito */}
        <div className="mt-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Total:</h2>
          <p className="text-xl font-bold">${total}</p>
        </div>

        {/* Botón para finalizar la compra */}
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Carrito;
