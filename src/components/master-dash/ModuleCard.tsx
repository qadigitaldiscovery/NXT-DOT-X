
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
  variant?: 'default' | 'red' | 'dark' | 'light' | 'accent';
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  icon,
  path,
  className,
  variant = 'default',
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (path) {
      navigate(path);
    } else {
      console.warn(`No path defined for module: ${title}`);
    }
  };

  // Design variants based on the reference image
  const getVariantClasses = () => {
    switch (variant) {
      case 'red':
        return "bg-gradient-to-br from-red-900 to-red-950 text-white border-red-700";
      case 'dark':
        return "bg-gradient-to-br from-gray-900 to-black text-white border-gray-800";
      case 'light':
        return "bg-gradient-to-br from-gray-50 to-white text-gray-900 border-gray-200";
      case 'accent':
        return "bg-gradient-to-br from-blue-900 to-blue-950 text-white border-blue-700";
      default:
        return "bg-gradient-to-br from-gray-900 to-black text-white border-gray-800";
    }
  };

  // Icon container style variants
  const getIconContainerClasses = () => {
    switch (variant) {
      case 'red':
        return "bg-red-800 text-white ring-2 ring-red-600";
      case 'dark':
        return "bg-gray-800 text-white ring-2 ring-gray-700";
      case 'light':
        return "bg-white text-gray-900 ring-2 ring-gray-200 shadow-sm";
      case 'accent':
        return "bg-blue-800 text-white ring-2 ring-blue-700";
      default:
        return "bg-gray-800 text-white ring-2 ring-gray-700";
    }
  };

  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden cursor-pointer",
        "rounded-xl shadow-lg border",
        getVariantClasses(),
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: "url('/lovable-uploads/f591cd6e-de49-44cf-bfb9-207fcd31b3ce.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col p-6">
        {/* Title - Large and prominent like in the reference */}
        <h3 className="font-bold text-xl mb-6">
          {title}
        </h3>
        
        {/* Icon container - circular with ring like in the reference */}
        <div className={cn(
          "mt-auto self-end w-12 h-12 rounded-full flex items-center justify-center",
          getIconContainerClasses()
        )}>
          <div className="w-6 h-6">
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
