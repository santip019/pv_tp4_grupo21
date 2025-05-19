import React from "react";

function ProductItem({ products, onEliminar, onEditar }) {
  return (
    <div className="product-container">
      <li id={products?.id} className="product-item">
        <p><strong>{products.nombre}</strong></p>
        <p>Marca:{products.marca}</p>
        <p>ID: {products.id}</p>
        <p>Precio: ${products.precioUnitario}</p>
        <p>Descuento: {products.descuento}%</p>
        <p>Precio con Descuento: ${products.precioConDescuento}</p>
        <p>Stock: {products.stock}</p>

        <button onClick={() => onEditar(products)}>Editar</button>
        <button onClick={() => onEliminar(products.id)}>Eliminar</button>
      </li>
    </div>
  );
}

export default ProductItem;