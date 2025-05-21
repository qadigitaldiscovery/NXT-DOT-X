
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ColumnMapping {
  id: string;
  sourceColumn: string;
  targetColumn: string;
}

interface ColumnMappingsManagerProps {
  sourceColumns?: string[];
  targetColumns?: string[];
  initialMappings?: ColumnMapping[];
  onSave?: (mappings: ColumnMapping[]) => void;
}

export function ColumnMappingsManager({
  sourceColumns = [],
  targetColumns = [],
  initialMappings = [],
  onSave
}: ColumnMappingsManagerProps) {
  const [mappings, setMappings] = useState<ColumnMapping[]>(initialMappings);
  const [newSourceColumn, setNewSourceColumn] = useState<string>('');
  const [newTargetColumn, setNewTargetColumn] = useState<string>('');

  const handleAddMapping = () => {
    if (newSourceColumn && newTargetColumn) {
      const newMapping: ColumnMapping = {
        id: Date.now().toString(),
        sourceColumn: newSourceColumn,
        targetColumn: newTargetColumn
      };
      setMappings([...mappings, newMapping]);
      setNewSourceColumn('');
      setNewTargetColumn('');
    }
  };

  const handleRemoveMapping = (id: string) => {
    setMappings(mappings.filter(mapping => mapping.id !== id));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(mappings);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Column Mappings</CardTitle>
        <CardDescription>
          Map source data columns to system columns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select
                value={newSourceColumn}
                onValueChange={setNewSourceColumn}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source column" />
                </SelectTrigger>
                <SelectContent>
                  {sourceColumns.map(column => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select
                value={newTargetColumn}
                onValueChange={setNewTargetColumn}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target column" />
                </SelectTrigger>
                <SelectContent>
                  {targetColumns.map(column => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddMapping} disabled={!newSourceColumn || !newTargetColumn}>
              Add Mapping
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Column</TableHead>
                <TableHead>Target Column</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No mappings defined
                  </TableCell>
                </TableRow>
              ) : (
                mappings.map(mapping => (
                  <TableRow key={mapping.id}>
                    <TableCell>{mapping.sourceColumn}</TableCell>
                    <TableCell>{mapping.targetColumn}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMapping(mapping.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave}>Save Mappings</Button>
      </CardFooter>
    </Card>
  );
}

export default ColumnMappingsManager;
