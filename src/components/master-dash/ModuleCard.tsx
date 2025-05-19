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
  variant = 'default'
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
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-red-900";
      case 'dark':
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-gray-800";
      case 'light':
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-gray-200";
      case 'accent':
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-blue-700";
      default:
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-gray-800";
    }
  };

  // Icon container style variants
  const getIconContainerClasses = () => {
    switch (variant) {
      case 'red':
        return "bg-redmetal-600 text-white ring-2 ring-red-600";
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
  return <motion.div className={cn("relative overflow-hidden cursor-pointer", "rounded-xl shadow-lg border", getVariantClasses(), className)} onClick={handleClick} whileHover={{
    scale: 1.03
  }} transition={{
    duration: 0.3
  }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: "url('/lovable-uploads/f591cd6e-de49-44cf-bfb9-207fcd31b3ce.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }} />
      
      {/* Neon blue splash/accent */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-blue-500/30 blur-xl animate-pulse-neon" style={{
      background: "radial-gradient(circle at center, rgba(56,189,248,0.6) 0%, rgba(59,130,246,0.3) 40%, transparent 70%)"
    }} />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col p-6 bg-zinc-950">
        {/* Title - Large and prominent like in the reference */}
        <h3 className="font-bold text-xl mb-6 text-center">
          {title}
        </h3>
        
        {/* Icon container - circular with ring like in the reference */}
        <div className="bg-transparent rounded-none px-[92px]">
          <div className="w-6 h-6">
            {icon}
          </div>
        </div>
      </div>
    </motion.div>;
};