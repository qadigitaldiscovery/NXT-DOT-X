import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle } from 'lucide-react';
// Import placeholders for missing modules; these should be installed or typed properly in a real project
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// Define a placeholder schema for the form; replace with actual zod schema when available
const roleSchema = {
  name: '',
  description: '',
  permissions: [] as string[],
};

// Placeholder for useForm hook; replace with actual implementation
const useForm = () => {
  const register = (name: string) => ({
    name,
    onChange: () => {},
    onBlur: () => {},
    ref: () => {},
  });
  const handleSubmit = (callback: (data: any) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    callback({ name: '', description: '', permissions: [] });
  };
  const formState = { errors: {} };
  return { register, handleSubmit, formState };
};

interface AddRoleDialogProps {
  onAddRole: (role: { name: string; description: string; permissions: string[] }) => void;
  permissions: string[];
}

export function AddRoleDialog({ onAddRole, permissions }: AddRoleDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: typeof roleSchema) => {
    onAddRole({
      name: data.name,
      description: data.description,
      permissions: data.permissions,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              placeholder="e.g., Editor"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Role description"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2">
              {permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={`permission-${permission}`}
                    {...register(`permissions.${permission}`)}
                  />
                  <Label
                    htmlFor={`permission-${permission}`}
                    className="text-sm cursor-pointer"
                  >
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
            {errors.permissions && (
              <p className="text-sm text-red-500">{errors.permissions.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Role</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
