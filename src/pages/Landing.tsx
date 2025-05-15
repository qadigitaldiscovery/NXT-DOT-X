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
  return <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Full-screen background with uploaded image */}
      <div className="absolute inset-0 z-0" style={{
      backgroundImage: "url('/lovable-uploads/358e768f-b3aa-4ca0-9ced-77089fb161d6.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      </div>

      {/* Centered login circle with NXT DOT X logo and form */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-[480px] h-[480px] flex items-center justify-center py-0 my-0">
          {/* Circular login box with energy effect */}
          <div className="w-full h-full rounded-full flex items-center justify-center relative">
            {/* Logo and form container */}
            <div className="w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center p-8">
              {/* NXT DOT X Logo */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-white tracking-wider">
                  
                  
                </h1>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="w-full space-y-4 max-w-[300px] px-[27px] my-0 py-0">
                <div className="space-y-2">
                  <div className="relative">
                    <Input id="usernameOrEmail" type="text" placeholder="username" value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} required className="bg-gray-100/90 border-gray-300 focus:border-red-500 h-12 pl-10 text-black rounded-full py-0 my-[4px]" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-700">🔒</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input id="password" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-gray-100/90 border-gray-300 focus:border-red-500 h-12 pl-10 text-black rounded-full" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-700">🔒</span>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 
                             h-12 border border-red-700 shadow-[0_0_10px_rgba(220,38,38,0.6)] text-white 
                             font-bold uppercase tracking-wider rounded-full">
                  {isLoading ? 'AUTHENTICATING...' : 'LOGIN'}
                </Button>
                
                <div className="text-xs text-center text-gray-300 mt-4">
                  
                  
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Quantum Analytica Footer */}
        <div className="mt-12 text-center">
          
          
        </div>
      </div>
    </div>;
};
export default Landing;