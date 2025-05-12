import { useState, useMemo, useCallback } from "react";
import FormularioProducto from "./ProductForm"; // Usamos el nuevo nombre
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import "./Product.css";

function Producto() {
  const [products, setProducts] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const alAgregarProducto = useCallback((producto) => {
    setProducts([...products, producto]);
  }, [products]);

  const handleBuscar = useCallback((termino) => {
    setTerminoBusqueda(termino.toLowerCase());
  }, []);

  const productosFiltrados = useMemo(() => {
    return products.filter((prod) =>
      prod.descripcion.toLowerCase().includes(terminoBusqueda) ||
      prod.id.toString().includes(terminoBusqueda)
    );
  }, [products, terminoBusqueda]);

  return (
    <div className="producto">
      <header>
        <h1 className="titulo">Productos</h1>
      </header>
      <main>
        <SearchBar onBuscar={handleBuscar} />
        <FormularioProducto alAgregarProducto={alAgregarProducto} />
        <ProductList products={productosFiltrados} />
      </main>
    </div>
  );
}

export default Producto;
