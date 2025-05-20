
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
