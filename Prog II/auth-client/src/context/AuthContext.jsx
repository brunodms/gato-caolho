/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token') || '';
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState({
    id_usuario: localStorage.getItem('id_usuario') || '',
    email: localStorage.getItem('email') || '',
    senha: localStorage.getItem('senha') || '',
  });

  const login = (newToken, userData) => {
    localStorage.setItem('id_usuario', userData.id_usuario);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('senha', userData.senha);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('email');
    localStorage.removeItem('senha');
    localStorage.removeItem('token');
    setToken('');
    setUser({ id_usuario: '', email: '', senha: '' });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
