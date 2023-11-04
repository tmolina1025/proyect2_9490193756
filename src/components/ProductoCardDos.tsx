import React, {Dispatch, SetStateAction} from "react";
import { Producto } from "../models/Producto";
import "../assets/styles/ProductoCard.scss";
import Swal  from "sweetalert2";

interface ProductCardProps {
  product: Producto;
  setProducto: Dispatch<SetStateAction<Producto>>;
  setEditar: Dispatch<SetStateAction<boolean>>;
  handleToggle: ()=> void;
}

const ProductCardDos: React.FC<ProductCardProps> = ({ product,setProducto,setEditar,handleToggle }) => {

  const handleEditar = (producto: Producto) => {
    setProducto(producto);
    setEditar(true);
  };

  const handleEliminar = (producto: Producto) => {
    try {
    
        const token = localStorage.getItem("token");
        fetch("http://localhost:3000/api/producto/"+producto.Identificador,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log({result: data});
            handleToggle();
            Swal.fire("Producto eliminado");
            setProducto(new Producto());
        })
        .catch(error => {
            console.error("Error al obtener datos de productos:", error);
        });
    } catch (error) {
      
    }
  };


  return (
    <div className="product-card">
      <div className="availability">Disp: {product.Disponibilidad}</div>
      <img src={product.Imagen} alt={product.Nombre} />
      <h3>{product.Nombre}</h3>
      <p>Oferta: Q{product.Precio - product.Descuento}</p>
      <button className="editar-button" onClick={()=>handleEditar(product)}>Editar</button>
      <button className="eliminar-button" onClick={()=>handleEliminar(product)}>Eliminar</button>
    </div>
  );
};

export default ProductCardDos;
