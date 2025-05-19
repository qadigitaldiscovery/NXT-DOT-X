import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
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
  return <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search modules..." value={searchTerm} onChange={e => onSearchChange(e.target.value)} className="w-full sm:w-[250px] pl-9" />
      </div>
      
      {/* Category Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
        <Button variant={activeCategory === 'all' ? 'default' : 'outline'} size="sm" onClick={() => onCategoryChange('all')}>
          All
        </Button>
        <Button variant={activeCategory === 'primary' ? 'default' : 'outline'} size="sm" onClick={() => onCategoryChange('primary')} className="bg-slate-400 hover:bg-slate-300 text-slate-500">
          Primary
        </Button>
        <Button variant={activeCategory === 'secondary' ? 'default' : 'outline'} size="sm" onClick={() => onCategoryChange('secondary')} className="bg-slate-400 hover:bg-slate-300 text-slate-500">
          Secondary
        </Button>
        <Button variant={activeCategory === 'subcategory' ? 'default' : 'outline'} size="sm" onClick={() => onCategoryChange('subcategory')} className="text-slate-500 bg-slate-400 hover:bg-slate-300">
          Sub-Category
        </Button>
      </div>
    </div>;
};
export default SearchAndFilter;