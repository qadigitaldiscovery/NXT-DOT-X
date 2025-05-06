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
  return <div className="min-h-screen flex flex-col bg-white">
      {/* Hero section with red background */}
      <header className="bg-[#c01c1c] text-white">
        <div className="container mx-auto px-4 py-8 bg-zinc-700">
          <nav className="flex justify-between items-center mb-16">
            <div></div>
            <div className="flex items-center">
              {/* NXT LEVEL TECH logo */}
              <img src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" alt="NXT LEVEL TECH" className="h-10" />
            </div>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center py-12">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl font-bold mb-6 md:text-5xl">DOT-X 
BUSINESS MANAGEMENT PLATFORM</h1>
              <p className="text-xl mb-8">Access all tools and features from one centralized dashboard.</p>
            </div>
            <div className="md:w-1/2">
              <Card className="border-0 shadow-xl" id="login">
                <CardHeader>
                  <CardTitle className="text-2xl">Sign in to your account</CardTitle>
                  <CardDescription>Enter your credentials to access the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" type="text" placeholder="admin" value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full bg-[#c01c1c] hover:bg-[#a51919]" disabled={isLoading}>
                      <LogIn className="w-4 h-4 mr-2" />
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                      Demo credentials: username: admin, password: admin1
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <img src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" alt="NXT LEVEL TECH" className="h-8 mr-3" />
              <p>© 2025 NXT LEVEL TECH. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;