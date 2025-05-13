
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Landing = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    login,
    isAuthenticated
  } = useAuth();

  // Check if user is already logged in
  React.useEffect(() => {
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
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `url('/lovable-uploads/1d1d5f91-49b0-479f-bffe-41a4438de356.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content with z-index to appear above the background */}
      <div className="relative z-10 text-white w-full max-w-md px-4">
        {/* Logo centered at the top */}
        <div className="flex justify-center mb-6">
          <img src="/lovable-uploads/80f9379c-254b-4238-9d1c-bb90577397d9.png" alt="NXT DOT X" className="w-full max-w-[300px]" />
        </div>

        {/* Login form */}
        <Card className="border-0 shadow-xl backdrop-blur-md bg-black/60 border-t-2 border-[#c01c1c] rounded-md overflow-hidden">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white text-sm">
                  Username or Email
                </Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="admin@example.com" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                  className="bg-black/50 text-white border-gray-700 focus:border-[#c01c1c] h-10 placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm">
                  Password
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  className="bg-black/50 text-white border-gray-700 focus:border-[#c01c1c] h-10"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#c01c1c] to-[#ff4040] hover:from-[#a51919] hover:to-[#e53535] text-white h-10" 
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <p className="text-sm text-center text-gray-400">
                Demo credentials: admin@example.com / admin1 or user@example.com / user1
              </p>
            </form>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-gray-400 text-xs">
          © 2025 NXT DOT X. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Landing;
