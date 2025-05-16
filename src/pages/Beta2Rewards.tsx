import React from 'react';

const Beta2Rewards = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loyalty Program Rewards</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-6">
          Manage your loyalty program rewards and redemption options.
        </p>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Available Rewards</h2>
            <p className="text-sm text-gray-500">Create and manage reward options for your members</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create New Reward
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">$25 Gift Card</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Redeem points for a $25 gift card to use on any purchase.</p>
            <div className="flex items-center justify-between">
              <span className="font-medium">2,500 points</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">Free Shipping</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Get free shipping on your next order, no minimum purchase.</p>
            <div className="flex items-center justify-between">
              <span className="font-medium">1,000 points</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">10% Discount</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">Inactive</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Get a 10% discount on your next purchase.</p>
            <div className="flex items-center justify-between">
              <span className="font-medium">1,500 points</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">Member Exclusive</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Access to exclusive member-only products.</p>
            <div className="flex items-center justify-between">
              <span className="font-medium">5,000 points</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">Birthday Gift</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Special birthday surprise gift.</p>
            <div className="flex items-center justify-between">
              <span className="font-medium">3,000 points</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow border-dashed flex items-center justify-center">
            <button className="text-blue-600 hover:text-blue-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Reward
            </button>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Redemptions</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Mary Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">$25 Gift Card</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2,500</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Today</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Free Shipping</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">1,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Yesterday</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Robert Davis</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Member Exclusive</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">5,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">3 days ago</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beta2Rewards;
