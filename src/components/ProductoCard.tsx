import React from "react";
import { Producto } from "../models/Producto";
import "../assets/styles/ProductoCard.scss";
import Swal from 'sweetalert2';

interface ProductCardProps {
  product: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleCompraClick = () => {

    var idCarrito = localStorage.getItem("id_carrito");
    var token = localStorage.getItem("token");


    var datosCompra = {
      "Identificador": product.Identificador,
      "Nombre": product.Nombre,
      "Marca": product.Marca,
      "Precio": product.Precio,
      "Descuento": product.Descuento,
      "Imagen": product.Imagen,
      "Descripcion": product.Descripcion,
      "Cantidad": 1
    };

    console.log(idCarrito);

    if (idCarrito) {
      fetch(`http://localhost:3000/api/carrito/detalle/`+idCarrito, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify(datosCompra)
      })
        .then((response) => {
          return response.json;
        }).then((data)=>{
          console.log(data);
          Swal.fire("Agregado al carrito");
        });
    } else {
      fetch("http://localhost:3000/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify(datosCompra)
      })
        .then((response) => {
          return response.json();
        }).then((data)=>{
          console.log(data);
          Swal.fire("Agregado al carrito");
          localStorage.setItem("id_carrito", data.carritoGuardado._id);
        });
    }
  };

  return (
    <div className="product-card">
      <div className="availability">Disp: {product.Disponibilidad}</div>
      <img src={product.Imagen} alt={product.Nombre} />
      <h3>{product.Nombre}</h3>
      <p>{product.Marca}</p>
      <p>Precio: Q{product.Precio}</p>
      <p>Oferta: Q{product.Precio - product.Descuento}</p>
      <p>{product.Descripcion}</p>
      <button onClick={handleCompraClick}>Comprar</button>
    </div>
  );
};

export default ProductCard;
