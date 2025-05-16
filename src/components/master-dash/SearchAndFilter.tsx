
import React from 'react';
import { Search } from 'lucide-react';

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
  setActiveCategory
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      {/* Category filters on the left */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search bar on the right */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search modules..."
          className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-800 dark:text-white w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
