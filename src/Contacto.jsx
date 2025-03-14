import { useState } from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    alert("Formulario recibido");

    
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-center text-black" style={{ backgroundImage: "url('/img/wallpaper.webp')" }}>
      <NavBar carritoCount={0} />

      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl mt-12 mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Formulario de Contacto</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="email"
                className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default Contacto;
