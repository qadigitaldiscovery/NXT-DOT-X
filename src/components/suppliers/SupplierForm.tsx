
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Supplier } from '@/hooks/use-suppliers';

interface SupplierFormProps {
  initialData?: Supplier;
  isEditing?: boolean;
  onDelete?: () => void;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({ 
  initialData, 
  isEditing = false, 
  onDelete 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Edit Supplier' : 'Add New Supplier'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Supplier Name</Label>
            <Input 
              id="name" 
              defaultValue={initialData?.name}
              placeholder="Enter supplier name"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="code">Supplier Code</Label>
            <Input 
              id="code" 
              defaultValue={initialData?.code}
              placeholder="Enter supplier code"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              defaultValue={initialData?.email}
              placeholder="Enter email address"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              defaultValue={initialData?.phone}
              placeholder="Enter phone number"
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">
              {isEditing ? 'Update Supplier' : 'Create Supplier'}
            </Button>
            {isEditing && onDelete && (
              <Button 
                type="button" 
                variant="destructive" 
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupplierForm;
