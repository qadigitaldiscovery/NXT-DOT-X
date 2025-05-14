
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const RootHandler: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/master');
    } else {
      navigate('/landing');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-pulse text-red-600">Redirecting...</div>
    </div>
  );
};

export default RootHandler;
