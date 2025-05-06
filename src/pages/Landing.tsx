
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <header className="bg-gradient-to-r from-dashboard-secondary to-dashboard-primary text-white">
        <div className="container mx-auto px-4 py-16">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-dashboard-primary font-bold">NX</span>
              </div>
              <span className="text-xl font-bold">NXT LEVEL TECH</span>
            </div>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">DOT-X Management Platform</h1>
              <p className="text-xl mb-8">Access all prototype builds and tools from one centralized dashboard.</p>
              <a href="#login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-dashboard-primary bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-8">
                Get Started
              </a>
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
                      <Input
                        id="username"
                        type="text"
                        placeholder="admin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
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

      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-dashboard-heading">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-dashboard-heading">Cost Management</h3>
              <p className="text-muted-foreground">Track supplier costs and analyze trends to optimize your spending and improve margins.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-dashboard-heading">Competitor Analysis</h3>
              <p className="text-muted-foreground">Monitor competitor pricing and strategies to stay competitive in your market.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-dashboard-heading">Prototype Navigation</h3>
              <p className="text-muted-foreground">Access all prototype builds from a single, unified interface for seamless testing and comparison.</p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2025 NXT LEVEL TECH. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
