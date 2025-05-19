
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="flex flex-wrap items-center justify-between gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glassmorphism card container */}
      <div className="w-full p-6 backdrop-blur-xl bg-white/30 dark:bg-slate-900/30 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
        
        {/* Category filters with animated pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map(category => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory.toLowerCase() === category.toLowerCase()
                  ? 'bg-gradient-to-r from-[#005fea] to-[#4cacfe] text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-white/50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-300 hover:bg-blue-100/80 dark:hover:bg-blue-900/20'
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Search bar with floating animation */}
        <div className="relative w-full md:max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-500" />
          </div>
          <motion.input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-12 pr-4 py-3 bg-white/70 dark:bg-slate-800/70 border-2 border-blue-100/50 dark:border-slate-700/50 rounded-xl text-gray-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            whileFocus={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
          />
          
          {/* Animated highlight effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

      </div>
    </motion.div>
  );
};

export default SearchAndFilter;
