import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import NavBar from './NavBar';
import BottomBar from './BottomBar';
import './index.css' // Importar Tailwind aquí

function Inicio() {
  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center text-black"
        style={{ backgroundImage: "url('/img/wallpaper.webp')" }}
      >
        <NavBar />

        {/* Texto centrado con ajuste vertical */}

        <div className="m-8 bg-white ">

          <h1>TIenda </h1>

          <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Categorías</h2>
          <ul className="space-y-2">
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Drones</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Cámaras</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Accesorios</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Baterías</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Ofertas</li>
          </ul>
        </div>


        </div>
        <BottomBar/>
      </div>
      
    </>
  );
}

export default Inicio;
