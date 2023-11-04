import React, { useState } from 'react';
import User from '../models/User';
import '../assets/styles/RegisterPage.scss';
import { useNavigate } from 'react-router-dom';

interface RegisterPageProps {
  onLogin: (token: string) => void;
  typeUser: (typeUser: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onLogin, typeUser }) => {
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

      fetch("http://localhost:3000/api/registro/"+user.DPI,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.removeItem("id_carrito");
        localStorage.setItem("token", data.accessToken)
        localStorage.setItem("DPI", data.DPI);
        onLogin(data.accessToken);
        typeUser("Usuario");
        navigate('/home')
      })
      .catch(error => {
        console.error("Error al obtener datos de productos:", error);
      });
    } catch (error) {
      
    }
    //setUser(new User());
  };

  return (
    <div className="register-container" style={{marginTop: "300px"}}>
      <h2>Registro de Usuario</h2>
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
          <label>Validación de Clave</label>
          <input
            type="password"
            name="ValidacionClave"
            value={user.ValidacionClave}
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
        <div>
          <label>DPI</label>
          <input
            type="text"
            name="DPI"
            value={user.DPI}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="register-button">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
