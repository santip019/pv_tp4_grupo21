import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import "./Product.css";

function Producto () {
  const [products, setProducts] = useState([]);

  const agregarProducto = ({descripcion, precioUnitario, descuento, precioConDescuento, stock}) => {
    const nuevoProducto = {
      id: Date.now(),
      descripcion,
      precioUnitario,
      descuento,
      precioConDescuento,
      stock
    };
    setProducts([...products, nuevoProducto]);
  };

    return (
      <div className="producto">
        <header>
          <h1 className="titulo">Productos</h1>
        </header>
        <main>
          
          <ProductForm onAgregar={agregarProducto} /> {/* Formulario para agregar un producto*/}
          <ProductList products={products} /> {/* Llamado a ProductList.jsx para mostrar los productos*/}

        </main>
      </div>
    );
}

export default Producto;