import React, { useEffect,useState } from "react";
import "../assets/styles/LoginPage.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


interface LoginPageProps {
  onLogin: (token: string) => void;
  token: string | null;
  typeUser: (typeUser: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, token, typeUser }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate('/home')
    }
  },[])

  const handleLogin = async () => {
    const formData = {
      CorreoElectronico: email,
      Clave: password,
    };

    try {
      fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then( response => {
        if(response.status !== 200){
          console.log(response);
          if(response.status===401) Swal.fire("Credenciales incorrectas");
          throw Error('hubo un error en el');
          
        }

        return response.json();
        
      }).then(data=> {
        console.log(data);
        navigate('/home');
        localStorage.setItem("token", data.Token);
        localStorage.setItem("DPI", data.DPI);
        typeUser(data.Rol);
        onLogin(data.Token);
      })
      
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <input
        type="text"
        placeholder="Correo electrónico"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="login-button">
        Iniciar sesión
      </button>
    </div>
  );
};

export default LoginPage;
