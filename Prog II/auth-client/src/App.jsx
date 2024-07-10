// eslint-disable-next-line no-unused-vars
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import RoutesComponent from './Routes';

const App = () => {
  return (
    <AuthProvider>
        <RoutesComponent />
    </AuthProvider>
  );
};

export default App;