
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

// Updated component that doesn't rely on PlatformLayout
const MissingPageTemplate = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <Card className="border-yellow-300 dark:border-yellow-700">
        <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20">
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Module Under Construction
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-6">
            This module is currently being developed and will be available soon.
          </p>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            
            <Button 
              variant="default" 
              onClick={() => navigate('/')}
            >
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissingPageTemplate;
