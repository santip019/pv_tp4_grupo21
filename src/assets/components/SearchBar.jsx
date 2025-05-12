import React from "react";

function SearchBar({ onBuscar }) {
  const handleChange = (e) => {
    onBuscar(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por ID o descripción"
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;

