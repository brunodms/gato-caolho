import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from './context/AuthContext';
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import Login from "./components/Login";
import Cardapio from "./components/Cardapio";
import TestesIntegracao from "./components/TestesIntegracao";
import Register from "./components/Register";

const onLoginSuccess = (response) => {
  console.log("Login bem-sucedido", response);
  // Redirecionar ou outras ações pós-login
};

const onRegisterSuccess = (response) => {
  console.log("Registro bem-sucedido", response);
  // Redirecionar ou outras ações pós-registro
};

const RoutesComponent = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login onLoginSuccess={onLoginSuccess}/>} />
        <Route path="/cardapio" element={token ? <Cardapio /> : <Login onLoginSuccess={onLoginSuccess}/>} />
        <Route path="/testes" element={<TestesIntegracao />} />
        <Route path="/register" element={<Register onRegisterSuccess={onRegisterSuccess} />} />
      </Routes>
      <Header />
      <SideNav />
    </Router>
  );
};

export default RoutesComponent;
