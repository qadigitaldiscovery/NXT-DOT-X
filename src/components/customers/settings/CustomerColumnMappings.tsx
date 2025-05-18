
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Save, Plus, Trash2 } from 'lucide-react';

interface ColumnMapping {
  id: string;
  fileColumn: string;
  systemField: string;
  required: boolean;
}

export const CustomerColumnMappings = () => {
  const [mappings, setMappings] = useState<ColumnMapping[]>([
    { id: '1', fileColumn: 'Customer Name', systemField: 'name', required: true },
    { id: '2', fileColumn: 'Customer Code', systemField: 'code', required: true },
    { id: '3', fileColumn: 'Contact Person', systemField: 'contact_name', required: false },
    { id: '4', fileColumn: 'Email Address', systemField: 'email', required: false },
    { id: '5', fileColumn: 'Phone Number', systemField: 'phone', required: false },
  ]);

  const systemFields = [
    { value: 'name', label: 'Customer Name' },
    { value: 'code', label: 'Customer Code' },
    { value: 'contact_name', label: 'Contact Person' },
    { value: 'email', label: 'Email Address' },
    { value: 'phone', label: 'Phone Number' },
    { value: 'website', label: 'Website' },
    { value: 'account_type', label: 'Account Type' },
    { value: 'status', label: 'Status' },
  ];

  const addMapping = () => {
    const newId = (mappings.length + 1).toString();
    setMappings([...mappings, { id: newId, fileColumn: '', systemField: '', required: false }]);
  };

  const removeMapping = (id: string) => {
    setMappings(mappings.filter(mapping => mapping.id !== id));
  };

  const updateMapping = (id: string, field: keyof ColumnMapping, value: string | boolean) => {
    setMappings(mappings.map(mapping => 
      mapping.id === id ? { ...mapping, [field]: value } : mapping
    ));
  };

  const handleSave = () => {
    console.log('Saving column mappings:', mappings);
    toast.success('Column mappings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Column Mappings</h3>
          <Button onClick={addMapping} size="sm" variant="outline" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Mapping
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Column</TableHead>
              <TableHead>System Field</TableHead>
              <TableHead>Required</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mappings.map((mapping) => (
              <TableRow key={mapping.id}>
                <TableCell>
                  <Input 
                    value={mapping.fileColumn} 
                    onChange={(e) => updateMapping(mapping.id, 'fileColumn', e.target.value)}
                    placeholder="CSV column name"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={mapping.systemField}
                    onValueChange={(value) => updateMapping(mapping.id, 'systemField', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select system field" />
                    </SelectTrigger>
                    <SelectContent>
                      {systemFields.map(field => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={mapping.required.toString()}
                    onValueChange={(value) => updateMapping(mapping.id, 'required', value === 'true')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeMapping(mapping.id)}
                    disabled={mapping.required} // Don't allow deleting required mappings
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Mappings
        </Button>
      </div>
    </div>
  );
};
