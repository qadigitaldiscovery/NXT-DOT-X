
import React from 'react';
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, KeyRound } from "lucide-react";
import { ApiEndpoint } from './types';

interface ApiEndpointRowProps {
  endpoint: ApiEndpoint;
  showApiKey: boolean;
  onToggleApiKey: () => void;
  onCopyApiKey: () => void;
  onTestEndpoint: () => void;
}

const ApiEndpointRow: React.FC<ApiEndpointRowProps> = ({ 
  endpoint, 
  showApiKey, 
  onToggleApiKey, 
  onCopyApiKey, 
  onTestEndpoint 
}) => {
  // Function to render the appropriate status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{endpoint.name}</TableCell>
      <TableCell className="font-mono text-sm flex items-center">
        {endpoint.url}
        <ExternalLink className="h-3 w-3 ml-1 text-gray-400" />
      </TableCell>
      <TableCell>
        {endpoint.apiKey ? (
          <div className="flex items-center space-x-2">
            <KeyRound className="h-4 w-4 text-blue-500" />
            <span className="font-mono text-sm">
              {showApiKey ? endpoint.apiKey : '••••••••••••'}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={onToggleApiKey}
              title={showApiKey ? "Hide API key" : "Show API key"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3.5 w-3.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {showApiKey ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onCopyApiKey}
              title="Copy API key"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </Button>
          </div>
        ) : (
          <span className="text-gray-400 italic">Not set</span>
        )}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={
          endpoint.method === 'GET' ? 'border-blue-500 text-blue-500' :
          endpoint.method === 'POST' ? 'border-green-500 text-green-500' :
          endpoint.method === 'PUT' ? 'border-orange-500 text-orange-500' :
          'border-red-500 text-red-500'
        }>
          {endpoint.method}
        </Badge>
      </TableCell>
      <TableCell>{getStatusBadge(endpoint.status)}</TableCell>
      <TableCell>{new Date(endpoint.lastUsed).toLocaleString()}</TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="sm" onClick={onTestEndpoint}>
          Test
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ApiEndpointRow;
