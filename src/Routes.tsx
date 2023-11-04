import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const Router = () => {

  return (
    <Routes>
      <Route path="/" ><LoginPage /></Route>
      <Route path="/home" ><HomePage /></Route>
    </Routes>
  );
};

export default Router;
