import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import "../styles/Product.css";

function Producto () {
  const [products, setProducts] = useState([]);

  const agregarProducto = ({descripcion, precioUnitario, descuento, precioConDescuento, stock}) => {
    const nuevaTarea = {
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
          <h1 className="Titulo">Productos</h1>
          <h2 className="Subtitulo">Aqui apareceran tus productos</h2>
        </header>
        <main>
          {/* Formulario para agregar un producto*/}
          <ProductForm onAgregar={agregarProducto} />
          {/* Llamado a ProductList.jsx para mostrar los productos*/}

          {/*{products.length > 0 ? (
            <ProductList
              products={products}
              onEliminar={eliminarProducto} esto todavia no lo agregue
            />
          ) : (
            <p className="no-products">
              No Hay Productos Registrados. ¡Agrega un nuevo Producto!
            </p>
          )} */}
        </main>
      </div>
    );
}

export default Producto;