import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";

function AgregarProductos() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [type, setType] = useState("");
  const [imagen, setImagen] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos"));
    if (productosGuardados) {
      setProductos(productosGuardados);
    }
  }, []);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarProducto = () => {
    if (!nombre || !precio || !descripcion || !type || !imagen) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const nuevoProducto = {
      id: productoEditado ? productoEditado.id : productos.length + 1,
      name: nombre,
      price: precio,
      description: descripcion,
      type,
      img: imagen,
    };

    let productosActualizados;
    if (productoEditado) {
      productosActualizados = productos.map((producto) =>
        producto.id === productoEditado.id ? nuevoProducto : producto
      );
    } else {
      productosActualizados = [...productos, nuevoProducto];
    }

    setProductos(productosActualizados);
    localStorage.setItem("productos", JSON.stringify(productosActualizados));

    setNombre("");
    setPrecio(0);
    setDescripcion("");
    setType("");
    setImagen(null);
    setProductoEditado(null);
  };

  const eliminarProducto = (id) => {
    const productosFiltrados = productos.filter((producto) => producto.id !== id);
    setProductos(productosFiltrados);
    localStorage.setItem("productos", JSON.stringify(productosFiltrados));
  };

  const editarProducto = (producto) => {
    setNombre(producto.name);
    setPrecio(producto.price);
    setDescripcion(producto.description);
    setType(producto.type);
    setImagen(producto.img);
    setProductoEditado(producto);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-center text-black" style={{ backgroundImage: "url('/img/wallpaper.webp')" }}>
      <NavBar carritoCount={productos.length} />

      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl mt-12 mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">
            {productoEditado ? "Editar Producto" : "Agregar Producto"}
          </h2>

          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Precio"
                value={precio || ""}
                onChange={(e) => setPrecio(Number(e.target.value))}
              />
              <textarea
                className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></textarea>

              <select
                className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Seleccionar tipo</option>
                <option value="DJI Mavic">DJI Mavic</option>
                <option value="Canon">Canon</option>
                <option value="Nikon">Nikon</option>
                <option value="Filtros">Filtros</option>
                <option value="Baterías">Baterías</option>
                <option value="Accesorios">Accesorios</option>
              </select>

              <input
                type="file"
                className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleImagenChange}
              />
              {imagen && (
                <div className="mb-4">
                  <img src={imagen} alt="Vista previa" className="w-32 h-32 object-cover mx-auto" />
                </div>
              )}

              <button
                onClick={guardarProducto}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {productoEditado ? "Actualizar Producto" : "Agregar Producto"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl mt-12 mb-12">
          <h3 className="text-3xl font-bold text-center mb-6">Productos Guardados</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productos.map((producto) => (
              <div key={producto.id} className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center space-y-4">
                  <img src={producto.img} alt={producto.name} className="w-24 h-24 object-cover rounded-lg" />
                  <h4 className="text-xl font-semibold text-gray-800">{truncateText(producto.name, 20)}</h4>
                  <p className="text-sm text-gray-600">Tipo: {producto.type}</p>
                  <p className="text-sm text-gray-600">Precio: {producto.price}€</p>
                  <p className="text-sm text-gray-600">Descripción: {truncateText(producto.description, 50)}</p>

                  <div className="flex space-x-4">
                    <button onClick={() => editarProducto(producto)} className="text-blue-500 hover:text-blue-700">
                      Editar
                    </button>
                    <XMarkIcon className="h-6 w-6 cursor-pointer text-red-500" onClick={() => eliminarProducto(producto.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default AgregarProductos;
