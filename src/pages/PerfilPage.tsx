import React, {useState,useEffect} from 'react'
import User from '../models/User';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PerfilPage = () => {

    const [user, setUser] = useState(new User());
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
    
            const token = localStorage.getItem("token");
            const DPI = localStorage.getItem("DPI");
            fetch("http://localhost:3000/api/perfil/"+DPI,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                console.log({result: data});
                Swal.fire("Datos actualizados")
                navigate('/perfil')
            })
            .catch(error => {
                console.error("Error al obtener datos de productos:", error);
            });
        } catch (error) {
          
        }
        //setUser(new User());
    };

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const DPI = localStorage.getItem("DPI");
        if(!token){
        navigate('/')
        }else {
        // Realiza la solicitud fetch a la API de productos
        
        fetch("http://localhost:3000/api/perfil/"+DPI,{
            method: "GET",
            headers: {
            "Authorization": "Bearer "+token,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const datosDelUsuario = new User(
                    data.CorreoElectronico,
                    data.Clave,
                    '',
                    data.Nombres,
                    data.Apellidos,
                    data.FechaNacimiento,
                    data.DireccionEntrega,
                    data.NIT,
                    data.NumeroTelefonico,
                    "",
                );
                setUser(datosDelUsuario);
            })
            .catch(error => {
                console.error("Error al obtener datos de productos:", error);
            });
        }
    },[])

    return (
        <div className="register-container" style={{marginTop: "300px"}}>
          <h2>Modificar Datos de Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="CorreoElectronico"
                value={user.CorreoElectronico}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Clave</label>
              <input
                type="password"
                name="Clave"
                value={user.Clave}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label>Nombres</label>
              <input
                type="text"
                name="Nombres"
                value={user.Nombres}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Apellidos</label>
              <input
                type="text"
                name="Apellidos"
                value={user.Apellidos}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="FechaNacimiento"
                value={user.FechaNacimiento}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Dirección de Entrega</label>
              <input
                type="text"
                name="DireccionEntrega"
                value={user.DireccionEntrega}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>NIT</label>
              <input
                type="text"
                name="NIT"
                value={user.NIT}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Número Telefónico</label>
              <input
                type="tel"
                name="NumeroTelefonico"
                value={user.NumeroTelefonico}
                onChange={handleChange}
              />
            </div>
            
            <button type="submit" className="register-button">
              Registrar Cambios
            </button>
          </form>
        </div>
      );
}

export default PerfilPage