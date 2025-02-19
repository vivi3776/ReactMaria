import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Inicio from './Inicio.jsx'
import Tienda from './Tienda.jsx'
import './index.css' // Importar Tailwind aquí
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tienda />
  </StrictMode>,
)
