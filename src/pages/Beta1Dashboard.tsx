import React from 'react';

const Beta1Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Platform Beta Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          Welcome to the Beta 1 Dashboard. This dashboard provides an overview of the data platform capabilities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700">Data Insights</h3>
            <p className="text-sm text-gray-600">View and analyze your data insights</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700">Data Connections</h3>
            <p className="text-sm text-gray-600">Manage your data source connections</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-700">Reporting</h3>
            <p className="text-sm text-gray-600">Access and customize reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beta1Dashboard;
