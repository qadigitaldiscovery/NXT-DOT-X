
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

const RootHandler: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      // Wait for auth to be checked
      return;
    }
    
    if (isAuthenticated) {
      navigate('/master');
    } else {
      navigate('/landing');
    }
  }, [isAuthenticated, navigate, loading]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mr-2"></div>
      <div className="text-gray-600">Initializing application...</div>
    </div>
  );
};

export default RootHandler;
