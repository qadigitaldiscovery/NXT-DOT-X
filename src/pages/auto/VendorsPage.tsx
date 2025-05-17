
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

// Complete replacement of the vendors page with a clean redirect
const VendorsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Log redirection
    console.log('Redirecting from old Vendors page to unified Supplier Vendors');
    
    // Show toast notification to inform user
    toast({
      title: "Redirecting...",
      description: "You are being redirected to the unified Supplier Vendors module",
      variant: "default",
    });
    
    // Redirect to the unified page with replace to prevent back navigation issues
    navigate('/data-management/supplier-vendors', { replace: true });
  }, [navigate]);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Supplier Vendors...</h1>
      <p className="mb-6">You are being redirected to the unified Supplier Vendors module.</p>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    </div>
  );
};

export default VendorsPage;
