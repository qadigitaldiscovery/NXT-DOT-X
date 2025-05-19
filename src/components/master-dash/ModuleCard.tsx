
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
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/lovable-uploads/ef96cca8-3fb8-484a-b9f3-a93d6966ce77.png')",
            backgroundSize: "cover",
            imageRendering: "crisp-edges"
          }}
        />
      )}
      
      {/* Enhanced glass effect overlay with glossy finish */}
      <div className={cn(
        "absolute inset-0", 
        useImageBackground ? "bg-gradient-to-b from-white/20 via-white/10 to-black/20 dark:from-white/10 dark:via-transparent dark:to-black/40" : "bg-white/30",
        "backdrop-blur-[1px] rounded-2xl"
      )}>
        {/* Glossy highlight effect */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Icon container with enhanced glossy effect */}
        <div className="mb-4 p-3 bg-gradient-to-b from-white/90 to-white/70 dark:from-white/80 dark:to-white/60 rounded-xl shadow-md backdrop-blur-sm border border-white/50">
          <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-500 group-hover:scale-110">
            {icon}
          </div>
        </div>
        
        {/* Title with enhanced text shadow */}
        <h3 className={cn(
          "font-semibold text-lg text-center group-hover:text-gray-900",
          useImageBackground ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" : "text-gray-800"
        )}>
          {title}
        </h3>
        
        {/* Enhanced shine effect */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-white/80 via-white/20 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
      </div>
      
      {/* Enhanced bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};
