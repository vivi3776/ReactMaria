import { useState, useEffect } from "react";

export default function Categorias({ categories, toggleCategory, openCategory, seleccionarCategoria }) {
  return (
    <div className="w-1/5 m-8 bg-white p-4 rounded shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-4">Tienda</h1>

      <h2 className="text-xl font-bold mb-4">Categorías</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.name}>
            <div
              className="hover:bg-gray-700 p-2 rounded cursor-pointer flex justify-between items-center"
              onClick={() => toggleCategory(category.name)}
            >
              {category.name}
              <span>{openCategory === category.name ? "▲" : "▼"}</span>
            </div>
            {openCategory === category.name && (
              <ul className="pl-4 mt-2 space-y-1">
                {category.subcategories.map((sub) => (
                  <li
                    key={sub}
                    className="p-2 bg-gray-200 rounded hover:text-blue-600 cursor-pointer"
                    onClick={() => seleccionarCategoria(sub)} // Agregar al filtro
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
