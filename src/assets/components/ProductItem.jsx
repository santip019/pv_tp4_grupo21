import React from "react";

function ProductItem({ products, onEliminar, onEditar }) {
  return (
    <div className="product-container">
      <li id={products?.id} className="product-item">
        <p className="titulo-producto"><strong>{products.nombre}</strong></p>
        <p>Marca:{products.marca}</p>
        <p>ID: {products.id}</p>
        <p>Precio: ${products.precioUnitario}</p>
        <p>Descuento: {products.descuento}%</p>
        <p>Precio con Descuento: ${products.precioConDescuento}</p>
        <p>Stock: {products.stock}</p>
        <p>
          Estado:{" "}
          {products.estado === undefined || products.estado ? "Activo" : "Inactivo"}
        </p>
        <div className="contenedor-botones">
          <button onClick={() => onEditar(products)}>Editar</button>
          <button onClick={() => onEliminar(products.id)}>Eliminar</button>
        </div>
      </li>
    </div>
  );
}

export default ProductItem;