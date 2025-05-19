import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

const mockMappings = [
  { id: '1', sourceField: 'Customer ID', targetField: 'customer_id', type: 'string', required: true },
  { id: '2', sourceField: 'Full Name', targetField: 'name', type: 'string', required: true },
  { id: '3', sourceField: 'Email Address', targetField: 'email', type: 'string', required: false },
  { id: '4', sourceField: 'Phone Number', targetField: 'phone', type: 'string', required: false },
  { id: '5', sourceField: 'Total Purchases', targetField: 'total_spend', type: 'number', required: false },
];

export function CustomerColumnMappings() {
  const handleAddMapping = () => {
    console.log('Adding new mapping');
    // Implement add functionality
  };

  const handleRemoveMapping = (id: string, sourceField: string) => {
    if (window.confirm(`Are you sure you want to remove the mapping for "${sourceField}"?`)) {
      console.log(`Removing mapping ${id}`);
      // Implement remove functionality
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Column Mappings</CardTitle>
          <CardDescription>Map source data fields to customer attributes</CardDescription>
        </div>
        <Button size="sm" onClick={handleAddMapping}>
          <Plus className="h-4 w-4 mr-2" />
          Add Mapping
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source Field</TableHead>
              <TableHead>Target Field</TableHead>
              <TableHead>Data Type</TableHead>
              <TableHead>Required</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMappings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No mappings defined
                </TableCell>
              </TableRow>
            ) : (
              mockMappings.map((mapping) => (
                <TableRow key={mapping.id}>
                  <TableCell className="font-medium">{mapping.sourceField}</TableCell>
                  <TableCell>{mapping.targetField}</TableCell>
                  <TableCell>{mapping.type}</TableCell>
                  <TableCell>{mapping.required ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveMapping(mapping.id, mapping.sourceField)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
