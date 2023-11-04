import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Producto } from "../models/Producto";
import ProductCardDos from "../components/ProductoCardDos";
import "../assets/styles/HomePage.scss";
import { useNavigate } from "react-router-dom";
import Swal  from "sweetalert2";


const GestionPage: React.FC = () => {
  let navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [refrescar, setRefrescar] = useState(false);
  const [editar, setEditar] = useState(false);

    const handleToggle = () => {
        setRefrescar(!refrescar);
    };

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
    },[refrescar]);

    const [producto, setProducto] = useState<Producto>(new Producto());

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
    
        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setProducto({...producto, Habilitado: checkbox.checked});
        } else {
            setProducto({...producto, [name]: value});
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        try {
        
            const token = localStorage.getItem("token");
            fetch("http://localhost:3000/api/producto",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                },
                body: JSON.stringify(producto)
            })
            .then(response => response.json())
            .then(data => {
                console.log({result: data});
                Swal.fire("Producto guardado");
                handleToggle();
                setProducto(new Producto());
            })
            .catch(error => {
                console.error("Error al obtener datos de productos:", error);
            });
        } catch (error) {
        
        }
    };



    const handleEditar = (e: FormEvent) => {
        e.preventDefault();
        try {
            console.log("entre");
            const token = localStorage.getItem("token");
            fetch("http://localhost:3000/api/producto/"+producto.Identificador,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                },
                body: JSON.stringify(producto)
            })
            .then(response => response.json())
            .then(data => {
                console.log({result: data});
                Swal.fire("Producto guardado");
                handleToggle();
                setProducto(new Producto());
                setEditar(false);
                handleToggle();
            })
            .catch(error => {
                console.error("Error al obtener datos de productos:", error);
            });
        } catch (error) {
        
        }
    };

  return (
    <div className="home-page" style={{marginTop: "100px"}}>

<div className="nuevo-producto-form">
      <h2 style={{height: "50vh"}}>Crear Nuevo Producto</h2>
      <form onSubmit={editar?handleEditar:handleSubmit} style={{display: "grid",gridTemplateColumns: "1fr 1fr", gap: "20px", columnGap: "40px"}}>
        <label>Identificador:
          <input type="text" name="Identificador" value={producto.Identificador} onChange={handleChange} required />
        </label>
        <label>Nombre:
          <input type="text" name="Nombre" value={producto.Nombre} onChange={handleChange} required />
        </label>
        <label>Marca:
          <input type="text" name="Marca" value={producto.Marca} onChange={handleChange} required />
        </label>
        <label>Disponibilidad:
          <input type="number" name="Disponibilidad" value={producto.Disponibilidad} onChange={handleChange} required />
        </label>
        <label>Precio:
          <input type="number" name="Precio" value={producto.Precio} onChange={handleChange} required />
        </label>
        <label>Descuento:
          <input type="number" name="Descuento" value={producto.Descuento} onChange={handleChange} required />
        </label>
        <label>Imagen:
          <input type="text" name="Imagen" value={producto.Imagen} onChange={handleChange} required />
        </label>
        <label>Descripción:
          <textarea name="Descripcion" value={producto.Descripcion} onChange={handleChange} required />
        </label>
        <label>Categorías:
          <input type="text" name="Categorias" value={producto.Categorias} onChange={handleChange} required />
        </label>
        <label>Habilitado:
          <input type="checkbox" name="Habilitado" checked={producto.Habilitado || false} onChange={handleChange} />
        </label>
        {
            editar
            ?<button type="submit" onChange={handleEditar}>Editar Producto</button>
            :<button type="submit">Guardar Producto</button>

        }
        
      </form>
    </div>


      <h1>Listado de Productos</h1>
      <div className="product-list">
        {productos.map((productoMap: Producto, index) => (
          <ProductCardDos key={index} product={productoMap} setProducto={setProducto} setEditar={setEditar} handleToggle={handleToggle}/>
        ))}
      </div>
    </div>
  );
};

export default GestionPage;
