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
        <div className="h-full flex flex-col justify-center items-center space-y-4 pb-100">
          <h1 className="text-white text-6xl font-bold ">
            Redescubre la gama Inspire
          </h1>
          <p className="text-white/70 text-3xl font-bold ">
            Para verdaderos profesionales
          </p>
          <div className="flex space-x-6">
            <button className="my-3 px-4 py-2 border-1 border-gray-500 rounded-full cursor-pointer hover:bg-gray-200/40"> Leer más </button>

            <button className="my-3 px-4 py-2 border-1 border-gray-500 rounded-full cursor-pointer hover:bg-gray-200/40"> Comprar </button>
            
          </div>
        </div>
      </div>
      <BottomBar/>
    </>
  );
}

export default Inicio;
