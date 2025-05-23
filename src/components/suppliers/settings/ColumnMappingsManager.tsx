
import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

type MappingTemplate = {
  id: string;
  name: string;
  fileType: string;
  mappings: ColumnMapping[];
};

type ColumnMapping = {
  sourceColumn: string;
  targetField: string;
};

// Mock data - in a real app, this would come from the database
const initialTemplates: MappingTemplate[] = [
  {
    id: '1',
    name: 'Standard CSV Format',
    fileType: 'csv',
    mappings: [
      { sourceColumn: 'SKU', targetField: 'sku' },
      { sourceColumn: 'Description', targetField: 'description' },
      { sourceColumn: 'Price', targetField: 'cost' },
    ]
  },
  {
    id: '2',
    name: 'Excel Pricing Template',
    fileType: 'xlsx',
    mappings: [
      { sourceColumn: 'Item Number', targetField: 'sku' },
      { sourceColumn: 'Item Description', targetField: 'description' },
      { sourceColumn: 'Unit Price', targetField: 'cost' },
      { sourceColumn: 'Min Order Qty', targetField: 'min_qty' },
    ]
  }
];

// Target fields available in the system
const availableTargetFields = [
  { value: 'sku', label: 'Product SKU' },
  { value: 'description', label: 'Product Description' },
  { value: 'cost', label: 'Cost' },
  { value: 'min_qty', label: 'Minimum Quantity' },
  { value: 'max_qty', label: 'Maximum Quantity' },
  { value: 'currency_code', label: 'Currency Code' },
  { value: 'supplier_sku', label: 'Supplier SKU' },
];

export const ColumnMappingsManager = () => {
  const [templates, setTemplates] = useState<MappingTemplate[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplates[0].id);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMapping, setNewMapping] = useState<ColumnMapping>({ sourceColumn: '', targetField: '' });
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateType, setNewTemplateType] = useState('csv');

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  const handleAddMapping = () => {
    if (!newMapping.sourceColumn || !newMapping.targetField) {
      toast.error('Please fill in both source column and target field');
      return;
    }

    setTemplates(prev => 
      prev.map(template => 
        template.id === selectedTemplate 
          ? { 
              ...template, 
              mappings: [...template.mappings, { ...newMapping }] 
            }
          : template
      )
    );

    setNewMapping({ sourceColumn: '', targetField: '' });
    setIsAddDialogOpen(false);
    toast.success('Column mapping added successfully');
  };

  const handleDeleteMapping = (index: number) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === selectedTemplate 
          ? { 
              ...template, 
              mappings: template.mappings.filter((_, i) => i !== index) 
            }
          : template
      )
    );
    toast.success('Column mapping removed');
  };

  const handleCreateTemplate = () => {
    if (!newTemplateName) {
      toast.error('Please enter a template name');
      return;
    }

    const newTemplate: MappingTemplate = {
      id: `template-${Date.now()}`,
      name: newTemplateName,
      fileType: newTemplateType,
      mappings: []
    };

    setTemplates(prev => [...prev, newTemplate]);
    setSelectedTemplate(newTemplate.id);
    setNewTemplateName('');
    toast.success('New template created');
  };

  const handleSaveTemplate = () => {
    // In a real app, you would save this to the database
    toast.success('Template settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name} ({template.fileType.toUpperCase()})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create New Template</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Mapping Template</DialogTitle>
                <DialogDescription>
                  Create a new template for mapping file columns to system fields.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right col-span-1">Name:</label>
                  <Input 
                    className="col-span-3" 
                    value={newTemplateName} 
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="Template name" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right col-span-1">File Type:</label>
                  <Select value={newTemplateType} onValueChange={setNewTemplateType}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleCreateTemplate}>Create Template</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Button onClick={handleSaveTemplate}>
          <Save className="mr-2 h-4 w-4" />
          Save Template
        </Button>
      </div>

      {currentTemplate && (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source Column</TableHead>
                  <TableHead>Target Field</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTemplate.mappings.length > 0 ? (
                  currentTemplate.mappings.map((mapping, index) => (
                    <TableRow key={index}>
                      <TableCell>{mapping.sourceColumn}</TableCell>
                      <TableCell>
                        {availableTargetFields.find(f => f.value === mapping.targetField)?.label || mapping.targetField}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteMapping(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No column mappings defined yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Column Mapping
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Column Mapping</DialogTitle>
                <DialogDescription>
                  Map a source column from the file to a target field in the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right col-span-1">Source Column:</label>
                  <Input 
                    className="col-span-3" 
                    value={newMapping.sourceColumn}
                    onChange={(e) => setNewMapping({...newMapping, sourceColumn: e.target.value})}
                    placeholder="Column name in the file" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right col-span-1">Target Field:</label>
                  <Select 
                    value={newMapping.targetField}
                    onValueChange={(value) => setNewMapping({...newMapping, targetField: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select target field" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTargetFields.map(field => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMapping}>Add Mapping</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};
