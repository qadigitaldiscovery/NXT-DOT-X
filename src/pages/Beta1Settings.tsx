import React, { useState } from 'react';

const Beta1Settings = () => {
  // Add state for each toggle
  const [externalDataEnabled, setExternalDataEnabled] = useState(false);
  const [autoProcessingEnabled, setAutoProcessingEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [apiAccessEnabled, setApiAccessEnabled] = useState(true);
  
  // Function to handle save
  const handleSave = () => {
    // Here you would typically call an API to save settings
    alert('Settings saved successfully!');
  };
  
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
              <div 
                className={`w-12 h-6 ${externalDataEnabled ? 'bg-blue-500' : 'bg-gray-200'} rounded-full flex items-center p-1 cursor-pointer transition-colors duration-200`}
                onClick={() => setExternalDataEnabled(!externalDataEnabled)}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${externalDataEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Data Processing</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enable automatic data processing</span>
              <div 
                className={`w-12 h-6 ${autoProcessingEnabled ? 'bg-blue-500' : 'bg-gray-200'} rounded-full flex items-center p-1 cursor-pointer transition-colors duration-200`}
                onClick={() => setAutoProcessingEnabled(!autoProcessingEnabled)}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${autoProcessingEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enable email notifications</span>
              <div 
                className={`w-12 h-6 ${emailNotificationsEnabled ? 'bg-blue-500' : 'bg-gray-200'} rounded-full flex items-center p-1 cursor-pointer transition-colors duration-200`}
                onClick={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${emailNotificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">API Access</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enable API access</span>
              <div 
                className={`w-12 h-6 ${apiAccessEnabled ? 'bg-blue-500' : 'bg-gray-200'} rounded-full flex items-center p-1 cursor-pointer transition-colors duration-200`}
                onClick={() => setApiAccessEnabled(!apiAccessEnabled)}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${apiAccessEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beta1Settings;
