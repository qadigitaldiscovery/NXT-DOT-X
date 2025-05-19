
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

// Define the form data type for strong typing
interface RoleFormData {
  name: string;
  description: string;
  permissions: string[];
}

interface AddRoleDialogProps {
  onAddRole: (role: { name: string; description: string; permissions: string[] }) => void;
  permissions: string[];
}

export function AddRoleDialog({ onAddRole, permissions }: AddRoleDialogProps) {
  // Local state for form data
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
    permissions: [],
  });
  
  // Local state for dialog open status
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (permission: string, checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, permission] };
      } else {
        return { ...prev, permissions: prev.permissions.filter(p => p !== permission) };
      }
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRole({
      name: formData.name,
      description: formData.description,
      permissions: formData.permissions,
    });
    // Reset form and close dialog
    setFormData({ name: '', description: '', permissions: [] });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Editor"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Role description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2">
              {permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={`permission-${permission}`}
                    checked={formData.permissions.includes(permission)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(permission, checked === true)
                    }
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
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Role</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
