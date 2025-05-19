
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
        "flex flex-col items-center justify-center p-6 cursor-pointer transition-all",
        "hover:scale-105 active:scale-95 text-center",
        "bg-gradient-to-br from-[#f7faff] to-[#e5effc] dark:from-[#1a1f2c] dark:to-[#2d3748]",
        "rounded-xl shadow-lg hover:shadow-xl border-2 border-[#e5effc] dark:border-[#2d3748]",
        "transform perspective-1000 hover:-rotate-2",
        className
      )}
      onClick={handleClick}
    >
      <div className="text-[#005fea] dark:text-[#4cacfe] mb-4 transform transition-transform hover:rotate-12">
        <div className="p-4 bg-white dark:bg-[#1a1f2c] rounded-full shadow-inner border border-[#e5effc] dark:border-[#2d3748]">
          {icon}
        </div>
      </div>
      <h3 className="font-bold text-lg text-[#005fea] dark:text-[#4cacfe]">{title}</h3>
    </div>
  );
};

