
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModules, type Module } from '@/hooks/useModules';
import { Check, Trash2, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import PermissionGuard from './PermissionGuard';

interface BatchOperationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const BatchOperationsDialog: React.FC<BatchOperationsDialogProps> = ({
  isOpen,
  onClose
}) => {
  const { modules, updateModuleStatus } = useModules();
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string>('status');
  const [statusValue, setStatusValue] = useState<'green' | 'orange' | 'red'>('green');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Reset state when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedModuleIds([]);
      setSelectedOperation('status');
      setStatusValue('green');
    }
  }, [isOpen]);

  const handleToggleModule = (moduleId: string) => {
    setSelectedModuleIds(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedModuleIds.length === modules.length) {
      setSelectedModuleIds([]);
    } else {
      setSelectedModuleIds(modules.map(module => module.id));
    }
  };

  const handleExecuteOperation = async () => {
    if (selectedModuleIds.length === 0) {
      toast.error('No modules selected');
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedOperation === 'status') {
        // Update status for all selected modules
        const updatePromises = selectedModuleIds.map(moduleId => 
          updateModuleStatus(moduleId, statusValue)
        );
        
        await Promise.all(updatePromises);
        
        toast.success(
          `Updated status to ${statusValue} for ${selectedModuleIds.length} modules`
        );
      } else {
        // Handle other batch operations here
        toast.info('Operation not implemented yet');
      }
      
      onClose();
    } catch (error) {
      console.error('Error executing batch operation:', error);
      toast.error('Failed to execute operation');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Batch Operations</DialogTitle>
          <DialogDescription>
            Perform operations on multiple modules at once.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <PermissionGuard requiredPermission={['modules.edit', 'modules.all']}>
            {/* Operation selection */}
            <div className="grid gap-2">
              <label htmlFor="operation" className="text-sm font-medium">
                Operation
              </label>
              <Select 
                value={selectedOperation} 
                onValueChange={setSelectedOperation}
              >
                <SelectTrigger id="operation">
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="status">Update Status</SelectItem>
                  <SelectItem value="archive" disabled>Archive Modules</SelectItem>
                  <SelectItem value="delete" disabled>Delete Modules</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status value selection (if status operation) */}
            {selectedOperation === 'status' && (
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status Value
                </label>
                <Select 
                  value={statusValue} 
                  onValueChange={(value) => setStatusValue(value as 'green' | 'orange' | 'red')}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">Operational (Green)</SelectItem>
                    <SelectItem value="orange">Degraded (Orange)</SelectItem>
                    <SelectItem value="red">Outage (Red)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Module selection */}
            <div className="border rounded-md">
              <div className="flex items-center justify-between p-2 border-b bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="selectAll"
                    checked={selectedModuleIds.length === modules.length && modules.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="selectAll" className="text-sm font-medium">
                    Select All
                  </label>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedModuleIds.length} of {modules.length} selected
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {modules.map(module => (
                  <div 
                    key={module.id} 
                    className="flex items-center space-x-3 p-3 border-b last:border-0 hover:bg-muted/30"
                  >
                    <Checkbox 
                      id={`module-${module.id}`}
                      checked={selectedModuleIds.includes(module.id)}
                      onCheckedChange={() => handleToggleModule(module.id)}
                    />
                    <label 
                      htmlFor={`module-${module.id}`} 
                      className="flex-1 text-sm"
                    >
                      {module.name}
                      <div className="text-xs text-muted-foreground">
                        Current status: {module.status}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PermissionGuard>
        </div>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <PermissionGuard requiredPermission={['modules.edit', 'modules.all']}>
            <Button 
              onClick={handleExecuteOperation}
              disabled={selectedModuleIds.length === 0 || isProcessing}
              loading={isProcessing}
            >
              Execute Operation
            </Button>
          </PermissionGuard>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchOperationsDialog;
