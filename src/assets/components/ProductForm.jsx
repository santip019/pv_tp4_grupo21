import React, { useState } from "react";

const FormularioProducto = ({ alAgregarProducto }) => {
  const [datosFormulario, setDatosFormulario] = useState({
    id: crypto.randomUUID().slice(0, 6), // crea un ID único de 6 caracteres
    descripcion: "",
    precioUnitario: "",
    descuento: "0",
    precioConDescuento: "",
    stock: "",
  });

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: value,
    });
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    // validacion de que todos los campos se llenen para agregar el producto
    if (
      !datosFormulario.descripcion ||
      !datosFormulario.precioUnitario ||
      !datosFormulario.descuento ||
      !datosFormulario.stock
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // para calcular precio con descuento
    const precioConDescuento =
      datosFormulario.precioUnitario * (1 - datosFormulario.descuento / 100);

    // para crear un nuevo producto
    const nuevoProducto = {
      ...datosFormulario,
      precioUnitario: parseFloat(datosFormulario.precioUnitario),
      descuento: parseFloat(datosFormulario.descuento),
      stock: parseInt(datosFormulario.stock, 10),
      precioConDescuento,
    };

    // llama a la funcion para poder agregar un nuevo producto
    alAgregarProducto(nuevoProducto);

    // para limpiar el formulario
    setDatosFormulario({
      id: crypto.randomUUID().slice(0, 6),
      descripcion: "",
      precioUnitario: "",
      descuento: "0",
      precioConDescuento: "",
      stock: "",
    });
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div>
        <label>ID: </label>
        <span>{datosFormulario.id}</span>
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={datosFormulario.descripcion}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Precio Unitario:</label>
        <input
          type="number"
          name="precioUnitario"
          value={datosFormulario.precioUnitario}
          onChange={manejarCambio}
        />
      </div>
      <div>
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
      <div>
        <label>Precio con Descuento:</label>
        <span> $ 
          { // se asegura de que el precio con descuento solo se muestre si hay un precio unitario y un descuento
            datosFormulario.precioUnitario &&
            datosFormulario.descuento
              ? datosFormulario.precioUnitario *
                (1 - datosFormulario.descuento / 100)
              : ""
          }
        </span>
      </div>
      <div>
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={datosFormulario.stock}
          onChange={manejarCambio}
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default FormularioProducto;