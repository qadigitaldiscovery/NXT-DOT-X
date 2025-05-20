
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useModules } from '../../context/ModulesContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';

interface User {
  id: string;
  email?: string;
  username?: string;
}

interface ModuleTogglePanelProps {
  userId: string;
}

interface ModuleAccess {
  id: string;
  module_slug: string;
  is_enabled: boolean;
  submenu_slug?: string;
  category?: string;
}

const ModuleTogglePanel: React.FC<ModuleTogglePanelProps> = ({ userId }) => {
  const { modules, loading, toggleModule } = useModules();
  const [selectedUser, setSelectedUser] = useState<string>(userId);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();

  // Convert modules to module access format
  const userAccessList: ModuleAccess[] = modules.map(module => ({
    id: module.id,
    module_slug: module.name,
    is_enabled: module.enabled,
    submenu_slug: undefined,
    category: undefined
  }));

  const handleUserChange = (uid: string) => {
    setSelectedUser(uid);
  };

  const handleToggleAccess = async (id: string, currentValue: boolean) => {
    try {
      await toggleModule(id, !currentValue);
      toast.success(`Module access ${!currentValue ? 'enabled' : 'disabled'}`);
      
      // Since refreshModules doesn't exist in the context, we'll adapt to use what's available
      // If refresh is needed, do a manual refresh instead
      // await refreshModules();
    } catch (err) {
      console.error('Error toggling access:', err);
      toast.error('Failed to update module access');
    }
  };

  const handleAddModuleAccess = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.error('Adding module access is not supported in current context');
  };

  useEffect(() => {
    if (user) {
      setUsers([
        {
          id: user.id,
          email: user.email,
          username: user.email || user.id
        }
      ]);
    }
  }, [user]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Module Access Control</CardTitle>
          <CardDescription>
            Manage which modules and submenus users can access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="userId">Select User</Label>
            <Select value={selectedUser} onValueChange={handleUserChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
            </div>
          ) : userAccessList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No module access settings found for this user
            </div>
          ) : (
            <div className="space-y-4">
              {userAccessList.map(access => (
                <div key={access.id} className="flex justify-between items-center border p-3 rounded-md">
                  <div>
                    <div className="font-medium">{access.module_slug}</div>
                    {access.submenu_slug && (
                      <div className="text-sm text-gray-500">
                        Submenu: {access.submenu_slug}
                      </div>
                    )}
                    {access.category && (
                      <Badge variant="outline" className="mt-1">
                        {access.category}
                      </Badge>
                    )}
                  </div>
                  <Switch 
                    checked={access.is_enabled} 
                    onCheckedChange={() => handleToggleAccess(access.id, access.is_enabled)} 
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Module Access</CardTitle>
          <CardDescription>
            Grant access to a module for this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddModuleAccess} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="moduleSlug">Module Slug *</Label>
                <Select name="moduleSlug" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module: any) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="submenuSlug">Submenu Slug (Optional)</Label>
                <Input id="submenuSlug" name="submenuSlug" placeholder="e.g., analytics" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category (Optional)</Label>
              <Select name="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Add Access
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleTogglePanel;
