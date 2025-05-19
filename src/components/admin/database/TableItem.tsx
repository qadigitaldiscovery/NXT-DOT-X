
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface TableData {
  name: string;
  row_count: number;
  size: string;
  last_vacuum: string;
}

interface TableItemProps {
  name?: string;
  description?: string;
  onClick?: () => void;
  table?: TableData;
  refetchTables?: () => void;
}

export function TableItem({ name, description, onClick, table, refetchTables }: TableItemProps) {
  const handleClick = () => {
    if (onClick) onClick();
    if (refetchTables && table) {
      // For backward compatibility
      console.log(`Table ${table.name} clicked`);
    }
  };

  // Use either direct name or table.name
  const displayName = table?.name || name || '';
  
  return (
    <div className="flex items-center justify-between border-b py-3 px-4 hover:bg-muted/50 cursor-pointer" onClick={handleClick}>
      <div className="flex flex-col gap-1">
        <div className="font-medium">{displayName}</div>
        {(description || (table && `${table.row_count} rows, ${table.size}`)) && (
          <div className="text-sm text-muted-foreground">
            {description || (table && `${table.row_count} rows, ${table.size}`)}
          </div>
        )}
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
