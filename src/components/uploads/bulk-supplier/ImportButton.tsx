
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface ImportButtonProps {
  onImport: () => void;
  disabled?: boolean;
  hasData: boolean;
}

const ImportButton = ({ onImport, disabled = false, hasData }: ImportButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleImport = () => {
    if (!isAuthenticated) {
      // Store current path to redirect back after login
      localStorage.setItem('returnUrl', window.location.pathname);
      
      // Redirect to login
      toast.info("Please log in to import suppliers");
      navigate('/landing');
      return;
    }

    if (!hasData) {
      toast.error("No data available to import");
      return;
    }

    setIsLoading(true);
    
    try {
      onImport();
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to import suppliers");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleImport} 
      disabled={disabled || isLoading || hasData === false} 
      variant="default" 
      className="ml-auto"
    >
      <Upload className="h-4 w-4 mr-2" />
      {isLoading ? "Importing..." : "Import Suppliers"}
    </Button>
  );
};

export default ImportButton;
