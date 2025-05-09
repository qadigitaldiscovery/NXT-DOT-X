
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Shield, CheckCircle2 } from 'lucide-react';
import UsersTab from '@/components/admin/users/UsersTab';
import RolesTab from '@/components/admin/users/RolesTab';
import PermissionsTab from '@/components/admin/users/PermissionsTab';

// Sample user data
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    created: '2023-01-10'
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    role: 'manager',
    status: 'active',
    created: '2023-02-15'
  },
  {
    id: '3',
    username: 'user',
    email: 'user@example.com',
    role: 'user',
    status: 'active',
    created: '2023-03-20'
  }
];

// Sample roles
const roles = [
  {
    id: '1',
    name: 'admin',
    description: 'Full access to all system functions',
    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'settings.access', 'modules.all']
  },
  {
    id: '2',
    name: 'manager',
    description: 'Access to manage specific modules',
    permissions: ['users.view', 'settings.access', 'modules.data', 'modules.loyalty']
  },
  {
    id: '3',
    name: 'user',
    description: 'Limited access to basic functions',
    permissions: ['modules.data']
  }
];

// Sample permissions
const permissions = [
  { id: 'users.view', name: 'View Users', category: 'Users' },
  { id: 'users.create', name: 'Create Users', category: 'Users' },
  { id: 'users.edit', name: 'Edit Users', category: 'Users' },
  { id: 'users.delete', name: 'Delete Users', category: 'Users' },
  { id: 'settings.access', name: 'Access Settings', category: 'Settings' },
  { id: 'modules.all', name: 'Access All Modules', category: 'Modules' },
  { id: 'modules.data', name: 'Access Data Module', category: 'Modules' },
  { id: 'modules.loyalty', name: 'Access Loyalty Module', category: 'Modules' }
];

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [rolesData, setRolesData] = useState(roles);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage system users, roles, and permissions</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Permissions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UsersTab 
            users={users}
            rolesData={rolesData}
            setUsers={setUsers}
          />
        </TabsContent>
        
        <TabsContent value="roles">
          <RolesTab 
            rolesData={rolesData}
            setRolesData={setRolesData}
            permissions={permissions}
          />
        </TabsContent>
        
        <TabsContent value="permissions">
          <PermissionsTab permissions={permissions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
