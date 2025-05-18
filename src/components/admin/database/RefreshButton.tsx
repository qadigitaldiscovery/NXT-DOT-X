
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

const RefreshButton = ({ isRefreshing, onRefresh }: RefreshButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={onRefresh} 
      disabled={isRefreshing}
      className="flex items-center gap-1"
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? 'Refreshing...' : 'Refresh Tables'}
    </Button>
  );
};

export default RefreshButton;
