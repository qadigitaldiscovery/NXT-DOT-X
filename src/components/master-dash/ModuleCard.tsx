
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
    <div 
      className={cn(
        "group flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300",
        "hover:scale-105 active:scale-95 text-center",
        "bg-gradient-to-br from-[#f7faff] to-[#e5effc] dark:from-[#1a1f2c] dark:to-[#2d3748]",
        "rounded-2xl shadow-[0_10px_20px_rgba(0,95,234,0.15)] hover:shadow-[0_15px_30px_rgba(0,95,234,0.25)]",
        "border border-[#e5effc]/80 dark:border-[#2d3748]/80",
        "transform perspective-1000 hover:rotate-2",
        className
      )}
      onClick={handleClick}
    >
      <div className="relative mb-5 transition-all duration-300 group-hover:scale-110 group-hover:transform-gpu">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#005fea] via-[#4cacfe] to-[#005fea] rounded-full blur-md opacity-70 group-hover:opacity-100 animate-pulse-neon"></div>
        <div className="relative p-5 bg-white dark:bg-[#1a1f2c] rounded-full shadow-inner border border-[#e5effc] dark:border-[#2d3748]">
          <div className="text-[#005fea] dark:text-[#4cacfe] transform transition-all duration-500 group-hover:rotate-12">
            {icon}
          </div>
        </div>
      </div>
      
      <div className="mt-2 transform transition-all duration-300 group-hover:scale-105">
        <h3 className="font-bold text-lg bg-gradient-to-r from-[#005fea] to-[#4cacfe] bg-clip-text text-transparent">
          {title}
        </h3>
      </div>
    </div>
  );
};
