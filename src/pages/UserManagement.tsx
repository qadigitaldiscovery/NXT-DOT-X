
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Shield, CheckCircle2 } from 'lucide-react';
import { UsersTab } from '@/components/admin/users/UsersTab';
import RolesTab from '@/components/admin/users/RolesTab';
import PermissionsTab from '@/components/admin/users/PermissionsTab';
import { UserManagementProvider } from '@/context/UserManagementContext';

const UserManagement = () => {
  const { user } = useAuth();

  return (
    <UserManagementProvider>
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
            <UsersTab />
          </TabsContent>
          
          <TabsContent value="roles">
            <RolesTab />
          </TabsContent>
          
          <TabsContent value="permissions">
            <PermissionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </UserManagementProvider>
  );
};

export default UserManagement;
