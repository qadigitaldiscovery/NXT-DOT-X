
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Landing = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, isAuthenticated } = useAuth();

  // Check if user is already logged in and redirect to master dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/master');
    }
  }, [navigate, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!usernameOrEmail || !password) {
      toast.error('Please enter both username/email and password');
      setIsLoading(false);
      return;
    }

    // For development login - make it clear to the user
    if (usernameOrEmail === 'admin@example.com') {
      console.log('Attempting admin login with provided credentials');
    }

    // Authenticate user
    try {
      await signIn(usernameOrEmail, password);
      // Navigation is handled by AuthContext after successful login
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Full-screen background with gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-lightest via-white to-blue-lighter"></div>

      {/* Centered login circle with logo and form */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-[480px] h-auto flex items-center justify-center py-8 my-0">
          {/* Login box with modern design */}
          <div className="w-full rounded-2xl flex items-center justify-center relative bg-white/80 backdrop-blur-sm shadow-lg border border-blue-lightest">
            {/* Logo and form container */}
            <div className="w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8">
              {/* Logo */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-blue bg-clip-text text-transparent bg-gradient-to-r from-blue-light to-blue">
                  Quantum Analytica
                </h1>
                <p className="text-center text-blue-light mt-2">Business Analytics Platform</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="w-full space-y-4 max-w-[380px]">
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="usernameOrEmail" 
                      type="text" 
                      placeholder="Username or Email" 
                      value={usernameOrEmail} 
                      onChange={e => setUsernameOrEmail(e.target.value)} 
                      required 
                      className="bg-white/90 border-blue-lighter focus:border-blue h-11 pl-10 text-blue-dark rounded-xl"
                      autoComplete="username" 
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-blue-light">👤</span>
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
                      className="bg-white/90 border-blue-lighter focus:border-blue h-11 pl-10 text-blue-dark rounded-xl"
                      autoComplete="current-password"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-blue-light">🔒</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full bg-gradient-to-r from-blue to-blue-light hover:from-blue-light hover:to-blue 
                             h-12 text-white 
                             font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {isLoading ? 'AUTHENTICATING...' : 'LOGIN'}
                </Button>
                
                <div className="text-sm text-center text-gray-500 mt-4">
                  <p>For testing: Use admin@example.com / Pass1</p>
                  <p className="mt-2 text-blue-light">Secure Business Analytics Platform</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Quantum Analytica Footer */}
        <div className="mt-8 text-center text-blue">
          <p className="text-sm opacity-80">© 2025 Quantum Analytica. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
