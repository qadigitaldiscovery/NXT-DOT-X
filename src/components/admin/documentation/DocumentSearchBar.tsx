import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface DocumentSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export function DocumentSearchBar({ onSearch }: DocumentSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
      <Input
        className="pl-8"
        placeholder="Search documents..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
