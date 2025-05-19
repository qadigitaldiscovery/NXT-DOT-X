
import React from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Calendar, Settings, Users } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const Beta2Analytics = () => {
  const navigate = useNavigate();
  
  const navCategories: NavCategory[] = [
    {
      name: "Loyalty Platform",
      label: "Loyalty Platform",
      items: [
        { label: "Dashboard", path: "/beta2/dashboard", icon: BarChart3 },
        { label: "Analytics", path: "/beta2/analytics", icon: BarChart3 },
        { label: "Members", path: "/beta2/members", icon: Users },
        { label: "Rewards", path: "/beta2/rewards", icon: Calendar },
        { label: "Settings", path: "/beta2/settings", icon: Settings }
      ]
    }
  ];
  
  return (
    <PlatformLayout moduleTitle="Loyalty Analytics" navCategories={navCategories}>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Loyalty Analytics</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analytics & Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              View analytics and insights for your loyalty program.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Member Growth</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart: Member Growth - Last 12 Months</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Points Issued vs Redeemed</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart: Points Issued vs Redeemed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6 border">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-4">Member Engagement by Channel</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart: Member Engagement by Channel</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Top Performing Rewards</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redemptions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">$25 Gift Card</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">1,245</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">2,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">94%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Free Shipping</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">978</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">1,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">89%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Member Exclusive</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">654</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">5,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">97%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => navigate('/beta2/dashboard')}>
                Back to Dashboard
              </Button>
              <Button onClick={() => navigate('/master')}>
                Master Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlatformLayout>
  );
};

export default Beta2Analytics;
