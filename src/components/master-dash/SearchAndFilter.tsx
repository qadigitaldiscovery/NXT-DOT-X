
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchAndFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange
}) => {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'primary', label: 'Primary' },
    { id: 'data', label: 'Data' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'tech', label: 'Tech' },
    { id: 'operations', label: 'Operations' }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white dark:bg-gray-800"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full",
              activeCategory === category.id 
                ? "bg-primary text-primary-foreground" 
                : "bg-background hover:bg-muted"
            )}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
