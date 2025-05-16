import React from 'react';

const Beta2Members = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loyalty Program Members</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Manage your loyalty program members and their information.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Member
          </button>
        </div>
        
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search members..." 
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by tier"
          >
            <option>All Tiers</option>
            <option>Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
          </select>
          <select 
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by status"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">JS</div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">John Smith</div>
                      <div className="text-sm text-gray-500">Member since 2021</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">john.smith@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gold-100 text-gold-800">Gold</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">4,532</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                  <a href="#">Edit</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">AJ</div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">Alice Johnson</div>
                      <div className="text-sm text-gray-500">Member since 2022</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">alice.j@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-silver-100 text-silver-800">Silver</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">2,156</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                  <a href="#">Edit</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">RD</div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">Robert Davis</div>
                      <div className="text-sm text-gray-500">Member since 2020</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">robert.d@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-bronze-100 text-bronze-800">Bronze</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">987</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                  <a href="#">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1-3 of 120 members
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border rounded text-sm">2</button>
            <button className="px-3 py-1 border rounded text-sm">3</button>
            <button className="px-3 py-1 border rounded text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beta2Members;
