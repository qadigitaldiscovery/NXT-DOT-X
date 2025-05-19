
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search database...',
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  // Handle both new and old prop patterns
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) onChange(newValue);
    if (setSearchTerm) setSearchTerm(newValue);
  };
  
  // Use searchTerm if provided, otherwise use value
  const inputValue = searchTerm !== undefined ? searchTerm : value;
  
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
      <Input
        className="pl-8"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
