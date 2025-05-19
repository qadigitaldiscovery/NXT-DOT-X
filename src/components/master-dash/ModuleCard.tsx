
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
  color = "bg-gradient-to-br from-purple-50 to-indigo-100"
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
        "relative group flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-500",
        color,
        "rounded-3xl shadow-lg hover:shadow-xl",
        "border border-white/50 dark:border-white/10",
        "backdrop-blur-sm transform perspective-1000",
        "hover:translate-y-[-5px] hover:scale-[1.02]",
        className
      )}
      onClick={handleClick}
      whileHover={{ 
        rotateY: 5,
        rotateX: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-transparent rounded-3xl opacity-50"></div>
      
      {/* Icon container with glossy effect */}
      <div className="relative z-10 mb-5 transition-all duration-500 group-hover:scale-105">
        <div className="p-5 bg-gradient-to-br from-white/90 to-white/60 rounded-full shadow-lg border border-white/50">
          <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-500 group-hover:rotate-3">
            {icon}
          </div>
        </div>
        
        {/* Light reflection effect */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-white/80 via-white/40 to-transparent rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      {/* Title with subtle text shadow */}
      <div className="mt-2 z-10 transform transition-all duration-500">
        <h3 className="font-bold text-lg text-gray-700 text-center group-hover:text-gray-900">
          {title}
        </h3>
      </div>
      
      {/* Hidden arrow indicator that appears on hover */}
      <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </motion.div>
  );
};
