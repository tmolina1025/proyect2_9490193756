import React, { useEffect, useState } from 'react';
import { Producto } from "../models/Producto";
import ProductCard from "../components/ProductoCard";
import "../assets/styles/HomePage.scss";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  let navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/')
    }else {
      // Realiza la solicitud fetch a la API de productos
      fetch("http://localhost:3000/api/producto",{
        method: "GET",
        headers: {
          "Authorization": "Bearer "+token,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setProductos(data); // Almacena los datos en el estado 'productos'
        })
        .catch(error => {
          console.error("Error al obtener datos de productos:", error);
        });
    }
  },[])

  return (
    <div className="home-page" style={{marginTop: "100px"}}>
      <h1>Listado de Productos</h1>
      <div className="product-list">
        {productos.map((product: Producto, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
