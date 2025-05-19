
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
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      {/* Glass morphism card container */}
      <div className="w-full p-6 backdrop-blur-md bg-white/30 dark:bg-black/20 rounded-2xl border border-[#aee1f9]/30 dark:border-[#3a4a63]/30 shadow-lg">
        
        {/* Category filters with animated pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory.toLowerCase() === category.toLowerCase()
                  ? 'bg-gradient-to-r from-[#005fea] to-[#4cacfe] text-white shadow-md transform scale-105' 
                  : 'bg-[#e5effc]/50 dark:bg-[#2d3748]/50 text-gray-700 dark:text-gray-300 hover:bg-[#4cacfe]/30 hover:shadow-md hover:scale-105'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search bar with floating animation */}
        <div className="relative w-full md:max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#005fea]" />
          </div>
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-10 pr-4 py-3 bg-[#f7faff]/70 dark:bg-[#1e293b]/70 border-2 border-[#aee1f9]/50 dark:border-[#3a4a63]/50 rounded-xl text-gray-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-[#005fea]/50 transition-all duration-300 hover:shadow-md focus:shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Animated highlight effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4cacfe]/20 to-[#005fea]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

      </div>
    </div>
  );
};

export default SearchAndFilter;
