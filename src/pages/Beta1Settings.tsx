import React from 'react';

const Beta1Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Platform Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-6">
          Configure your data platform settings and preferences.
        </p>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Data Source Settings</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enable external data sources</span>
              <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Data Processing</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enable automatic data processing</span>
              <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enable email notifications</span>
              <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">API Access</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enable API access</span>
              <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beta1Settings;
