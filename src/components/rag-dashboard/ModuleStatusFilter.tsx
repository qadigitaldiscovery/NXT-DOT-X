
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Module } from '@/hooks/useModules';
import StatusGauge from './StatusGauge';
import { Search } from 'lucide-react';

type ModuleStatusFilterProps = {
  selectedStatus: string | null;
  onStatusSelect: (status: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ModuleStatusFilter({
  selectedStatus,
  onStatusSelect,
  searchQuery,
  onSearchChange
}: ModuleStatusFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex gap-2">
        <Button
          variant={selectedStatus === null ? "secondary" : "outline"}
          size="sm"
          onClick={() => onStatusSelect(null)}
        >
          All
        </Button>
        <Button
          variant={selectedStatus === 'green' ? "secondary" : "outline"}
          size="sm"
          onClick={() => onStatusSelect('green')}
          className="flex items-center gap-1.5"
        >
          <StatusGauge status="green" size="sm" animate={false} />
          Operational
        </Button>
        <Button
          variant={selectedStatus === 'orange' ? "secondary" : "outline"}
          size="sm"
          onClick={() => onStatusSelect('orange')}
          className="flex items-center gap-1.5"
        >
          <StatusGauge status="orange" size="sm" animate={false} />
          Degraded
        </Button>
        <Button
          variant={selectedStatus === 'red' ? "secondary" : "outline"}
          size="sm"
          onClick={() => onStatusSelect('red')}
          className="flex items-center gap-1.5"
        >
          <StatusGauge status="red" size="sm" animate={false} />
          Outage
        </Button>
      </div>
      
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search modules..."
          className="pl-8 w-full sm:w-[250px]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
