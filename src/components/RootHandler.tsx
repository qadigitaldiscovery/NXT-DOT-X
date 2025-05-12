
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PrototypeSelector from '@/pages/PrototypeSelector';

const RootHandler: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <PrototypeSelector />;
  } else {
    return <Navigate to="/landing" replace />;
  }
};

export default RootHandler;
