
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
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white dark:bg-[#1a1f2c] p-6 rounded-xl shadow-lg border-2 border-[#e5effc] dark:border-[#2d3748]">
      {/* Category filters on the left */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? 'bg-[#005fea] text-white shadow-md transform scale-105' 
                : 'bg-[#e5effc] dark:bg-[#2d3748] text-gray-700 dark:text-gray-300 hover:bg-[#4cacfe] hover:text-white dark:hover:bg-[#005fea] hover:scale-105'
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
          className="pl-10 pr-4 py-2 bg-[#f7faff] dark:bg-[#1e293b] border-2 border-[#aee1f9] dark:border-[#3a4a63] rounded-lg text-gray-800 dark:text-white w-64 focus:outline-none focus:ring-2 focus:ring-[#005fea] transition-all focus:scale-105"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
