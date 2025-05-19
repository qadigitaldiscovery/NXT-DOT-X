import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ApiEndpointRow from './ApiEndpointRow';
import { ApiEndpoint } from './types';

interface EndpointsTableProps {
  endpoints: ApiEndpoint[];
  onEdit: (endpoint: ApiEndpoint) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const EndpointsTable = ({ 
  endpoints,
  onEdit,
  onDelete,
  onToggleStatus
}: EndpointsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {endpoints.length > 0 ? (
            endpoints.map((endpoint) => (
              <ApiEndpointRow
                key={endpoint.id}
                endpoint={endpoint}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No endpoints found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EndpointsTable;
