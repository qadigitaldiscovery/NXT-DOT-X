
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { SetupTestUser } from '@/components/SetupTestUser';

const Landing = () => {
  const [email, setEmail] = useState('admin@example.com');  // Pre-fill with test credentials
  const [password, setPassword] = useState('Pass1');        // Pre-fill with test credentials
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, isAuthenticated, loading } = useAuth();

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
  
  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (!password) return { valid: false, message: 'Password is required' };
    if (password.length < 4) return { valid: false, message: 'Password must be at least 4 characters' };
    
    // For test account, always valid
    if (email.trim().toLowerCase() === 'admin@example.com' && password === 'Pass1') {
      return { valid: true };
    }
    
    return { valid: true };
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
      {/* Full-screen background with uploaded image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/lovable-uploads/a3137cb7-43b3-4738-8bd4-142a07a94e5c.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 z-0 bg-black bg-opacity-40" />

      {/* Centered login circle with logo and form */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-[480px] h-auto flex items-center justify-center py-8 my-0">
          {/* Login box with modern design */}
          <div className="w-full rounded-2xl flex items-center justify-center relative bg-black/50 backdrop-blur-md shadow-lg border border-gray-600/30">
            {/* Logo and form container */}
            <div className="w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8">
              {/* Logo */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
                  Quantum Analytica
                </h1>
                <p className="text-center text-gray-200 mt-2">AI Powered Insights, Human-Centric Impacts</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="w-full space-y-4 max-w-[380px]">
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required 
                      className="bg-black/50 border-gray-600 focus:border-purple-400 h-11 pl-10 text-white rounded-xl"
                      autoComplete="email" 
                      disabled={isLoading || loading}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">👤</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      required 
                      className="bg-black/50 border-gray-600 focus:border-purple-400 h-11 pl-10 text-white rounded-xl"
                      autoComplete="current-password"
                      disabled={isLoading || loading}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">🔒</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading || loading} 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 
                             h-12 text-white 
                             font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {isLoading || loading ? 'SIGNING IN...' : 'LOGIN'}
                </Button>
                
                <div className="text-sm text-center text-gray-300 mt-4">
                  <p className="font-bold">Use admin@example.com / Pass1</p>
                  <p className="mt-2 text-gray-400">Secure Business Analytics Platform</p>
                </div>
              </form>
              
              {/* Setup Test User Button */}
              <div className="mt-6 w-full flex justify-center">
                <SetupTestUser />
              </div>
            </div>
          </div>
        </div>

        {/* Quantum Analytica Footer */}
        <div className="mt-8 text-center text-white">
          <p className="text-sm opacity-80">© 2025 Quantum Analytica. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
