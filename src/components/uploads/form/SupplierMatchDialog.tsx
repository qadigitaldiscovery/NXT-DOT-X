
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SupplierMatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  onMatch: (supplierId: string | null, createNew: boolean) => void;
}

export const SupplierMatchDialog: React.FC<SupplierMatchDialogProps> = ({
  open,
  onOpenChange,
  fileName,
  onMatch
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [newSupplierName, setNewSupplierName] = useState<string>('');
  const [newSupplierEmail, setNewSupplierEmail] = useState<string>('');
  const [newSupplierPhone, setNewSupplierPhone] = useState<string>('');
  const [newSupplierAddress, setNewSupplierAddress] = useState<string>('');
  const [newSupplierCategory, setNewSupplierCategory] = useState<string>('');
  const [matchOption, setMatchOption] = useState<'existing' | 'new'>('existing');

  const handleSubmit = () => {
    if (matchOption === 'existing') {
      onMatch(selectedSupplier || null, false);
    } else {
      onMatch(null, true);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Match Supplier for {fileName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Match Option</Label>
            <Select value={matchOption} onValueChange={(value: 'existing' | 'new') => setMatchOption(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="existing">Match to Existing Supplier</SelectItem>
                <SelectItem value="new">Create New Supplier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {matchOption === 'existing' ? (
            <div className="space-y-2">
              <Label>Select Supplier</Label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a supplier..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supplier-1">Acme Corporation</SelectItem>
                  <SelectItem value="supplier-2">Beta Industries</SelectItem>
                  <SelectItem value="supplier-3">Gamma Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Supplier Name</Label>
                <Input
                  id="name"
                  value={newSupplierName}
                  onChange={(e) => setNewSupplierName(e.target.value)}
                  placeholder="Enter supplier name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newSupplierEmail}
                  onChange={(e) => setNewSupplierEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newSupplierPhone}
                  onChange={(e) => setNewSupplierPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newSupplierAddress}
                  onChange={(e) => setNewSupplierAddress(e.target.value)}
                  placeholder="Enter address"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newSupplierCategory}
                  onChange={(e) => setNewSupplierCategory(e.target.value)}
                  placeholder="Enter category"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {matchOption === 'existing' ? 'Match Supplier' : 'Create Supplier'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
