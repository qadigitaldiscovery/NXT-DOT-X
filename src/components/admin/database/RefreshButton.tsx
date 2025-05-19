
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
  onRefresh: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean; // For backward compatibility
}

export function RefreshButton({ 
  onRefresh, 
  isLoading = false,
  isRefreshing = false 
}: RefreshButtonProps) {
  // Use either isLoading or isRefreshing (for backward compatibility)
  const loading = isLoading || isRefreshing;
  
  return (
    <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
      <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
      Refresh
    </Button>
  );
}
