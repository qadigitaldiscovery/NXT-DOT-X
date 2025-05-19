import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Supplier, useCreateSupplier, useUpdateSupplier } from '@/hooks/use-suppliers';

type SupplierFormProps = {
  initialData?: Supplier;
  isEditing?: boolean;
  onDelete?: () => void;
};

export function SupplierForm({ initialData, isEditing = false, onDelete }: SupplierFormProps) {
  const navigate = useNavigate();
  const { mutate: createSupplier, status: createStatus } = useCreateSupplier();
  const { mutate: updateSupplier, status: updateStatus } = useUpdateSupplier();
  
  const isCreating = createStatus === 'pending';
  const isUpdating = updateStatus === 'pending';
  
  const [formData, setFormData] = React.useState<Partial<Supplier>>({
    name: initialData?.name || '',
    code: initialData?.code || '',
    contact_name: initialData?.contact_name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    payment_terms: initialData?.payment_terms || '',
    status: initialData?.status || 'active'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && initialData) {
      updateSupplier({ ...initialData, ...formData }, {
        onSuccess: () => {
          navigate('/beta1/suppliers');
        }
      });
    } else {
      createSupplier(formData as Omit<Supplier, 'id'>, {
        onSuccess: () => {
          navigate('/beta1/suppliers');
        }
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Supplier' : 'New Supplier'}</CardTitle>
          <CardDescription>
            {isEditing 
              ? 'Update supplier information' 
              : 'Enter information to add a new supplier'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter supplier name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Supplier Code</Label>
              <Input 
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter supplier code"
                required
                disabled={isEditing} // Cannot change code if editing
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact_name">Contact Person</Label>
              <Input 
                id="contact_name"
                name="contact_name"
                value={formData.contact_name || ''}
                onChange={handleChange}
                placeholder="Enter contact person name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website"
                name="website"
                value={formData.website || ''}
                onChange={handleChange}
                placeholder="Enter website URL"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment_terms">Payment Terms</Label>
              <Input 
                id="payment_terms"
                name="payment_terms"
                value={formData.payment_terms || ''}
                onChange={handleChange}
                placeholder="e.g., Net 30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button"
            variant="ghost"
            onClick={() => navigate('/beta1/suppliers')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            {isEditing && onDelete && (
              <Button 
                type="button"
                variant="destructive"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
            <Button 
              type="submit"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? 'Saving...' : 'Save Supplier'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
