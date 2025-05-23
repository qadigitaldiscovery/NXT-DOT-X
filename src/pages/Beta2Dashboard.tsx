import React from 'react';

const Beta2Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loyalty Platform Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          Welcome to the Beta 2 Dashboard. This dashboard provides an overview of your loyalty program.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700">Total Members</h3>
            <p className="text-xl font-bold">7,392</p>
            <p className="text-xs text-green-600">↑ 12% from last month</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700">Active Points</h3>
            <p className="text-xl font-bold">1.2M</p>
            <p className="text-xs text-green-600">↑ 8% from last month</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-700">Redemption Rate</h3>
            <p className="text-xl font-bold">24%</p>
            <p className="text-xs text-red-600">↓ 3% from last month</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-700">Avg. Engagement</h3>
            <p className="text-xl font-bold">6.2 days</p>
            <p className="text-xs text-green-600">↑ 5% from last month</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
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
        </div>
      </div>
    </div>
  );
};

export default Beta2Dashboard;
