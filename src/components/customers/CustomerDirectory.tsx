
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users } from 'lucide-react';

export const CustomerDirectory = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Users className="mr-2 h-6 w-6" aria-hidden="true" /> Customer Directory
          </h1>
          <p className="text-gray-400 mt-1">View and manage customer accounts</p>
        </div>
        
        <a 
          href="/customer-management/new"
          onClick={(e) => {
            e.preventDefault();
            navigate('/customer-management/new');
          }}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline"
          aria-label="Add new customer"
        >
          <PlusCircle className="h-4 w-4 mr-2" aria-hidden="true" />
          Add Customer
        </a>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium text-gray-200 mb-2">Customer Database</h3>
        <p className="text-gray-400 mb-6">This module is being developed. Customer directory will be available soon.</p>
        
        <div className="flex justify-center gap-4">
          <a
            href="/master"
            onClick={(e) => {
              e.preventDefault();
              navigate('/master');
            }}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline"
            aria-label="Return to dashboard"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};
