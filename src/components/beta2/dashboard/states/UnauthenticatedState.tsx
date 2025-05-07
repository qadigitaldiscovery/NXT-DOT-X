
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLoyaltyAccount } from '@/hooks/use-loyalty';
import { useNavigate } from 'react-router-dom';

export const UnauthenticatedState: React.FC = () => {
  const navigate = useNavigate();
  
  const handleEnrollClick = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to enroll in the loyalty program");
        return;
      }
      
      // This will create an account if none exists
      await useLoyaltyAccount();
      toast.success("You've been enrolled in our loyalty program!");
      navigate('/beta2/members');
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Failed to enroll in the loyalty program");
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold">Join Our Loyalty Program</h3>
        <p>Earn points, get exclusive rewards, and enjoy member benefits.</p>
      </div>
      
      <Button variant="secondary" onClick={handleEnrollClick}>
        Enroll Now
      </Button>
    </div>
  );
};
