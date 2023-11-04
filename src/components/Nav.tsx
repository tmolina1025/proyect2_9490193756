import React from "react";
import { Link,Navigate } from "react-router-dom";
import "../assets/styles/NavStyles.scss";

interface NavProps {
  token: string | null;
  onLogout: () => void;
  typeUser: string | null;
}

const Nav: React.FC<NavProps> = ({ token, onLogout, typeUser }) => {
  return (
    <nav>
      <div className="nav-logo">Mi Aplicación</div>
      <ul className="nav-links">
        {token ? (

          typeUser === "Admin"
          ?(<><li className="nav-link">
            <Link to="/gestion">Gestion productos</Link>
          </li>
          <li className="nav-link">
            <button onClick={onLogout}>Cerrar sesión</button>
          </li></>)
          :<>
            <li className="nav-link">
              <Link to="/home">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/carrito">Mi carrito</Link>
            </li>
            <li className="nav-link">
              <Link to="/perfil">Perfil</Link>
            </li>
            <li className="nav-link">
              <button onClick={onLogout}>Cerrar sesión</button>
            </li>
            
          </>
        ) : (
          <>
            <li className="nav-link">
              <Link to="/">Login</Link>
            </li>
            <li className="nav-link">
              <Link to="/register">Registrarme</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
