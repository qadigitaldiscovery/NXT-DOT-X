
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
    <a 
      href="#"
      onClick={(e) => {
        e.preventDefault();
        if (!loading) {
          onRefresh();
        }
      }}
      className={`inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline ${
        loading ? "opacity-50 pointer-events-none" : ""
      }`}
      aria-label="Refresh data"
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
      Refresh
    </a>
  );
}
