import React from "react";

function SearchBar({ onBuscar }) {
  const handleChange = (e) => {
    onBuscar(e.target.value);
  };

  return (
    <div className="contenedor-buscar">
      <input className="buscar"
        type="text"
        placeholder="Buscar por ID, nombre o marca"
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;

