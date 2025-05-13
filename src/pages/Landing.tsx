
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Landing = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

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
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/1d1d5f91-49b0-479f-bffe-41a4438de356.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content with z-index to appear above the background */}
      <div className="relative z-10 text-white flex-1 flex flex-col">
        {/* Logo centered at the top with more space */}
        <div className="container mx-auto flex justify-center pt-24 pb-10">
          <img
            src="/lovable-uploads/80f9379c-254b-4238-9d1c-bb90577397d9.png"
            alt="NXT DOT X"
            className="h-32" // Increased size for better visibility
          />
        </div>

        {/* Login form moved lower */}
        <div className="flex-grow flex justify-center items-center pt-32"> {/* Added padding to push login form down */}
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-xl backdrop-blur-sm bg-black/50" id="login">
              <CardContent className="pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">
                      Username or Email
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="admin@example.com"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      className="bg-black/30 text-white border-gray-600 focus:border-[#c01c1c]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="bg-black/30 text-white border-gray-600 focus:border-[#c01c1c]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#c01c1c] hover:bg-[#a51919]"
                    disabled={isLoading}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                  <p className="text-sm text-center text-gray-300">
                    Demo credentials: admin@example.com / admin1 or user@example.com / user1
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-white py-4 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <img
                src="/lovable-uploads/80f9379c-254b-4238-9d1c-bb90577397d9.png"
                alt="NXT DOT X"
                className="h-8"
              />
            </div>
            <div>
              <p className="text-right">© 2025 NXT DOT X. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
