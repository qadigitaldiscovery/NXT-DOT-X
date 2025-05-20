
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const CustomerManagement = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/customer-management/directory');
  };

  return (
    <div className="col-span-1">
      <Button 
        onClick={handleNavigate}
        className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700"
      >
        <Users className="h-12 w-12" />
        <div className="text-center">
          <h1 className="text-lg font-medium">Customer Management</h1>
          <p className="text-sm text-gray-400">Manage customer data and interactions</p>
        </div>
      </Button>
    </div>
  );
};

export default CustomerManagement;
