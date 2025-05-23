
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ModuleCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'premium';
  features?: Array<{ name: string; path: string }>;
  onClick?: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  variant = 'default',
  features = [],
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Convert title to route path
      const route = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      navigate(`/${route}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        {icon && <div className="mr-3 text-blue-500">{icon}</div>}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      
      {features.length > 0 && (
        <div className="mb-4">
          <ul className="text-sm text-gray-500 dark:text-gray-400">
            {features.map((feature, index) => (
              <li key={index}>• {feature.name}</li>
            ))}
          </ul>
        </div>
      )}
      
      <Button 
        onClick={handleClick}
        className="w-full"
        variant={variant === 'premium' ? 'default' : 'outline'}
      >
        Open Module
      </Button>
    </div>
  );
};
