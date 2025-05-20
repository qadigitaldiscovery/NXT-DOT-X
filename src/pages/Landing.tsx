
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { SetupTestUser } from '../components/SetupTestUser';

const Landing = () => {
  const [email, setEmail] = useState('admin@example.com'); // Pre-fill with test credentials
  const [password, setPassword] = useState('Pass1'); // Pre-fill with test credentials
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    signIn,
    isAuthenticated,
    loading
  } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Landing: User is authenticated, redirecting to master");
      navigate('/master');
    }
  }, [navigate, isAuthenticated]);
  
  const validateEmail = (email: string): boolean => {
    const trimmedEmail = email.trim();
    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmedEmail);
  };
  
  const validatePassword = (password: string): {
    valid: boolean;
    message?: string;
  } => {
    if (!password) return {
      valid: false,
      message: 'Password is required'
    };
    if (password.length < 4) return {
      valid: false,
      message: 'Password must be at least 4 characters'
    };

    // For test account, always valid
    if (email.trim().toLowerCase() === 'admin@example.com' && password === 'Pass1') {
      return {
        valid: true
      };
    }
    return {
      valid: true
    };
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading || loading) {
      console.log("Landing: Login request already in progress");
      return;
    }

    // Form validation
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message || 'Invalid password');
      return;
    }
    setIsLoading(true);
    console.log("Landing: Login attempt with:", email.trim().toLowerCase());
    try {
      await signIn(email, password);
      // Navigation is handled in AuthContext upon successful login
    } catch (error: any) {
      // Error handling is done in AuthContext
      console.error("Landing: Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Full-screen background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundColor: '#111', /* Dark fallback */
          backgroundImage: `url('/lovable-uploads/3f15bacb-8659-4016-be81-b79d6a1d1b71.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} 
      />
      
      {/* Overlay for background opacity (25%) */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-25" />

      {/* Login box container - frosted black effect */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="w-[340px] rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 shadow-xl p-5">
          {/* Logo and form container */}
          <div className="flex flex-col items-center justify-center">
            {/* Logo */}
            <div className="mb-3">
              <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-center text-2xl">NXT LEVEL TECH</h1>
              <p className="text-center text-gray-200 mt-0.5 text-xs">AI Powered Business Management</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-full space-y-3 mt-2">
              <div className="space-y-1">
                <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    className="bg-black/50 border-gray-600 focus:border-purple-400 h-8 pl-8 text-white text-sm rounded-lg" 
                    autoComplete="email" 
                    disabled={isLoading || loading} 
                  />
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-xs">👤</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    className="bg-black/50 border-gray-600 focus:border-purple-400 h-8 pl-8 text-white text-sm rounded-lg" 
                    autoComplete="current-password" 
                    disabled={isLoading || loading} 
                  />
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-xs">🔒</span>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading || loading} 
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 
                h-8 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isLoading || loading ? 'SIGNING IN...' : 'LOGIN'}
              </Button>
            </form>
            
            {/* Setup Test User Button */}
            <div className="mt-3 w-full flex justify-center">
              <SetupTestUser />
            </div>
          </div>
        </div>

        {/* Partner section at the bottom */}
        <div className="absolute bottom-8 text-center text-white/80 z-20">
          <p className="text-xs mb-1 text-gray-400">IN PARTNERSHIP WITH</p>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-500 to-pink-500">QUANTUM ANALYTICA</h3>
          <p className="text-xs text-gray-400 mt-1">AI Powered Insights, Human-Centric Impacts</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
