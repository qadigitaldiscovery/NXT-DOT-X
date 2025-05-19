
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <motion.div 
      className="mb-8 space-y-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Input with Glass Effect */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Search modules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-blue-300 rounded-xl shadow-sm h-11"
        />
      </div>
      
      {/* Category Filter Pills with Glass Effect */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = activeCategory.toLowerCase() === category.toLowerCase();
          
          return (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full backdrop-blur-sm transition-all",
                "border shadow-sm",
                isActive
                  ? "bg-gradient-to-r from-blue-100/80 to-blue-200/80 border-blue-200 text-blue-700"
                  : "bg-white/60 border-gray-200 text-gray-600 hover:bg-white/80"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SearchAndFilter;
