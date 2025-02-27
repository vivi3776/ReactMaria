import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import NavBar from './NavBar';
import BottomBar from './BottomBar';
import './index.css'; // Importar Tailwind aquí

function Inicio() {
  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center text-black"
        style={{ backgroundImage: "url('/img/wallpaper.webp')" }}
      >
        <NavBar carritoCount={5} /> {/* Pasa el número de items en el carrito */}

        {/* Texto centrado con ajuste vertical */}
        <div className="flex-grow m-8 bg-white flex justify-center items-center">
          {/* Aquí puedes agregar más contenido si lo deseas */}
        </div>

        <BottomBar /> {/* Barra inferior */}
      </div>
    </>
  );
}

export default Inicio;
