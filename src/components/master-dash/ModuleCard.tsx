
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: Array<{
    name: string;
    path: string;
  }>;
  onClick: () => void;
  variant?: 'default' | 'premium';
  className?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  features,
  onClick,
  variant = 'default',
  className = ''
}) => {
  return (
    <Card 
      className={`
        group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105
        ${variant === 'premium' ? 'border-gold bg-gradient-to-br from-amber-50 to-yellow-50' : 'border-gray-200 hover:border-blue-300'}
        ${className}
      `}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <div className={`
            p-2 rounded-lg
            ${variant === 'premium' ? 'bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600' : 'bg-blue-100 text-blue-600'}
          `}>
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 mb-4">
          {features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <ArrowRight className="h-3 w-3 mr-2 text-gray-400" />
              {feature.name}
            </div>
          ))}
        </div>
        
        <Button 
          className={`
            w-full group-hover:translate-x-1 transition-transform
            ${variant === 'premium' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600' : ''}
          `}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Open Module
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
