// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SideNav from './components/SideNav';
import Login from './components/Login';
import Cardapio from './components/Cardapio';
import TestesIntegracao from './components/TestesIntegracao';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/testes" element={<TestesIntegracao />} />
      </Routes>
      <SideNav />
    </Router>
  );
};

export default RoutesComponent;