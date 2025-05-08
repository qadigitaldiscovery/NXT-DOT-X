
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ApiEndpointRow from './ApiEndpointRow';
import { ApiEndpoint } from './types';

interface EndpointsTableProps {
  endpoints: ApiEndpoint[];
  showApiKeys: {[key: string]: boolean};
  onToggleApiKey: (id: string) => void;
  onCopyApiKey: (apiKey: string, name: string) => void;
  onTestEndpoint: (id: string) => void;
}

const EndpointsTable: React.FC<EndpointsTableProps> = ({ 
  endpoints, 
  showApiKeys, 
  onToggleApiKey, 
  onCopyApiKey, 
  onTestEndpoint 
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>API Key</TableHead>
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
                showApiKey={!!showApiKeys[endpoint.id]}
                onToggleApiKey={() => onToggleApiKey(endpoint.id)}
                onCopyApiKey={() => endpoint.apiKey && onCopyApiKey(endpoint.apiKey, endpoint.name)}
                onTestEndpoint={() => onTestEndpoint(endpoint.id)}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
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
