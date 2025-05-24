
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { LoginForm } from '@/components/auth/LoginForm';
import { LandingBackground } from '@/components/auth/LandingBackground';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (loading) return; // Wait for auth to complete
    
    if (isAuthenticated) {
      // Check if there's a return URL in localStorage
      const returnPath = localStorage.getItem('returnUrl');
      if (returnPath) {
        localStorage.removeItem('returnUrl');
        navigate(returnPath);
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate, isAuthenticated, loading]);
  
  return (
    <LandingBackground backgroundImageUrl="/lovable-uploads/d4803c2c-c894-4a2d-ab2c-1e8d71bea99f.png">
      <LoginForm />
    </LandingBackground>
  );
};

export default Landing;
