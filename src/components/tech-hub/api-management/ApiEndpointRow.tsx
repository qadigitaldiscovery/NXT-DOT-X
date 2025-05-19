
import { useState } from 'react';
import { ApiEndpoint } from './types';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit, Trash2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ApiEndpointRowProps {
  endpoint: ApiEndpoint;
  onEdit: (endpoint: ApiEndpoint) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function ApiEndpointRow({
  endpoint,
  onEdit,
  onDelete,
  onToggleStatus,
}: ApiEndpointRowProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  // Format time since last used
  const lastUsedText = endpoint.lastUsed
    ? formatDistanceToNow(new Date(endpoint.lastUsed), { addSuffix: true })
    : 'Never';

  const maskedApiKey = endpoint.apiKey.substring(0, 3) + '•'.repeat(endpoint.apiKey.length - 6) + endpoint.apiKey.substring(endpoint.apiKey.length - 3);

  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-muted/50 transition-colors">
      <div className="flex flex-col space-y-1 flex-grow">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{endpoint.name}</span>
          <Badge variant={endpoint.status === 'active' ? 'success' : 'secondary'} className="text-xs">
            {endpoint.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {endpoint.method}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground truncate max-w-xs">
          {endpoint.url}
        </div>
        <div className="text-xs text-muted-foreground flex items-center">
          <span className="mr-2">Key: {showApiKey ? endpoint.apiKey : maskedApiKey}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 p-0 text-xs"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? 'Hide' : 'Show'}
          </Button>
          <span className="ml-4">Last used: {lastUsedText}</span>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(endpoint)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleStatus(endpoint.id)}>
              {endpoint.status === 'active' ? (
                <>
                  <XCircle className="mr-2 h-4 w-4" /> Deactivate
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" /> Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(endpoint.id)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
