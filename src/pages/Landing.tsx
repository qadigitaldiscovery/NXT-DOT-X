
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

const Landing = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/prototypes');
    }
  }, [navigate]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!username || !password) {
      toast.error('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    // Check admin credentials
    if (username === 'admin' && password === 'admin1') {
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login successful!');
      setIsLoading(false);
      navigate('/prototypes');
    } else {
      toast.error('Invalid credentials');
      setIsLoading(false);
    }
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
      <header className="relative z-10 text-white flex-1">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-8 bg-transparent">
            <div className="flex flex-col">
              {/* NXT DOT-X title and subtitle with improved styling */}
              <h1 className="font-bold tracking-wider text-7xl">NXT DOT-X</h1>
              <p className="font-medium tracking-wide mt-1 text-white/90 text-xl">BUSINESS MANAGEMENT PLATFORM</p>
            </div>
            <div className="flex items-center">
              {/* NXT LEVEL TECH logo */}
              <img src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" alt="NXT LEVEL TECH" className="h-10" />
            </div>
          </nav>
          
          {/* Center the login form */}
          <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-md">
              <Card className="border-0 shadow-xl backdrop-blur-sm bg-black/50" id="login">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Sign in to your account</CardTitle>
                  <CardDescription className="text-gray-300">Enter your credentials to access the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white">Username</Label>
                      <Input 
                        id="username" 
                        type="text" 
                        placeholder="admin" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        required 
                        className="bg-black/30 text-white border-gray-600 focus:border-[#c01c1c]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Password</Label>
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
                    <Button type="submit" className="w-full bg-[#c01c1c] hover:bg-[#a51919]" disabled={isLoading}>
                      <LogIn className="w-4 h-4 mr-2" />
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <p className="text-sm text-center text-gray-300">
                      Demo credentials: username: admin, password: admin1
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <footer className="relative z-10 text-white py-4 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <img src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" alt="NXT LEVEL TECH" className="h-8" />
            </div>
            <div>
              <p className="text-right">© 2025 NXT LEVEL TECH. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
