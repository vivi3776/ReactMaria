import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección
import NavBar from "./NavBar";
import BottomBar from "./BottomBar"; // Asegúrate de tener el componente BottomBar

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate(); // Hook de redirección

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    const validPassword = "renaido"; // Contraseña común para ambos usuarios

    // Validación simple de usuario y contraseña
    if ((username === "admin" || username === "user") && password === validPassword) {
      setLoginError(false);
      alert(`Bienvenido, ${username === "admin" ? "Admin" : "Usuario"}`);
      
      // Guardar en localStorage que el usuario ha iniciado sesión
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username); // También puedes guardar el nombre de usuario si lo necesitas

      // Redirigir a la página de inicio
      navigate("/");
    } else {
      setLoginError(true);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-cover bg-center text-black" style={{ backgroundImage: "url('/img/wallpaper.webp')" }}>
        <NavBar carritoCount={0} />
        
        <div className="flex justify-center pt-24 pb-8"> {/* Espacio para no tapar el navbar */}
          <div className="w-full max-w-md px-6 py-8 rounded-lg shadow-md bg-white bg-opacity-90">
            <h1 className="text-3xl font-bold text-center mb-6">Inicio de Sesión</h1>

            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-lg font-semibold">Nombre de Usuario</label>
                <input
                  id="username"
                  type="text"
                  className="p-2 mt-2 border rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-lg font-semibold">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  className="p-2 mt-2 border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-center mt-4">Credenciales incorrectas. Intenta de nuevo.</p>
              )}

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <BottomBar />
      </div>
    </>
  );
}

export default Login;
