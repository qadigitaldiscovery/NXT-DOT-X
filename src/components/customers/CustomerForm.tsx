
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
import { ArrowLeft, Save, Trash2 } from "lucide-react";

// Define Customer type similar to Supplier
type Customer = {
  id: string;
  name: string;
  code: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  account_type: string;
  status: string;
};

type CustomerFormProps = {
  initialData?: Customer;
  isEditing?: boolean;
  onDelete?: () => void;
};

export function CustomerForm({ initialData, isEditing = false, onDelete }: CustomerFormProps) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = React.useState<Partial<Customer>>({
    name: initialData?.name || '',
    code: initialData?.code || '',
    contact_name: initialData?.contact_name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    account_type: initialData?.account_type || 'standard',
    status: initialData?.status || 'active'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };
  
  const handleAccountTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, account_type: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer form submitted:', formData);
    
    // In a real implementation, this would call API endpoints
    navigate('/customer-management/directory');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Customer' : 'New Customer'}</CardTitle>
          <CardDescription>
            {isEditing 
              ? 'Update customer information' 
              : 'Enter information to add a new customer'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Customer Code</Label>
              <Input 
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter customer code"
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
              <Label htmlFor="account_type">Account Type</Label>
              <Select 
                value={formData.account_type} 
                onValueChange={handleAccountTypeChange}
              >
                <SelectTrigger id="account_type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
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
            onClick={() => navigate('/customer-management/directory')}
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
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
