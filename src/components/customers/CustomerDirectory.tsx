
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { PlusCircle, Users } from 'lucide-react';

export const CustomerDirectory = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Users className="mr-2 h-6 w-6" /> Customer Directory
          </h1>
          <p className="text-gray-400 mt-1">View and manage customer accounts</p>
        </div>
        
        <Button 
          onClick={() => navigate('/customer-management/new')}
          className="flex items-center"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium text-gray-200 mb-2">Customer Database</h3>
        <p className="text-gray-400 mb-6">This module is being developed. Customer directory will be available soon.</p>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/master')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
