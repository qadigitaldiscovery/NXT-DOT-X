import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { forceHardRefresh } from '@/utils/cacheUtils';

// Complete replacement of the vendors page with a redirect to suppliers
const VendorsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to clear cache and redirect
    console.log('Forcing redirect from old page to Suppliers module');
    
    // Redirect to the unified page - use setTimeout to ensure it happens after render
    setTimeout(() => {
      navigate('/data-management/suppliers', { replace: true });
    }, 100);
  }, [navigate]);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Suppliers...</h1>
      <p className="mb-6">You are being redirected to the Suppliers module.</p>
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
