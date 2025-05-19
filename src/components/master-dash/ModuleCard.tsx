
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
        "relative group overflow-hidden cursor-pointer",
        "rounded-[24px] shadow-lg hover:shadow-xl",
        "border border-white/60 dark:border-white/20",
        useImageBackground ? "" : color,
        className
      )}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 30px -10px rgba(0, 0, 0, 0.15), 0 15px 15px -10px rgba(0, 0, 0, 0.08)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ 
        perspective: '1000px', 
      }}
    >
      {/* Background image with enhanced quality */}
      {useImageBackground && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/lovable-uploads/ef96cca8-3fb8-484a-b9f3-a93d6966ce77.png')",
            backgroundSize: "cover",
            imageRendering: "high-quality",
            transform: "scale(1.05)", // Slight overfill to prevent gaps
          }}
        />
      )}
      
      {/* Enhanced glass effect overlay with more pronounced bubble edge */}
      <div className={cn(
        "absolute inset-0", 
        useImageBackground 
          ? "bg-gradient-to-b from-white/30 via-white/20 to-black/30 dark:from-white/15 dark:via-transparent dark:to-black/50"
          : "bg-white/40",
        "backdrop-blur-md rounded-[24px]",
        "before:absolute before:inset-0 before:rounded-[24px] before:p-[1px]",
        "before:bg-gradient-to-b before:from-white/70 before:to-transparent before:opacity-70" // Edge highlight
      )}>
        {/* Enhanced glossy highlight effect */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent rounded-t-[24px]"></div>
        
        {/* Bottom reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        
        {/* Edge glow effect */}
        <div className="absolute -inset-[0.5px] rounded-[24px] opacity-30 group-hover:opacity-50 blur-[1px] bg-gradient-to-tr from-white via-blue-400/30 to-transparent transition-opacity duration-300"></div>
      </div>
      
      {/* Content container with adjusted padding */}
      <div className="relative z-10 flex flex-col items-center p-6">
        {/* Enhanced 3D icon container with depth effect */}
        <div className="mb-4 p-3 transform-gpu">
          <div className="relative">
            {/* Icon shadow for depth */}
            <div className="absolute inset-0 blur-sm opacity-30 bg-blue-500 rounded-full transform translate-y-1"></div>
            
            {/* 3D card effect for icon */}
            <div className="p-4 bg-gradient-to-b from-white/95 to-white/80 dark:from-white/90 dark:to-white/70 rounded-2xl shadow-lg backdrop-blur-md border border-white/80 transform-gpu relative z-10">
              {/* Enhanced icon with better shadow and glow */}
              <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-500 group-hover:scale-110 drop-shadow-md">
                {icon}
              </div>
              
              {/* Inner icon highlight for 3D effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-transparent opacity-60 pointer-events-none"></div>
            </div>
          </div>
        </div>
        
        {/* Enhanced title with better text shadow and positioning */}
        <h3 className={cn(
          "font-semibold text-lg text-center group-hover:text-gray-900 relative z-10",
          useImageBackground ? "text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]" : "text-gray-800"
        )}>
          {title}
          {/* Title glow effect on hover */}
          <div className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-30 bg-white transition-opacity duration-300"></div>
        </h3>
      </div>
      
      {/* Enhanced bottom highlight for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-50 group-hover:opacity-80 transition-opacity"></div>
    </motion.div>
  );
};
