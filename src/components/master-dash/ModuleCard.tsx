
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
  color?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  icon,
  path,
  className,
  color = "bg-gradient-to-br from-blue-50 to-blue-100"
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (path) {
      navigate(path);
    } else {
      console.warn(`No path defined for module: ${title}`);
    }
  };

  return (
    <motion.div 
      className={cn(
        "relative group overflow-hidden p-6 cursor-pointer",
        color,
        "rounded-2xl shadow-lg hover:shadow-xl",
        "border border-white/50 dark:border-white/10",
        "backdrop-blur-sm",
        className
      )}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] rounded-2xl"></div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Icon container with glossy effect */}
        <div className="mb-4 p-3 bg-white/80 rounded-xl shadow-md backdrop-blur-sm">
          <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-500 group-hover:scale-110">
            {icon}
          </div>
        </div>
        
        {/* Title with subtle text shadow */}
        <h3 className="font-semibold text-lg text-gray-800 text-center group-hover:text-gray-900">
          {title}
        </h3>
        
        {/* Subtle shine effect */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-white/80 via-white/20 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
      </div>
      
      {/* Bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};
