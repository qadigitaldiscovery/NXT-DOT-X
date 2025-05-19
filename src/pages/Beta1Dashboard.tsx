
import React from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Beta1Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <PlatformLayout moduleTitle="Data Platform Beta Dashboard">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Data Platform Beta Dashboard</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome to Beta 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Welcome to the Beta 1 Dashboard. This dashboard provides an overview of the data platform capabilities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-700">Data Insights</h3>
                  <p className="text-sm text-gray-600">View and analyze your data insights</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-700">Data Connections</h3>
                  <p className="text-sm text-gray-600">Manage your data source connections</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-purple-700">Reporting</h3>
                  <p className="text-sm text-gray-600">Access and customize reports</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Button onClick={() => navigate('/master')}>Back to Master Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlatformLayout>
  );
};

export default Beta1Dashboard;
