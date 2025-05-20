
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RootHandler: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("RootHandler: Auth state", { isAuthenticated, loading });
    
    if (loading) return;
    
    if (isAuthenticated) {
      console.log("RootHandler: Authenticated, navigating to master dashboard");
      navigate('/master');
    } else {
      console.log("RootHandler: Not authenticated, navigating to landing page");
      navigate('/landing');
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-pulse text-primary">Redirecting...</div>
    </div>
  );
};

export default RootHandler;
