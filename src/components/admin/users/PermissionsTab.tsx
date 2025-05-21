
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserManagement } from '@/context/UserManagementContext';

// Sample permission data structure
const samplePermissions = {
  "User Management": [
    { id: "users.view", name: "View Users" },
    { id: "users.create", name: "Create Users" },
    { id: "users.edit", name: "Edit Users" },
    { id: "users.delete", name: "Delete Users" }
  ],
  "Content Management": [
    { id: "content.view", name: "View Content" },
    { id: "content.create", name: "Create Content" },
    { id: "content.edit", name: "Edit Content" },
    { id: "content.delete", name: "Delete Content" }
  ],
  "System": [
    { id: "system.settings", name: "System Settings" },
    { id: "system.logs", name: "View Logs" }
  ]
};

type Permission = {
  id: string;
  name: string;
};

type PermissionsByCategory = {
  [category: string]: Permission[];
};

const PermissionsTab: React.FC = () => {
  // Get permissions from context
  const { permissions } = useUserManagement();
  
  // Use sample data if no permissions are available
  const permissionsByCategory: PermissionsByCategory = 
    Object.keys(permissions || {}).length > 0 ? (permissions as PermissionsByCategory) : samplePermissions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Management</CardTitle>
        <CardDescription>
          View all available permissions in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Object.entries(permissionsByCategory).map(([category, perms]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-medium mb-4">{category} Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perms.map((permission) => (
                <div 
                  key={permission.id} 
                  className="p-4 border rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{permission.name}</p>
                    <p className="text-sm text-muted-foreground">{permission.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PermissionsTab;
