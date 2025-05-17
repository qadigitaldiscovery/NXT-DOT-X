import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { forceHardRefresh, CURRENT_VERSION } from '@/utils/cacheUtils';

export default function DeploymentTest() {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-6">DEPLOYMENT TEST - LATEST VERSION</h1>
      <p className="text-lg mb-8">This page confirms you are seeing the latest deployed version (with vendor/supplier fix).</p>
      
      <div className="bg-green-100 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Deployment Version: {CURRENT_VERSION}</h2>
        <p>If you see this page, your deployment is working correctly!</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <Button 
          onClick={() => navigate('/data-management/supplier-vendors')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Go to Unified Supplier Vendors
        </Button>
        
        <Button 
          onClick={forceHardRefresh}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Force Hard Refresh (Clear Cache)
        </Button>
      </div>
      
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-xl font-semibold text-yellow-800 mb-2">Still seeing old pages?</h3>
        <p className="mb-4">If you're still seeing the old separate supplier and vendor pages:</p>
        <ol className="text-left list-decimal pl-8 mb-4 space-y-2">
          <li>Click the "Force Hard Refresh" button above</li>
          <li>Try opening the app in a private/incognito window</li>
          <li>Clear your browser cache manually from browser settings</li>
          <li>Try a different browser entirely</li>
        </ol>
        <p className="text-sm text-gray-600">Note: Web browsers sometimes aggressively cache web apps, especially on production deployments</p>
      </div>
    </div>
  );
} 