
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ModuleStatusFilterProps {
  selectedStatus: string | null;
  onStatusSelect: (status: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ModuleStatusFilter: React.FC<ModuleStatusFilterProps> = ({
  selectedStatus,
  onStatusSelect,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search modules..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 border-blue-lighter focus:border-blue"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant={selectedStatus === null ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusSelect(null)}
          className={`whitespace-nowrap ${selectedStatus === null ? 'bg-blue text-white' : 'text-blue'}`}
        >
          All
        </Button>
        <Button
          variant={selectedStatus === 'green' ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusSelect('green')}
          className={`${selectedStatus === 'green' ? 'bg-emerald-500 text-white' : 'text-emerald-600 border-emerald-300'}`}
        >
          Operational
        </Button>
        <Button
          variant={selectedStatus === 'orange' ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusSelect('orange')}
          className={`${selectedStatus === 'orange' ? 'bg-amber-500 text-white' : 'text-amber-600 border-amber-300'}`}
        >
          Degraded
        </Button>
        <Button
          variant={selectedStatus === 'red' ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusSelect('red')}
          className={`${selectedStatus === 'red' ? 'bg-red-500 text-white' : 'text-red-600 border-red-300'}`}
        >
          Outage
        </Button>
      </div>
    </div>
  );
};

export default ModuleStatusFilter;
