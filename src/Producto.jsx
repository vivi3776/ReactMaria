function Producto({ id, nombre, precio, imagen, agregarAlCarrito }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={imagen}
        alt={nombre}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{nombre}</h3>
      <p className="text-gray-600">{precio}</p>
      <button
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
        onClick={() => agregarAlCarrito({})}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default Producto;
