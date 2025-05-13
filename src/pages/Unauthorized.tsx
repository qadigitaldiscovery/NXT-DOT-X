
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 pb-8 px-8">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-red-100 p-4 mb-4">
              <Shield className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-gray-500 mb-6">
              You don't have permission to access this page. If you believe this is an error, please contact an administrator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button 
                variant="default" 
                className="w-full" 
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
