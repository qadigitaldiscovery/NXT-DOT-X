
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function SetupTestUser() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const setupTestUser = async () => {
    setIsLoading(true);
    try {
      // Call the edge function to set up the test user
      const { data, error } = await supabase.functions.invoke('setup-test-user');
      
      if (error) {
        console.error("Error setting up test user:", error);
        toast.error("Failed to set up test user");
        return;
      }
      
      console.log("Test user setup response:", data);
      toast.success("Test user has been set up. You can now login with admin@example.com / Pass1");
    } catch (err) {
      console.error("Error calling setup function:", err);
      toast.error("Error setting up test user");
    } finally {
      setIsLoading(false);
    }
  };

  // On landing page, we want to show this button to all users
  // On other pages, only show for admins
  const isLandingPage = window.location.pathname === '/landing';
  if (!isLandingPage && user?.role !== 'admin') {
    return null;
  }

  return (
    <Button 
      onClick={setupTestUser} 
      disabled={isLoading} 
      variant="outline" 
      size="sm"
      className="text-xs text-gray-300 border-gray-600 hover:bg-gray-800"
    >
      {isLoading ? "Setting up..." : "Setup Test User"}
    </Button>
  );
}
