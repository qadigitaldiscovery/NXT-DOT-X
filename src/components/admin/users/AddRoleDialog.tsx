
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Permission } from '@/context/UserManagementContext';

// Enhanced form schema with validation
const roleFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Role name must be at least 3 characters" })
    .max(50, { message: "Role name must be less than 50 characters" })
    .regex(/^[a-zA-Z0-9_\- ]+$/, { 
      message: "Role name can only contain letters, numbers, spaces, underscores and hyphens" 
    }),
  description: z
    .string()
    .max(200, { message: "Description must be less than 200 characters" })
    .optional(),
  permissions: z
    .array(z.string())
    .nonempty({ message: "Select at least one permission" }),
});

interface AddRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRole: (role: any) => void;
  permissions: Permission[];
}

const AddRoleDialog: React.FC<AddRoleDialogProps> = ({ open, onOpenChange, onAddRole, permissions }) => {
  const roleForm = useForm<z.infer<typeof roleFormSchema>>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [],
    },
  });

  const handleAddRole = (data: z.infer<typeof roleFormSchema>) => {
    const newRole = {
      id: Math.random().toString(36).substring(2, 11),
      name: data.name,
      description: data.description || '',
      permissions: data.permissions
    };
    
    onAddRole(newRole);
    roleForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>
            Create a new role with specific permissions.
          </DialogDescription>
        </DialogHeader>
        <Form {...roleForm}>
          <form onSubmit={roleForm.handleSubmit(handleAddRole)} className="space-y-4 py-4">
            <FormField
              control={roleForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={roleForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={roleForm.control}
              name="permissions"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Permissions</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {permissions.map((permission) => (
                      <FormField
                        key={permission.id}
                        control={roleForm.control}
                        name="permissions"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={permission.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(permission.id)}
                                  onCheckedChange={(checked) => {
                                    const currentPermissions = field.value || [];
                                    const newPermissions = checked
                                      ? [...currentPermissions, permission.id]
                                      : currentPermissions.filter(
                                          (p) => p !== permission.id
                                        );
                                    field.onChange(newPermissions);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {permission.name}
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({permission.category})
                                </span>
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Role</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoleDialog;
