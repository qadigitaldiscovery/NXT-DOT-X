
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';

// This component handles the root path and redirects based on authentication status
const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { preferences, setPreferences } = useUserPreferences({
    module: 'home',
    key: 'last_visited',
    defaultValue: { timestamp: new Date().toISOString() }
  });
  
  // Update last visited timestamp
  useEffect(() => {
    if (user) {
      setPreferences({ timestamp: new Date().toISOString() });
    }
  }, [user, setPreferences]);

  useEffect(() => {
    // Wait until auth state is loaded
    if (!loading) {
      if (user) {
        console.log('User authenticated, redirecting to dashboard');
        navigate('/dashboard', { replace: true });
      } else {
        console.log('User not authenticated, redirecting to landing page');
        navigate('/landing', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Return loading state while determining where to redirect
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="mt-2 text-gray-500">Preparing your experience</p>
      </div>
    </div>
  );
};

export default Index;
