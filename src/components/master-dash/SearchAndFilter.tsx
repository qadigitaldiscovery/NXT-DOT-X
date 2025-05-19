
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Search Bar with Glass Morphism Effect */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search modules..."
          className="pl-10 pr-10 py-6 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-gray-200/70 dark:border-slate-700/30 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
        />
        {searchQuery && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 rounded-full"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        )}
      </div>

      {/* Category Filter Tabs with Glossy Effect */}
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all border 
                      ${
                        activeCategory.toLowerCase() === category.toLowerCase()
                        ? "bg-gradient-to-br from-blue-100/80 to-blue-50/80 border-blue-200/60 text-blue-700 shadow-sm"
                        : "bg-white/50 dark:bg-slate-800/30 border-gray-100 dark:border-slate-700/30 text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-slate-700/30"
                      }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchAndFilter;
