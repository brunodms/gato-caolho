/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from './context/AuthContext';
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import Login from "./components/Login";
import Cardapio from "./components/Menu";
import TestesIntegracao from "./components/TestesIntegracao";
import Register from "./components/Signup";

const onLoginSuccess = (response) => {
  console.log("Login bem-sucedido", response);
  // Redirecionar ou outras ações pós-login
};

const onSignupSuccess = (response) => {
  console.log("Registro bem-sucedido", response);
  // Redirecionar ou outras ações pós-registro
};

const RoutesComponent = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login onLoginSuccess={onLoginSuccess}/>} />
        <Route path="/menu" element={token ? <Cardapio /> : <Login onLoginSuccess={onLoginSuccess}/>} />
        <Route path="/testes" element={<TestesIntegracao />} />
        <Route path="/signup" element={<Register onSignupSuccess={onSignupSuccess} />} />
      </Routes>
      <Header />
      <SideNav />
    </Router>
  );
};

export default RoutesComponent;
