import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface TableItemProps {
  name: string;
  description?: string;
  onClick: () => void;
}

export function TableItem({ name, description, onClick }: TableItemProps) {
  return (
    <div className="flex items-center justify-between border-b py-3 px-4 hover:bg-muted/50 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col gap-1">
        <div className="font-medium">{name}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
