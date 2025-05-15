
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Landing = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    login,
    isAuthenticated
  } = useAuth();

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
    if (!usernameOrEmail || !password) {
      toast.error('Please enter both username/email and password');
      setIsLoading(false);
      return;
    }

    // Authenticate user
    const success = await login(usernameOrEmail, password);
    if (success) {
      navigate('/');
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Neon green dot for testing */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '20px',
        height: '20px',
        backgroundColor: 'lime',
        borderRadius: '50%',
        zIndex: 9999
      }}></div>

      {/* Background with uploaded image */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: "url('/lovable-uploads/74716bd3-b36e-4695-8c95-1077e32c77eb.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 1
      }}>
        {/* Adding a slight dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Circular login form */}
        <div className="w-[420px] h-[420px] rounded-full perspective-800 flex items-center justify-center">
          <div className="w-full h-full rounded-full transform bg-black bg-opacity-50 backdrop-blur-sm border border-red-900/30 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-900/20"></div>
            
            {/* Red corner accents - adjusted for circle */}
            <div className="absolute top-[15%] left-[15%] w-4 h-4 border-t-2 border-l-2 border-red-500 rounded-tl-full"></div>
            <div className="absolute top-[15%] right-[15%] w-4 h-4 border-t-2 border-r-2 border-red-500 rounded-tr-full"></div>
            <div className="absolute bottom-[15%] left-[15%] w-4 h-4 border-b-2 border-l-2 border-red-500 rounded-bl-full"></div>
            <div className="absolute bottom-[15%] right-[15%] w-4 h-4 border-b-2 border-r-2 border-red-500 rounded-br-full"></div>
            
            <div className="relative p-6 w-[80%]">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <div className="relative">
                    <Input id="usernameOrEmail" type="text" placeholder="USERNAME OR EMAIL" value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} required className="bg-gray-900/70 border-gray-700 focus:border-red-500 ring-offset-red-900 h-12 placeholder:text-gray-500 text-gray-200 pl-4" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input id="password" type="password" placeholder="PASSWORD" value={password} onChange={e => setPassword(e.target.value)} required className="bg-gray-900/70 border-gray-700 focus:border-red-500 ring-offset-red-900 h-12 text-gray-200 pl-4" />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white h-12 border border-red-700 shadow-[0_0_10px_rgba(220,38,38,0.6)]" disabled={isLoading}>
                  <LogIn className="w-4 h-4 mr-2" />
                  {isLoading ? 'AUTHENTICATING' : 'ACCESS SYSTEM'}
                </Button>
                
                <div className="text-xs text-center text-gray-400">
                  <p>
                    Demo credentials: admin / pass1
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
          {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-orange-400/60 animate-pulse" style={{
            animationDelay: `${i * 0.3}s`
          }}></div>)}
        </div>

        <footer className="mt-8 text-center text-gray-400 text-xs">
          © 2025 NXT DOT X. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Landing;
