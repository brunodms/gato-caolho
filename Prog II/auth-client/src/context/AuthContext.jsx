import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token') || ''; // Obter o token inicialmente
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState({
    email: localStorage.getItem('email') || '',
    senha: localStorage.getItem('senha') || '',
  });

  const login = (newToken, userData) => {
    localStorage.setItem('email', userData.email);
    localStorage.setItem('senha', userData.senha);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('senha');
    localStorage.removeItem('token');
    setToken('');
    setUser({ email: '', senha: '' });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
