
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  icon,
  path,
  className
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
        "bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-900/80",
        "rounded-2xl shadow-xl hover:shadow-2xl",
        "border border-white/20 dark:border-slate-700/50",
        "backdrop-blur-md transform perspective-1000",
        "hover:translate-y-[-10px] hover:scale-105",
        className
      )}
      onClick={handleClick}
      whileHover={{ 
        rotateY: 5,
        rotateX: -5
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow effect behind icon */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Icon container with pulse and glow effects */}
      <div className="relative z-10 mb-6 transition-all duration-500 group-hover:scale-110 group-hover:transform-gpu">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#005fea] via-[#4cacfe] to-[#005fea] rounded-full blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg animate-pulse-neon"></div>
        <div className="relative p-5 bg-white dark:bg-slate-800/80 rounded-full shadow-inner border border-white/50 dark:border-slate-700">
          <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-700 group-hover:rotate-12 group-hover:scale-110">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Title with gradient effect */}
      <div className="mt-2 z-10 transform transition-all duration-500 group-hover:scale-105">
        <h3 className="font-bold text-lg bg-gradient-to-r from-[#005fea] to-[#4cacfe] bg-clip-text text-transparent text-center">
          {title}
        </h3>
      </div>
      
      {/* Hidden arrow icon that appears on hover */}
      <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      
      {/* 3D effect layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
};
