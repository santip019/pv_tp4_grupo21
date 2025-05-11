import ProductItem from "./ProductItem";

function ProductList({ products, onEditar, onEliminar }) {
    
    if (!products || products.length === 0) {
        return <p>No hay productos registrados</p>;
    }

    return (
        <ul className="listado-productos">
            {products.map((products) => (
                <ProductItem 
                    key={products.id} 
                    products={products}
                    onEditar={onEditar}
                    onEliminar={onEliminar}
                />
            ))}
        </ul>
    );
}

export default ProductList;