import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState({
    email: localStorage.getItem('email') || '',
    senha: localStorage.getItem('senha') || '',
  });

  const login = (newToken, user) => {
    localStorage.setItem('email', user.email);
    localStorage.setItem('senha', user.senha);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(user);
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