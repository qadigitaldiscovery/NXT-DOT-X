
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Module } from '@/hooks/useModules';

export interface BatchOperationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  modules: Module[];
}

const BatchOperationsDialog: React.FC<BatchOperationsDialogProps> = ({
  isOpen,
  onClose,
  modules
}) => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [operation, setOperation] = useState<string>('status');
  const [newStatus, setNewStatus] = useState<string>('green');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleToggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedModules.length === modules.length) {
      setSelectedModules([]);
    } else {
      setSelectedModules(modules.map(m => m.id));
    }
  };
  
  const handleApplyOperations = async () => {
    if (selectedModules.length === 0) {
      toast.error("Please select at least one module");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate batch operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call an API endpoint to perform the batch operation
      // For now, we'll just show a success toast
      toast.success(`Applied ${operation} operation to ${selectedModules.length} modules`);
      
      // Reset selections
      setSelectedModules([]);
      onClose();
    } catch (error) {
      console.error("Error applying batch operations:", error);
      toast.error("Failed to apply batch operations");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Batch Operations</DialogTitle>
          <DialogDescription>
            Apply operations to multiple modules at once
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Label>Operation Type</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">Update Status</SelectItem>
                <SelectItem value="restart">Restart Module</SelectItem>
                <SelectItem value="sync">Sync Configuration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {operation === 'status' && (
            <div className="flex items-center justify-between">
              <Label>New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">Green (Operational)</SelectItem>
                  <SelectItem value="orange">Orange (Degraded)</SelectItem>
                  <SelectItem value="red">Red (Outage)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="border rounded-md p-4">
            <div className="flex items-center pb-2 mb-2 border-b">
              <Checkbox 
                id="select-all"
                checked={selectedModules.length === modules.length && modules.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <label 
                htmlFor="select-all"
                className="text-sm font-medium ml-2 cursor-pointer"
              >
                Select All Modules
              </label>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2">
              {modules.map(module => (
                <div key={module.id} className="flex items-center">
                  <Checkbox 
                    id={`module-${module.id}`}
                    checked={selectedModules.includes(module.id)}
                    onCheckedChange={() => handleToggleModule(module.id)}
                  />
                  <label 
                    htmlFor={`module-${module.id}`}
                    className="text-sm ml-2 cursor-pointer flex-1"
                  >
                    {module.name}
                  </label>
                  <span className={`h-2 w-2 rounded-full ml-2 ${
                    module.status === 'green' ? 'bg-green-500' : 
                    module.status === 'orange' ? 'bg-amber-500' : 
                    module.status === 'red' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                </div>
              ))}
              
              {modules.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-2">
                  No modules available
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleApplyOperations}
            disabled={isProcessing || selectedModules.length === 0}
          >
            {isProcessing ? "Processing..." : "Apply to Selected"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchOperationsDialog;
