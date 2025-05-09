
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Permission {
  id: string;
  name: string;
  category: string;
}

interface PermissionsTabProps {
  permissions: Permission[];
}

const PermissionsTab: React.FC<PermissionsTabProps> = ({ permissions }) => {
  // Group permissions by category
  const permissionsByCategory = permissions.reduce((acc, permission) => {
    const { category } = permission;
    if (!acc[category]) acc[category] = [];
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

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
