
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import MasterDash from '@/pages/MasterDash';

const RootHandler: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <MasterDash />;
  } else {
    return <Navigate to="/landing" replace />;
  }
};

export default RootHandler;
