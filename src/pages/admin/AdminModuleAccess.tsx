import React from 'react';

const AdminModuleAccess: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Module Access Management</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="mb-4">Manage access permissions for different modules in the system.</p>
        
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold mb-2">Role-based Access</h2>
            <p>Configure which roles have access to specific modules.</p>
          </div>
          
          <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold mb-2">Module Permissions</h2>
            <p>Set granular permissions for each module.</p>
          </div>
          
          <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold mb-2">Access Logs</h2>
            <p>View and manage module access history.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModuleAccess;
