
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/auth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Get the return URL if it exists
  const returnUrl = localStorage.getItem('returnUrl') || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      toast.error('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      // Clear any previous errors
      const success = await login(email, password);
      
      if (success) {
        // Navigate to return URL or default
        const returnPath = localStorage.getItem('returnUrl');
        if (returnPath) {
          localStorage.removeItem('returnUrl');
          navigate(returnPath);
        } else {
          navigate('/');
        }
      } else {
        // Error is displayed by the login function
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Login flow error:', error);
      toast.error(error.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-[380px] space-y-4 px-[60px]">
      <div className="space-y-2">
        <div className="relative">
          <Input 
            id="email" 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            className="bg-black/40 backdrop-blur-md border border-gray-600 focus:border-blue-400 h-11 pl-10 text-white rounded-xl" 
            autoComplete="email" 
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
            autoComplete="current-password" 
            className="bg-black/40 backdrop-blur-md border border-gray-600 focus:border-blue-400 h-11 pl-10 text-white rounded-xl" 
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔒</span>
          </div>
        </div>
      </div>

      {returnUrl && returnUrl !== '/' && (
        <div className="text-sm text-blue-300 text-center">
          You'll be redirected back after login
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full h-12 text-white font-bold uppercase tracking-wider rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl relative overflow-hidden border-2 border-nxt-red"
        style={{
          background: 'linear-gradient(135deg, #c01c1c, #000000)',
          backgroundSize: '200% 200%',
          animation: 'swirl 5s ease infinite',
        }}
      >
        <style>
          {`@keyframes swirl {
            0% { background-position: 0% 50%; box-shadow: 0 0 5px rgba(192, 28, 28, 0.5); }
            50% { background-position: 100% 50%; box-shadow: 0 0 15px rgba(192, 28, 28, 0.8); }
            100% { background-position: 0% 50%; box-shadow: 0 0 5px rgba(192, 28, 28, 0.5); }
          }`}
        </style>
        <div className="relative z-10 flex items-center justify-center">
          {isLoading ? 'AUTHENTICATING...' : 'LOGIN'}
          {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
        </div>
      </Button>

      {/* Information for the admin user */}
      <div className="text-xs text-center text-gray-400 mt-2">
        Use admin@admin.com / Password1 to log in as administrator
      </div>
      
      {/* Add signup option */}
      <div className="text-sm text-center text-gray-300 mt-4">
        Don't have an account yet?{" "}
        <Button 
          variant="link" 
          className="text-blue-400 p-0 h-auto"
          onClick={() => {
            toast.info('Sign up functionality coming soon!');
          }}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};
