
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
      {/* Cyberpunk tunnel effect */}
      <div className="absolute inset-0 z-0 perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#101014] to-[#1a1a24]">
          {/* Octagonal frames with neon effect - multiple layers for depth */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                width: `${100 - i * 10}%`,
                height: `${100 - i * 10}%`,
                border: '1px solid rgba(255,0,0,0.3)',
                boxShadow: `0 0 15px rgba(200,0,0,0.${6-i})`,
                transform: `translateZ(-${i * 50}px) rotate(${i % 2 ? 30 : 45}deg)`,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            >
              {/* Neon lights at the edges */}
              <div className="absolute inset-0 opacity-70"
                style={{
                  background: `linear-gradient(45deg, 
                    rgba(255,0,0,0) 0%, 
                    rgba(255,0,0,0.6) 50%, 
                    rgba(255,0,0,0) 100%)`
                }}
              ></div>
            </div>
          ))}

          {/* Horizontal and vertical light lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <div 
                  className="absolute bg-red-500/30"
                  style={{
                    height: '1px',
                    width: '100%',
                    top: `${10 + i * 10}%`,
                    boxShadow: '0 0 10px #ff0000, 0 0 20px #ff0000',
                    opacity: Math.random() * 0.5 + 0.2,
                  }}
                ></div>
                <div 
                  className="absolute bg-blue-400/20"
                  style={{
                    width: '1px',
                    height: '100%',
                    left: `${5 + i * 10}%`,
                    boxShadow: '0 0 10px #00a2ff, 0 0 20px #00a2ff',
                    opacity: Math.random() * 0.5 + 0.2,
                  }}
                ></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-800 rounded-lg blur opacity-70"></div>
            <div className="px-8 py-3 bg-gray-900 rounded-lg relative">
              <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-red-300 to-red-500">
                NXT DOT X
              </h1>
              <p className="text-xs tracking-widest text-gray-400 uppercase mt-1">
                Advanced Security Protocol
              </p>
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
                
                <div className="text-xs text-center text-gray-500">
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

        <footer className="mt-8 text-center text-gray-600 text-xs">
          © 2025 NXT DOT X. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Landing;
