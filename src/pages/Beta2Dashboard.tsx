
import React from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Calendar, Settings, Users } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const Beta2Dashboard = () => {
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
    <PlatformLayout moduleTitle="Loyalty Platform Dashboard" navCategories={navCategories}>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Loyalty Platform Dashboard</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome to Loyalty Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Welcome to the Beta 2 Dashboard. This dashboard provides an overview of your loyalty program.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-700">Total Members</h3>
                  <p className="text-xl font-bold">7,392</p>
                  <p className="text-xs text-green-600">↑ 12% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-700">Active Points</h3>
                  <p className="text-xl font-bold">1.2M</p>
                  <p className="text-xs text-green-600">↑ 8% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-purple-700">Redemption Rate</h3>
                  <p className="text-xl font-bold">24%</p>
                  <p className="text-xs text-red-600">↓ 3% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-orange-700">Avg. Engagement</h3>
                  <p className="text-xl font-bold">6.2 days</p>
                  <p className="text-xs text-green-600">↑ 5% from last month</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/beta2/analytics')}>
                  See Analytics
                </Button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">John Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Purchase</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">+125</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Today</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Mary Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Reward Redemption</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">-500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Yesterday</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Robert Davis</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Referral Bonus</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">+250</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Yesterday</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <Button onClick={() => navigate('/master')}>Back to Master Dashboard</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlatformLayout>
  );
};

export default Beta2Dashboard;
