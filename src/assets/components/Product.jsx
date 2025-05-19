import { useState, useMemo, useCallback, useEffect} from "react";
import FormularioProducto from "./ProductForm"; // Usamos el nuevo nombre
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import "./Product.css";

function Producto() {
  const [products, setProducts] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const ModoEditarProducto = useCallback((producto) => {
    console.log("Editando producto:", producto)
    setProductoEnEdicion(producto)
    setModoEdicion(true)
}, []);

  const GuardarEdicion = useCallback((productoEditado) => {
  const productosActualizados = products.map((prod) =>
    prod.id === productoEditado.id ? productoEditado : prod
  );
  setProducts(productosActualizados);
  setModoEdicion(false);
  setProductoEnEdicion(null);
}, [products]);

 const handleCancelarEdicion = () => {
    setProductoEnEdicion(null);
    setModoEdicion(false);
  };

  const alAgregarProducto = useCallback((producto) => {
    setProducts([...products, producto]);
  }, [products]);

  const handleBuscar = useCallback((termino) => {
    setTerminoBusqueda(termino.toLowerCase());
  }, []);

  const productosFiltrados = useMemo(() => {
    return products
      .filter((prod) => prod.estado)
      .filter((prod) =>
        prod.nombre.toLowerCase().includes(terminoBusqueda) ||
        prod.marca.toLowerCase().includes(terminoBusqueda) ||
        prod.id.toString().includes(terminoBusqueda)
    );
  }, [products, terminoBusqueda]);

  //useEffect para detectar cambios en el array de productos
  useEffect(() => {
    console.log("El Array de productos ha cambiado:", products);
  }, [products]);

  const eliminarProducto = useCallback((id) => {
    const productosRestantes = products.map((prod) => 
      prod.id === id ? { ...prod, estado:false } : prod
    );
    setProducts(productosRestantes);
  }, [products]);

  return (
    <div className="producto">
      <header>
        <h1 className="titulo">Productos</h1>
      </header>
      <main>
        {modoEdicion ? (
          <FormularioProducto
            productoEnEdicion={productoEnEdicion}
            alGuardarEdicion={GuardarEdicion}
            onCancelarEdicion={handleCancelarEdicion}
          />
        ) : (
          <>
        <SearchBar onBuscar={handleBuscar} />
        <FormularioProducto 
        alAgregarProducto={alAgregarProducto} 
        />
        <ProductList 
        products={productosFiltrados}
        onEditar={ModoEditarProducto} 
        onEliminar={eliminarProducto}
        />
        </>
        )}
      </main>
    </div>
  );
}

export default Producto;
