function Producto({ key, nombre, precio, imagen }) {
  return (
    <>
      <div
        key={key}
        className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-40 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{imagen}</h3>
        <p className="text-gray-600">{precio}</p>
        <button
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => alert("Producto agregado al carrito")}
        >
          Agregar al carrito
        </button>
      </div>
    </>
  );
}

export default Producto;
