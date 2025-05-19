import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModuleAccess } from '@/hooks/useModuleAccess';

interface ModuleTogglePanelProps {
  userId: string;
}

const ModuleTogglePanel: React.FC<ModuleTogglePanelProps> = ({ userId }) => {
  const [accessList, setAccessList] = useState<ModuleAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<{ id: string; username: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>(userId);
  const { toast } = useToast();

  const fetchModuleAccess = async (uid: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_module_access')
        .select('*')
        .eq('user_id', uid);
        
      if (error) throw error;
      setAccessList(data?.map(item => ({
        ...item,
        submenu_slug: item.submenu_slug || undefined,
        category: item.category || undefined
      })) || []);
    } catch (err) {
      console.error('Error fetching module access:', err);
      toast.error({
        title: "Error",
        description: "Failed to load module access settings"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      // In a real implementation, you'd fetch from the profiles table
      // This is a placeholder since we don't have direct access to auth.users
      const { data, error } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');
        
      if (error) throw error;
      
      // For demonstration, we'll just use the user IDs
      // In a real app, you'd join with a profiles table
      setUsers(data.map(u => ({ 
        id: u.user_id, 
        username: u.user_id.substring(0, 8) + '...' 
      })));

    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (userId) {
      fetchModuleAccess(userId);
      setSelectedUser(userId);
    }
  }, [userId]);

  const handleUserChange = (uid: string) => {
    setSelectedUser(uid);
    fetchModuleAccess(uid);
  };

  const toggleAccess = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('user_module_access')
        .update({ is_enabled: !currentValue })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setAccessList(prev => prev.map(item => 
        item.id === id ? { ...item, is_enabled: !currentValue } : item
      ));

      toast({
        title: "Access Updated",
        description: `Module access has been ${!currentValue ? 'enabled' : 'disabled'}`
      });
    } catch (err) {
      console.error('Error toggling access:', err);
      toast.error({
        title: "Error",
        description: "Failed to update module access"
      });
    }
  };

  const addModuleAccess = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const moduleSlug = formData.get('moduleSlug') as string;
    const submenuSlug = formData.get('submenuSlug') as string;
    const category = formData.get('category') as string;

    if (!moduleSlug) {
      toast.error({
        title: "Validation Error",
        description: "Module slug is required"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_module_access')
        .insert([{ 
          user_id: selectedUser,
          module_slug: moduleSlug,
          submenu_slug: submenuSlug || undefined,
          category: category || undefined,
          is_enabled: true
        }])
        .select();
        
      if (error) throw error;
      
      setAccessList(prev => [...prev, {
        ...data[0],
        submenu_slug: data[0].submenu_slug || undefined,
        category: data[0].category || undefined
      }]);
      
      toast({
        title: "Success",
        description: "Module access added successfully"
      });
      
      // Reset the form
      (event.target as HTMLFormElement).reset();
      
    } catch (err) {
      console.error('Error adding module access:', err);
      toast.error({
        title: "Error",
        description: "Failed to add module access"
      });
    }
  };

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
          ) : accessList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No module access settings found for this user
            </div>
          ) : (
            <div className="space-y-4">
              {accessList.map(access => (
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
                    onCheckedChange={() => toggleAccess(access.id, access.is_enabled)} 
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
          <form onSubmit={addModuleAccess} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="moduleSlug">Module Slug *</Label>
                <Input id="moduleSlug" name="moduleSlug" placeholder="e.g., dashboard" required />
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
