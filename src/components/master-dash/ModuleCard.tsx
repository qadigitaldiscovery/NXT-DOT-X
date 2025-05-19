
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
  useImageBackground?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  icon,
  path,
  className,
  color = "bg-gradient-to-br from-blue-50 to-blue-100",
  useImageBackground = true
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
        useImageBackground ? "" : color,
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
      {useImageBackground && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-90"
          style={{ 
            backgroundImage: "url('/lovable-uploads/ef96cca8-3fb8-484a-b9f3-a93d6966ce77.png')",
            backgroundSize: "cover" 
          }}
        />
      )}
      
      {/* Glass effect overlay */}
      <div className={cn(
        "absolute inset-0", 
        useImageBackground ? "bg-white/10 dark:bg-black/30" : "bg-white/30",
        "backdrop-blur-[2px] rounded-2xl"
      )}></div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Icon container with glossy effect */}
        <div className="mb-4 p-3 bg-white/80 rounded-xl shadow-md backdrop-blur-sm">
          <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-500 group-hover:scale-110">
            {icon}
          </div>
        </div>
        
        {/* Title with subtle text shadow */}
        <h3 className={cn(
          "font-semibold text-lg text-center group-hover:text-gray-900",
          useImageBackground ? "text-white drop-shadow-md" : "text-gray-800"
        )}>
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
