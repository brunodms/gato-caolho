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
import Account from "./components/Account";
import AddProduct from "./components/addProduct";

const onLoginSuccess = (response) => {
  console.log("Login bem-sucedido", response);
  // Redirecionar ou outras ações pós-login
};

const onSignupSuccess = (response) => {
  console.log("Registro bem-sucedido", response);
  // Redirecionar ou outras ações pós-registro
};

const onProductAdded = (response) => {
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
        <Route path="/testes" element={token ? <TestesIntegracao /> : <Login onLoginSuccess={onLoginSuccess}/>} />
        <Route path="/signup" element={<Register onSignupSuccess={onSignupSuccess} />} />
        <Route path="/account" element={token ? <Account /> : <Login onLoginSuccess={onLoginSuccess}/> } />
        <Route path="/addproduct" element={token ? <AddProduct onProductAdded={onProductAdded}/> : <Login onLoginSuccess={onLoginSuccess}/>} />
      </Routes>
      <Header />
      <SideNav />
    </Router>
  );
};

export default RoutesComponent;
