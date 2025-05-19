
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
  color = "bg-gradient-to-br from-blue-50 to-blue-100",
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
        "relative group overflow-hidden cursor-pointer",
        "rounded-xl shadow-md hover:shadow-lg",
        "border border-gray-200 dark:border-gray-700",
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background image with dots pattern */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/6ba5c2e8-f93f-4ecc-801b-ded87459ddc8.png')",
          backgroundSize: "cover",
        }}
      />

      {/* Simple overlay for text readability */}
      <div className="absolute inset-0 bg-white/50 dark:bg-black/40" />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center p-6">
        {/* Icon container */}
        <div className="mb-4 p-3">
          <div className="text-blue-500 dark:text-blue-400 w-10 h-10">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-lg text-center text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};
