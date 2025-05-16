
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Module } from '@/hooks/useModules';
import { toast } from 'sonner';

export interface BatchOperationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  modules: Module[];
}

const BatchOperationsDialog: React.FC<BatchOperationsDialogProps> = ({ isOpen, onClose, modules }) => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleModuleToggle = (moduleId: string) => {
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
      setSelectedModules(modules.map(module => module.id));
    }
  };

  const handleExecuteBatch = async () => {
    if (selectedModules.length === 0) {
      toast.error("Please select at least one module");
      return;
    }
    
    if (!selectedOperation) {
      toast.error("Please select an operation");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success(`Executed ${selectedOperation} on ${selectedModules.length} module(s)`);
      
      // Reset and close
      setSelectedModules([]);
      setSelectedOperation("");
      onClose();
    } catch (error) {
      toast.error("Failed to execute batch operation");
      console.error("Batch operation error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Batch Operations</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <Label htmlFor="operation">Select Operation</Label>
            <Select value={selectedOperation} onValueChange={setSelectedOperation}>
              <SelectTrigger id="operation">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="refresh">Refresh Status</SelectItem>
                <SelectItem value="reset-alerts">Reset Alerts</SelectItem>
                <SelectItem value="enable-monitoring">Enable Monitoring</SelectItem>
                <SelectItem value="disable-monitoring">Disable Monitoring</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <Label>Select Modules</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSelectAll}
                className="h-7"
              >
                {selectedModules.length === modules.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md max-h-60 overflow-y-auto p-2">
            {modules.map(module => (
              <div key={module.id} className="flex items-center space-x-2 py-2">
                <Checkbox 
                  id={`module-${module.id}`}
                  checked={selectedModules.includes(module.id)}
                  onCheckedChange={() => handleModuleToggle(module.id)}
                />
                <Label htmlFor={`module-${module.id}`} className="flex-1 cursor-pointer">
                  {module.name}
                </Label>
                <div className={`w-3 h-3 rounded-full ${
                  module.status === 'green' ? 'bg-green-500' : 
                  module.status === 'orange' ? 'bg-orange-500' : 
                  module.status === 'red' ? 'bg-red-500' : 'bg-gray-500'
                }`}></div>
              </div>
            ))}
            
            {modules.length === 0 && (
              <p className="text-center py-2 text-muted-foreground">No modules available</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleExecuteBatch} 
            disabled={selectedModules.length === 0 || !selectedOperation || isProcessing}
          >
            {isProcessing ? "Processing..." : "Execute"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchOperationsDialog;
