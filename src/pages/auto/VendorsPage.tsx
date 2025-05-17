import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { forceHardRefresh } from '@/utils/cacheUtils';

// Complete replacement of the vendors page with a redirect to suppliers
const VendorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    // Attempt to clear cache and redirect
    console.log('Forcing redirect from old page to appropriate module');
    
    // If we have an ID parameter, redirect to the vendor detail page
    if (id) {
      setTimeout(() => {
        navigate(`/vendors/${id}`, { replace: true });
      }, 100);
    } else {
      // Otherwise, redirect to the suppliers list
      setTimeout(() => {
        navigate('/data-management/suppliers', { replace: true });
      }, 100);
    }
  }, [navigate, id]);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
      <p className="mb-6">You are being redirected to the appropriate page.</p>
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
