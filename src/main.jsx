import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importar Router, Routes y Route
import Inicio from './Inicio.jsx'
import Tienda from './Tienda.jsx'
import Carrito from './Carrrito.jsx';
import Productos from './AgregarProductos.jsx';
import Login from './Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Mover Router a aquí */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/agregar" element={<Productos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </StrictMode>,
)
