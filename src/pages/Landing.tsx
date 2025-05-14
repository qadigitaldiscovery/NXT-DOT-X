
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Landing = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!username || !password) {
      toast.error('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    // Authenticate user
    const success = await login(username, password);
    if (success) {
      navigate('/');
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Cyberpunk background with uploaded image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/2b82e9cc-7d5f-4868-93b7-66677154cdbd.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      >
        {/* Adding a slight dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Logo - Updated to be larger and match the width of the login box */}
        <div className="mb-10 flex justify-center w-full">
          <div className="relative w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-800 rounded-lg blur opacity-75 w-full"></div>
            <div className="px-8 py-5 bg-gray-900 rounded-lg relative w-full flex justify-center">
              <img 
                src="/lovable-uploads/8b4ed002-cfe2-4c82-b0a8-bccf404be22c.png" 
                alt="NXT DOTX Logo" 
                className="h-auto w-full max-w-[320px]"
              />
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="w-full perspective-800">
          <div className="w-full transform bg-black bg-opacity-50 backdrop-blur-sm border border-red-900/30 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-900/20"></div>
            
            {/* Red corner accents */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-red-500"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-500"></div>
            
            <div className="relative p-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="IDENTIFICATION" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      required 
                      className="bg-gray-900/70 border-gray-700 focus:border-red-500 ring-offset-red-900 h-12 placeholder:text-gray-500 text-gray-200 pl-4"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="SECURE CODE" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      required 
                      className="bg-gray-900/70 border-gray-700 focus:border-red-500 ring-offset-red-900 h-12 text-gray-200 pl-4"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white h-12 border border-red-700 shadow-[0_0_10px_rgba(220,38,38,0.6)]"
                  disabled={isLoading}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {isLoading ? 'AUTHENTICATING' : 'ACCESS SYSTEM'}
                </Button>
                
                <div className="text-xs text-center text-gray-400">
                  <p>
                    Demo credentials: admin@example.com / admin1
                  </p>
                  <p className="mt-1">
                    or user@example.com / user1
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-blue-400/60 animate-pulse" style={{animationDelay: `${i * 0.3}s`}}></div>
          ))}
        </div>

        <footer className="mt-8 text-center text-gray-400 text-xs">
          © 2025 NXT DOT X. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Landing;
