
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DocumentSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const DocumentSearchBar = ({ onSearch }: DocumentSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Input
        type="search"
        placeholder="Search documents..."
        className="w-full pl-9 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};
