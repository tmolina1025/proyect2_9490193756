import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import "./appStyle.scss"

import React, { useState } from "react";
import MiCarritoPage from "./pages/MiCarritoPage";
import PerfilPage from "./pages/PerfilPage";
import GestionPage from "./pages/GestionPage";

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [typeUser, setTypeUser] = useState<string | null>(localStorage.getItem("typeUser"));
  
  const navigate = useNavigate();
  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate('');
  };

  const handleTypeUser = (typeUser: string) => {
    localStorage.setItem("typeUser", typeUser);
    setTypeUser(typeUser);
  };

  
  return (
    <div>
      
      <Routes>
        <Route path="/" element={
        <div className="center-content">
          <Nav token={token} onLogout={handleLogout} typeUser={typeUser}/>
          <main>
            <Outlet />
          </main>
        </div>}>
          <Route index element={<LoginPage onLogin={handleLogin} token={token} typeUser={handleTypeUser}/>} />
          <Route path="home" element={<HomePage />} />
          <Route path="register" element={<RegisterPage onLogin={handleLogin} typeUser={handleTypeUser}/>} />
          <Route path="carrito" element={<MiCarritoPage />} />
          <Route path="perfil" element={<PerfilPage />} />
          <Route path="gestion" element={<GestionPage />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}