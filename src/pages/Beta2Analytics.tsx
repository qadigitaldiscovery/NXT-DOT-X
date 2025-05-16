import React from 'react';

const Beta2Analytics = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loyalty Analytics</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-6">
          View analytics and insights for your loyalty program.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4">Member Growth</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Chart: Member Growth - Last 12 Months</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4">Points Issued vs Redeemed</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Chart: Points Issued vs Redeemed</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-4">Member Engagement by Channel</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart: Member Engagement by Channel</p>
          </div>
        </div>
        
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
      </div>
    </div>
  );
};

export default Beta2Analytics;
