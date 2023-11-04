import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../assets/styles/MiCarritoPage.scss";



const MiCarritoPage = () => {
    const [ refrescar, setRefrescar] = useState(false);

    const handleToggle = () => {
        setRefrescar(!refrescar);
      };

    const navigate = useNavigate();
    interface Carrito {
        _id: string;
        Productos: Array<{
          _id: string;
          Imagen: string;
          Nombre: string;
          Marca: string;
          Precio: number;
          Cantidad: number;
          PrecioDescuento: number;
          Identificador: string;
        }>;
        Total: number;
        Usuario: string;
      }
    const [carrito, setCarrito] = useState<Carrito>({
        _id: "",
        Productos: [],
        Total: 0,
        Usuario: "",
    });

    useEffect(()=>{
        const id_carrito = localStorage.getItem("id_carrito");
        if(id_carrito){
          const token = localStorage.getItem("token");
        if(!token){
          navigate('/')
        }else {
          // Realiza la solicitud fetch a la API de productos
          fetch("http://localhost:3000/api/carrito/"+id_carrito,{
            method: "GET",
            headers: {
              "Authorization": "Bearer "+token,
            },
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setCarrito(data);
            })
            .catch(error => {
              console.error("Error al obtener datos de productos:", error);
            });
        }
        }


      },[refrescar])

      const handleEliminarProducto = (productId: string) => {
        const id_carrito = localStorage.getItem("id_carrito");
        const token = localStorage.getItem("token");
        if(!token){
          navigate('/')
        }else {
            var bodyObj = {
                "Identificador": productId
            }
          fetch("http://localhost:3000/api/carrito/detalle/"+id_carrito,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              "Authorization": "Bearer "+token,
            },
            body: JSON.stringify(bodyObj)
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              handleToggle();
            })
            .catch(error => {
              console.error("Error al obtener datos de productos:", error);
            });
        }
      };
    
      const handleTerminarCompra = () => {
        const id_carrito = localStorage.getItem("id_carrito");
        const token = localStorage.getItem("token");
        if(!token){
          navigate('/')
        }else {
            var bodyObj = {
                "CarritoId": id_carrito
            }
          fetch("http://localhost:3000/api/compra",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              "Authorization": "Bearer "+token,
            },
            body: JSON.stringify(bodyObj)
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              localStorage.removeItem("id_carrito");
              navigate('/home')
            })
            .catch(error => {
              console.error("Error al obtener datos de productos:", error);
            });
        }
      };



      return (
        carrito.Productos.length === 0
        ?(<h1>El carrito esta vacio</h1>)
        :(<div className="mi-carrito">
        <h1>Mi Carrito</h1>
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio normal</th>
              <th>Precio con descuento</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {carrito.Productos.map((producto) => (
              <tr key={producto._id}>
                <td>
                  <img src={producto.Imagen} alt={producto.Nombre} />
                </td>
                <td>{producto.Nombre}</td>
                <td>{producto.Marca}</td>
                <td>Q{producto.Precio}</td>
                <td>Q{producto.PrecioDescuento}</td>
                <td>{producto.Cantidad}</td>
                <td>Q{producto.PrecioDescuento * producto.Cantidad}</td>
                <td>
                  <button onClick={() => handleEliminarProducto(producto.Identificador)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <p>Total: Q{carrito.Total}</p>
        </div>
        <button onClick={handleTerminarCompra}>Terminar mi compra</button>
      </div>)
      );
}

export default MiCarritoPage