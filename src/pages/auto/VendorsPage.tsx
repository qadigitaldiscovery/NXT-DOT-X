import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { forceHardRefresh } from '@/utils/cacheUtils';

// Complete replacement of the vendors page with a redirect
const VendorsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to clear cache and redirect
    console.log('Forcing redirect from old Vendors page to unified Supplier Vendors');
    
    // Redirect to the unified page - use setTimeout to ensure it happens after render
    setTimeout(() => {
      navigate('/data-management/supplier-vendors', { replace: true });
    }, 100);
  }, [navigate]);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Supplier Vendors...</h1>
      <p className="mb-6">You are being redirected to the unified Supplier Vendors module.</p>
      <button 
        onClick={() => forceHardRefresh()}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Click here if not redirected automatically
      </button>
    </div>
  );
};

export default VendorsPage;
