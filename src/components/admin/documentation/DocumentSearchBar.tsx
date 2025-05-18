import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DocumentSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const DocumentSearchBar = ({ onSearch }: DocumentSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Input
        type="search"
        placeholder="Search documentation..."
        className="w-full pl-9 pr-10 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 h-7 w-7"
          onClick={clearSearch}
        >
          <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </form>
  );
};
