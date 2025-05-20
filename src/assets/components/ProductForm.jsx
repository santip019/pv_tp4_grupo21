import React, { useState, useEffect, useCallback } from "react";

const FormularioProducto = ({
  alAgregarProducto,
  productoEnEdicion,
  alGuardarEdicion,
  onCancelarEdicion,
}) => {
  const [datosFormulario, setDatosFormulario] = useState({
    id: crypto.randomUUID().slice(0, 6), // crea un ID único de 6 caracteres
    nombre: "",
    marca: "",
    precioUnitario: "",
    descuento: "0",
    precioConDescuento: "",
    stock: "",
  });

  useEffect(() => {
    if (productoEnEdicion) {
      setDatosFormulario({
        ...productoEnEdicion,
        precioUnitario: productoEnEdicion.precioUnitario.toString(),
        descuento: productoEnEdicion.descuento.toString(),
        stock: productoEnEdicion.stock.toString(),
      });
    }
  }, [productoEnEdicion]);

  const manejarCambio = useCallback((evento) => {
    const { name, value } = evento.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const manejarEnvio = useCallback(
    (evento) => {
      evento.preventDefault();

      // Validación de que todos los campos estén llenos
      if (
        !datosFormulario.nombre ||
        !datosFormulario.marca ||
        !datosFormulario.precioUnitario ||
        !datosFormulario.descuento ||
        !datosFormulario.stock
      ) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Calcular precio con descuento
      const precioConDescuento =
        datosFormulario.precioUnitario * (1 - datosFormulario.descuento / 100);

      // Crear un nuevo producto
      const nuevoProducto = {
        ...datosFormulario,
        precioUnitario: parseFloat(datosFormulario.precioUnitario),
        descuento: parseFloat(datosFormulario.descuento),
        stock: parseInt(datosFormulario.stock, 10),
        precioConDescuento,
        estado: true,
      };

      // Llamar a la función correspondiente
      if (productoEnEdicion) {
        alGuardarEdicion(nuevoProducto);
      } else {
        alAgregarProducto(nuevoProducto);
        setDatosFormulario({
          id: crypto.randomUUID().slice(0, 6),
          nombre: "",
          marca: "",
          precioUnitario: "",
          descuento: "0",
          precioConDescuento: "",
          stock: "",
        });
      }
    },
    [alAgregarProducto, alGuardarEdicion, datosFormulario, productoEnEdicion]
  );

  return (
    <form onSubmit={manejarEnvio}>
      <div className="id">
        <label>ID: </label>
        <span>{datosFormulario.id}</span>
      </div>
      <div className="nombre">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={datosFormulario.nombre}
          onChange={manejarCambio}
          pattern="^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
          title="Solo letras y espacios, no solo espacios"
        />
      </div>
      <div className="marca">
        <label>Marca:</label>
        <input
          type="text"
          name="marca"
          value={datosFormulario.marca}
          onChange={manejarCambio}
          pattern="^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
          title="Solo letras y espacios, no solo espacios"
        />
      </div>
      <div className="precio">
        <label>Precio Unitario:</label>
        <input
          type="number"
          name="precioUnitario"
          value={datosFormulario.precioUnitario}
          onChange={manejarCambio}
          min="0" // se asegura de que el precio no sea negativo
        />
      </div>
      <div className="descuento">
        <label>Descuento (%):</label>
        <input
          type="number"
          name="descuento"
          value={datosFormulario.descuento}
          onChange={manejarCambio}
          min="0" // se asegura de que el descuento no sea negativo
          max="100" // se asegura de que el descuento no sea mayor a 100
        />
      </div>
      <div className="precio-descuento">
        <label>Precio con Descuento:</label>
        <span>
          $
          {datosFormulario.precioUnitario && datosFormulario.descuento
            ? datosFormulario.precioUnitario *
              (1 - datosFormulario.descuento / 100)
            : ""}
        </span>
      </div>
      <div className="stock">
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={datosFormulario.stock}
          onChange={manejarCambio}
          min="0" // se asegura de que el stock no sea negativo
        />
      </div>
      <div className="estado">
        <label>Estado:</label>
        <span>
          {datosFormulario.estado === undefined || datosFormulario.estado ? "Activo" : "Inactivo"}
        </span>
      </div>
      <div className="contenedor-boton-agregar">
        <button className="agregar-cambiar" type="submit">
          {productoEnEdicion ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </div>

      {productoEnEdicion && (
        <button type="button" onClick={onCancelarEdicion}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default FormularioProducto;